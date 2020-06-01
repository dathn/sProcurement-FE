import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { DataService } from '../../../core/services/data.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public product: any;
  public _id: any;
  public subscription: any;
  constructor(private _dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.product = {};

   }

  ngOnInit() {
    let data=[
      {
        "id": 1,
        "img": 'https://www.pickaboo.com/media/catalog/product/cache/1/thumbnail/300x300/9df78eab33525d08d6e5fb8d27136e95/a/p/apple-macbook-12inch-high-basic_1_1_1_1.jpg'
      },
      {
        "id": 2,
        "img": 'https://www.amirmughal.com/wp-content/uploads/2017/09/MacBook-Space-Gray-Mid-2017-300x300.jpg'
      },
      {
        "id": 3,
        "img": 'https://www.voidapplications.co.uk/wp-content/uploads/2016/11/Macbook-300x300.png'
      },
      {
        "id": 4,
        "img": 'http://www.macstores.vn/wp-content/uploads/2017/07/Macbook-Pro-MPXY2-300x300.jpg'
      }
      
    ]
    this.loadData();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      this._id = param['id'];
      this._dataService.get('/api/product/get-detail/' + this._id)
      .subscribe(response => {
        this.product = response;
        console.log(response);
      }, err => {
        console.log(err);
      });
    });
    
  }
  getA(){
    console.log('aaa');
  }
  show(anhnho,value){ 
    var anhto = document.getElementById("to") as HTMLImageElement;
    anhto.src = value;
    var arr_img = document.getElementById("list").getElementsByTagName("img");
    for(var i=0;i<arr_img.length;i++){
      arr_img[i].className = "mo";
      console.log(arr_img[i]);
    }
    document.getElementById(anhnho).className="ro"
    console.log(anhnho);
  }


}
