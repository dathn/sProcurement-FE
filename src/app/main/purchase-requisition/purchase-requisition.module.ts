import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PurchaseRequisitionComponent } from './purchase-requisition.component';
import { PurchaseRequisitionAddComponent } from './purchase-requisition-add/purchase-requisition-add.component';
import { PurchaseRequisitionDetailComponent } from './purchase-requisition-detail/purchase-requisition-detail.component';
import { PurchaseRequisitionEditComponent } from './purchase-requisition-edit/purchase-requisition-edit.component';
import { PurchaseRequisitionRouter } from './purchase-requisition.routes';
import { DataService } from '../../core/services/data.service';
import { AuthenService } from '../../core/services/authen.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, TabsModule, TypeaheadModule, RatingModule } from 'ngx-bootstrap';
import { MatTooltipModule, MatExpansionModule } from '@angular/material';
import { UploadFileService } from '../../core/services/upload-file.service';
import { StatusContstants } from '../../core/common/status.constants';

import { TooltipModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { DeliveryAddressConstant } from '../../core/common/others.constants';
import { PurchaseRequisitionIndexComponent } from './purchase-requisition-index/purchase-requisition-index.component';
import { PurchaseRequisitionRestoreComponent } from './purchase-requisition-restore/purchase-requisition-restore.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    TabsModule,
    TypeaheadModule,
    MatTooltipModule,
    MatExpansionModule,
    PurchaseRequisitionRouter,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AngularMultiSelectModule,
    RatingModule.forRoot()
  ],
  declarations: [
    PurchaseRequisitionComponent,
    PurchaseRequisitionAddComponent,
    PurchaseRequisitionDetailComponent,
    PurchaseRequisitionEditComponent,
    PurchaseRequisitionIndexComponent,
    PurchaseRequisitionRestoreComponent
  ],
  providers: [DataService,
    AuthenService,
    NotificationService,
    UtilityService,
    StatusContstants,
    PurchaseRequisitionComponent,
    UploadFileService,
    DatePipe,
    DeliveryAddressConstant
  ]
})
export class PurchaseRequisitionModule {
  currentJustify = 'center';
}
