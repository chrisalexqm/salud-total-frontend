import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { HomePage } from '../home/home';
//import { RegisterPage } from '../register/register';
import { ListPage } from '../list/list';
import { RegisterDataUserPage } from '../register-data-user/register-data-user';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:any;
  password:any;
  currentPage:string;
  currentPageLogin:boolean;
  currentPageRegister:boolean;
  data: Observable<any>;

  terms:any;
  nameUser:string;
  paternalSurnameUser:string;
  maternalSurnameUser:string;
  emailUser:string;
  passwordUser:string;
  isenabled:boolean;
  stateSession:any;
  classTerms:string;

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;
  
  constructor(private menu: MenuController, public storage: Storage, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient) {
  	this.currentPage = navParams.get('page');
    //this.currentPage= 'login';
    this.segundo = 0;
    /*this.iverificarPlayerID = setInterval(() => {
      this.verificarPlayerID();
    }, 1000);*/
    //var init
    this.classTerms="termsOk";
    //this.currentPage = "login";
    this.currentPageLogin=true;
    this.currentPageRegister=false;
    //view login
    this.user = "";
  	this.password = "";    
    //view register
    this.nameUser = "";
    this.paternalSurnameUser = "";
    this.maternalSurnameUser = "";
    this.emailUser = "";
    this.passwordUser = "";
    // set a key/value
    this.storage.set('name', 'Max');
    this.isenabled=false;

    this.stateSession = window.localStorage.getItem('stateSession');
    if(!this.stateSession || this.stateSession == 'false' || this.stateSession == null ){

    }else{
      this.navCtrl.push(MenuPage);
    }
    console.log('stateSession: ', this.stateSession);

    // Or to get a key/value pair
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
    });
  }

  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.swipeEnable(false);
    //this.menu.swipeEnable(true);
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
  

  postRequestRegister(){
    
    let loadRegUser = this.loadingCtrl.create({
      content:'Registrando usuario...',
      duration: 3500
    });
    loadRegUser.present();
    
    var url = "http://saludtotalapp.com/wservice/usuario/save/";
    /*FormData: Permiten compilar un conjunto de pares clave/valor 
          para enviar mediante XMLHttpRequest. El formato con el que
          se envian los datos es: "multipart/form-data" al igual que el
          metodo submit de un formulario.
    */    
    
    let postData = new FormData;
    postData.append('nom', this.nameUser);
    postData.append('pat', this.paternalSurnameUser);
    postData.append('mat', this.maternalSurnameUser);
    postData.append('cor', this.emailUser);
    postData.append('pss', this.passwordUser);  
    console.log(postData);
    this.data= this.http.post(url, postData);
    this.data.subscribe(data=>{

      console.log(url);
      console.log(data);
      if(data.code=="100"){
        this.verificarPlayerID(data.Id, this.emailUser);
        window.localStorage.setItem('userID', data.Id);
        window.localStorage.setItem('userNEW', 'false');
        window.localStorage.setItem('correoUser', this.emailUser);
        window.localStorage.setItem('nameUser', this.nameUser);
        window.localStorage.setItem('paternalSurnameUser', this.paternalSurnameUser);
        window.localStorage.setItem('maternalSurnameUser', this.maternalSurnameUser);
        url="";

        var url = "http://saludtotalapp.com/wservice/formulario/save/";
        var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
        let body = "";
        body = 
          "&nom="      + this.nameUser            +
          "&pat="      + this.paternalSurnameUser + 
          "&mat="      + this.maternalSurnameUser + 
          "&gen="      + -1               +
          "&tipofumador="   + -1      +
          "&fnac="     + "2000/01/01"    +
          "&fprost="   + "1900/01/01"    +
          "&tprost="   + -1              +
          "&fmamo="    + "1900/01/01"    +
          "&tmamo="    + -1              +
          "&fpapa="    + "1900/01/01"    +
          "&tpapa="    + -1              +
          "&igest="    + -1              +
          "&ffur="     + "1900/01/01"    +
          "&fepart="   + "1900/01/01"    +
          "&contembar="  + "0,0,0,0"     +  
          "&talla="    + 0               +
          "&peso="     + 0               +
          "&hemo="     + 0               +
          "&hipt="     + -1              +
          "&prart="    + 0              +
          "&preartedenom="+ 0+
          "&diabe="    + -1              +
          "&tdiabe="   + -1              +
          "&fucdiabe=" + "1900/01/01"    +
          "&hemoglic=" + 0              +
          "&hemoayun=" + 0              +
          "&hemoalim=" + 0              +
          "&fucgra="   + "1900/01/01"    +
          "&coleldl="  + 0              +
          "&colehdl="  + 0              +
          "&trigli="   + 0              +
          "&mabdom="   + 0              +
          "&fuma="     + -1              +
          "&cigxdia="  + 0               +
          "&aosfuma="  + 0               +
          "&fodon="    + "1900/01/01"   +
          "&fgastr="   + "1900/01/01"    +
          "&tgastr="   + -1              +
          "&fcolo="    + "1900/01/01"    +      
          "&tcolo="    + -1              +
          "&fojo="     + "1900/01/01"    +
          "&tojo="     + -1              +
          "&ucmp="     +  "1900/01/01"   +
          "&vacneumo=" +  -1             +
          "&estratpresarte="  + -1 +
          "&glucosa="  + 0              +
          "&ucprearte="  + "1900/01/01" +
          "&depen="    + 0               +
          "&menedad="  + 0               +
          "&antfam="   + -1              +
          "&codenf="   + -1              +
          "&usr="      + data.Id         +
        "";
        console.log(body);
        this.data= this.http.post(url, body, header);
        this.data.subscribe(data=>{
          console.log(data);
          if(data.code=="100"){
            console.log(url);
            this.registerOk(data)
            window.localStorage.setItem('stateSession', 'true');
            this.goRegisterData();   
            loadRegUser.dismiss();
          }else if(data.code=="500"){
            console.log('MAL');
            let alert = this.alertCtrl.create({
                title: 'Ocurrio un problema !',
                subTitle: 'Intentelo más tarde. Si el problema persiste porfavor contactar con el soporte.',
                buttons: ['OK']
              });
              alert.present();
            loadRegUser.dismiss();
          }
        },err=>{
          this.messageError();
          loadRegUser.dismiss();
        });
      }else if(data.code=="500"){
        this.registerFl(data.error);
        loadRegUser.dismiss();
      }
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
  updateTerms() {
    console.log('Cucumbers new state:' + this.terms);
    if(this.terms){
      this.isenabled=true;
      this.classTerms="termsOk";
    }else{
      //this.classTerms="termsError";
      this.classTerms="termsOk";
      this.isenabled=false;
    }
  }

  showPolicies(){
    /*console.log('mostrando políticas...');
    let alert = this.alertCtrl.create({
      title: 'SALUD TOTAL APP',
      subTitle: 'Políticas de Uso' 
                + 'Salud Total es un aplicativo móvil de salud preventiva que busca contribuir con el bienestar'
                + ' humano y facilitar el acceso a los servicios médicos y relacionados.'
                + ' El algoritmo que rige las alertas preventivas y demás acciones sugeridas por Salud Total derivan de'
                + ' las recomendaciones locales e internacionales de las principales organizaciones de salud en el'
                + ' mundo, quienes reconocen y acreditan la información basada en estudios científicos. '
                + ' Salud Total se compromete con el respeto y cumplimiento de la Ley de Protección de Datos'
                + ' Personales (LEY N° 29733). Por ello toda información de índole privada que pueda ser'
                + ' suministrada por medio del presente formulario será debida y cuidadosamente tratada y'
                + ' conservada bajo nuestra responsabilidad en sistemas informáticos, pudiendo ser esta almacenada'
                + ' y custodiada en sistemas informáticos ubicados en la nube.'
                + ' Salud Total hace la función de intermediario entre los proveedores de servicios de salud y los'
                + ' usuarios del aplicativo, siendo la responsabilidad de la atención, de los resultados y de las'
                + ' situaciones derivadas, de los mismos proveedores, no tomando parte de responsabilidad el'
                + ' aplicativo intermediario.'
                + ' Al presionar el botón “DE ACUERDO” usted acepta los términos legales del uso del aplicativo y es'
                + ' consciente de la información adscrita.',
      buttons: ['OK']
    });
    alert.present();*/
    this.navCtrl.push(ListPage);
  }


  postRequestValidateUser(){
    let loadLogUser = this.loadingCtrl.create({
      content:'Validando usuario...',
      duration: 3500
    });
    loadLogUser.present();
    var url = "http://saludtotalapp.com/wservice/usuario/validar/";
    /*FormData: Permiten compilar un conjunto de pares clave/valor 
          para enviar mediante XMLHttpRequest. El formato con el que
          se envian los datos es: "multipart/form-data" al igual que el
          metodo submit de un formulario.
    */
    let postData = new FormData;
    postData.append('correo', this.user);
    postData.append('pwd', this.password);
    console.log(postData);
    this.data= this.http.post(url, postData);
    this.data.subscribe(data=>{
      console.log(data);
      if(data.code=="101"){        
        //storage.set('name', 'Max');
        this.verificarPlayerID(data.Id, this.user);
        window.localStorage.setItem('userID', data.Id);
        window.localStorage.setItem('userNEW', 'false');
        window.localStorage.setItem('nameUser', '');
        window.localStorage.setItem('paternalSurnameUser', '');
        window.localStorage.setItem('maternalSurnameUser', '');
        window.localStorage.setItem('correoUser', this.user);
        window.localStorage.setItem('stateSession', 'true');
        this.loginOk(data.success);   
        loadLogUser.dismiss();
      }else if(data.code=="501"){
        this.loginFail(data.error);
        loadLogUser.dismiss();
      }      
    },err=>{
      this.messageError();
    });
  }

  currentPageChanged(e){
    if(e._value=="login"){
      console.log("login...");
      this.currentPageRegister=false;
      this.currentPageLogin=true;      
    }else if(e._value=="register"){
      console.log("register...");
      this.currentPageLogin=false;
      this.currentPageRegister=true;
    }    
  }

  loginOk(message) {
    let alert = this.alertCtrl.create({
      title: 'Datos correctos !',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(MenuPage);
  }

  registerOk(message) {
    let alert = this.alertCtrl.create({
      cssClass: 'class-modal-policies',
      title: 'Bienvenido!',
      subTitle: 'Ahora, para brindarle la mejor experiencia de prevención, complete el siguiente cuestionario con la mayor cantidad de datos solicitados que le sea posible.',
      buttons: ['OK']      
    });
    alert.present(); 
    
  }
  registerFl(message) {
    let alert = this.alertCtrl.create({
      title: 'Registro incorrecto!',
      subTitle: 'Ocurrio un problema. Intentelo más tarde.',
      buttons: ['OK']
    });
    alert.present(); 
    //this.goRegister();  
  }

  loginFail(message) {
    let alert = this.alertCtrl.create({
      title: 'Ocurrio un error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  /*login(){
  	if(this.user=="rogercg" && this.password=="1234"){
  		this.loginOk();
  		//setTimeout(()=>{
		    this.navCtrl.push(HomePage);
		//},2000);
  	}else{
  		this.loginFail();
  	}
  }*/

  goRegisterData(){
  	this.navCtrl.push(RegisterDataUserPage, {hideBtnRegData: false});
  }
  goHome(){
    this.navCtrl.push(MenuPage);
  }

}
