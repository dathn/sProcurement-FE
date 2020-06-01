import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Routes, RouterModule } from '@angular/router';
import { AccountAddComponent } from './account-add/account-add.component';
const accountRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: AccountComponent },
  { path: 'add', component: AccountAddComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes)
  ],
  declarations: [AccountComponent, AccountAddComponent]
})
export class AccountModule { }
