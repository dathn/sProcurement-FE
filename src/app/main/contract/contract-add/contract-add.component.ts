import { Component, OnInit } from '@angular/core';
import { UrlConstants } from '../../../core/common/url.constants';
import { DataService } from '../../../core/services/data.service';
import { SystemConstants } from '../../../core/common/system.constants';
import { NotificationService } from '../../../core/services/notification.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrls: ['./contract-add.component.css']
})
export class ContractAddComponent implements OnInit {
  public entity: any;
  public description: any;
  constructor(private _dataService: DataService,
    private router: Router, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.entity = {};
    this.getContractTemplate();
  }
  getContractTemplate() {
    this._dataService.get('/api/configuration/get-configuration?name=Contract_Template')
      .subscribe((response: any) => {
        this.description = this.entity.Description = response.MinValue;
      });
  }
  keyupHandlerFunction(e) {
    this.description = e;
    console.log(e);
  }
  public download() {
    let pdf = new jsPDF();
    let specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '#bypassme': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      }
    };
    let margins = {
      top: 20,
      bottom: 20,
      left: 15,
      width: 120
    };
    let options = {
      'width': 150
    };
    pdf.setFont('courier');
    pdf.fromHTML(
      this.description,
      margins.left,
      margins.top,
      { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
      },
      () => {
        pdf.save('Contract_Test.pdf');
      }, margins);
  }
}
