import { Component, OnInit, AfterViewChecked, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { UrlConstants } from '../../../core/common/url.constants';
import { DataService } from '../../../core/services/data.service';
import { UploadFileService } from '../../../core/services/upload-file.service';
import { ProductIndexComponent } from '../product-index/product-index.component';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { StatusContstants } from '../../../core/common/status.constants';
import { UnitConstant } from '../../../core/common/others.constants';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('imageProduct') imageProduct;
  public product: any = {};
  public type = 'product';
  public image: any;
  public idProperty = 99999;
  public allUnit = [];
  public property = [];
  public propertyFull = [];
  public propertyFullDup = [];
  public _id: any;
  public subscription: any;
  public productCategories = [];
  public productSuppliers = [];
  public productPropertiesGroup = [];
  public productProperty = [];
  public productPropertyInfo = [];
  public allCategories = [];
  public allSuppliers = [];
  public allPropertiesGroup = [];
  public dropdownSettingsSupplier = {};
  public dropdownSettingsCategory = {};
  public dropdownSettingsPropertiesGroup = {};
  public dropdownSettingsUnit = {};
  public propertyForm: FormGroup;
  constructor(private _dataService: DataService,
    private productIndexComponent: ProductIndexComponent,
    private _notificationService: NotificationService,
    private router: Router, private _uploadFileService: UploadFileService,
    private activatedRoute: ActivatedRoute, private _fb: FormBuilder) {

  }

  ngOnInit() {
    this.image = {};
    this.loadUnit();
    this.loadData();

    this.loadCategories();
    this.loadSupplier();
    this.loadPropertiesGroup();
    this.propertyForm = this._fb.group({
      propertyName: ['', Validators.required],
      propertyValue: ['', Validators.required],
      propertyUnit: ['', Validators.required]
    });
    this.dropdownSettingsSupplier = {
      singleSelection: false,
      text: 'Select Supplier',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.dropdownSettingsCategory = {
      singleSelection: true,
      text: 'Select Category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.dropdownSettingsPropertiesGroup = {
      singleSelection: true,
      text: 'Select Properties',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.dropdownSettingsUnit = {
      singleSelection: true,
      text: 'Select Unit',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }
  editProperty(id: any) {

    let exist = this.propertyFull.map(function (x) { return x.PropertiesID; }).indexOf(id);
    let property = this.propertyFull[exist];
    if (exist > -1) {
      this.property = [{
        PropertiesID: property.PropertiesID,

        Name: property.Property.Name,

        Value: property.Value,
        Unit: property.Unit,
      }];
    }
  }
  removeProperty(id: any) {
    let exist = this.propertyFull.map(function (x) { return x.PropertiesID; }).indexOf(id);
    if (exist > -1) {
      this.propertyFull.splice(exist, 1);
    }
  }
  saveProperty(id: any) {
    // if (id) {
    let exist = this.propertyFull.map(function (x) { return x.PropertiesID; }).indexOf(id);
    if (exist > -1) {
      this.propertyFull.splice(exist, 1);
    } else {
      this.propertyFullDup.push({
        PropertiesID: this.property[0].PropertiesID,
        Property: {
          Name: this.property[0].Name,
        },
        Value: this.property[0].Value,
        Unit: this.property[0].Unit,
      });
    }
    // }
    this.propertyFull.unshift({
      PropertiesID: this.property[0].PropertiesID,
      Property: {
        Name: this.property[0].Name,
      },
      Value: this.property[0].Value,
      Unit: this.property[0].Unit,
    });
    this.property = [{
      Name: '',
      Value: '',
      Unit: '',
    }];
    this.addProperty();
  }
  addProperty() {
    this.idProperty++;
    this.property = [{
      PropertiesID: this.idProperty,
      Name: '',
      Value: '',
      Unit: '',
    }];
  }

  loadUnit() {
    this.allUnit = UnitConstant.Unit;
  }
  loadCategories() {
    this._dataService.get('/api/category/get-all')
      .subscribe((response: any[]) => {
        this.allCategories = [];
        for (let category of response) {
          this.allCategories.push({ id: category.ID, itemName: category.Name });
        }
      }, error => this._dataService.handleError(error));
  }
  loadSupplier() {
    this._dataService.get('/api/supplier/get-all')
      .subscribe((response: any[]) => {
        this.allSuppliers = [];
        for (let supplier of response) {
          this.allSuppliers.push({ id: supplier.ID, itemName: supplier.Name });
        }
      }, error => this._dataService.handleError(error));
  }

  loadPropertiesGroup() {
    this._dataService.get('/api/properties-group/get-all')
      .subscribe((response: any[]) => {
        this.allPropertiesGroup = [];
        for (let properties of response) {
          this.allPropertiesGroup.push({
            id: properties.ID,
            itemName: properties.Name,
            Property: properties.Properties
          });

        }
      }, error => this._dataService.handleError(error));
  }
  loadData() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      this._id = param['id'];
      this._dataService.get('/api/product/get-detail/' + this._id)
        .subscribe(response => {
          this.product = response;
          console.log(this.product);
          for (let supplier of this.product.Suppliers) {
            this.productSuppliers.push({ id: supplier.ID, itemName: supplier.Name });
          }

          this.productCategories.push({ id: this.product.Category.ID, itemName: this.product.Category.Name });

          for (let propertyDetail of this.product.PropertiesDetails) {
            console.log(propertyDetail);
            this.productProperty.push({

              ID: propertyDetail.Property.ID,
              Name: propertyDetail.Property.Name,
              Value: propertyDetail.Value,
              Unit: propertyDetail.Unit


            });
          }
          for (let property of this.productProperty) {
            this.propertyFull.push({
              PropertiesID: property.ID,
              Property: {
                Name: property.Name,
              },
              Value: property.Value,
              Unit: property.Unit,
            });
          }
          // this.productPropertiesGroup.push({
          //   id: 1,
          //   Name: 'IT Product',
          //   Property: this.productProperty

          // });

          console.log(this.productPropertiesGroup);

        }, err => {
          console.log(err);
        });
    });

  }
  saveChange(valid: boolean) {
    if (valid) {
      let fi = this.imageProduct.nativeElement;
      if (fi.files.length > 0) {
        console.log(fi.files);
        this._uploadFileService.postWithImage('/api/upload/saveImage?type=' + this.type, null, fi.files).then((imageUrl: string) => {
          this.product.Image = imageUrl;
        }).then(() => {
          this.saveData();
        });
      } else {
        this.saveData();
      }
    }
  }
  saveData() {
    console.log(this.propertyFull);
    if (this.propertyFullDup.length > 0) {
      for (let propertyDup of this.propertyFullDup) {
        let exist = this.propertyFull.map(function (x) { return x.PropertiesID; }).indexOf(propertyDup.PropertiesID);
        if (exist > -1) {
          this.propertyFull[exist].PropertiesID = -1;
        }
      }
    }
    for (let property of this.propertyFull) {
      console.log(property);
      this.productPropertyInfo.push({
        PropertiesID: property.PropertiesID,
        Value: property.Value,
        Unit: property.Unit,
        Property: {
          ID: property.Property.PropertiesID,
          Name: property.Property.Name
        }
      });
      console.log(this.productPropertyInfo);
    }
    // for (let propertyInfo of this.productPropertyInfo) {
    //   let exist = this.propertyFull.map(function (x) { return x.PropertiesID; }).indexOf(propertyInfo.PropertiesID);
    //   let property = this.propertyFull[exist];
    //   if (exist > -1) {
    //     propertyInfo = property;
    //   }
    // }

    this.product.Status = StatusContstants.MOT;
    this.product.CategoryID = this.productCategories[0].id;
    this.product.Suppliers = this.productSuppliers;
    this.product.PropertiesDetails = this.productPropertyInfo;
    console.log(this.product);
    if (this.product.ID !== undefined) {
      this._dataService.put('/api/product/update', JSON.stringify(this.product))
        .subscribe((response: any) => {
          console.log(response);
          console.log(this.product);
          // this.productIndexComponent.loadData();
          // this.router.navigate([UrlConstants.PRODUCT]);
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_MSG + this.product.Name
            + MessageContstants.SUCCESSFULLY_MSG);
        }, error => this._dataService.handleError(error));
    }
  }
}
