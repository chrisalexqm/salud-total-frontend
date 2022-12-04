import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RegisterDataUserPage } from '../register-data-user/register-data-user';
import { RegisterDataUDependenMinorPage } from '../register-data-u-dependen-minor/register-data-u-dependen-minor';
import { CurrentStatePage } from '../current-state/current-state';
import { TracingPage } from '../tracing/tracing';
import { NextControlsPage } from '../next-controls/next-controls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MenuPage } from '../menu/menu';


/**
 * Generated class for the UserDependentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-dependent',
  templateUrl: 'user-dependent.html',
})
export class UserDependentPage {
  data: Observable<any>;

  selectedItem: any;
  //icons: string[];
  usersMinor:string[];
  usersConven: Array<{id: string, name: string, apePat: string, apeMat: string}>;
  typeUserReceivedPage:any;
  detailUserReceivedPage:any;
  detailUserDCPage: any;
  detailUserDMPage: any;
  idUser:string;
  idForm:string;
  nameUser:string;
  paternalSurnameUser:string;
  maternalSurnameUser:string;
  detailUserReceivedPageEM:string;

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;

  constructor(private menu: MenuController, public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient) {
  	this.loading();
    // If we navigated to this page, we will have an item available as a nav param
    //this.href = this.router.url;
    this.idUser = window.localStorage.getItem('userID');
    console.log("se cargo la pagina")
    //this.detailUserReceivedPage="";
    this.typeUserReceivedPage = navParams.get('typeUser');
    this.detailUserReceivedPage = navParams.get('userTap');
    console.log("detailUserReceivedPage: ", this.detailUserReceivedPage);
    this.detailUserReceivedPageEM = navParams.get('tu');
    console.log("REVISA AQUI: ", this.detailUserReceivedPageEM);
    this.detailUserDCPage     = navParams.get('addUDC');
    this.detailUserDMPage     = navParams.get('addUDM');
    this.usersMinor = [];
    //SOLICITAR LISTA DE USUARIOS MENORES
      var urlUsuarioM = "http://saludtotalapp.com/wservice/formulario/consdepmenxusr/";
      var header1 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioM = "";
      bodyUsuarioM = 
          "&idusr="     +   this.idUser   +
          //"&esmenor="   +   1             +
      "";
      this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header1);
      this.data.subscribe(data=>{        
        this.usersMinor = data;

        console.log('usuarios menores: ', this.usersMinor);
      },err=>{
        console.log(err);
      });

  	this.usersConven = [];
    //SOLICITAR LISTA DE USUARIOS CONVENCIONALES
      var urlUsuarioCC = "http://saludtotalapp.com/wservice/formulario/usrdpns/";
      var header2 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioC = "";
      bodyUsuarioC = 
          "&idusr="     +   this.idUser   +
          "&esmenor="   +   0             +
      "";
      this.data= this.http.post(urlUsuarioCC, bodyUsuarioC, header2);
      this.data.subscribe(data=>{
        console.log(data);
        this.usersConven = data;
      },err=>{
        console.log(err);
      });
    
    //SETEANDO IDFORM EN EL LOCALSTORAGE 
        var url = "http://saludtotalapp.com/wservice/formulario/consfrm/";
        var header3 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
          let body = "";
          body = 
              "&idform="  + 0  +
              "&idusr="   + this.idUser   + 
        "";
        this.data= this.http.post(url, body, header3);
        this.data.subscribe(data=>{
          window.localStorage.setItem('formID', data[0].IDF);
          this.idForm = window.localStorage.getItem('formID');
          console.log(data[0].IDF);
        });    
    
      var estadoregistronoti = window.localStorage.getItem('statePlayer');
      if(estadoregistronoti=='iniciado'){
      var iduser = window.localStorage.getItem('userID');
        var correouser = window.localStorage.getItem('correoUser');
        this.verificarPlayerID(iduser, correouser);
      }
    }
  
    goMenu(){
      this.navCtrl.push(MenuPage);
    }

  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
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
      var header4 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioN = "";
      bodyUsuarioN = 
        "&playerid="        +   this.playerID   +
        "&mail="            +   correo          +
        "&idusr="           +   idUser          +
        "&tokenplayerid="   +   this.pushToken  +
      "";
      //alert(bodyUsuarioN);
      console.log(bodyUsuarioN);
      this.data= this.http.post(urlN, bodyUsuarioN, header4);
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
  dropUserTap(user, tuser){
      let alert = this.alertCtrl.create({
        title: 'Confirmar',
        message: '¿Desea eliminar a este dependiente?',
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
              this.confirDropUser(user, tuser);
            }
          }
        ]
      });
      alert.present();    
  }

  confirDropUser(user, tuser){
    if(tuser=='esmenor'){
      console.log("menor drop");
      var urlUsuarioC = "http://saludtotalapp.com/wservice/formulario/medel/";
      var header5 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioC = "";
      bodyUsuarioC = 
          "&idusr="     +   this.idUser   +
          "&idudm="    +   user.ID       +
      "";
      console.log(bodyUsuarioC);
      this.data= this.http.post(urlUsuarioC, bodyUsuarioC, header5);
      this.data.subscribe(data=>{
        console.log(data);
        if(data.code!=500){
          let alert = this.alertCtrl.create({
            title: 'Eliminación exitosa:',
            subTitle: 'Eliminación de su dependiente menor realizado.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(UserDependentPage);
        }else{
          let alert = this.alertCtrl.create({
            title: 'Ocurrió un error:',
            subTitle: 'Eliminación de su dependiente menor no realizada.',
            buttons: ['OK']
          });
          alert.present();
        }
      },err=>{
        console.log(err);
      });
    }else if(tuser=='esmayor'){
      console.log("mayor drop");
      var urlUsuarioC = "http://saludtotalapp.com/wservice/formulario/usrdpndel/";
      var header6 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioC = "";
      bodyUsuarioC = 
          "&idusr="     +   this.idUser   +
          "&idform="    +   user.idForm             +
      "";
      console.log(bodyUsuarioC);
      this.data= this.http.post(urlUsuarioC, bodyUsuarioC, header6);
      this.data.subscribe(data=>{
        console.log(data);
        if(data.code!=500){
          let alert = this.alertCtrl.create({
            title: 'Eliminación exitosa:',
            subTitle: 'Eliminación de su dependiente mayor realizado.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(UserDependentPage);
        }else{
          let alert = this.alertCtrl.create({
            title: 'Ocurrió un error:',
            subTitle: 'Eliminación de su dependiente mayor no realizada.',
            buttons: ['OK']
          });
          alert.present();
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
    load.dismiss();
  }

  goPage(typeUser) {
    // That's right, we're pushing to ourselves!
    /*this.navCtrl.push(UserDependentPage, {
      typeUser: typeUser
    });*/
    this.navCtrl.push(UserDependentPage, {
      typeUser: typeUser
    });
  }
  userTap(user, tu){
    console.log(user);
    console.log(tu);
    console.log("user tap: ", user["ID"]);
    if(user["ID"]){
      window.localStorage.setItem('formIDDependent', user["ID"]);
    }else{
      window.localStorage.setItem('formIDDependent', user["idForm"]);
    }    
  	/*this.navCtrl.push(UserDependentPage, {
      userTap: user,
      tu: tu
    });*/
    this.navCtrl.push(UserDependentPage, {
      userTap: user,
      tu: tu
    });
  }
  goAddUserConven(){
  	/*this.navCtrl.push(UserDependentPage, {
      addUDC: true
    });*/
    this.navCtrl.push(UserDependentPage, {
      addUDC: true
    });
  }
  goAddUserMinor(){
  	/*this.navCtrl.push(UserDependentPage, {
      addUDM: true
    });*/
    this.navCtrl.push(UserDependentPage, {
      addUDM: true
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDependentPage');
    this.menu.swipeEnable(false);
  }

	goUpdatePage(){
    console.log("goUpdatePage: ", this.detailUserReceivedPage);
		this.navCtrl.push(RegisterDataUserPage, {
      updateUD: this.detailUserReceivedPage
    });
	}
  goUpdatePageMinor(){
    console.log("goUpdatePageMinor: ", this.detailUserReceivedPage);
    this.navCtrl.push(RegisterDataUDependenMinorPage, {
      updateUD: this.detailUserReceivedPage
    });
  }
  
	goStateCurrent(){
  		this.navCtrl.push(CurrentStatePage, {
	      idUD: 1
	    });		
	}
  goStateCurrentConven(){
      this.navCtrl.push(CurrentStatePage, {
        idUD: 1
      });   
  }
  goStateCurrentMinor(){
      this.navCtrl.push(CurrentStatePage, {
        idUD: 2
      });   
  }
	goNextControls(){
  		this.navCtrl.push(NextControlsPage, {
	      idUD: 1
	    });		
	}
  goNextControlsMinor(){
      this.navCtrl.push(NextControlsPage, {
        idUD: 2
      });   
  }
	goTracing(){
  		this.navCtrl.push(TracingPage, {
	      idUD: 1
	    });		
	}

  postRequestRegisterUDC(){
    console.log("registrando nuevo usuario dependiente convencional");
    var url = "http://saludtotalapp.com/wservice/formulario/save/";
    var header7 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
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
      "&talla="    + 0               +
      "&peso="     + 0               +
      "&hemo="     + 0               +
      "&hipt="     + -1              +
      "&prart="    + -1              +
      "&diabe="    + -1              +
      "&tdiabe="   + -1              +
      "&fucdiabe=" + "1900/01/01"    +
      "&hemoglic=" + -1              +
      "&hemoayun=" + -1              +
      "&hemoalim=" + -1              +
      "&fucgra="   + "1900/01/01"    +
      "&coleldl="  + -1              +
      "&colehdl="  + -1              +
      "&trigli="   + 0               +
      "&mabdom="   + -1              +
      "&fuma="     + -1              +
      "&cigxdia="  + 0               +
      "&aosfuma="  + 0               +
      "&fodon="    +  "1900/01/01"   +
      "&fgastr="   + "1900/01/01"    +
      "&tgastr="   + -1              +
      "&fcolo="    + "1900/01/01"    +      
      "&tcolo="    + -1              +
      "&fojo="     + "1900/01/01"    +
      "&tojo="     + -1              +
      "&depen="    + 1               +
      "&menedad="  + 0               +
      "&antfam="   + -1              +
      "&codenf="   + -1              +
      "&ucprearte="   + "1900/01/01"             +
      "&ucmp="   + "1900/01/01"             +
      "&estratpresarte="  + -1 +
      "&vacneumo="   + -1 +
      "&contembar="  + "0" +
      "&usr="      + this.idUser     +
    "";
    this.data= this.http.post(url, body, header7);
    this.data.subscribe(data=>{
      console.log(data);
      if(data.code=="100"){
        console.log(url);
        this.detailUserDCPage=false;
        this.detailUserDMPage=false;
        this.navCtrl.push(UserDependentPage, {
          typeUser: "userConven",
          addUDC: false,
          addUDM: false
        });
        let alert = this.alertCtrl.create({
          title: 'Registro exitoso:',
          subTitle: 'Registro de su dependiente adulto realizado.',
          buttons: ['OK']
        });
        alert.present(); 
        //this.registerOk(data)
        //this.goRegisterData();   
      }else if(data.code=="500"){
        console.log('MAL');
        this.navCtrl.push(UserDependentPage, {
          typeUser: "userConven"
        });
        let alert = this.alertCtrl.create({
            title: 'Ocurrio un problema !',
            subTitle: 'Intentelo más tarde. Si el problema persiste porfavor contactar con el soporte.',
            buttons: ['OK']
        });
        alert.present();
      }
    });    
  }

  postRequestRegisterUDM(){
    console.log("registrando nuevo usuario dependiente convencional");
    var url = "http://saludtotalapp.com/wservice/formulario/mesave/";
    var header8 = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
    let body = "";
    body = 
      "&idform="    + this.idForm     +
      "&idusr="     + this.idUser     + 
      "&nom="       + this.nameUser   + 
      "&pat="       + this.maternalSurnameUser  +
      "&mat="       + this.paternalSurnameUser  +
      "&gen="       + -1              +
      "&fecnac="    + "2000/01/01"    +
      "&tiplac="    + 0              +
      "&hemo="      + 0              +
      "&peso="      + 0              +
      "&codvac="    + 0              +
      "&codcon="    + 0              +      
    "";
    this.data= this.http.post(url, body, header8);
    this.data.subscribe(data=>{
      console.log(data);
      if(data.code=="100"){
        console.log(url);
        this.detailUserDCPage=false;
        this.detailUserDMPage=false;
        this.navCtrl.push(UserDependentPage, {
          typeUser: "userMinor",
          addUDC: false,
          addUDM: false
        });
        let alert = this.alertCtrl.create({
          title: 'Registro exitoso:',
          subTitle: 'Registro de su dependiente niño realizado.',
          buttons: ['OK']
        });
        alert.present(); 
        //this.registerOk(data)
        //this.goRegisterData();   
      }else if(data.code=="500"){
        console.log('MAL');
        this.navCtrl.push(UserDependentPage, {
          typeUser: "userMinor"
        });
        let alert = this.alertCtrl.create({
          title: 'Ocurrió un error:',
          subTitle: 'No se pudo registrar el usuario.',
          buttons: ['OK']
        });
        alert.present();
      }
    });    
  }

}
