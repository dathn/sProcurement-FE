import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierRouter} from './supplier.routes';
import { DataService } from '../../core/services/data.service';
import { AuthenService } from '../../core/services/authen.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { UploadFileService } from '../../core/services/upload-file.service';
import { StatusContstants } from '../../core/common/status.constants';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { PaginationModule } from 'ngx-bootstrap';
import { MatTooltipModule, MatExpansionModule } from '@angular/material';
import { SupplierRestoreComponent } from './supplier-restore/supplier-restore.component';
import { SupplierIndexComponent } from './supplier-index/supplier-index.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    AngularMultiSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    SupplierRouter
  ],
  declarations: [
    SupplierComponent,
    SupplierAddComponent,
    SupplierEditComponent,
    SupplierDetailComponent,
    SupplierRestoreComponent,
    SupplierIndexComponent
  ],
  providers: [
    DataService,
    AuthenService,
    NotificationService,
    UtilityService,
    StatusContstants,
    SupplierComponent,
    UploadFileService,
    SupplierIndexComponent
  ]
})
export class SupplierModule { }
