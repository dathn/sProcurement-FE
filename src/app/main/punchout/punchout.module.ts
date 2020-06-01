import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PunchoutComponent } from './punchout.component';
import { Routes, RouterModule } from '@angular/router';
const punchoutRouter: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: PunchoutComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(punchoutRouter)
  ],
  declarations: [PunchoutComponent]
})
export class PunchoutModule { }
