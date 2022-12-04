import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { RequestProductDetail } from '../../models/request-product';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-detail-request-product',
  templateUrl: 'detail-request-product.html',
})
export class DetailRequestProductPage {
  idRequestPoduct: any;

  data: Observable<any>;

  idUser: any;

  requestProductDetail: RequestProductDetail = {} as RequestProductDetail;
  detailList: RequestProductDetail[] = [] as RequestProductDetail[];

  priceTotal: number = 0;

  priceDelivery: number;
  priceFull: number;

  idFarm: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: HttpClient,
    public toaster: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.idRequestPoduct = this.navParams.get('requestId');
    this.idUser = window.localStorage.getItem('userID');
    this.getRequestProductList();
    console.log('ionViewDidLoad DetailRequestProductPage');
  }

  getRequestProductList() {
    var url = "http://saludtotalapp.com/wservice/frmc/soli/getdet/genusr?usr=" + this.idUser + "&solicitud=" + this.idRequestPoduct;
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    this.data = this.http.get(url, header);
    this.data.subscribe(data => {
      console.log(data);
      this.detailList = data;
      this.requestProductDetail = data[0];
      this.idFarm = data[0].idFam;
      for (let index = 0; index < data.length; index++) {
        // this.servicePrice = parseFloat(data["0"].Precio);
        // this.servicePrice = this.servicePrice.toFixed(2);

        // var newPrice = parseFloat(data[index].Precio);
        // var finalPrice = newPrice.toFixed(2);
        // console.log('this.finalPrice: ');
        // console.log(finalPrice);
        console.log(parseFloat(data[index].ftotal));
        var newPrice = parseFloat(data[index].ftotal);
        this.priceTotal += newPrice;
      }
      this.getDelivery();

    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  goMenu() {
    this.navCtrl.push(MenuPage);
  }

  messageError() {
    let alert = this.alertCtrl.create({
      title: 'Ocurrio un problema !',
      subTitle: 'Verifique su conexión a internet.',
      buttons: ['OK']
    });
    alert.present();
  }

  getDelivery(){
    var url = "http://saludtotalapp.com/wservice/frmc/get/preenvio/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&cod=" + this.idFarm//this.pharmacy.ID+
      "";
    this.data = this.http.post(url, body, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      this.priceDelivery = data[0].fprecio;
      this.priceFull = Number(this.priceDelivery) + Number(this.priceTotal);
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

}
