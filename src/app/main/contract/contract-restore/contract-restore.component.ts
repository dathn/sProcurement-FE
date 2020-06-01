import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { StatusContstants } from '../../../core/common/status.constants';
import { MessageContstants } from '../../../core/common/message.constants';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthenService } from '../../../core/services/authen.service';
import { LoggedInUser } from '../../../core/domain/loggedin.user';
import { SystemConstants } from '../../../core/common/system.constants';
import { TabsetComponent } from 'ngx-bootstrap';
@Component({
  selector: 'app-contract-restore',
  templateUrl: './contract-restore.component.html',
  styleUrls: ['./contract-restore.component.css']
})
export class ContractRestoreComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public maxSize: number = 2;
  public totalRows: number;
  public contracts: any[];
  public _status: string;
  public keyword = '';
  public sort = '';

  public user: LoggedInUser;
  public roles = [];

  public apiStatus: number;

  public pageIndexExpire: number = 1;
  public pageIndexDelete: number = 1;

  public pageSizeExpire: number = 10;
  public pageSizeDelete: number = 10;

  public totalRowsExpire: number;
  public totalRowsDelete: number;


  constructor(private _dataService: DataService, private _notificationService: NotificationService, public _authenService: AuthenService) {

  }

  ngOnInit() {
    this.clickDeleted();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.roles = JSON.parse(this.user.roles);
  }

  loadData() {
    if (this.apiStatus === -1) {
      this._dataService.get('/api/contract/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus + '&sort=' + this.sort + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
        .subscribe((response: any) => {
          this.contracts = response.Items;
          this.pageIndex = response.PageIndex;
          this.pageSize = response.PageSize;
          this.totalRows = response.TotalRows;
        });
    } else if (this.apiStatus === 1) {
      this._dataService.get('/api/contract/get-all-paging?keyword=' + this.keyword + '&status=3' + '&sort=' + this.sort + '&page=' + this.pageIndex + '&pageSize=' + this.pageSize)
        .subscribe((response: any) => {
          this.contracts = response.Items;
          this.pageIndex = response.PageIndex;
          this.pageSize = response.PageSize;
          this.totalRows = response.TotalRows;
        });
    }

  }
  pageChangedDelete(event: any): void {
    this.pageIndexDelete = event.page;
    if (this.apiStatus === -1) {
      this.clickDeleted();
    }
  }

  pageChangedExpire(event: any): void {
    this.pageIndexExpire = event.page;
    if (this.apiStatus === 1) {
      this.clickExpired();
    }
  }

  setStatus() {
    if (this._status === StatusContstants.DELETED) {
      return { 'font-red-mint': StatusContstants.DELETED };
    } else if (this._status === StatusContstants.EXPIRED) {
      return { 'font-red-mint': StatusContstants.EXPIRED };
    }

  }
  showStatus(status: number) {
    if (status === StatusContstants.AMMOT) {
      this._status = StatusContstants.DELETED;
    } else if (status === StatusContstants.MOT) {
      this._status = StatusContstants.EXPIRED;
    } else {
      this._status = StatusContstants.ERROR;
    }
    return this._status;
  }

  restoreContract(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_RESTORE_MSG + code + ' ?',
      () => this.restoreContractConfirm(id, code));
  }

  restoreContractConfirm(id: any, code: any) {
    this._dataService.get('/api/contract/restore/' + id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.RESTORED_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
      this.loadData();
    });
  }

  clickDeleted() {
    
    this._dataService.get('/api/contract/get-all-paging?keyword=' + this.keyword + '&status=-1' +
      '&sort=' + this.sort + '&page=' + this.pageIndexDelete + '&pageSize=' + this.pageSizeDelete)
      .subscribe((response: any) => {
        this.contracts = response.Items;
        this.pageIndexDelete = response.PageIndex;
        this.pageSizeDelete = response.PageSize;
        this.totalRowsDelete = response.TotalRows;
      });
  }

  clickExpired() {
    this._dataService.get('/api/contract/get-all-paging?keyword=' + this.keyword + '&status=3' +
      '&sort=' + this.sort + '&page=' + this.pageIndexExpire + '&pageSize=' + this.pageSizeExpire)
      .subscribe((response: any) => {
        this.contracts = response.Items;
        this.pageIndexExpire = response.PageIndex;
        this.pageSizeExpire = response.PageSize;
        this.totalRowsExpire = response.TotalRows;
      });
  }

}
