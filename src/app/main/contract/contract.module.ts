import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { AuthenService } from '../../core/services/authen.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { ContractComponent } from './contract.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractIndexComponent } from './contract-index/contract-index.component';
import { ContractsRouter} from './contract.routes';
import { StatusContstants } from '../../core/common/status.constants';
import { TooltipModule } from 'ngx-bootstrap';
import { PaginationModule, TabsModule } from 'ngx-bootstrap';
import { MatTooltipModule } from '@angular/material';
import { ContractRestoreComponent } from './contract-restore/contract-restore.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    TabsModule,
    MatTooltipModule,
    ContractsRouter
  ],
  declarations: [
    ContractComponent,
    ContractAddComponent,
    ContractDetailComponent,
    ContractEditComponent,
    ContractIndexComponent,
    ContractRestoreComponent
  ],
  providers: [
    DataService,
    AuthenService,
    NotificationService,
    UtilityService,
    StatusContstants,
    DatePipe,
    ContractIndexComponent
  ]
})
export class ContractModule { }
