import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ConfigComponent } from './config/config.component';

export const mainRoutes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'account', loadChildren: './account/account.module#AccountModule' },
            { path: 'budget', loadChildren: './budget/budget.module#BudgetModule' },
            { path: 'catalog', loadChildren: './catalog/catalog.module#CatalogModule' },
            { path: 'contract', loadChildren: './contract/contract.module#ContractModule' },
            { path: 'invoice-processing', loadChildren: './invoice-processing/invoice-processing.module#InvoiceProcessingModule' },
            { path: 'product', loadChildren: './product/product.module#ProductModule' },
            { path: 'punchout', loadChildren: './punchout/punchout.module#PunchoutModule' },
            { path: 'purchase-order', loadChildren: './purchase-order/purchase-order.module#PurchaseOrderModule' },
            { path: 'quotation', loadChildren: './quotation/quotation.module#QuotationModule' },
            { path: 'spending', loadChildren: './spending/spending.module#SpendingModule' },
            { path: 'supplier', loadChildren: './supplier/supplier.module#SupplierModule' },
            { path: 'purchase-requisition', loadChildren: './purchase-requisition/purchase-requisition.module#PurchaseRequisitionModule' },
            { path: 'announcement', loadChildren: './announcement/announcement.module#AnnouncementModule' },
            { path: 'config', component: ConfigComponent }
        ]
    }

];
