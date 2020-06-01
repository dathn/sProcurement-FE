import { PurchaseOrderComponent } from './purchase-order.component';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { PurchaseOrderAddComponent } from './purchase-order-add/purchase-order-add.component';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';
import { PurchaseOrderIndexComponent } from './purchase-order-index/purchase-order-index.component';
import { PurchaseOrderRestoreComponent } from './purchase-order-restore/purchase-order-restore.component';

const purchaseOrderRouter: Routes = [
  {
    path: '',
    component: PurchaseOrderComponent,
    data: {
      title: 'Purchase Order'
    },
    children: [
      { path: '', component: PurchaseOrderIndexComponent },
      { path: 'detail/:id', component: PurchaseOrderDetailComponent },
      { path: 'add', component: PurchaseOrderAddComponent },
      { path: 'restore', component: PurchaseOrderRestoreComponent },
      { path: 'edit/:id', component: PurchaseOrderEditComponent }
    ]
  },
];
export const PurchaseOrderRouter = RouterModule.forChild(purchaseOrderRouter);
