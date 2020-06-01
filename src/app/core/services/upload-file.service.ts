import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UrlConstants } from '../../core/common/url.constants';
import { UtilityService } from './utility.service';

@Injectable()
export class UploadFileService {
  public responseData: any;
  constructor(private _dataService: DataService, private _utilityService: UtilityService) {

  }
  postWithImage(url: string, postData: any, files: File[]) {
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);

    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    var returnReponse = new Promise((resolve, reject) => {
      this._dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
          console.log(this.responseData);
        },
        error => this._dataService.handleError(error)
      );
    });
    return returnReponse;
  }
  postWithMultiImage(url: string, postData: any, files: File[]) {
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);

    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    var returnReponse = new Promise((resolve, reject) => {
      this._dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
          console.log(this.responseData);
        },
        error => this._dataService.handleError(error)
      );
    });
    return returnReponse;
  }
  importQuotation(url: string, postData: any, files: File[]) {
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);

    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    var returnReponse = new Promise((resolve, reject) => {
      this._dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
          console.log(this.responseData);
        },
        error => this._dataService.handleError(error)
      );
    });
    return returnReponse;
  }
  // uploadImgur(e) {
  //   {
  //     var reader = e.target;
  //     // this.imageSrc = reader.result;
  //     let url = 'https://api.imgur.com/3/image';
  //     var headers = new Headers();
  //     headers.append('Authorization', 'Client-ID bf915d4106b6639');
  //     let options = new RequestOptions({ headers: headers });
  //     let data = {
  //       'image': reader.result.split(',')[1]
  //     };
  //     if (this.name === 'logo') {
  //       this.uniService.uploadFile(url, data, options).subscribe((response: any) => {
  //         this.imageSrc = response.data.link;
  //         this.baseService.setLogoUni(response.data.link);
  //         this.isLoading = false;
  //       });
  //     } else {
  //       this.uniService.uploadFile(url, data, options).subscribe((response: any) => {
  //         this.imageSrc = response.data.link;
  //         this.baseService.setImgUni(response.data.link);
  //         this.isLoading = false;
  //         this.value = true;
  //       }, err => {
  //         this.toastr.error('Vui lòng kiểm tra lại kết nối mạng', 'Thất bại');
  //       });
  //     }
  //     this.loaded = true;
  //   }
  // }
}
