import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  nameUser:any;
  paternalSurnameUser:any;
  maternalSurnameUser:any;
  emailUser:any;
  aliasUser:any;
  passwordUser:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  	this.nameUser = "";
	this.paternalSurnameUser = "";
	this.maternalSurnameUser = "";
	this.emailUser = "";
	this.aliasUser = "";
	this.passwordUser = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerOk() {
    let alert = this.alertCtrl.create({
      title: 'Usuario registrado',
      subTitle: 'Active su cuenta en su correo electrónico',
      buttons: ['OK']
    });
    alert.present();
  }

  registerFailDI() {
    let alert = this.alertCtrl.create({
      title: 'Datos incompletos!',
      subTitle: 'Ingrese todos los datos solicitados',
      buttons: ['Entendido']
    });
    alert.present();
  }

  registerFailDF() {
    let alert = this.alertCtrl.create({
      title: 'Datos incorrectos!',
      subTitle: 'Ingrese datos validos',
      buttons: ['Entendido']
    });
    alert.present();
  }

  registerUser(){
  	let nameUser = this.nameUser.toString().trim();
	let patSUser = this.paternalSurnameUser.toString().trim();
	let matSUser = this.maternalSurnameUser.toString().trim();
	let emailUser = this.emailUser.toString().trim();
	let aliasUser = this.aliasUser.toString().trim();
	let passwordUser = this.passwordUser.toString().trim();

	if(nameUser=="" && patSUser=="" && matSUser=="" && emailUser=="" && aliasUser=="" && passwordUser==""){
		this.registerFailDI();
	}else if(nameUser.length<4 && patSUser.length<4 && matSUser.length<4 && emailUser.length<4 && aliasUser.length<4 && passwordUser.length<4){
		this.registerFailDF();
	}else{
		this.registerOk();
		this.navCtrl.push(HomePage);
	}
  }

}
