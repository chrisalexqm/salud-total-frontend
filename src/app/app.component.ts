import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { MenuPage } from '../pages/menu/menu';
import { PreLoginPage } from '../pages/pre-login/pre-login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RegisterDataUserPage } from '../pages/register-data-user/register-data-user';
import { UserDependentPage } from '../pages/user-dependent/user-dependent';
import { ListRequestPage } from '../pages/list-request/list-request';
import { RequestServicePage } from '../pages/request-service/request-service';
import { CurrentStatePage } from '../pages/current-state/current-state';
import { EmergencyPage } from '../pages/emergency/emergency';
import { PharmacyPage } from '../pages/pharmacy/pharmacy';
import { NextControlsPage } from '../pages/next-controls/next-controls';
import { TracingPage } from '../pages/tracing/tracing';
import { RegisterDataUDependenMinorPage } from '../pages/register-data-u-dependen-minor/register-data-u-dependen-minor';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = PreLoginPage;
  pages: Array<{title: string, component: any, logout: boolean, icon: string, color: string}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Noticias', component: HomePage, logout:false, icon: 'paper', color: 'gray' },
      { title: 'Actualizar mis datos', component: RegisterDataUserPage, logout:false, icon: 'clipboard', color: '#4E6BA3' },
      //{ title: 'Actualizar mis datos', component: HomePage },
      { title: 'Usuarios dependientes', component: UserDependentPage, logout:false, icon: 'contacts', color: '#51C536' },
      { title: 'Solicitar servicios', component: ListRequestPage, logout:false, icon: 'medkit', color: '#F64C81' },
      { title: 'Mi estado actual', component: CurrentStatePage, logout:false, icon: 'body', color: '#53C7EB' },
      { title: 'Emergencia', component: EmergencyPage, logout:false, icon: 'medical', color: '#EF5669' },
      { title: 'Farmacia', component: PharmacyPage, logout:false, icon: 'beaker', color: '#5398F7' },
      { title: 'Próximos controles', component: NextControlsPage, logout:false, icon: 'calendar', color: '#9DD12D' },
      { title: 'Seguimiento', component: TracingPage, logout:false, icon: 'stats', color: '#4E6BA3' },
      { title: 'Salir', component: LoginPage, logout:true, icon: 'close', color: '#F64C81' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /**/
      var self = this.nav;
      var notificationOpenedCallback = function(jsonData) {
        //alert("Notificación abierta");
        var stateSession = window.localStorage.getItem('stateSession');
        if(!stateSession || stateSession == 'false' || stateSession == null ){

        }else{
          /*var str = JSON.stringify(jsonData);
          var np  = str.search("Preventiva");
          var ncp = str.search("Chequeo");
          var nn  = str.search("Noticias");
          var nr  = str.search("Recomendacion");*/

          var np  =0;
          var ncp = 0;
          var nn  = 0;
          var nr  = 0;

          if(np >=0){
            self.setRoot(RegisterDataUserPage);
          }else if(ncp>=0){
            self.setRoot(RequestServicePage);
          }else if(nn>=0 || nr>=0){
            self.setRoot(HomePage);
          }

        }
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
      /*window["plugins"].OneSignal
        .startInit("b764f9dd-4c74-418d-b0ae-0786fcecbd08")
        .handleNotificationOpened(notificationOpenedCallback)
        //.handleNotificationReceived(notificationReceivedCallback)
        .endInit();
      window['plugins'].OneSignal.getIds((id)=>{
          console.log(id);
          //this.nav.setRoot(HomePage);
          window.localStorage.setItem('playerID', JSON.stringify(id.userId));
          window.localStorage.setItem('pushToken', JSON.stringify(id.pushToken));
          window.localStorage.setItem('statePlayer', 'iniciado');
      });*/
      window.localStorage.setItem('playerID', "aaaaaaaaaaaaaaaa");
          window.localStorage.setItem('pushToken', "aaaaaaaaa");
          window.localStorage.setItem('statePlayer', 'iniciado');

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.logout==false) {
      this.nav.setRoot(page.component);
    }else{
      window.localStorage.setItem('stateSession', 'false');
      window.localStorage.setItem('userID', '');
      window.localStorage.setItem('userNEW', '');
      window.localStorage.setItem('formID', '');
      window.localStorage.setItem('formIDDependent', '');
      window.localStorage.setItem('nameUser', '');
      window.localStorage.setItem('maternalSurnameUser', '');
      window.localStorage.setItem('paternalSurnameUser', '');
      this.nav.setRoot(page.component);
    }

  }
}
