import { ContractComponent } from './contract.component';
import { Routes, RouterModule } from '@angular/router';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractIndexComponent } from './contract-index/contract-index.component';
import { ContractRestoreComponent } from './contract-restore/contract-restore.component';

export const contractRouter: Routes = [
  {
    path: '',
    component: ContractComponent,
    data: {
      title: 'Contract'
    },
    children: [
      { path: '', component: ContractIndexComponent },
      { path: 'detail/:id', component: ContractDetailComponent },
      { path: 'add', component: ContractAddComponent },
      { path: 'restore', component: ContractRestoreComponent },
      { path: 'edit/:id', component: ContractEditComponent }
    ]
  }
];
export const ContractsRouter = RouterModule.forChild(contractRouter);
