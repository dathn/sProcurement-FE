import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../../../core/common/url.constants';
import { MessageContstants } from '../../../core/common/message.constants';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
@Component({
  selector: 'app-purchase-order-add',
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.css']
})
export class PurchaseOrderAddComponent implements OnInit {
  public entity: any;
  public prDetail = [];
  public prDetailFull = [];
  public totalAmount: number;
  public quotation: any;
  public quotationItems = [];
  public allPOItems = [];
  public allPurchaseRequisition = [];
  public selectedPurchaseRequisition = [];
  public allSupplierOfQuotation = [];
  public selectedSupplierOfQuotation = [];
  public dropdownSettingsPR = {};
  public dropdownSettingsSOQ = {};
  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.entity = {};
    this.totalAmount = 0;
    this.getPR();
    this.genCode();
    this.dropdownSettingsPR = {
      singleSelection: true,
      text: 'Purchase Requisition',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.dropdownSettingsSOQ = {
      singleSelection: true,
      text: 'Supplier',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }
  genCode() {
    this._dataService.get('/api/purchase-order/generate-code').subscribe((codeApi) => {
      this.entity.Code = codeApi;
    });
  }
  getPR() {
    this._dataService.get('/api/purchase-requisition/get-all').subscribe((prApi: any[]) => {
      for (let pr of prApi) {
        this.allPurchaseRequisition.push({
          id: pr.ID,
          Name: pr.Name
        });
      }
    });
  }
  getPRDetail() {
    let id = this.selectedPurchaseRequisition[0].id;
    this._dataService.get('/api/purchase-requisition/get-to-order/' + id).subscribe((prDetailApi) => {
      console.log('detail ' + prDetailApi);

      this.prDetail = prDetailApi.PurchaseRequisitionItems;
      this.prDetailFull = Object.assign([], this.prDetail);
    });
  }
  getSupplierOfQuotation() {
    let id = this.selectedPurchaseRequisition[0].id;
    this._dataService.get('/api/supplier/get-by-prid/' + id).subscribe((supplierQ: any) => {
      for (let supplier of supplierQ) {
        this.allSupplierOfQuotation.push({
          id: supplier.ID,
          Name: supplier.Name,
        });
      }
    });
  }
  getQuotation() {
    let idPR = this.selectedPurchaseRequisition[0].id;
    let idSOQ = this.selectedSupplierOfQuotation[0].id;
    this._dataService.get('/api/quotation/get-by-supplierid-prid/' + idSOQ + '/' + idPR).subscribe((quotationApi: any) => {
      this.quotation = quotationApi;
      this.quotationItems = [] = Object.assign([], this.quotation.QuotationItems);
      for (let i = 0; i < this.prDetail.length; i++) {
        let exist = this.quotationItems.map(function (x) { return x.PurchaseRequisitionItemID; }).indexOf(this.prDetail[i].ID);
        if (exist > -1) {
          this.prDetail[i].AmountPerItem = this.quotationItems[exist].AmountPerItem;
          this.prDetail[i].Currency = this.quotation.Currency;
          this.totalAmount = this.totalAmount + (this.prDetail[i].AmountPerItem * this.prDetail[i].Quantity);
        }
      }
      console.log(this.prDetail);
    });
  }
  onItemSelectPR(item: any) {
    this.allSupplierOfQuotation = [];
    this.selectedSupplierOfQuotation = [];
    this.prDetail = [];
    this.quotation = {};
    this.quotationItems = [];
    this.totalAmount = 0;
    this.getPRDetail();
    this.getSupplierOfQuotation();
  }
  OnItemDeSelectPR(item: any) {
    this.selectedPurchaseRequisition = [];
    this.allSupplierOfQuotation = [];
    this.prDetail = [];
    this.quotation = {};
    this.quotationItems = [];
    this.totalAmount = 0;
    this.dropdownSettingsSOQ = {
      singleSelection: true,
      text: 'Supplier',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }
  onItemSelectSOQ(item: any) {
    this.prDetail = Object.assign([], this.prDetailFull);
    this.quotation = {};
    this.quotationItems = [];
    this.getQuotation();
  }
  OnItemDeSelectSOQ(item: any) {
    this.totalAmount = 0;
    // this.selectedSupplierOfQuotation = [];
    this.prDetail = Object.assign([], this.prDetailFull);
    this.quotation = {};
    this.quotationItems = [];
    this.dropdownSettingsSOQ = {
      singleSelection: true,
      text: 'Supplier',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }
  saveChange(valid: boolean) {
    for (let poItem of this.quotationItems) {
      this.allPOItems.push({
        ID: poItem.ID,
        // PurchaseOrderID: this.entity.ID,
        PurchaseRequisitionItemID: poItem.PurchaseRequisitionItemID,
        QuotationItemID: this.quotation.ID,
        ProductID: poItem.ProductID,
        // Description: poItem.Description,
        AmountPerItem: poItem.AmountPerItem,
        DeliveryDate: poItem.DeliveryDate
      });
    }
    for (let i = 0; i < this.allPOItems.length; i++) {
      let exist = this.prDetail.map(function (x) { return x.ProductID; }).indexOf(this.allPOItems[i].ProductID);
      if (exist > -1) {
        this.allPOItems[i].DeliveryDate = this.prDetail[exist].DeliveryDate;
      }
    }
    this.entity.PurchaseRequisitionID = this.selectedPurchaseRequisition[0].id;
    this.entity.QuotationID = this.quotation.ID;
    this.entity.SupplierID = this.quotation.SupplierID;
    // this.entity.ContractID = this.quotation.ContractID;
    this.entity.TotalAmout = this.totalAmount;
    this.entity.Currency = this.quotation.Currency;
    this.entity.Status = 1;
    this.entity.PurchaseOrderItems = this.allPOItems;
    // console.log(this.entity);
    if (this.entity.Id === undefined) {
      this._dataService.post('/api/purchase-order/create', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          // this.PurchaseRequisitionComponent.loadData();
          this.router.navigate([UrlConstants.PURCHASEORDER]);
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_MSG + this.entity.Code
            + MessageContstants.SUCCESSFULLY_MSG);
        }, error => this._dataService.handleError(error));
    }
  }
}
