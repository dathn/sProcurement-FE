import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { Routes, RouterModule } from '@angular/router';
const catalogRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: CatalogComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(catalogRoutes)
  ],
  declarations: [CatalogComponent]
})
export class CatalogModule { }
