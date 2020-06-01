import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';
import { LoggedInUser } from '../../core/domain/loggedin.user';
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  public userRole: any;
  public user: LoggedInUser;
  public roles = [];
  constructor(public _authenService: AuthenService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.roles = JSON.parse(this.user.roles);
  }
  scroll() {
    setTimeout(() => window.scrollTo(0, 0), 200);

  }
}
