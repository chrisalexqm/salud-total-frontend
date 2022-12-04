import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ForgottenPasswordPage } from '../forgotten-password/forgotten-password';

//import { RegisterDataUserPage } from '../register-data-user/register-data-user';
//import { PreLoginPage } from '../pre-login/pre-login';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the PreLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-login',
  templateUrl: 'pre-login.html',
})
export class PreLoginPage {
  stateSession:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
  	this.stateSession = window.localStorage.getItem('stateSession');
    if(!this.stateSession || this.stateSession == 'false' || this.stateSession == null ){

    }else{
      this.navCtrl.push(MenuPage);
    }
  }

  ionViewDidLoad() {
  	this.menu.swipeEnable(false);
  }

  goLogin(){
  	this.navCtrl.push(LoginPage, {
  		page: 'login'
  	});
  }	
  goRegister(){
  	this.navCtrl.push(LoginPage, {
  		page: 'register'
  	});
  }
  goForgottenPassword(){
  	this.navCtrl.push(ForgottenPasswordPage);
  }
}
