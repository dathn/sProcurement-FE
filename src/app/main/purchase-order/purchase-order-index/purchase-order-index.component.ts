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
  selector: 'app-purchase-order',
  templateUrl: './purchase-order-index.component.html',
  styleUrls: ['./purchase-order-index.component.css']
})
export class PurchaseOrderIndexComponent implements OnInit {
  public pageIndexDraft: number = 1;
  public pageIndexDelete: number = 1;
  public pageIndexDeny: number = 1;
  public pageIndexWating: number = 1;
  public pageIndexApprove: number = 1;

  public pageSizeDraft: number = 10;
  public pageSizeDelete: number = 10;
  public pageSizeDeny: number = 10;
  public pageSizeWaiting: number = 10;
  public pageSizeApprove: number = 10;

  public totalRowsDraft: number;
  public totalRowsDelete: number;
  public totalRowsDeny: number;
  public totalRowsWaiting: number;
  public totalRowsApprove: number;

  public purchaseOrders: any[];
  
  public apiStatus: number;
  
  public keyword = '';
  public sort = '';
  public user: LoggedInUser;

  public deletedItem: any;
  public userRole: any;

  public roles = [];

  public isPermanentlyDelete: boolean;

  constructor(private _dataService: DataService, private _notificationService: NotificationService, public _authenService: AuthenService) { }

  ngOnInit() {
    this.clickWaiting();
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.roles = JSON.parse(this.user.roles);
  }

  loadData() {
    if (this.apiStatus === 1) {
      this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
        '&sort=' + this.sort + '&page=' + this.pageIndexWating + '&pageSize=' + this.pageSizeWaiting)
        .subscribe((response: any) => {
          this.purchaseOrders = response.Items;
          this.pageIndexWating = response.PageIndex;
          this.pageSizeWaiting = response.PageSize;
          this.totalRowsWaiting = response.TotalRows;
        });
    } else if (this.apiStatus === 2) {
      this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
        '&sort=' + this.sort + '&page=' + this.pageIndexApprove + '&pageSize=' + this.pageSizeApprove)
        .subscribe((response: any) => {
          this.purchaseOrders = response.Items;
          this.pageIndexApprove = response.PageIndex;
          this.pageSizeApprove = response.PageSize;
          this.totalRowsApprove = response.TotalRows;
        });
    } else if (this.apiStatus === 3) {
      this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
        '&sort=' + this.sort + '&page=' + this.pageIndexDeny + '&pageSize=' + this.pageSizeDeny)
        .subscribe((response: any) => {
          this.purchaseOrders = response.Items;
          this.pageIndexDeny = response.PageIndex;
          this.pageSizeDeny = response.PageSize;
          this.totalRowsDeny = response.TotalRows;
        });
    } else if (this.apiStatus === 4) {
      this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
        '&sort=' + this.sort + '&page=' + this.pageIndexDraft + '&pageSize=' + this.pageSizeDraft)
        .subscribe((response: any) => {
          this.purchaseOrders = response.Items;
          this.pageIndexDraft = response.PageIndex;
          this.pageSizeDraft = response.PageSize;
          this.totalRowsDraft = response.TotalRows;
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

  pageChangedWaiting(event: any): void {
    this.pageIndexWating = event.page;
    if (this.apiStatus === 1) {
      this.clickWaiting();
    }
  }

  pageChangedApprove(event: any): void {
    this.pageIndexApprove = event.page;
    if (this.apiStatus === 2) {
      this.clickApprove();
    }
  }

  pageChangedDeny(event: any): void {
    this.pageIndexDeny = event.page;
    if (this.apiStatus === 3) {
      this.clickDenied();
    }
  }

  pageChangedDraft(event: any): void {
    this.pageIndexDraft = event.page;
    if (this.apiStatus === 4) {
      this.clickDraft();
    }
  }

  pageChangedDelete(event: any): void {
    this.pageIndexDelete = event.page;
    if (this.apiStatus === -1) {
      this.clickDeleted();
    }
  }

  clickWaiting() {
    this.apiStatus = 1;
    this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
      '&sort=' + this.sort + '&page=' + this.pageIndexWating + '&pageSize=' + this.pageSizeWaiting)
      .subscribe((response: any) => {
        this.purchaseOrders = response.Items;
        console.log(this.purchaseOrders);
        this.pageIndexWating = response.PageIndex;
        this.pageSizeWaiting = response.PageSize;
        this.totalRowsWaiting = response.TotalRows;
      });


  }

  clickApprove() {
    this.apiStatus = 2;
    this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
      '&sort=' + this.sort + '&page=' + this.pageIndexApprove + '&pageSize=' + this.pageSizeApprove)
      .subscribe((response: any) => {
        this.purchaseOrders = response.Items;
        this.pageIndexApprove = response.PageIndex;
        this.pageSizeApprove = response.PageSize;
        this.totalRowsApprove = response.TotalRows;
      });

  }

  clickDraft() {
    this.apiStatus = 4;
    this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
      '&sort=' + this.sort + '&page=' + this.pageIndexDraft + '&pageSize=' + this.pageSizeDraft)
      .subscribe((response: any) => {
        this.purchaseOrders = response.Items;
        this.pageIndexDraft = response.PageIndex;
        this.pageSizeDraft = response.PageSize;
        this.totalRowsDraft = response.TotalRows;
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

  clickDenied() {
    this.apiStatus = 3;
    this._dataService.get('/api/purchase-order/get-all-paging?keyword=' + this.keyword + '&status=' + this.apiStatus +
      '&sort=' + this.sort + '&page=' + this.pageIndexDeny + '&pageSize=' + this.pageSizeDeny)
      .subscribe((response: any) => {
        this.purchaseOrders = response.Items;
        this.pageIndexDeny = response.PageIndex;
        this.pageSizeDeny = response.PageSize;
        this.totalRowsDeny = response.TotalRows;
      });
  } 

  deleteWaiting(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG + code + ' ?',
      () => this.deleteWaitingConfirm(id, code));
  }

  deleteWaitingConfirm(id: any, code: any) {
    this._dataService.get('/api/purchase-order/delete/' + id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
      if (this.apiStatus === 1) {
        this.clickWaiting();
      } else if (this.apiStatus === 4) {
        this.clickDraft();
      }
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
