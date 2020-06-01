import { Component, OnInit, AfterViewChecked, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConstants } from '../../../core/common/url.constants';
import { DataService } from '../../../core/services/data.service';
import { UploadFileService } from '../../../core/services/upload-file.service';
import { SupplierIndexComponent } from '../supplier-index/supplier-index.component';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { StatusContstants } from '../../../core/common/status.constants';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
  @ViewChild('logoSupplier') logoSupplier;
  public supplier: any;
  public type = 'supplier';
  public _id: any;
  public subscription: any;

  constructor(private _dataService: DataService,
    private supplierIndexComponent: SupplierIndexComponent, private _notificationService: NotificationService,
    private router: Router, private _uploadFileService: UploadFileService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
    this.supplier = {};
  }

  loadData() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      this._id = param['id'];
      this._dataService.get('/api/supplier/get-detail/' + this._id)
        .subscribe(response => {
          this.supplier = response;
        }, err => {
        });
    });
  }

  saveChange(valid: boolean) {
    if (valid) {
      let fi = this.logoSupplier.nativeElement;
      if (fi.files.length > 0) {
        this._uploadFileService.postWithImage('/api/upload/saveImage?type=' + this.type, null, fi.files).then((logoUrl: string) => {
          this.supplier.Logo = logoUrl;
        }).then(() => {
          this.saveData();
        });
      } else {
        this.saveData();
      }
    }
  }

  saveData() {
    this.supplier.Status = StatusContstants.MOT;
    if (this.supplier.ID !== undefined) {
      this._dataService.put('/api/supplier/update', JSON.stringify(this.supplier))
        .subscribe((response: any) => {
          this.supplierIndexComponent.loadData();
          this.router.navigate([UrlConstants.SUPPLIER]);
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_MSG + this.supplier.Name
            + MessageContstants.SUCCESSFULLY_MSG);
        }, error => this._dataService.handleError(error));
    }
  }


}
