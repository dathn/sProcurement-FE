import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthenService } from '../../../core/services/authen.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { StatusContstants } from '../../../core/common/status.constants';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  public contract: any;
  public _id: any;
  public _status: any;
  public subscription: any;

  constructor(
    private _dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private _notificationService: NotificationService,
    private router: Router,
    public _authenService: AuthenService) { 
      this.contract = {};
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
      this._dataService.get('/api/contract/get-detail/' + this._id)
        .subscribe(response => {
          this.contract = response;
          console.log(response);
        }, err => {
          console.log(err);
        });
    });

  }

  setStatus() {
    switch (this._status) {
      case StatusContstants.ACTIVED:
        return { 'font-green-jungle': StatusContstants.ACTIVED };
      case StatusContstants.DELETED:
        return { 'font-red-mint': StatusContstants.DELETED };
      default:
        return { 'font-purple': StatusContstants.ERROR };
    }
  }

  showStatus(status: number) {
    if (status === StatusContstants.MOT) {
      this._status = StatusContstants.ACTIVED;
    } else if (status === StatusContstants.AMMOT) {
      this._status = StatusContstants.DELETED;
    } else {
      this._status = StatusContstants.ERROR;
    }
    return this._status;
  }

}
