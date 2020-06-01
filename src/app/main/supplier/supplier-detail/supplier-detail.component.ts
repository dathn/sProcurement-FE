import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../../core/services/data.service';
@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit, OnDestroy {
  public supplier: any;
  public _id: any;
  public subscription: any;
  public max: number = 5;
  public rate: number = 5;
  public isReadonly: boolean = true;

  constructor(private _dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.supplier = {} ;
   }

  ngOnInit() {
    this.loadData();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      this._id = param['id'];
      this._dataService.get('/api/supplier/get-detail/' + this._id)
      .subscribe((response: any) => {
        this.supplier = response;
        
      });
    });
    
  }

}
