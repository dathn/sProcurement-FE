import { PurchaseRequisitionComponent } from './purchase-requisition.component';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseRequisitionAddComponent } from './purchase-requisition-add/purchase-requisition-add.component';
import { PurchaseRequisitionDetailComponent } from './purchase-requisition-detail/purchase-requisition-detail.component';
import { PurchaseRequisitionEditComponent } from './purchase-requisition-edit/purchase-requisition-edit.component';
import { PurchaseRequisitionIndexComponent } from './purchase-requisition-index/purchase-requisition-index.component';
import { PurchaseRequisitionRestoreComponent } from './purchase-requisition-restore/purchase-requisition-restore.component';

const purchaseRequisitionRouter: Routes = [
  {
    path: '',
    component: PurchaseRequisitionComponent,
    data: {
      title: 'Purchase Requisition'
    },
    children: [
      { path: '', component: PurchaseRequisitionIndexComponent },
      { path: 'index', component: PurchaseRequisitionComponent },
      { path: 'detail/:id', component: PurchaseRequisitionDetailComponent },
      { path: 'add', component: PurchaseRequisitionAddComponent },
      { path: 'restore', component: PurchaseRequisitionRestoreComponent },
      { path: 'edit/:id', component: PurchaseRequisitionEditComponent }
    ]
  }


];
export const PurchaseRequisitionRouter = RouterModule.forChild(purchaseRequisitionRouter);
