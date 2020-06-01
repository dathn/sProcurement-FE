import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { Routes, RouterModule } from '@angular/router';
const budgetRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: BudgetComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(budgetRoutes)
  ],
  declarations: [BudgetComponent]
})
export class BudgetModule { }
