import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { UserDependentPage } from '../user-dependent/user-dependent';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MenuPage } from '../menu/menu';
import moment from 'moment';
/**
 * Generated class for the RegisterDataUDependenMinorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-data-u-dependen-minor',
  templateUrl: 'register-data-u-dependen-minor.html',
})
export class RegisterDataUDependenMinorPage {
  data: Observable<any>;
  updateUD:any;
  nameUser:string;
  paternalSurnameUser:string;
  maternalSurnameUser:string;
  genderOption:any;
  birthdate:any;
  age:any;
  hemoglobin:any;
  typeLactancy:any;
  weight:any;
  //vacuns:string[];
  vacuns:Array<{Id: number, Meses:number, Descripcion:string}>;
  vacunSelect:string;
  //controls:string[];
  controls:Array<{Id: number, Descripcion:string, Meses:number}>;
  controlSelect:string;
  idFormDependent:number;
  idUser:number;
  messageControls:string;
  messageVacuns:string
  messageHemoglobin:string
  userObject:any;
  birthdateEnable:boolean;
  constructor(private menu: MenuController, public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController) {
  	this.birthdateEnable = false;
    this.loading();
    this.updateUD = navParams.get('updateUD');
  	if(this.updateUD){
  		this.idFormDependent = this.updateUD["ID"];
  		console.log("this.updateUD: ", this.updateUD);
  	}

	  this.idUser = parseInt(window.localStorage.getItem('userID'));
    //OBTENER DATOS DEL USUARIO
      var urlUsuarioM = "http://saludtotalapp.com/wservice/formulario/consdepmen/";
      var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioM = "";
      bodyUsuarioM =
          "&idusr="     +   this.idUser   		+
          "&idudm="   	+   this.idFormDependent+
      "";
      this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
      this.data.subscribe(data=>{
        //this.usersMinor = data;
        this.userObject = data[0];
        this.nameUser = data[0].Nombre;
    		this.paternalSurnameUser = data[0].Paterno;
    		this.maternalSurnameUser = data[0].Materno;
    		this.genderOption = data[0].Codgen;
        console.log("genderOption: ");
        console.log(this.genderOption);
    		//this.birthdate = data[0].FecNac;
        this.birthdate = moment(data[0].FecNac,'DD-MM-YYYY').format('YYYY-MM-DD');
        if(this.birthdate){
          this.onChangeBirthdate();
        }
        if(this.birthdate == "2000-01-01" || this.birthdate == "2000/01/01"){
          this.birthdateEnable = true;
        }else{
          this.birthdateEnable = false;
        }

    		//this.hemoglobin = data[0].Hemo;
        if(parseFloat(data[0].Hemo) <= 0){
          this.hemoglobin = "";
        }else{
          this.hemoglobin = data[0].Hemo;
          this.onChangeDataBase();
          //this.onChangeHemoglobin();
        }
        //this.weight = data[0].Peso;
    		if(parseFloat(data[0].Peso) <= 0){
          this.weight = "";
        }else{
          this.weight = data[0].Peso;
        }
        this.typeLactancy = data[0].CodLact;
    		var vacunas = data[0].CodVac.split(",");
    		this.vacunSelect = vacunas;
        if(this.vacunSelect){
          this.onChangeVacuns();
        }
    		var controles = data[0].CodControl.split(",");
  		  this.controlSelect = controles;
        if(this.controlSelect){
          this.onChangeControls();
        }
          console.log('data', data);
        },err=>{
          console.log(err);
        });
      this.vacuns = [];
      this.controls = [];

  }

  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  goMenu(){
    this.navCtrl.push(MenuPage);
  }

  loading(){
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 2000
    });
    load.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterDataUDependenMinorPage');
    this.menu.swipeEnable(false);
  }
  onChangeBirthdate(){
  	var hoy = moment().format('YYYY-MM-DD');
	  var fnacimiento = moment(this.birthdate);//moment(this.birthdate, "DD-MM-YYYY").format('YYYY-MM-DD');

  	var fnacimientof = moment(fnacimiento);
	  var hoyf = moment(hoy);

	  var meses_diferencia = hoyf.diff(fnacimientof, 'months');
  	console.log(meses_diferencia);

  	this.age = meses_diferencia;
    this.llenarCBOs();
    this.onChangeHemoglobin();

	/*for (i = 0; i < this.precontrols.length; i++) {
		console.log("this.precontrols[i].Meses: ", this.precontrols[i].Meses);
	    if(this.precontrols[i].Meses == meses_diferencia){
	    	console.log("cerrar loop");
	    	//i = this.precontrols.length;
	    	return;
	    }else{
	    	console.log("agrear item al array");
	    	this.controls.push(this.precontrols[i]);
	    }
	    //this.control.push(this.precontrols[i]);
	}*/

  }
  llenarCBOs(){

    if(this.age<=1){
      this.vacuns = [];
      /*this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'}
      );*/
    }else if(this.age==2){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'}
      );
    }else if(this.age<=4 || this.age==5){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'}
      );
    }else if(this.age<=6 && this.age!=5){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'},
          {Id: 3,Meses: 6,Descripcion: '6 meses cumplidos'}
      );
    }else if(this.age<=7){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'},
          {Id: 3,Meses: 6,Descripcion: '6 meses cumplidos'},
          {Id: 4,Meses: 7,Descripcion: '7 meses cumplidos'}
      );
    }else if(this.age<=11){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'},
          {Id: 3,Meses: 6,Descripcion: '6 meses cumplidos'},
          {Id: 4,Meses: 7,Descripcion: '7 meses cumplidos'},
          {Id: 5,Meses: 8,Descripcion: '8 meses cumplidos'}
      );
    }else if(this.age<=14 && this.age!=9 && this.age!=10 && this.age!=11){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'},
          {Id: 3,Meses: 6,Descripcion: '6 meses cumplidos'},
          {Id: 4,Meses: 7,Descripcion: '7 meses cumplidos'},
          {Id: 5,Meses: 8,Descripcion: '8 meses cumplidos'},
          {Id: 6,Meses: 12,Descripcion: '12 meses cumplidos'}
      );
    }else if(this.age<=17 && this.age!=14 && this.age!=13){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'},
          {Id: 3,Meses: 6,Descripcion: '6 meses cumplidos'},
          {Id: 4,Meses: 7,Descripcion: '7 meses cumplidos'},
          {Id: 5,Meses: 8,Descripcion: '8 meses cumplidos'},
          {Id: 6,Meses: 12,Descripcion: '12 meses cumplidos'},
          {Id: 7,Meses: 15,Descripcion: '15 meses cumplidos'}
      );
    }else if(this.age<=47 && this.age!=17 && this.age!=16){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'},
          {Id: 3,Meses: 6,Descripcion: '6 meses cumplidos'},
          {Id: 4,Meses: 7,Descripcion: '7 meses cumplidos'},
          {Id: 5,Meses: 8,Descripcion: '8 meses cumplidos'},
          {Id: 6,Meses: 12,Descripcion: '12 meses cumplidos'},
          {Id: 7,Meses: 15,Descripcion: '15 meses cumplidos'},
          {Id: 8,Meses: 18,Descripcion: '18 meses cumplidos'}
      );
    }else if(this.age>=48){
      this.vacuns = [];
      this.vacuns.push(
          {Id: 1,Meses: 2,Descripcion: '2 meses cumplidos'},
          {Id: 2,Meses: 4,Descripcion: '4 meses cumplidos'},
          {Id: 3,Meses: 6,Descripcion: '6 meses cumplidos'},
          {Id: 4,Meses: 7,Descripcion: '7 meses cumplidos'},
          {Id: 5,Meses: 8,Descripcion: '8 meses cumplidos'},
          {Id: 6,Meses: 12,Descripcion: '12 meses cumplidos'},
          {Id: 7,Meses: 15,Descripcion: '15 meses cumplidos'},
          {Id: 8,Meses: 18,Descripcion: '18 meses cumplidos'},
          {Id: 9,Meses: 48,Descripcion: '48 meses cumplidos'}
      );
    }

    /*switch (true) {
          case (this.age<=2):

              break;
          case (this.weeksPregnancy <= 26):

              break;
          case (this.weeksPregnancy <= 32):

              break;
          case (this.weeksPregnancy <= 38):

              break;
      }*/
    if(this.age<2){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1}
      );
    }else if(this.age<=2){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2}
      );
    }else if(this.age<=3){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3}
      );
    }else if(this.age<=4 ){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
        {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4}
      );
    }else if(this.age<=5){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
        {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
        {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5}
      );
    }else if(this.age<=6){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
        {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
        {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
        {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6}
      );
    }else if(this.age<=7){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
        {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
        {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
        {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6}
      );
    }else if(this.age<=9 && this.age!=7){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
        {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
        {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
        {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
        {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8}
      );
    }else if(this.age<=11 && this.age!=7 && this.age!=9){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
        {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
        {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
        {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
        {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
        {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10}
      );
    }else if(this.age<=14 && this.age!=7 && this.age!=9 && this.age!=11){
      this.controls = [];
      this.controls.push(
        {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
        {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
        {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
        {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
        {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
        {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
        {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
        {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10},
        {Id: 9,Descripcion: 'Control de los 12 meses', Meses:12}
      );
    }else if(this.age<=17 && this.age!=7 && this.age!=9 && this.age!=11 &&
             this.age!=13 && this.age!=14){
              this.controls = [];
              this.controls.push(
                {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
                {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
                {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
                {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
                {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
                {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
                {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
                {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10},
                {Id: 9,Descripcion: 'Control de los 12 meses', Meses:12},
                {Id: 10,Descripcion: 'Control de los 15 meses', Meses:15}
              );
    }else if(this.age<=20 && this.age!=7 && this.age!=9 && this.age!=11 &&
             this.age!=13 && this.age!=14 && this.age!=16 && this.age!=17){
              this.controls = [];
              this.controls.push(
                {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
                {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
                {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
                {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
                {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
                {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
                {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
                {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10},
                {Id: 9,Descripcion: 'Control de los 12 meses', Meses:12},
                {Id: 10,Descripcion: 'Control de los 15 meses', Meses:15},
                {Id: 11,Descripcion: 'Control de los 18 meses', Meses:18}
              );
    }else if(this.age<=23 && this.age!=7 && this.age!=9 && this.age!=11 &&
             this.age!=13 && this.age!=14 && this.age!=16 && this.age!=17 &&
             this.age!=19 && this.age!=20){
              this.controls = [];
              this.controls.push(
                {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
                {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
                {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
                {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
                {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
                {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
                {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
                {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10},
                {Id: 9,Descripcion: 'Control de los 12 meses', Meses:12},
                {Id: 10,Descripcion: 'Control de los 15 meses', Meses:15},
                {Id: 11,Descripcion: 'Control de los 18 meses', Meses:18},
                {Id: 12,Descripcion: 'Control de los 21 meses', Meses:21}
              );
    }else if(this.age<=29 && this.age!=7 && this.age!=9 && this.age!=11 &&
             this.age!=13 && this.age!=14 && this.age!=16 && this.age!=17 &&
             this.age!=19 && this.age!=20 && this.age!=23 && this.age!=22){
              this.controls = [];
              this.controls.push(
                {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
                {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
                {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
                {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
                {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
                {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
                {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
                {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10},
                {Id: 9,Descripcion: 'Control de los 12 meses', Meses:12},
                {Id: 10,Descripcion: 'Control de los 15 meses', Meses:15},
                {Id: 11,Descripcion: 'Control de los 18 meses', Meses:18},
                {Id: 12,Descripcion: 'Control de los 21 meses', Meses:21},
                {Id: 13,Descripcion: 'Control de los 24 meses', Meses:24}
              );
    }else if(this.age<=35 && this.age!=7 && this.age!=9 &&
             this.age!=11 && this.age!=13 && this.age!=14 &&
             this.age!=16 && this.age!=17 && this.age!=19 &&
             this.age!=20 && this.age!=23 && this.age!=22 &&
             this.age!=29 && this.age!=28 && this.age!=27 && this.age!=26 && this.age!=25){
                this.controls = [];
                this.controls.push(
                  {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
                  {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
                  {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
                  {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
                  {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
                  {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
                  {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
                  {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10},
                  {Id: 9,Descripcion: 'Control de los 12 meses', Meses:12},
                  {Id: 10,Descripcion: 'Control de los 15 meses', Meses:15},
                  {Id: 11,Descripcion: 'Control de los 18 meses', Meses:18},
                  {Id: 12,Descripcion: 'Control de los 21 meses', Meses:21},
                  {Id: 13,Descripcion: 'Control de los 24 meses', Meses:24},
                  {Id: 14,Descripcion: 'Control de los 30 meses', Meses:30}
                );
    }else if(this.age<=36 && this.age!=7 && this.age!=9 &&
             this.age!=11 && this.age!=13 && this.age!=14 &&
             this.age!=16 && this.age!=17 && this.age!=19 &&
             this.age!=20 && this.age!=23 && this.age!=22 &&
             this.age!=29 && this.age!=28 && this.age!=27 &&
             this.age!=26 && this.age!=25 && this.age!=35 &&
             this.age!=34 && this.age!=33 && this.age!=32 && this.age!=31 && this.age!=30){
              this.controls = [];
              this.controls.push(
                {Id: 1,Descripcion: 'Control del mes de nacido', Meses:1},
                {Id: 2,Descripcion: 'Control de los 2 meses',  Meses:2},
                {Id: 3,Descripcion: 'Control de los 3 meses',  Meses:3},
                {Id: 4,Descripcion: 'Control de los 4 meses',  Meses:4},
                {Id: 5,Descripcion: 'Control de los 5 meses',  Meses:5},
                {Id: 6,Descripcion: 'Control de los 6 meses',  Meses:6},
                {Id: 7,Descripcion: 'Control de los 8 meses',  Meses:8},
                {Id: 8,Descripcion: 'Control de los 10 meses', Meses:10},
                {Id: 9,Descripcion: 'Control de los 12 meses', Meses:12},
                {Id: 10,Descripcion: 'Control de los 15 meses', Meses:15},
                {Id: 11,Descripcion: 'Control de los 18 meses', Meses:18},
                {Id: 12,Descripcion: 'Control de los 21 meses', Meses:21},
                {Id: 13,Descripcion: 'Control de los 24 meses', Meses:24},
                {Id: 14,Descripcion: 'Control de los 30 meses', Meses:30},
                {Id: 15,Descripcion: 'Control de los 36 meses', Meses:36}
              );
    }
  }

  onChangeControls(){
    var cantidad_controles = this.controls.length;
    var cantidad_controles_seleccionados = this.controlSelect;
    var cantidad_controles_seleccionados2 = cantidad_controles_seleccionados.length;
    if(cantidad_controles_seleccionados2 == cantidad_controles){
      this.messageControls = 'ok';
    }else{
      this.messageControls = 'error';
    }
  }

  onChangeVacuns(){
    var cantidad_vacunas = this.vacuns.length;
    var cantidad_vacunas_seleccionados = this.vacunSelect;
    var cantidad_vacunas_seleccionados2 = cantidad_vacunas_seleccionados.length;
    if(cantidad_vacunas_seleccionados2 == cantidad_vacunas){
      this.messageVacuns = 'ok';
    }else{
      this.messageVacuns = 'error';
    }
  }

  onChangeDataBase(){
    this.onChangeHemoglobin();
  }

  onChangeHemoglobin(){
    console.log("Calculando estado de hemoglobina");
    this.messageHemoglobin = "";
    if(this.hemoglobin<= 0 || this.hemoglobin ==""){
      this.messageHemoglobin = '';
    }else if(this.age == 2 && (this.hemoglobin>=13.5 && this.hemoglobin<=18.5)){
      this.messageHemoglobin = 'ok';
    }else if(this.age == 2 && (this.hemoglobin<13.5)){
      this.messageHemoglobin = 'anemia';
    }else if(this.age == 2 && (this.hemoglobin>18.5)){
      this.messageHemoglobin = 'anormal';
    }else if((this.age > 2 && this.age <= 5) && (this.hemoglobin>=9.5 && this.hemoglobin<= 13.5)){
      this.messageHemoglobin = 'ok';
    }else if((this.age > 2 && this.age <= 5) && (this.hemoglobin<9.5)){
      this.messageHemoglobin = 'anemia';
    }else if((this.age > 2 && this.age <= 5) && (this.hemoglobin>13.5)){
      this.messageHemoglobin = 'anormal';
    }else if((this.age >= 6 && this.age <= 59) && (this.hemoglobin>=11 && this.hemoglobin<=14)){
      this.messageHemoglobin = 'ok';
    }else if((this.age >= 6 && this.age <= 59) && (this.hemoglobin< 11 )){
      this.messageHemoglobin = 'anemia';
    }else if((this.age >= 6 && this.age <= 59) && (this.hemoglobin> 14 )){
      this.messageHemoglobin = 'anormal';
    }
    console.log(this.messageHemoglobin);
    console.log("Hemoglobina: " + this.hemoglobin);
    console.log("Edad: " + this.age);
  }
  postRequestRegisterUDM(){
    if( this.genderOption == "-1" ){
      let alert = this.alertCtrl.create({
        title: 'Campos vacios:',
        subTitle: 'Seleccione un genero.',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
    console.log("registrando nuevo usuario dependiente convencional");
    var url = "http://saludtotalapp.com/wservice/formulario/meupd/";
    var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
    let body = "";
    if(!this.nameUser){
    	this.nameUser=""
    }if(!this.paternalSurnameUser){
    	this.paternalSurnameUser="";
    }if(!this.maternalSurnameUser){
    	this.maternalSurnameUser="";
    }if(!this.genderOption){
    	this.genderOption="0";
    }if(!this.birthdate){
      console.log("no hay data");
    	this.birthdate="1900/01/01";
    }else{
      console.log("si hay data");
      this.birthdate = moment(this.birthdate).format('YYYY/MM/DD');
    }
    if(!this.typeLactancy){
    	this.typeLactancy=0;
    }if(!this.hemoglobin){
    	this.hemoglobin=0;
    }if(!this.weight){
    	this.weight=0;
    }if(!this.vacunSelect){
    	this.vacunSelect="0";
    }if(!this.controlSelect){
    	this.controlSelect="0";
    }
    //&idudm=5&idusr=3&nom=Pedro&pat=Garcia&mat=Matas&gen=1&fecnac=2018/07/22&tiplac=2&hemo=3.3&peso=4.2&codvac=1,2&codcon=1
    //&idform=8&idusr=49&nom=umenor&pat=umenor&mat=umenor&gen=1&fecnac=2018/07/30
    //&idform=8&idusr=49&nom=umenor&pat=umenor&mat=umenordwd&gen=1&fecnac=30/07/2017&tiplac=0&hemo=0&peso=0&codvac=0&codcon=0

    console.log("this.birthdate", this.birthdate);
    body =
      "&idudm="     + this.idFormDependent		+
      "&idusr="     + this.idUser     			+
      "&nom="       + this.nameUser   			+
      "&pat="       + this.maternalSurnameUser  +
      "&mat="       + this.paternalSurnameUser  +
      "&gen="       + this.genderOption			+
      "&fecnac="    + this.birthdate    		+
      "&tiplac="    + this.typeLactancy			+
      "&hemo="      + this.hemoglobin              	+
      "&peso="      + this.weight              	+
      "&codvac="    + this.vacunSelect.toString()			+
      "&codcon="    + this.controlSelect.toString()		+
    "";
    console.log(body);
    this.data= this.http.post(url, body, header);
    this.data.subscribe(data=>{
      console.log(data);
      if(data.code=="100"){
        let alert = this.alertCtrl.create({
          title: 'Actualización exitosa:',
          subTitle: 'Actualización de usuario dependiente menor a 5 años exitoso.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(UserDependentPage, {
          userTap: this.userObject,
          tu: 'esmenor'
        });
        //this.registerOk(data)
        //this.goRegisterData();
      }else if(data.code=="500"){
        console.log('MAL');
        let alert = this.alertCtrl.create({
          title: 'Ocurrió un error:',
          subTitle: 'No se pudo actualizar el usuario.',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }
}
