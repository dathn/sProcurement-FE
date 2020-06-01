import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { StatusContstants } from '../../../core/common/status.constants';
import { MessageContstants } from '../../../core/common/message.constants';
import { NotificationService } from '../../../core/services/notification.service';
@Component({
  selector: 'app-supplier-index',
  templateUrl: './supplier-index.component.html',
  styleUrls: ['./supplier-index.component.css']
})
export class SupplierIndexComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRows: number;
  public suppliers: any[];
  public _status: string;
  public isShowEdit = false;
  public isShowApprove = false;
  public keyword = '';
  public sort = '';

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/supplier/get-all-paging?keyword=' + this.keyword + '&sort=' + this.sort + '&page=' +
      this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.suppliers = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRows = response.TotalRows;
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  deleteSupplier(id: any, name: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG + name + ' ?',
      () => this.deleteSupplierConfirm(id, name));
  }

  deleteSupplierConfirm(id: any, name: any) {
    this._dataService.delete('/api/supplier/delete/' + id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_MSG + name + MessageContstants.SUCCESSFULLY_MSG);
      this.loadData();
    });
  }

  setStatus() {
    if (this._status === StatusContstants.NEW) {
      return { 'font-green-jungle': StatusContstants.NEW };
    } else if (this._status === StatusContstants.ACTIVED) {
      return { 'font-green-jungle': StatusContstants.ACTIVED };
    } else if (this._status === StatusContstants.WAITING) {
      return { 'font-green-jungle': StatusContstants.WAITING };
    } else if (this._status === StatusContstants.APPROVED) {
      return { 'font-blue-steel': StatusContstants.APPROVED };
    } else if (this._status === StatusContstants.DELETED) {
      return { 'font-red-mint': StatusContstants.DELETED };
    } else if (this._status === StatusContstants.REJECTED) {
      return { 'font-yellow-crusta': StatusContstants.REJECTED };
    } else {
      return { 'font-red-mint': StatusContstants.ERROR };
    }

  }

  showStatus(status: number) {
    if (status === StatusContstants.MOT) {
      this._status = StatusContstants.WAITING;
    } else if (status === StatusContstants.HAI) {
      this._status = StatusContstants.APPROVED;
    } else {
      this._status = StatusContstants.ERROR;
    }
    return this._status;
  }
  showEdit(status: number) {
    if (status === StatusContstants.MOT) {
      this.isShowEdit = true;
    } else if (status === StatusContstants.HAI) {
      this.isShowEdit = false;
    }
    return this.isShowEdit;
  }
  // showApprove(status: number) {
  //   if (status === StatusContstants.MOT) {
  //     this.isShowApprove = false;
  //   } else if (status === StatusContstants.HAI) {
  //     this.isShowApprove = true;
  //   }
  //   return this.isShowApprove;
  // }

}
