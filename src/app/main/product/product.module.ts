import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { DataService } from '../../core/services/data.service';
import { AuthenService } from '../../core/services/authen.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { UploadFileService } from '../../core/services/upload-file.service';
import { StatusContstants } from '../../core/common/status.constants';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productRouter } from './product.routes';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { PaginationModule } from 'ngx-bootstrap';
import { MatTooltipModule, MatExpansionModule } from '@angular/material';
import { ProductRestoreComponent } from './product-restore/product-restore.component';
import { ProductIndexComponent } from './product-index/product-index.component';

const ProductRouter: ModuleWithProviders = RouterModule.forChild(productRouter);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    AngularMultiSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    ProductRouter
  ],
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductRestoreComponent,
    ProductIndexComponent
  ],
  providers: [
    DataService,
    AuthenService,
    NotificationService,
    UtilityService,
    StatusContstants,
    ProductComponent,
    UploadFileService,
    ProductIndexComponent
  ]
})
export class ProductModule { }
