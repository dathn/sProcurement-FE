import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule, TabsModule, TypeaheadModule, RatingModule } from 'ngx-bootstrap';
import { MatTooltipModule, MatExpansionModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TooltipModule, BsDatepickerModule } from 'ngx-bootstrap';

import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PurchaseOrderRouter } from './purchase-order.routes';
import { AuthenService } from '../../core/services/authen.service';
import { StatusContstants } from '../../core/common/status.constants';
import { UtilityService } from '../../core/services/utility.service';
import { UploadFileService } from '../../core/services/upload-file.service';
import { DeliveryAddressConstant } from '../../core/common/others.constants';
import { PurchaseOrderAddComponent } from './purchase-order-add/purchase-order-add.component';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';
import { PurchaseOrderIndexComponent } from './purchase-order-index/purchase-order-index.component';
import { PurchaseOrderRestoreComponent } from './purchase-order-restore/purchase-order-restore.component';

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
    PurchaseOrderRouter,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AngularMultiSelectModule,
    RatingModule.forRoot()
  ],
  declarations: [
    PurchaseOrderComponent,
    PurchaseOrderDetailComponent,
    PurchaseOrderAddComponent,
    PurchaseOrderEditComponent,
    PurchaseOrderIndexComponent,
    PurchaseOrderRestoreComponent
  ],
  providers: [
    DataService,
    AuthenService,
    NotificationService,
    UtilityService,
    StatusContstants,
    PurchaseOrderComponent,
    UploadFileService,
    DatePipe,
    DeliveryAddressConstant
  ]
})
export class PurchaseOrderModule {
  currentJustify = 'center';
}
