import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceProcessingComponent } from './invoice-processing.component';
import { Routes, RouterModule } from '@angular/router';
const invoiceProcessingRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: InvoiceProcessingComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(invoiceProcessingRouter)
  ],
  declarations: [InvoiceProcessingComponent]
})
export class InvoiceProcessingModule { }
