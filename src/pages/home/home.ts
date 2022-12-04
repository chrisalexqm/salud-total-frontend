import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
// @ViewChild(Slides) slides: Slides;
export class HomePage {

  data: Observable<any>;
  noticias:string[];
  idUser:any;
  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;
  select_promo:any;
  dni:any;
  telf:any;
  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient, public alertCtrl: AlertController) {
  	this.loading();
  	this.loadData();
    this.idUser = parseInt(window.localStorage.getItem('userID'));
  	var estadoregistronoti = window.localStorage.getItem('statePlayer');
  	if(estadoregistronoti=='iniciado'){
		  var iduser = window.localStorage.getItem('userID');
	  	var correouser = window.localStorage.getItem('correoUser');
	  	this.verificarPlayerID(iduser, correouser);
  	}
    this.loadUser();

    this.select_promo = navParams.get('select_promo');
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }

  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  goMenu(){
    this.navCtrl.push(MenuPage);
  }

  selectPromo(promo){
    console.log(promo);
    this.navCtrl.push(HomePage, {
      'select_promo': promo 
    });
  }

  sendSol(){
    if( this.dni == "" || this.dni == null || this.telf == "" || this.telf == null ){
      return false;
    }
    this.idUser = window.localStorage.getItem('userID');
      var url = "http://saludtotalapp.com/wservice/solicitud/saveprom/";
      var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let body = "";
      body =      
          "&codprom=" + this.select_promo.IdNP +
          "&codprov=" + this.select_promo.IdProv +
          "&prompre=" + this.select_promo.Precio +
          "&usr=" + this.idUser +
          "&cp=" + "PE" +
          "&nrdc=" + this.dni +
          "&tlf=" + this.telf +
      "";
      console.log(body);
      this.data= this.http.post(url, body, header);
      //console.log("dentro de: " + url);
      this.data.subscribe(data=>{
        console.log("Data aqui: ");
        console.log(data.code);
        if(data.code){
          let alert = this.alertCtrl.create({
            title: 'Solicitud enviada',
            subTitle: 'Tu solicitud fue registrada con éxito. Pronto nos comunicaremos contigo',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(MenuPage);
        }
        //this.noticias = data;      
      },err=>{
        let alert = this.alertCtrl.create({
            title: 'Solicitud no enviada',
            subTitle: 'Ocurrió un error, tu solicitud no fue enviada- Intentalo de nuevo.',
            buttons: ['OK']
          });
          alert.present();
        console.log(err);
        //this.messageError();
      });
  }

  loading(){
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 2000
    });
    load.present();
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

  loadUser(){
    var urlU = "http://saludtotalapp.com/wservice/usuario/dtgn/";
    var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
    let bodyUsuarioU = "";
    bodyUsuarioU = 
      "&icodusr="        +   this.idUser   +
    "";
    //alert(bodyUsuarioU);
    console.log(bodyUsuarioU);
    this.data= this.http.post(urlU, bodyUsuarioU, header);
    this.data.subscribe(data=>{
      //alert(data);
      console.log(data);
      window.localStorage.setItem('nameUser', data[0].Nombre);
      window.localStorage.setItem('paternalSurnameUser', data[0].Paterno);
      window.localStorage.setItem('maternalSurnameUser', data[0].Materno);
    },err=>{
      console.log(err);
    });
  }

	loadData(){
		console.log("loadData ...");
  	//var url = "http://saludtotalapp.com/wservice/noticia/consnot/";
    var url = "http://saludtotalapp.com/wservice/noticia/consnot/";
    //webserv/solicitud/saveprom/
  	var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
  	let body = "";
  		/*body = 
  			"&icodusr=" 	+ this.idUser 	+ 
  	  "";*/
  	this.data= this.http.post(url, body, header);
  	//console.log("dentro de: " + url);
  	this.data.subscribe(data=>{
      console.log("Data aqui: ");
  		console.log(data);
  		this.noticias = data;      
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

}
