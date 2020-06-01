import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageContstants } from '../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StatusContstants } from '../../core/common/status.constants';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public entity: any;
  public announcements: any[];
  public _status: string;
  constructor(private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.search();
  }
  // Load data
  public search() {
    this._dataService.get('/api/Announcement/getall?pageIndex='
      + this.pageIndex + '&pageSize='
      + this.pageSize)
      .subscribe((response: any) => {
        this.announcements = response.Items;
        this.pageIndex = response.PageIndex;
      }, error => this._dataService.handleError(error));
  }
  // Show add form
  public showAdd() {
    this.entity = {};
    this.addEditModal.show();
  }
  // Show edit form
  public showEdit(id: number) {
    this.entity = this.announcements.find(x => x.ID === id);
    this.addEditModal.show();
  }
  // Action delete
  public deleteConfirm(id: string): void {
    this._dataService.delete2('/api/Announcement/delete?id=', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_MSG);
      this.search();
    }, error => this._dataService.handleError(error));
  }
  // Click button delete turn on confirm
  public deleteAnnouncements(id: string) {
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  }
  // Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      this._dataService.post('/api/announcement/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_MSG);
      }, error => this._dataService.handleError(error));
    }

  }
  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  setStatus() {
    switch (this._status) {
      case StatusContstants.WAITING:
        return { 'font-green-jungle': StatusContstants.WAITING };
      case StatusContstants.APPROVED:
        return { 'font-blue-steel': StatusContstants.APPROVED };
      case StatusContstants.DELETED:
        return { 'font-red-mint': StatusContstants.DELETED };
      case StatusContstants.DENIED:
        return { 'font-yellow-crusta': StatusContstants.DENIED };
      default:
        return { 'font-red-mint': StatusContstants.ERROR };
    }
  }

  showStatus(status: number) {
    if (status === StatusContstants.MOT) {
      this._status = StatusContstants.WAITING;
    } else if (status === StatusContstants.HAI) {
      this._status = StatusContstants.APPROVED;
    } else {
      this._status = StatusContstants.ERROR;
    }
    return this._status;

  }
}
