import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavParams } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { MenuPage } from '../pages/menu/menu';
import { MyApp } from './app.component';
import { PreLoginPage } from '../pages/pre-login/pre-login';
import { ForgottenPasswordPage } from '../pages/forgotten-password/forgotten-password';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { DetailRequestProductPage } from '../pages/detail-request-product/detail-request-product';
import { ListRequestProductPage } from '../pages/list-request-product/list-request-product';
import { PhamacyStorePage } from '../pages/phamacy-store/phamacy-store';

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    RegisterDataUserPage,
    UserDependentPage,
    ListRequestPage,
    RequestServicePage,
    CurrentStatePage,
    EmergencyPage,
    PharmacyPage,
    NextControlsPage,
    TracingPage,
    RegisterDataUDependenMinorPage,
    PreLoginPage,
    ForgottenPasswordPage,
    MenuPage,
    PhamacyStorePage,
    ListRequestProductPage,
    DetailRequestProductPage
  ],//\u00e7
  imports: [
    BrowserModule,
    IonicSelectableModule,
    HttpClientModule,
    //IonicModule.forRoot(MyApp)
      IonicModule.forRoot(MyApp, {
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
      dayNames: ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado' ],
      dayShortNames: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab' ]
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    RegisterDataUserPage,
    UserDependentPage,
    ListRequestPage,
    RequestServicePage,
    CurrentStatePage,
    EmergencyPage,
    PharmacyPage,
    NextControlsPage,
    TracingPage,
    RegisterDataUDependenMinorPage,
    PreLoginPage,
    ForgottenPasswordPage,
    MenuPage,
    PhamacyStorePage,
    ListRequestProductPage,
    DetailRequestProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    LaunchNavigator
  ]
})
export class AppModule {}
