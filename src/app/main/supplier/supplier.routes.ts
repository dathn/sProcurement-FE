import { SupplierComponent } from './supplier.component';
import { Routes, RouterModule } from '@angular/router';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierRestoreComponent } from './supplier-restore/supplier-restore.component';
import { SupplierIndexComponent } from './supplier-index/supplier-index.component';


const supplierRouter: Routes = [
  {
    path: '',
    component: SupplierComponent,
    data: {
      title: 'Supplier'
    },
    children: [
      { path: '', component: SupplierIndexComponent },
      { path: 'detail/:id', component: SupplierDetailComponent },
      { path: 'add', component: SupplierAddComponent },
      { path: 'edit/:id', component: SupplierEditComponent },
      { path: 'restore', component: SupplierRestoreComponent },
    ]
  }
];
export const SupplierRouter = RouterModule.forChild(supplierRouter);
