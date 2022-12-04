import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestServicePage } from '../request-service/request-service';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the ListRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-request',
  templateUrl: 'list-request.html',
})
export class ListRequestPage {
  data: Observable<any>;
  listRequest: string[];
  idUser:any;
  selectedRequest:any;
  priceTotal:any;

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient) {
  	//SOLICITAR LISTA DE DISTRITOS
  	this.selectedRequest = navParams.get('request');
  	this.idUser = window.localStorage.getItem('userID');
  	//this.loading();
  	if (!this.selectedRequest) {
  		// code...
  		this.getListRequest();
  	}else{
      if(!this.selectedRequest.Total || this.selectedRequest.Total=="undefined" ||this.selectedRequest.Total==null){
        console.log("No hay precio");
      }else{
        
        this.priceTotal = parseInt(this.selectedRequest.Total).toFixed(2);
        console.log(this.selectedRequest);
      }
      
    }
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

  dropRequestTap(request){
    console.log(request);
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: ' ¿Desea cancelar esta solicitud de servicio?',
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
            this.confirDropRequest(request);
          }
        }
      ]
    });
    alert.present();      
  }

  confirDropRequest(request){
    var urlUsuarioM = "http://saludtotalapp.com/wservice/solicitud/desh/";
    var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
    let bodyUsuarioM = "";
    bodyUsuarioM = 
        "&idsoli="  +   request.ID   +
        "&idusr="   +   this.idUser  +
    "";
    this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
    this.data.subscribe(data=>{        
      console.log('data: ', data);
      if(data.code == "100" || data.code == "101"){
        let alert = this.alertCtrl.create({
          title: 'Solicitud cancelada:',
          subTitle: 'La solicitud se canceló',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(ListRequestPage);
      }
    },err=>{
      console.log(err);
    });
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListRequestPage');
  }

  getListRequest(){
  	let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 3500
    });
    load.present();
  	var urlRequest = "http://saludtotalapp.com/wservice/solicitud/listsol/";
  	var headerRequest = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
  	let bodyRequest = "";
  	bodyRequest = 
  	  "&idusr="          + this.idUser   +
  	"";
  	this.data= this.http.post(urlRequest, bodyRequest, headerRequest);
  	this.data.subscribe(data=>{
  		console.log(data);
  		this.listRequest = data;
  		load.dismiss();
  	},err=>{
  		//this.messageError();
  		console.log(err);
  	});
  }
  itemSelected(request){
    console.log("item selected");
  	this.navCtrl.push(ListRequestPage, {
      request: request
    });
  }

  goRequestService(request){
  	this.navCtrl.push(RequestServicePage, {
      //request: request
    });
  }

  loading(){
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 2000
    });
    load.present();
  }

}
