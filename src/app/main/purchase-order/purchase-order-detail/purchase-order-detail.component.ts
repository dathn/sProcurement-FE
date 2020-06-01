import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadFileService } from '../../../core/services/upload-file.service';
import { LoggedInUser } from '../../../core/domain/loggedin.user';
import { DataService } from '../../../core/services/data.service';
import { StatusContstants } from '../../../core/common/status.constants';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthenService } from '../../../core/services/authen.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { SystemConstants } from '../../../core/common/system.constants';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { UrlConstants } from '../../../core/common/url.constants';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {
  public purchaseOrder: any;
  public _id: any;
  public subscription: any;
  public _status: string;
  public _statusContract: string;
  public _statusBudget: string;
  public proDetail: any;
  public max: number = 5;
  public rate: number = 7;
  public contract :any;
  public isReadonly: boolean = true;

  public user: LoggedInUser;

  //Deny
  public denyItem: any;
  public ReasonForDeny: any;

  //Approve
  public approveItem: any;


  constructor(
    private _dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private _notificationService: NotificationService,
    private router: Router,
    public _authenService: AuthenService) {
    this.purchaseOrder = {};
    this.proDetail = {};


  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      this._id = param['id'];
      this._dataService.get('/api/purchase-order/get-detail/' + this._id)
        .subscribe(response => {
          this.purchaseOrder = response;
          console.log(response);
        }, err => {
          console.log(err);
        });
    });

  }

  getProductDetail(id: any) {
    let exist = this.purchaseOrder.PurchaseOrderItems.findIndex(x => x.ID === id);
    if (exist > -1) {
      this.proDetail = {};
      this.proDetail = this.purchaseOrder.PurchaseOrderItems[exist].Product;
    }
  }

  setStatus() {
    switch (this._status) {
      case StatusContstants.WAITING:
        return { 'font-green-jungle': StatusContstants.WAITING };
      case StatusContstants.APPROVED:
        return { 'font-blue-steel': StatusContstants.APPROVED };
      case StatusContstants.DELETED:
        return { 'font-red-mint': StatusContstants.DELETED };
      case StatusContstants.DRAFT:
        return { 'font-yellow': StatusContstants.DRAFT };
      case StatusContstants.DENIED:
        return { 'font-yellow-crusta': StatusContstants.DENIED };
      default:
        return { 'font-purple': StatusContstants.ERROR };
    }

  }

  setStatusBudget() {
    switch (this._statusBudget) {
      case StatusContstants.UNCHECK:
        return { 'font-green-jungle': StatusContstants.UNCHECK };
      case StatusContstants.VALID:
        return { 'font-blue-steel': StatusContstants.VALID };
      case StatusContstants.NOTVALID:
        return { 'font-red-mint': StatusContstants.NOTVALID };
      default:
        return { 'font-purple': StatusContstants.ERROR };
    }

  }

  showStatus(status: number) {
    if (status === StatusContstants.MOT) {
      this._status = StatusContstants.WAITING;
    } else if (status === StatusContstants.HAI) {
      this._status = StatusContstants.APPROVED;
    } else if (status === StatusContstants.BA) {
      this._status = StatusContstants.DENIED;
    } else if (status === StatusContstants.AMMOT) {
      this._status = StatusContstants.DELETED;
    } else if (status === StatusContstants.BON) {
      this._status = StatusContstants.DRAFT;
    } else {
      this._status = StatusContstants.ERROR;
    }

    return this._status;
  }

  // Deny cua Purchase Order
  denyPurchaseOrder() {
    let data = {
      "ID": this.denyItem,
      "Status": 3,
      "ReasonForDeny": this.ReasonForDeny
    }
    this._dataService.put('/api/purchase-order/deny/', data).subscribe((response: Response) => {
      this.router.navigate([UrlConstants.PURCHASEORDER]);
      this._notificationService.printSuccessMessage(MessageContstants.DENIED_MSG + name + MessageContstants.SUCCESSFULLY_MSG);
      document.getElementById("close-modal-deny").click();
    });
  }

  setDenyItem(id) {
    this.denyItem = id;
  }

  //Approve cua Purchase Order
  approvePurchaseOrder(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_APPROVED_MSG + code + ' ?',
      () => this.approvePurchaseOrderConfirm(id, code));
  }


  approvePurchaseOrderConfirm(id: any, code: any) {
    this._dataService.get('/api/purchase-order/approve/' + id).subscribe((response: Response) => {
      this.router.navigate([UrlConstants.PURCHASEORDER]);
      this._notificationService.printSuccessMessage(MessageContstants.APPROVE_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
    });
  }

  //Save As Draft cua Purchase Order
  saveAsDraft() {
    this._dataService.get('/api/purchase-order/save-drafts/' + this._id)
      .subscribe((response: any) => {
        this.router.navigate([UrlConstants.PURCHASEORDER]);
        this._notificationService.printSuccessMessage(MessageContstants.SAVEASDRAFT_MSG + MessageContstants.SUCCESSFULLY_MSG);
      });
  }

  //Submit cua Purchase Order
  submitDraft() {
    this._dataService.get('/api/purchase-order/submit/' + this._id)
      .subscribe((response: any) => {
        this.router.navigate([UrlConstants.PURCHASEORDER]);
        this._notificationService.printSuccessMessage(MessageContstants.SUBMIT_MSG  + MessageContstants.SUCCESSFULLY_MSG);
      });
  }

  //Delete cua Purchase Order
  deleteWaiting(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG + code + ' ?',
      () => this.deleteWaitingConfirm(id, code));
  }
  deleteWaitingConfirm(id: any, code: any) {
    this._dataService.get('/api/purchase-order/delete/' + id).subscribe((response: Response) => {
      this.router.navigate([UrlConstants.PURCHASEORDER]);
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
    });
  }

  showStatusBudget(status: number) {
    if (status === StatusContstants.MOT) {
      this._statusBudget = StatusContstants.UNCHECK;
    } else if (status === StatusContstants.HAI) {
      this._statusBudget = StatusContstants.VALID;
    } else if (status === StatusContstants.BA) {
      this._statusBudget = StatusContstants.NOTVALID;
    
    } else {
      this._statusBudget = StatusContstants.ERROR;
    }

    return this._status;
  }

  getContract(id :any){
    this._dataService.get('/api/contract/get-detail/' + id).subscribe(res => {
      this.contract = res;
      document.getElementById('openModalButton').click();
    })

  }

  setStatusContract() {
    switch (this._statusContract) {
      case StatusContstants.ACTIVED:
        return { 'font-green-jungle': StatusContstants.ACTIVED };
      case StatusContstants.DELETED:
        return { 'font-red-mint': StatusContstants.DELETED };
      default:
        return { 'font-purple': StatusContstants.ERROR };
    }
  }

  showStatusContract(status: number) {
    if (status === StatusContstants.MOT) {
      this._statusContract = StatusContstants.ACTIVED;
    } else if (status === StatusContstants.AMMOT) {
      this._statusContract = StatusContstants.DELETED;
    } else {
      this._statusContract = StatusContstants.ERROR;
    }
    return this._statusContract;
  }




}
