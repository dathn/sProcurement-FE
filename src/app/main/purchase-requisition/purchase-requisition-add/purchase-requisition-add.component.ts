import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { PurchaseRequisitionIndexComponent } from '../purchase-requisition-index/purchase-requisition-index.component';
import { TabsetComponent } from 'ngx-bootstrap';
import { LoggedInUser } from '../../../core/domain/loggedin.user';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { StatusContstants } from '../../../core/common/status.constants';
import { UrlConstants } from '../../../core/common/url.constants';
import { DataService } from '../../../core/services/data.service';
import { SystemConstants } from '../../../core/common/system.constants';
import { Router } from '@angular/router';
import { RequestProduct } from '../../../core/domain/requisition.product';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DeliveryAddressConstant } from '../../../core/common/others.constants';
@Component({
  selector: 'app-purchase-requisition-add',
  templateUrl: './purchase-requisition-add.component.html',
  styleUrls: ['./purchase-requisition-add.component.css']
})
export class PurchaseRequisitionAddComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  public entity: any;
  public today;
  public user: LoggedInUser;
  public selected: any;
  public products = [];
  public productSelected: RequestProduct[];
  public productSelectedFull = [];
  public rowData = [];
  public copyProductsFull = [];
  // childForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dropdownSettingsDeliveryAddress = {};
  public copyProducts = [];
  minDate: Date;
  public allDeliveryAddress = [];
  public dropdownSettingsProduct = {};
  public mainForm: FormGroup;
  public productForm: FormGroup;
  constructor(private _dataService: DataService,
    private router: Router, private _notificationService: NotificationService,
    public datepipe: DatePipe, private _fb: FormBuilder, public _address: DeliveryAddressConstant) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  ngOnInit() {
    this.entity = {};

    this.today = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.entity.Requester = this.user.Lastname + ' ' + this.user.Firstname;
    this.entity.Email = this.user.email;
    // console.log(this.entity.UserName);
    this.loadProduct();
    this.loadDeliveryAddress();
    this.dropdownSettingsDeliveryAddress = {
      singleSelection: true,
      text: 'Delivery Address',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.generateCode();
    this.mainForm = this._fb.group({
      prName: ['', Validators.required],
      prRequest: [''],
      prApprover: [''],
      prDescription: [''],
      prNoteForApprover: [''],
      prNoteForSupplier: ['']
    });
    this.productForm = this._fb.group({
      productName: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
      productQuantity: ['', [<any>Validators.required, <any>Validators.min(1)]],
      // productUnit: ['', Validators.required],
      productDate: ['', Validators.required],
      productAddress: ['', Validators.required]
    });

    // console.log(this.mainForm);
  }
  addProduct() {
    this.productSelected = [{
      ProductID: null,
      ProductName: '',
      ProductCode: '',
      Quantity: null,
      Unit: '',
      DeliveryDate: '',
      DeliveryAddress: '',
      Status: null
    }];
    // console.log(this.productSelected);
  }
  editProduct(id: any) {

    let exist = this.productSelectedFull.map(function (x) { return x.ProductID; }).indexOf(id);
    let product = this.productSelectedFull[exist];
    if (exist > -1) {
      this.productSelected = [{
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        ProductCode: product.ProductCode,
        Quantity: product.Quantity,
        Unit: product.Unit,
        DeliveryDate: product.DeliveryDate,
        DeliveryAddress: product.DeliveryAddress,
        Status: product.Status,
      }];
    }
  }
  removeProduct(id: any) {
    let exist = this.productSelectedFull.map(function (x) { return x.ProductID; }).indexOf(id);
    if (exist > -1) {
      this.productSelectedFull.splice(exist, 1);
    }
    let products = this.products;
    let recover = products.map(function (x) { return x.id; }).indexOf(id);
    if (recover > -1) {
      this.copyProducts.push({
        id: products[recover].id, Name: products[recover].Name, Code: products[recover].Code,
        Unit: products[recover].Unit, Status: products[recover].Status
      });
    }
  }
  loadDeliveryAddress() {
    this.allDeliveryAddress = DeliveryAddressConstant.WAREHOUSE;
  }
  loadProduct() {
    this._dataService.get('/api/product/get-all')
      .subscribe((response: any[]) => {
        this.products = [];
        for (let product of response) {
          this.products.push({
            id: product.ID, Name: product.Name, Code: product.Code,
            Unit: product.Unit, Status: product.Status
          });
        }
        this.copyProducts = Object.assign([], this.products);
        // console.log('copy ' + this.copyProducts);
      }, error => this._dataService.handleError(error));
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {

    this.productSelected = [{
      ProductID: e.item.id,
      ProductName: e.item.Name,
      ProductCode: e.item.Code,
      Quantity: null,
      Unit: e.item.Unit,
      DeliveryDate: '',
      DeliveryAddress: '',
      Status: e.item.Status
    }];
    // console.log(this.selected);
    // let exist = this.copyProducts.indexOf(66);
    // this.copyProducts.splice(exist, 1);
    // console.log('Slected' + this.productSelected);
    // console.log('Selected value: ', e.item);
  }
  generateCode() {
    this._dataService.get('/api/purchase-requisition/generate-code')
      .subscribe((response: any) => {
        this.entity.Code = response;
        // console.log(response.Items);
      });
  }
  saveProduct(id: any) {
    if (id) {
      let exist = this.productSelectedFull.map(function (x) { return x.ProductID; }).indexOf(id);
      if (exist > -1) {
        this.productSelectedFull.splice(exist, 1);
      }
    }

    this.productSelectedFull.unshift({
      ProductID: this.productSelected[0].ProductID,
      ProductName: this.productSelected[0].ProductName,
      ProductCode: this.productSelected[0].ProductCode,
      Quantity: this.productSelected[0].Quantity,
      Unit: this.productSelected[0].Unit,
      DeliveryDate: this.productSelected[0].DeliveryDate,
      DeliveryAddress: this.productSelected[0].DeliveryAddress,
      Status: this.productSelected[0].Status
    });
    this.productSelected = [{
      ProductID: null,
      ProductName: '',
      ProductCode: '',
      Quantity: null,
      Unit: '',
      DeliveryDate: '',
      DeliveryAddress: '',
      Status: null
    }];
    // console.log('Selected' + this.productSelected);
    this.addProduct();
    // console.log('copy: ' + this.copyProducts);
    let deleteProduct = this.copyProducts.map(function (x) { return x.id; }).indexOf(id);
    if (deleteProduct > -1) {
      this.copyProducts.splice(deleteProduct, 1);
    }
    // console.log('Selected' + this.productSelected);
  }
  saveDraft(valid: boolean) {
    if (valid) {
      if (this.productSelectedFull.length !== 0) {
        this.entity.Status = StatusContstants.BON;
        this.entity.PurchaseRequisitionItems = this.productSelectedFull;
      } else {
        this.entity.Status = StatusContstants.BON;
        this.entity.PurchaseRequisitionItems = [];
      }
      this.entity.DateCreated = this.today;
      if (this.entity.Id === undefined) {
        this._dataService.post('/api/purchase-requisition/create', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_MSG + this.entity.Code
              + MessageContstants.SUCCESSFULLY_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }
  saveChange(valid: boolean) {
    if (valid) {
      if (this.productSelectedFull.length !== 0) {
        this.entity.Status = StatusContstants.MOT;
        this.entity.PurchaseRequisitionItems = this.productSelectedFull;
      } else {
        this.entity.Status = StatusContstants.BON;
        this.entity.PurchaseRequisitionItems = [];
      }

      // console.log(' GO ' + this.productSelected);
      this.entity.DateCreated = this.today;
      // console.log(this.selected);
      // console.log(this.entity);
      if (this.entity.Id === undefined) {
        this._dataService.post('/api/purchase-requisition/create', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            // console.log(response);
            // console.log(this.entity);
            // this.PurchaseRequisitionComponent.loadData();
            this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_MSG + this.entity.Code
              + MessageContstants.SUCCESSFULLY_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }

}
