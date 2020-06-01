import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadFileService } from '../../../core/services/upload-file.service';
import { LoggedInUser } from '../../../core/domain/loggedin.user';
import { StatusContstants } from '../../../core/common/status.constants';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthenService } from '../../../core/services/authen.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { SystemConstants } from '../../../core/common/system.constants';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { UrlConstants } from '../../../core/common/url.constants';
@Component({
  selector: 'app-purchase-requisition-detail',
  templateUrl: './purchase-requisition-detail.component.html',
  styleUrls: ['./purchase-requisition-detail.component.css']
})
export class PurchaseRequisitionDetailComponent implements OnInit {
  @ViewChild('quotation') quotation;
  public userProcurement = [];
  public userProcurementSelected = [];
  public supplierSelected = [];
  public allSuppliers = [];
  public dropdownSettingsSupplier = {};
  public dropdownSettingsUserProcurement = {};
  public data = [];
  public purchaseRequisition: any;
  public _id: any;
  public user: LoggedInUser;
  public roles = [];
  public subscription: any;
  public max: number = 5;
  public rate: number = 7;
  public isReadonly: boolean = true;
  public _status: string;
  public bbID: number;
  public proDetail: any;
  public quotationPritemId: any;
  public quotationData: any[];
  public supplierData;
  public logoSupplier: any;

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
    private _uploadFileService: UploadFileService,
    public _authenService: AuthenService) {
    this.purchaseRequisition = {};
    this.proDetail = {};
  }

  ngOnInit() {
    this.allSuppliers = [];
    this.userProcurement = [];
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.roles = JSON.parse(this.user.roles);
    this.loadData();
    if (this._authenService.checkAccess('ProcurementManager') === true) {
      this.getUser();
    }
    this.dropdownSettingsSupplier = {
      singleSelection: false,
      text: 'Select Supplier',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      selectionLimit: 1,
    };
    this.dropdownSettingsUserProcurement = {
      singleSelection: false,
      text: 'Select Procurement Staft',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      selectionLimit: 1,
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  bbbb(ccc: number) {
    this.bbID = ccc;
  }



  getProductDetail(id: any) {
    this.quotationData = [];
    let exist = this.purchaseRequisition.PurchaseRequisitionItems.findIndex(x => x.ID === id);
    if (exist > -1) {
      this.proDetail = {};
      this.proDetail = this.purchaseRequisition.PurchaseRequisitionItems[exist].Product;
    }

    this._dataService.get('/api/purchase-requisition/get-detail-item/' + id).subscribe(res => {
      this.quotationData = res;
    })

  }

  getSupplierDetail(id: any) {
    this._dataService.get('/api/supplier/get-view-popup/' + id).subscribe(res => {
      this.supplierData = res;
    })
  }


  loadData() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      this._id = param['id'];
      this._dataService.get('/api/purchase-requisition/get-detail/' + this._id + '?announcementId=')
        .subscribe(response => {
          this.purchaseRequisition = response;
          this.getSupplier();
        }, err => {
        });
    });

  }

  setStatus() {
    // if (this._status === StatusContstants.WAITING) {
    //   return { 'font-green-jungle': StatusContstants.WAITING };
    // } else if (this._status === StatusContstants.DRAFT) {
    //   return { 'font-brown': StatusContstants.DRAFT };
    // } else if (this._status === StatusContstants.APPROVED) {
    //   return { 'font-blue-steel': StatusContstants.APPROVED };
    // } else if (this._status === StatusContstants.DELETED) {
    //   return { 'font-red-mint': StatusContstants.DELETED };
    // } else if (this._status === StatusContstants.DENIED) {
    //   return { 'font-yellow-crusta': StatusContstants.DENIED };
    // } else {
    //   return { 'font-red-mint': StatusContstants.ERROR };
    // }
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



  // Deny cua PR
  denyPurchaseRequisition() {
    let data = {
      "ID": this.denyItem,
      "Status": 3,
      "ReasonForDeny": this.ReasonForDeny
    }
    this._dataService.put('/api/purchase-requisition/deny/', data).subscribe((response: Response) => {
      this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
      this._notificationService.printSuccessMessage(MessageContstants.DENIED_MSG + name + MessageContstants.SUCCESSFULLY_MSG);
      document.getElementById("close-modal-deny").click();
    });
  }

  setDenyItem(id) {
    // let index = this.purchaseRequisition.findIndex(element => element.ID === id);
    this.denyItem = id;
    // this.denyItem = Object.assign({}, this.purchaseRequisition[index]);
  }

  //Approve cua PR
  // approvePurchaseRequisition() {
  //   let data = {
  //     "ID": this.approveItem,
  //     "Status": 2,
  //     "ReasonForDeny": ""
  //   }
  //   this._dataService.put('/api/purchase-requisition/approve-deny/', data).subscribe((response: Response) => {
  //     this._notificationService.printSuccessMessage(MessageContstants.APPROVE_MSG + name + MessageContstants.SUCCESSFULLY_MSG);

  //     document.getElementById("close-modal-approve").click();
  //   });
  // }
  approvePurchaseRequisition(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_APPROVED_MSG + code + ' ?',
      () => this.approvePurchaseRequisitionConfirm(id, code));
  }


  approvePurchaseRequisitionConfirm(id: any, code: any) {
    this._dataService.get('/api/purchase-requisition/approve/' + id).subscribe((response: Response) => {
      this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
      this._notificationService.printSuccessMessage(MessageContstants.APPROVE_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
    });
  }

  // setApproveItem(id) {
  //   // let index = this.purchaseRequisition.findIndex(element => element.ID === id);
  //   this.approveItem = id;
  //   // this.denyItem = Object.assign({}, this.purchaseRequisition[index]);
  // }

  saveAsDraft() {
    this._dataService.get('/api/purchase-requisition/save-drafts/' + this._id)
      .subscribe((response: any) => {
        this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
        this._notificationService.printSuccessMessage(MessageContstants.SAVEASDRAFT_MSG + name + MessageContstants.SUCCESSFULLY_MSG);
      });
  }



  submitDraft() {
    this._dataService.get('/api/purchase-requisition/submit/' + this._id)
      .subscribe((response: any) => {
        this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
        this._notificationService.printSuccessMessage(MessageContstants.SUBMIT_MSG + name + MessageContstants.SUCCESSFULLY_MSG);
      });
  }

  deleteWaiting(id: any, code: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG + code + ' ?',
      () => this.deleteWaitingConfirm(id, code));
  }
  deleteWaitingConfirm(id: any, code: any) {
    this._dataService.get('/api/purchase-requisition/delete/' + id).subscribe((response: Response) => {
      this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_MSG + code + MessageContstants.SUCCESSFULLY_MSG);
    });
  }
  generateRFQ() {
    this._dataService.get('/api/purchase-requisition/generate-rfq/' + this._id)
      .subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_MSG +
          ' RFQ ' + name + MessageContstants.SUCCESSFULLY_MSG);
      });
  }
  downloadRFQ() {

    window.open(SystemConstants.BASE_API + '/api/purchase-requisition/download-rfq-file/' + this._id);
  }
  importQuotation() {
    let fi = this.quotation.nativeElement;
    if (fi.files.length > 0) {
      this._uploadFileService.importQuotation('/api/quotation/import/' + this.purchaseRequisition.ID,
        null, fi.files).then((fileUrl: string) => {
          this._notificationService.printSuccessMessage('Import ' + MessageContstants.SUCCESSFULLY_MSG);
        });
    } else {
      this._notificationService.printErrorMessage('Please import quotation!');
    }
  }
  sendEmail() {

    let email = [];
    for (let supplier of this.supplierSelected) {
      email.push(supplier.Email);
    }
    this._dataService.put('/api/purchase-requisition/send-email/', email).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage('Send mail ' + MessageContstants.SUCCESSFULLY_MSG);
      document.getElementById('close-modal-sendMail').click();
    });

  }
  getSupplier() {
    for (let prItems of this.purchaseRequisition.PurchaseRequisitionItems) {
      let products: any = prItems.Product;
      for (let suppliers of products.Suppliers) {
        this.allSuppliers.push({
          Code: suppliers.Code,
          id: suppliers.ID,
          Logo: suppliers.Logo,
          Name: suppliers.Name,
          Email: suppliers.Email
        });
      }
    }
  }
  assignPR() {
    let userId = this.userProcurementSelected[0].id;
    let userName = this.userProcurementSelected[0].Name;
    this._dataService.get('/api/purchase-requisition/assign/' + this._id + '?userRespondId=' + userId)
      .subscribe((response) => {
        this._notificationService.printSuccessMessage('Assign ' + userName + MessageContstants.SUCCESSFULLY_MSG);
        document.getElementById('close-modal-assign').click();
      });
  }
  getUser() {
    this._dataService.get('/api/user/get-user-procstaff')
      .subscribe((response: any) => {
        let users = response;
        this.userProcurement = [];
        for (let user of users) {
          this.userProcurement.push({
            id: user.UserId,
            Name: user.FirstName + ' ' + user.LastName
          });
        }
      });
  }
}
