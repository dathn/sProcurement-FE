import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { AuthenService } from '../../core/services/authen.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  constructor(private _authenService: AuthenService) { }

  ngOnInit() {
    console.log(this._authenService.getLoggedInUser().access_token);
  }
  ngAfterViewChecked() {


  }
}
