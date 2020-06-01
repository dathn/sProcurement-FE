import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRestoreComponent } from './product-restore/product-restore.component';
import { ProductIndexComponent } from './product-index/product-index.component';

export const productRouter: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      title: 'Product'
    },
    children: [
      { path: '', component: ProductIndexComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'add', component: ProductAddComponent },
      { path: 'restore', component: ProductRestoreComponent },
      { path: 'edit/:id', component: ProductEditComponent }
    ]
  }
];
export const ProductRouter = RouterModule.forChild(productRouter);
