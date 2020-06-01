import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../../../core/common/url.constants';
import { DataService } from '../../../core/services/data.service';
import { UploadFileService } from '../../../core/services/upload-file.service';
import { SupplierIndexComponent } from '../supplier-index/supplier-index.component';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { StatusContstants } from '../../../core/common/status.constants';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class SupplierAddComponent implements OnInit {
  @ViewChild('logoSupplier') logoSupplier;
  public entity: any;
  public type = 'supplier';
  public bankAccounts = [];
  public products = [];
  constructor(private _dataService: DataService,
    private supplierIndexComponent: SupplierIndexComponent, private _notificationService: NotificationService,
    private router: Router, private _uploadFileService: UploadFileService) { }

  ngOnInit() {
    this.entity = {};
  }

  saveChange(valid: boolean) {
    if (valid) {
      let fi = this.logoSupplier.nativeElement;
      if (fi.files.length > 0) {
        console.log(fi.files);
        this._uploadFileService.postWithImage('/api/upload/saveImage?type=' + this.type, null, fi.files).then((logoUrl: string) => {
          this.entity.Logo = logoUrl;
        }).then(() => {
          this.saveData();
        });
      } else {
        this.saveData();
      }
    }
  }

  saveData() {
    this.entity.Status = StatusContstants.MOT;
    console.log(this.entity);
    this.entity.BankAccounts = this.bankAccounts;
    this.entity.Products = this.products;
    if (this.entity.Id === undefined) {
      this._dataService.post('/api/supplier/create', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          console.log(response);
          console.log(this.entity);
          this.supplierIndexComponent.loadData();
          this.router.navigate([UrlConstants.SUPPLIER]);
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_MSG + this.entity.Name
            + MessageContstants.SUCCESSFULLY_MSG);
        }, error => this._dataService.handleError(error));
    }
  }

}
