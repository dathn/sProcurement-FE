import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductAddComponent implements OnInit {
  @ViewChild('imageProduct') imageProduct;
  public entity: any;
  public type = 'product';
  public image: any;
  public idProperty = 99999;
  public allUnit = [];
  public property = [];
  public propertyFull = [];
  public productCategories = [];
  public productSuppliers = [];
  public productPropertiesGroup = [];
  public productProperty = [];
  public allCategories = [];
  public allSuppliers = [];
  public allPropertiesGroup = [];
  public dropdownSettingsSupplier = {};
  public dropdownSettingsCategory = {};
  public dropdownSettingsPropertiesGroup = {};
  public dropdownSettingsUnit = {};
  public propertyForm: FormGroup;
  constructor(private _dataService: DataService,
    private productIndexComponent: ProductIndexComponent, private _notificationService: NotificationService,
    private router: Router, private _uploadFileService: UploadFileService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.entity = {};
    this.image = {};
    this.genCode();
    this.loadUnit();
    this.loadCategories();
    this.loadSupplier();
    this.loadPropertiesGroup();
    let valueInput = this._fb.control('', [Validators.required]);
    let unitInput = this._fb.control({ value: '', disabled: !valueInput.valid });
    this.propertyForm = this._fb.group({
      propertyName: ['', Validators.required],
      propertyValue: valueInput,
      propertyUnit: unitInput
    });
    valueInput.statusChanges.subscribe((newStatus) => {
      if (valueInput.valid) {
        unitInput.enable();
      } else {
        unitInput.disable();
      }
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
  // onItemSelect(item: any) {
  //   console.log(item);
  //   console.log(this.productSuppliers);
  // }
  // OnItemDeSelect(item: any) {
  //   console.log(item);
  //   console.log(this.productSuppliers);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }
  // onDeSelectAll(items: any) {
  //   console.log(items);
  // }
  genCode() {
    this._dataService.get('/api/product/generate-code').subscribe((response) => {
      this.entity.Code = response;
    });
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
    if (id) {
      let exist = this.propertyFull.map(function (x) { return x.PropertiesID; }).indexOf(id);
      if (exist > -1) {
        this.propertyFull.splice(exist, 1);
      }
    }
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
        // console.log(response);
        for (let properties of response) {
          this.allPropertiesGroup.push({
            id: properties.ID,
            itemName: properties.Name,
            Property: properties.Properties
          });

          console.log(this.allPropertiesGroup);
        }
      }, error => this._dataService.handleError(error));
  }
  // onChangeSupplier() {
  //   for (let property of this.productSuppliers) {
  //     console.log(property);
  //   }
  // }
  // onChange() {
  //   for (let property of this.productPropertiesGroup) {
  //     console.log(property);
  //   }
  // }
  // showValue() {
  //   console.log(this.productPropertiesGroup);
  // }
  // showUnit() {
  //   console.log(this.productProperty);
  // }
  saveChange(valid: boolean) {
    if (valid) {
      let fi = this.imageProduct.nativeElement;
      if (fi.files.length > 0) {
        console.log(fi.files);
        this._uploadFileService.postWithImage('/api/upload/saveImage?type=' + this.type, null, fi.files).then((imageUrl: string) => {
          this.entity.Image = imageUrl;
        }).then(() => {
          this.saveData();
        });
      } else {
        this.saveData();
      }
    }
  }
  saveData() {
    for (let property of this.productPropertiesGroup) {
      console.log(property);
      for (let propertyDetail of property.Property) {
        console.log(propertyDetail);
        this.productProperty.push({
          PropertiesID: propertyDetail.ID,
          Value: propertyDetail.Value,
          Unit: propertyDetail.Unit
        });
      }

    }

    if (this.propertyFull.length > 0) {
      for (let i = 0; i < this.propertyFull.length; i++) {
        this.propertyFull[i].PropertiesID = -1;
        this.productProperty.push(this.propertyFull[i]);
      }

    }
    this.entity.Status = StatusContstants.MOT;
    this.entity.CategoryID = this.productCategories[0].id;
    // for (let supplier of this.productSuppliers) {
    //   this.entity.Suppliers.push({
    //     id: supplier.id,
    //     Name: supplier.itemName
    //   });
    // }
    this.entity.Suppliers = this.productSuppliers;
    this.entity.PropertiesDetails = this.productProperty;
    console.log(this.entity);
    if (this.entity.Id === undefined) {
      this._dataService.post('/api/product/create', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          console.log(response);
          console.log(this.entity);
          this.productIndexComponent.loadData();
          // this.router.navigate([UrlConstants.PRODUCT]);
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_MSG + this.entity.Name
            + MessageContstants.SUCCESSFULLY_MSG);
        }, error => this._dataService.handleError(error));
    }
  }

}
