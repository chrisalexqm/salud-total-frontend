import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the EmergencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html',
})
export class EmergencyPage {
  data: Observable<any>;
  idUser:string;
  typeServiceEmergency:string;
  servicesPrivate:any[];
  servicesPublic:string[];

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;

  constructor(private menu: MenuController, public navCtrl: NavController,public loadingCtrl: LoadingController, public storage: Storage, public navParams: NavParams, public alertCtrl: AlertController,  public http: HttpClient) {
  	this.loading();
    this.typeServiceEmergency="state";
  	this.idUser = window.localStorage.getItem('userID');
  	this.loadServicesPrivate();
	  this.loadServicesPublic();
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
  loading(){
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 2000
    });
    load.present();
  }

  loadServicesPrivate(){
  	var url = "http://saludtotalapp.com/wservice/Emergencia/consult/";
  	var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
  		let body = "";
  		body =
  			"&itip=" 	+ 1 	+
  	"";
  	this.data= this.http.post(url, body, header);
  	console.log("dentro de: " + url);
  	this.data.subscribe(data=>{
  		console.log(data);
  		this.servicesPrivate = data;
  	},err=>{
      this.messageError();
    });
  }
  loadServicesPublic(){
  	var url = "http://saludtotalapp.com/wservice/Emergencia/consult/";
  	var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
  		let body = "";
  		body =
  			"&itip=" 	+ 2 	+
  	"";
  	this.data= this.http.post(url, body, header);
  	console.log("dentro de: " + url);
  	this.data.subscribe(data=>{
  		console.log(data);
  		this.servicesPublic = data;
  	},err=>{
      this.messageError();
    });
  }
  messageError(){
    let alert = this.alertCtrl.create({
      title: 'Ocurrio un problema !',
      subTitle: 'Verifique su conexión a internet.',
      buttons: ['OK']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
    this.menu.swipeEnable(false);
  }

}
