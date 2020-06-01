import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { StatusContstants } from '../../../core/common/status.constants';
import { MessageContstants } from '../../../core/common/message.constants';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthenService } from '../../../core/services/authen.service';
import { LoggedInUser } from '../../../core/domain/loggedin.user';
import { SystemConstants } from '../../../core/common/system.constants';
@Component({
  selector: 'app-contract-index',
  templateUrl: './contract-index.component.html',
  styleUrls: ['./contract-index.component.css']
})
export class ContractIndexComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public maxSize: number = 2;
  public totalRows: number;
  public contracts: any[];
  public _status = '';
  public keyword = '';
  public sort = '';

  public user: LoggedInUser;
  public roles = [];

  constructor(private _dataService: DataService, private _notificationService: NotificationService, public _authenService: AuthenService) {

  }

  ngOnInit() {
    this.loadData();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.roles = JSON.parse(this.user.roles);
  }

  loadData() {

    this._dataService.get('/api/contract/get-all-paging?keyword=' + this.keyword + '&status=1' + '&sort=' + this.sort + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.contracts = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRows = response.TotalRows;
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  setStatus() {
    if (this._status === StatusContstants.ACTIVED) {
      return { 'font-green-jungle': StatusContstants.ACTIVED };
    } else if (this._status === StatusContstants.DELETED) {
      return { 'font-red-mint': StatusContstants.DELETED };
    } else {
      return { 'font-red-mint': StatusContstants.ERROR };
    }

  }
  showStatus(status: number) {
    if (status === StatusContstants.MOT) {
      this._status = StatusContstants.ACTIVED;
    } else if (status === StatusContstants.AMMOT) {
      this._status = StatusContstants.DELETED;
    }
    return this._status;
  }

  deleteContract(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG + code + ' ?',
      () => this.deleteContractConfirm(id, code));
  }

  deleteContractConfirm(id: any, code: any) {
    this._dataService.get('/api/contract/delete/' + id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
      this.loadData();
    });
  }

}
