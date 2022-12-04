import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { RequestProduct } from '../../models/request-product';
import { MenuPage } from '../menu/menu';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { DetailRequestProductPage } from '../detail-request-product/detail-request-product';

/**
 * Generated class for the ListRequestProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-request-product',
  templateUrl: 'list-request-product.html',
})
export class ListRequestProductPage {

  data: Observable<any>;

  idUser: any;

  requestProductList: RequestProduct[] = [] as RequestProduct[];

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
    this.idUser = window.localStorage.getItem('userID');
    this.getRequestProductList();
    console.log('ionViewDidLoad ListRequestProductPage');
  }

  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  goMenu() {
    this.navCtrl.push(MenuPage);
  }

  getRequestProductList() {
    this.requestProductList = [];
    var url = "http://saludtotalapp.com/wservice/frmc/soli/get/genusr?usr=" + this.idUser;
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    this.data = this.http.get(url, header);
    this.data.subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          // var hoy = moment().format('YYYY-MM-DD');
          data[index].FechaRegistro = moment(data[index].FechaRegistro).format('DD-MM-YYYY');
          this.requestProductList.push(data);
        }
        this.requestProductList = data;
      } else {}
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  messageError() {
    let alert = this.alertCtrl.create({
      title: 'Ocurrio un problema !',
      subTitle: 'Verifique su conexión a internet.',
      buttons: ['OK']
    });
    alert.present();
  }

  removeProduct(r: RequestProduct) {
    var url = "http://saludtotalapp.com/wservice/frmc/soli/del/genusr";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&solicitud=" + r.Codigo +
      "&usr=" + this.idUser +
      "";
    this.data = this.http.post(url, body, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      let alert = this.alertCtrl.create({
        title: 'Solicitud eliminada:',
        subTitle: 'La solicitud se eliminó de tu lista de pedidos',
        buttons: ['OK']
      });
      alert.present();
      this.getRequestProductList();
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  dropTap(r: RequestProduct){
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Desea eliminar a este pedido?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.removeProduct(r);
          }
        }
      ]
    });
    alert.present();
}

  detail(rp: RequestProduct){
    console.log('rp: ');
    console.log(rp);
    this.navCtrl.push(DetailRequestProductPage,{
      requestId: rp.Codigo
    });
  }

}
