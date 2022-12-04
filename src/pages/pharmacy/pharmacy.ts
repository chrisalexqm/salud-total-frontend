import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { MenuPage } from '../menu/menu';
import { Pharmacy } from '../../models/pharmacy';
import { PhamacyStorePage } from '../phamacy-store/phamacy-store';
import { ListRequestPage } from '../list-request/list-request';
import { ListRequestProductPage } from '../list-request-product/list-request-product';
/**
 * Generated class for the PharmacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pharmacy',
  templateUrl: 'pharmacy.html',
})
export class PharmacyPage {
  data: Observable<any>;
  idUser:string;
  /*title:string;
  description:string;
  numberphone:number;
  latitude:number;
  longitude:number;*/
  // farmacias: string[];
  farmacias: Pharmacy[] = [] as Pharmacy[];
  url:string ='http://ionicframework.com/docs/v2/native/inappbrowser/';

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;
  constructor(private menu: MenuController, private iab: InAppBrowser,public navCtrl: NavController,public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController, public navParams: NavParams, public http: HttpClient, public launchNavigator: LaunchNavigator) {
  	//cargando data
  	this.idUser = window.localStorage.getItem('userID');
    this.loading();
  	this.loadData();

    //const browser = this.iab.create('https://ionicframework.com/');
      var estadoregistronoti = window.localStorage.getItem('statePlayer');
      if(estadoregistronoti=='iniciado'){
      var iduser = window.localStorage.getItem('userID');
        var correouser = window.localStorage.getItem('correoUser');
        this.verificarPlayerID(iduser, correouser);
      }
  }

  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  goListRequestProduct(){
    this.navCtrl.push(ListRequestProductPage);
  }

  goMenu(){
    this.navCtrl.push(MenuPage);
  }

  verificarPlayerID(idUser, correo){
      var patron = /"/g;
      var nuevoValor = "";

      this.playerID  =  window.localStorage.getItem('playerID');
      this.playerID  = this.playerID.replace(patron, nuevoValor);

      this.pushToken = window.localStorage.getItem('pushToken');
      this.pushToken = this.pushToken.replace(patron, nuevoValor);

      if(this.playerID && this.playerID != null &&
        this.playerID != 'null' && this.playerID != 'undefined'){
        this.segundo=15;
        clearInterval(this.iverificarPlayerID);
      console.log("Player ID obtenido: ", this.playerID);
      console.log("Intervalo cancelado ");
      var urlN = "http://saludtotalapp.com/wservice/notificacion/datasave/";
      var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioN = "";
      bodyUsuarioN =
        "&playerid="        +   this.playerID   +
        "&mail="            +   correo          +
        "&idusr="           +   idUser          +
        "&tokenplayerid="   +   this.pushToken  +
      "";
      //alert(bodyUsuarioN);
      console.log(bodyUsuarioN);
      this.data= this.http.post(urlN, bodyUsuarioN, header);
      this.data.subscribe(data=>{
        //alert(data);
        if(data.code=="100"){
          window.localStorage.setItem('statePlayer', 'registrado');
        }
      },err=>{
            console.log(err);
          });
      }
  }
  goPage(farmacy) {
    this.launchNavigator.navigate(farmacy);
    //const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query='+farmacy, '_self');
  }

  goPageStore(pharmacy){
    if(pharmacy.HabilitadoVenta=="1"){
      console.log('pharmacy: ');
      console.log(pharmacy);
      this.navCtrl.push(PhamacyStorePage, {
        pharmacy: pharmacy,
        nPage: 1
      });
    }else{
      // let alert = this.alertCtrl.create({
      //   title: 'No Disponible',
      //   subTitle: 'Por el momento el Pedido en Línea no se encuentra disponible para este proveedor. Por favor seleccione otro. Gracias.',
      //   buttons: ['OK']
      // });
      // alert.present();
    }
  }

  loading(){
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 2000
    });
    load.present();
  }
  messageError(){
    let alert = this.alertCtrl.create({
      title: 'Ocurrio un problema !',
      subTitle: 'Verifique su conexión a internet.',
      buttons: ['OK']
    });
    alert.present();
  }
  loadData(){
  	var url = "http://saludtotalapp.com/wservice/Farmacia/consult/";
  	var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
  		let body = "";
  		/*body =
  			"&icodusr=" 	+ this.idUser 	+
  	  "";*/
  	this.data= this.http.post(url, body, header);
  	console.log("dentro de: " + url);
  	this.data.subscribe(data=>{
  		console.log(data);
  		this.farmacias = data;
  	},err=>{
      this.messageError();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PharmacyPage');
    this.menu.swipeEnable(false);
  }



}
