import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from './account/account.module';
import { BudgetModule } from './budget/budget.module';
import { CatalogModule } from './catalog/catalog.module';
import { ContractModule } from './contract/contract.module';
import { InvoiceProcessingModule } from './invoice-processing/invoice-processing.module';
import { ProductModule } from './product/product.module';
import { PunchoutModule } from './punchout/punchout.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { QuotationModule } from './quotation/quotation.module';
import { SpendingModule } from './spending/spending.module';
import { SupplierModule } from './supplier/supplier.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { SignalrService } from '../core/services/signalr.service';
import { PurchaseRequisitionModule } from './purchase-requisition/purchase-requisition.module';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config/config.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountModule,
    BudgetModule,
    CatalogModule,
    ContractModule,
    InvoiceProcessingModule,
    ProductModule,
    PunchoutModule,
    PurchaseOrderModule,
    QuotationModule,
    SpendingModule,
    SupplierModule,
    DashboardModule,
    PurchaseRequisitionModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [
    MainComponent,
    SidebarMenuComponent,
    TopMenuComponent,
    ConfigComponent
  ],
  providers: [
    UtilityService,
    AuthenService,
    SignalrService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MainModule { }
