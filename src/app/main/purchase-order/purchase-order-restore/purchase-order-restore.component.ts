import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { StatusContstants } from '../../../core/common/status.constants';
import { MessageContstants } from '../../../core/common/message.constants';
import { NotificationService } from '../../../core/services/notification.service';
import { LoggedInUser } from '../../../core/domain/loggedin.user';
import { SystemConstants } from '../../../core/common/system.constants';
import { TabsetComponent } from 'ngx-bootstrap';
import { AuthenService } from '../../../core/services/authen.service';

@Component({
  selector: 'app-purchase-order-restore',
  templateUrl: './purchase-order-restore.component.html',
  styleUrls: ['./purchase-order-restore.component.css']
})
export class PurchaseOrderRestoreComponent implements OnInit {
  public pageIndexDone: number = 1;
  public pageIndexDelete: number = 1;

  public pageSizeDone: number = 10;
  public pageSizeDelete: number = 10;

  public totalRowsDone: number;
  public totalRowsDelete: number;

  public purchaseOrders: any[];

  public apiStatus: number;
  
  public keyword = '';
  public sort = '';
  public user: LoggedInUser;

  public roles = [];

  constructor(private _dataService: DataService, private _notificationService: NotificationService, public _authenService: AuthenService) { }

  ngOnInit() {
    this.clickDone();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.roles = JSON.parse(this.user.roles);
    
  }

  loadData() {
    
    if (this.apiStatus === 5) {
      this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
        '&sort=' + this.sort + '&page=' + this.pageIndexDone + '&pageSize=' + this.pageSizeDone)
        .subscribe((response: any) => {
          this.purchaseOrders = response.Items;
          this.pageIndexDone = response.PageIndex;
          this.pageSizeDone = response.PageSize;
          this.totalRowsDone = response.TotalRows;
        });
    } else if (this.apiStatus === -1) {
      this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
        '&sort=' + this.sort + '&page=' + this.pageIndexDelete + '&pageSize=' + this.pageSizeDelete)
        .subscribe((response: any) => {
          this.purchaseOrders = response.Items;
          this.pageIndexDelete = response.PageIndex;
          this.pageSizeDelete = response.PageSize;
          this.totalRowsDelete = response.TotalRows;
        });
    }
  }

  pageChangedDone(event: any): void {
    this.pageIndexDone = event.page;
    if (this.apiStatus === 5) {
      this.clickDone();
    }
  }

  pageChangedDelete(event: any): void {
    this.pageIndexDelete = event.page;
    if (this.apiStatus === -1) {
      this.clickDeleted();
    }
  }

  clickDone() {
    this.apiStatus = 5;
    this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
      '&sort=' + this.sort + '&page=' + this.pageIndexDone + '&pageSize=' + this.pageSizeDone)
      .subscribe((response: any) => {
        this.purchaseOrders = response.Items;
        this.pageIndexDone = response.PageIndex;
        this.pageSizeDone = response.PageSize;
        this.totalRowsDone = response.TotalRows;
      });
  }
  clickDeleted() {
    this.apiStatus = -1;
    this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
      '&sort=' + this.sort + '&page=' + this.pageIndexDelete + '&pageSize=' + this.pageSizeDelete)
      .subscribe((response: any) => {
        this.purchaseOrders = response.Items;
        this.pageIndexDelete = response.PageIndex;
        this.pageSizeDelete = response.PageSize;
        this.totalRowsDelete = response.TotalRows;
      });
  }

  restorePurchaseOrder(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_RESTORE_MSG + code + ' ?',
      () => this.restorePurchaseOrderConfirm(id, code));
  }

  restorePurchaseOrderConfirm(id: any, code: any) {
    this._dataService.get('/api/purchase-order/restore/' + id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.RESTORED_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
      this.clickDeleted();
    });
  }

  

}
