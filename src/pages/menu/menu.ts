import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { PreLoginPage } from '../pre-login/pre-login';
import { HomePage } from '../home/home';
//import { ListPage } from '../list/list';
//import { LoginPage } from '../login/login';
//import { RegisterPage } from '../register/register';
import { RegisterDataUserPage } from '../register-data-user/register-data-user';
import { UserDependentPage } from '../user-dependent/user-dependent';
//import { ListRequestPage } from '../list-request/list-request';
import { RequestServicePage } from '../request-service/request-service';
import { CurrentStatePage } from '../current-state/current-state';
import { EmergencyPage } from '../emergency/emergency';
import { PharmacyPage } from '../pharmacy/pharmacy';
import { NextControlsPage } from '../next-controls/next-controls';
import { TracingPage } from '../tracing/tracing';
//import { RegisterDataUDependenMinorPage } from '../register-data-u-dependen-minor/register-data-u-dependen-minor';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  stateSession:any;
  latitude:any;
  longitude:any;
  dir:any;
  provincia:any;
  ciudad:any;
  distrito:any;

  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public geolocation: Geolocation, public geocoder: NativeGeocoder, public toaster: ToastController) {
    this.stateSession = window.localStorage.getItem('stateSession');
    if(!this.stateSession || this.stateSession == 'false' || this.stateSession == null ){
      //this.navCtrl.push(LoginPage);
      this.navCtrl.push(PreLoginPage).then(() => {
        const index = this.navCtrl.getActive().index;
        this.navCtrl.remove(0, index);
      });
    }else{
      
    }
  }

  geolocate(){
    
    this.geolocation.getCurrentPosition().then( (position: Geoposition) =>{
      this.getCountry(position);
    }).catch((err) => {
      alert(err);
    });
  }

  getCountry( pos ){
    let options = {
      enableHightAccurracy: true
    };
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
    .then((result: NativeGeocoderReverseResult[]) => {
      console.log(JSON.stringify(result[0]))
      let country = this.toaster.create({
        message: JSON.stringify(result[0]),
        duration: 4000
      });
      country.present();
      this.dir = JSON.stringify(result[0]);
      this.provincia = "";
      this.ciudad = "";
      this.distrito = this.dir.locality;
    })
    .catch((error: any) => console.log(error));
  }

  go(){
  	this.navCtrl.push(MenuPage);
  }
  goPageEmergency(){
  	this.navCtrl.push(EmergencyPage);
  }
  goPageMyDates(){
  	this.navCtrl.push(RegisterDataUserPage);
  }
  goPageMyDependents(){
  	this.navCtrl.push(UserDependentPage);
  }
  goPageRequestService(){
  	this.navCtrl.push(RequestServicePage);
  }
  goPageCurrentState(){
  	this.navCtrl.push(CurrentStatePage);
  }
  goPageFarmacys(){
  	this.navCtrl.push(PharmacyPage);
  }
  goPageAlerts(){
  	this.navCtrl.push(NextControlsPage);
  }
  goPagePromotions(){
  	this.navCtrl.push(HomePage);
  }
  goPageTrack(){
  	this.navCtrl.push(TracingPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.menu.swipeEnable(false);
  }

  closeSesion(user, tuser){
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Desea salir de su cuenta?',
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
            window.localStorage.setItem('stateSession', 'false');
            window.localStorage.setItem('userID', '');
            window.localStorage.setItem('userNEW', '');      
            window.localStorage.setItem('formID', '');
            window.localStorage.setItem('formIDDependent', '');
            window.localStorage.setItem('nameUser', '');
            window.localStorage.setItem('maternalSurnameUser', '');      
            window.localStorage.setItem('paternalSurnameUser', '');   
            this.navCtrl.push(PreLoginPage).then(() => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(0, index);
            });

          }
        }
      ]
    });
    alert.present();    
  }    

}
