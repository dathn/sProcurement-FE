import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationComponent } from './quotation.component';
import { Routes, RouterModule } from '@angular/router';
const quotationRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: QuotationComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(quotationRouter)
  ],
  declarations: [QuotationComponent]
})
export class QuotationModule { }
