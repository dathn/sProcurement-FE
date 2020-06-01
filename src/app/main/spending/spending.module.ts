import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpendingComponent } from './spending.component';
import { Routes, RouterModule } from '@angular/router';
const spendingRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: SpendingComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(spendingRouter)
  ],
  declarations: [SpendingComponent]
})
export class SpendingModule { }
