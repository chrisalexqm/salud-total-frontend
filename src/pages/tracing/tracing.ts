import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the TracingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracing',
  templateUrl: 'tracing.html',
})
export class TracingPage {
  data: Observable<any>;
  selectedItem: any;
  typeTracing:string;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  listaSeguimiento: any[];
  idUser: number;
  idForm: number;
  userDependient:number;
  cboSeguimiento: number;

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;

  constructor(private menu: MenuController, public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public http: HttpClient) {
  	this.loading();
    this.typeTracing="weight";
  	this.selectedItem = navParams.get('item');
    this.userDependient= navParams.get('idUD');
  	this.items = [];
    this.listaSeguimiento = [];
    this.idUser = parseInt(window.localStorage.getItem('userID'));
    this.idForm = parseInt(window.localStorage.getItem('formIDDependent'));
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
  obtenerSeguimiento(){
    this.listaSeguimiento = [];
    var urlUsuarioM = "http://saludtotalapp.com/wservice/historico/hudp/";
    var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
    let bodyUsuarioM = "";
    if(this.userDependient){      
      bodyUsuarioM = 
        "&idusr="       +   this.idUser         +
        "&idform="      +   this.idForm        +
        "&tipfilt="     +   this.cboSeguimiento +
        "&depen="       +   1 +
      "";
      console.log(bodyUsuarioM);
      this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
      this.data.subscribe(data=>{
        console.log(data);
        this.listaSeguimiento = data;
      },err=>{
        console.log(err);
      });
    }else{
      bodyUsuarioM = 
        "&idusr="       +   this.idUser         +
        "&idform="      +   0        +
        "&tipfilt="     +   this.cboSeguimiento +
      "";
      console.log(bodyUsuarioM);
      this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
      this.data.subscribe(data=>{
        console.log(data);        
        if(this.cboSeguimiento==1){
          
          //this.listaSeguimientoPeso(data);
        }else if(this.cboSeguimiento==2){
          
          //this.listaSeguimientoHemoglobina(data);
        }else if(this.cboSeguimiento==3){
          
          //this.listaSeguimientoPresion(data);
        }else if(this.cboSeguimiento==4){
          
          //this.listaSeguimientoGlucosa(data);
        }else if(this.cboSeguimiento==5){
          
          //this.listaSeguimientoHemoGlucosilada(data);
        }else if(this.cboSeguimiento==6){
          
          //this.listaSeguimientoColesterolLDL(data);
        }else if(this.cboSeguimiento==7){
          
          //this.listaSeguimientoColesterolHDL(data);
        }else if(this.cboSeguimiento==8){
          
          //this.listaSeguimientoTrigliceridos(data);
        }
        this.listaSeguimiento = data;
      },err=>{
        console.log(err);
      });      
    }    
  }

  listaSeguimientoPeso(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].Peso]) continue;
          flags[data[i].Peso] = true;
          output.push(data[i].Peso);
          var objt = {
            Peso: data[i].Peso,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  listaSeguimientoHemoglobina(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].Hemoglobina]) continue;
          flags[data[i].Hemoglobina] = true;
          output.push(data[i].Hemoglobina);
          var objt = {
            Hemoglobina: data[i].Hemoglobina,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  listaSeguimientoPresion(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].PresionArterialDenominador] || flags[data[i].PresionArterialNumerador]) continue;
          flags[data[i].PresionArterialNumerador] = true;
          flags[data[i].PresionArterialDenominador] = true;
          //output.push(data[i].PresionArterialDenominador);
          var objt = {
            PresionArterialNumerador: data[i].PresionArterialNumerador,
            PresionArterialDenominador: data[i].PresionArterialDenominador,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  listaSeguimientoGlucosa(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].Glucosa] ) continue;
          flags[data[i].Glucosa] = true;
          //output.push(data[i].PresionArterialDenominador);
          var objt = {
            Glucosa: data[i].Glucosa,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  listaSeguimientoHemoGlucosilada(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].HemoGlucosilada] ) continue;
          flags[data[i].HemoGlucosilada] = true;
          //output.push(data[i].PresionArterialDenominador);
          var objt = {
            HemoGlucosilada: data[i].HemoGlucosilada,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  listaSeguimientoColesterolLDL(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].ColesterolLDL] ) continue;
          flags[data[i].ColesterolLDL] = true;
          //output.push(data[i].PresionArterialDenominador);
          var objt = {
            ColesterolLDL: data[i].ColesterolLDL,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  listaSeguimientoColesterolHDL(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].ColesterolHDL] ) continue;
          flags[data[i].ColesterolHDL] = true;
          //output.push(data[i].PresionArterialDenominador);
          var objt = {
            ColesterolHDL: data[i].ColesterolHDL,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  listaSeguimientoTrigliceridos(data){
    var flags = [], output = [], l = data.length, i;
      for( i=0; i<l; i++) {
          if( flags[data[i].Trigliceridos] ) continue;
          flags[data[i].Trigliceridos] = true;
          //output.push(data[i].PresionArterialDenominador);
          var objt = {
            Trigliceridos: data[i].Trigliceridos,
            FechaHistorica: data[i].FechaHistorica,
            HoraHistorica: data[i].HoraHistorica
          }
          this.listaSeguimiento.push(objt);
      }
  }

  loading(){
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 2000
    });
    load.present();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TracingPage, {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TracingPage');
    this.menu.swipeEnable(false);
  }

}
