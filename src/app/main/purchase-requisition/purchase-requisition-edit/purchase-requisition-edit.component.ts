import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { PurchaseRequisitionComponent } from '../purchase-requisition.component';
import { TabsetComponent } from 'ngx-bootstrap';
import { LoggedInUser } from '../../../core/domain/loggedin.user';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { StatusContstants } from '../../../core/common/status.constants';
import { UrlConstants } from '../../../core/common/url.constants';
import { DataService } from '../../../core/services/data.service';
import { SystemConstants } from '../../../core/common/system.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestProduct } from '../../../core/domain/requisition.product';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DeliveryAddressConstant } from '../../../core/common/others.constants';
@Component({
  selector: 'app-purchase-requisition-edit',
  templateUrl: './purchase-requisition-edit.component.html',
  styleUrls: ['./purchase-requisition-edit.component.css']
})
export class PurchaseRequisitionEditComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  public entity: any;
  public today;
  public _id: any;
  public user: LoggedInUser;
  public subscription: any;
  public selected: any;
  public products = [];
  public productSelected: RequestProduct[];
  public productSelectedFull = [];
  public pushProduct = [];
  public rowData = [];
  public copyProductsFull = [];
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
  constructor(private _dataService: DataService, private activatedRoute: ActivatedRoute,
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
    this.loadData();

    this.loadProduct();
    this.getListProduct();
    this.loadDeliveryAddress();
    this.dropdownSettingsDeliveryAddress = {
      singleSelection: true,
      text: 'Delivery Address',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.mainForm = this._fb.group({
      prID: [this.entity.ID, Validators.required],
      prName: [this.entity.Name, Validators.required],
      prRequest: [this.entity.ReasonForRequest],
      prApprover: [this.entity.Approver],
      prDescription: [this.entity.Description],
      prNoteForApprover: [this.entity.NoteForApprover],
      prNoteForSupplier: [this.entity.NoteForSupplier]
    });
    this.productForm = this._fb.group({
      productName: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
      productQuantity: ['', [<any>Validators.required, <any>Validators.min(1)]],
      productUnit: ['', Validators.required],
      productDate: ['', Validators.required],
      productAddress: ['', Validators.required]
    });
    // console.log('1 ' + JSON.stringify(this.entity));
    // console.log(this.mainForm);

  }
  loadData() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      this._id = param['id'];
      this._dataService.get('/api/purchase-requisition/get-detail/' + this._id + '?announcementId=')
        .subscribe(response => {
          this.entity = response;
          // console.log('response ' + response);
          // console.log('entity ' + this.entity);
          this.productSelectedFull = Object.assign([], this.entity.PurchaseRequisitionItems);
          // console.log('2' + this.entity);
          this.getListProduct();
        }, err => {
          console.log(err);
        });
    });

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
        this.copyProducts = this.products;
        // console.log('3' + this.productSelectedFull);
        this.getListProduct();
      }, error => this._dataService.handleError(error));
  }
  getListProduct() {
    for (let remove of this.productSelectedFull) {
      let exist = this.copyProducts.map(function (x) { return x.id; }).indexOf(remove.ProductID);
      if (exist > -1) {
        this.copyProducts.splice(exist, 1);
      }
    }
    // console.log('copy ' + this.copyProducts);
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
        Unit: product.Product.Unit,
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
    this.allDeliveryAddress = [];
    console.log(this._address);
    this.allDeliveryAddress.push(
      {
        Name: 'FPT Innovation, QuangTrung SQCT, 12 District, Ho Chi Minh',

      },
      {
        Name: 'Bitexco Financial Tower, 2 Hai Trieu Street, 1 District, Ho Chi Minh',

      },
      {
        Name: 'Warehouse 3, 415 Nguyen Thi Thap, 7 District, Ho Chi Minh',

      },
    );

    console.log(this.allDeliveryAddress);
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
  saveProduct(id: any) {
    if (id) {
      let exist = this.productSelectedFull.map(function (x) { return x.ProductID; }).indexOf(id);
      if (exist > -1) {
        this.productSelectedFull.splice(exist, 1);
      }
    }
    let getProduct = this.products.map(function (x) { return x.id; }).indexOf(id);
    if (getProduct > -1) {
      this._dataService.get('/api/product/get-detail/' + id)
        .subscribe((response: any[]) => {
          this.pushProduct = [];

          this.pushProduct = response;

          console.log('abcdefg... ' + JSON.stringify(response));
        }, error => this._dataService.handleError(error));
    }
    // console.log(this.pushProduct);
    this.productSelectedFull.unshift({
      PurchaseRequisitionID: this.entity.ID,
      ProductID: this.productSelected[0].ProductID,
      ProductName: this.productSelected[0].ProductName,
      ProductCode: this.productSelected[0].ProductCode,
      Quantity: this.productSelected[0].Quantity,
      DeliveryDate: this.productSelected[0].DeliveryDate,
      DeliveryAddress: this.productSelected[0].DeliveryAddress,
      Status: this.productSelected[0].Status,
      Product: {
        Unit: this.productSelected[0].Unit
      }
    });
    console.log(this.productSelectedFull);
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
    console.log('Selected' + this.productSelected);
    this.addProduct();
    console.log('copy: ' + this.copyProducts);
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
        this._dataService.put('/api/purchase-requisition/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_MSG + this.entity.Code
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
      // this.productSelected = this._addProductService.getProduct();
      this.entity.DateCreated = this.today;
      // console.log(this.selected);
      // console.log(this.entity);
      if (this.entity.Id === undefined) {
        this._dataService.put('/api/purchase-requisition/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            // console.log(response);
            // console.log(this.entity);
            // this.PurchaseRequisitionComponent.loadData();
            this.router.navigate([UrlConstants.PURCHASEREQUISITION]);
            this._notificationService.printSuccessMessage(MessageContstants.UPDATED_MSG + this.entity.Code
              + MessageContstants.SUCCESSFULLY_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }

}
