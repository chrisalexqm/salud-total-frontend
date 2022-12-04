import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { HomePage } from '../home/home';
import { ListRequestPage } from '../list-request/list-request';
import { MenuPage } from '../menu/menu';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { CboGeneral } from '../../models/cbo';

/**
 * Generated class for the RequestServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-service',
  templateUrl: 'request-service.html',
})
export class RequestServicePage {

  dir: any;
  geoDepartamento: any;
  geoProvincia: any;
  latitude: any;
  longitude: any;

  data: Observable<any>;

  typeRequest: string = '2';

  distritoRequest: CboGeneral[] = [] as CboGeneral[];
  distritoSelect: string;

  //stateInsurance: string;

  insuranceSelect: string;
  insurance: CboGeneral[] = [] as CboGeneral[];

  providerSelect: string;
  provider: any[];

  referency: string;

  //typeSpecialty: string[];
  typeSpecialtyC: Array<{ Id: number, Descripcion: string }>;
  typeSpecialty: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  specialtySelect: string;
  specialty: Array<{ ID: string, Descripcion: string, TipoSeleccion: string }>;

  serviceSelect: any;
  //service: Array<{IDServ: string, Servicio: string, Precio: string, Descuento: string, TotalIGVConDescuento: string}>;
  service: Array<{ ID: string, Des: string }>;
  serviceTypeSelection: string;
  typeTest: string[];
  typeTestSelect: string;
  distritoSelectPerson: any;
  provinciaIDSelect: any;
  provinciasSelect: any = [];
  departamentoIDSelect: any;
  servicePrice: any;
  //igv:number;
  igv: any;
  priceTotal: any;
  descount: any;

  name: string;
  apePat: string;
  apeMat: string;
  nameUser: string;
  paternalSurnameUser: string;
  maternalSurnameUser: string;
  gender: string;
  age: string;
  address: string;
  dni: string;
  phone: string;
  idUser: any;
  precioPasaje: any;

  departamentos: any[];
  provincias: any[];

  provincia: any;
  ciudad: any;
  distrito: any;

  depPush: any[];

  itemRay: any[];
  itemRay2: any[];

  hideCiudad: boolean = true;
  hideProvincia: boolean = true;
  priPage: boolean = false;
  segPage: boolean = false;

  serviceSelectFix: any;

  //test:string[];
  testo: Array<{ ID: string, IdProv: string, IdEsp: string, IdTipEx: string, IdEx: string, Examen: string, Descuento: string, Precio: string, Idest: string }>;

  constructor(private menu: MenuController, public navCtrl: NavController, public geolocation: Geolocation, public geocoder: NativeGeocoder, public loadingCtrl: LoadingController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient, public toaster: ToastController) {
    // Municipalidad Metropolitana de Lima
    // Provincia de Lima
    if (!navParams.get('segPage')) {
      this.priPage = false;
      this.segPage = true;
    } else {
      this.segPage = false;
      this.priPage = true;
      this.dni = navParams.get('dniPriPage');
      this.phone = navParams.get('phonePriPage');
      this.serviceSelectFix = navParams.get('serviceSelect');
      this.insuranceSelect = navParams.get('insuranceSelect');
      this.providerSelect = navParams.get('providerSelect');
      this.typeRequest = navParams.get('typeRequest');
      this.specialtySelect = navParams.get('specialtySelect');
      this.serviceTypeSelection = navParams.get('serviceTypeSelection');
      this.servicePrice = navParams.get('servicePrice');
      this.priceTotal = navParams.get('priceTotal');
      this.idUser = navParams.get('idUser');
      this.departamentoIDSelect = navParams.get('departamentoIDSelect');
      this.provinciaIDSelect = navParams.get('provinciaIDSelect');
      this.distritoSelect = navParams.get('distritoSelect');
    }
    this.departamentos = [
      {
        "Codigo": "01",
        "Departamento": "Amazonas"
      },
      {
        "Codigo": "02",
        "Departamento": "Áncash"
      },
      {
        "Codigo": "03",
        "Departamento": "Apurímac"
      },
      {
        "Codigo": "04",
        "Departamento": "Arequipa"
      },
      {
        "Codigo": "05",
        "Departamento": "Ayacucho"
      },
      {
        "Codigo": "06",
        "Departamento": "Cajamarca"
      },
      {
        "Codigo": "07",
        "Departamento": "Callao"
      },
      {
        "Codigo": "08",
        "Departamento": "Cusco"
      },
      {
        "Codigo": "09",
        "Departamento": "Huancavelica"
      },
      {
        "Codigo": "10",
        "Departamento": "Huánuco"
      },
      {
        "Codigo": "11",
        "Departamento": "Ica"
      },
      {
        "Codigo": "12",
        "Departamento": "Junín"
      },
      {
        "Codigo": "13",
        "Departamento": "La Libertad"
      },
      {
        "Codigo": "14",
        "Departamento": "Lambayeque"
      },
      {
        "Codigo": "15",
        "Departamento": "Lima"
      },
      {
        "Codigo": "16",
        "Departamento": "Loreto"
      },
      {
        "Codigo": "17",
        "Departamento": "Madre de Dios"
      },
      {
        "Codigo": "18",
        "Departamento": "Moquegua"
      },
      {
        "Codigo": "19",
        "Departamento": "Pasco"
      },
      {
        "Codigo": "20",
        "Departamento": "Piura"
      },
      {
        "Codigo": "21",
        "Departamento": "Puno"
      },
      {
        "Codigo": "22",
        "Departamento": "San Martín"
      },
      {
        "Codigo": "23",
        "Departamento": "Tacna"
      },
      {
        "Codigo": "24",
        "Departamento": "Tumbes"
      },
      {
        "Codigo": "25",
        "Departamento": "Ucayali"
      }
    ];

    this.provincias = [
      {
        "CodigoDepartamento": "01",
        "Departamento": "Amazonas",
        "CodigoProvincia": "01",
        "Provincia": "Chachapoyas"
      },
      {
        "CodigoDepartamento": "01",
        "Departamento": "Amazonas",
        "CodigoProvincia": "02",
        "Provincia": "Bagua"
      },
      {
        "CodigoDepartamento": "01",
        "Departamento": "Amazonas",
        "CodigoProvincia": "03",
        "Provincia": "Bongará"
      },
      {
        "CodigoDepartamento": "01",
        "Departamento": "Amazonas",
        "CodigoProvincia": "04",
        "Provincia": "Condorcanqui"
      },
      {
        "CodigoDepartamento": "01",
        "Departamento": "Amazonas",
        "CodigoProvincia": "05",
        "Provincia": "Luya"
      },
      {
        "CodigoDepartamento": "01",
        "Departamento": "Amazonas",
        "CodigoProvincia": "06",
        "Provincia": "Rodríguez de Mendoza"
      },
      {
        "CodigoDepartamento": "01",
        "Departamento": "Amazonas",
        "CodigoProvincia": "07",
        "Provincia": "Utcubamba"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "01",
        "Provincia": "Huaraz"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "02",
        "Provincia": "Aija"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "03",
        "Provincia": "Antonio Raymondi"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "04",
        "Provincia": "Asunción"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "05",
        "Provincia": "Bolognesi"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "06",
        "Provincia": "Carhuaz"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "07",
        "Provincia": "Carlos Fermín Fitzcarrald"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "08",
        "Provincia": "Casma"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "09",
        "Provincia": "Corongo"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "10",
        "Provincia": "Huari"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "11",
        "Provincia": "Huarmey"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "12",
        "Provincia": "Huaylas"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "13",
        "Provincia": "Mariscal Luzuriaga"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "14",
        "Provincia": "Ocros"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "15",
        "Provincia": "Pallasca"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "16",
        "Provincia": "Pomabamba"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "17",
        "Provincia": "Recuay"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "18",
        "Provincia": "Santa"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "19",
        "Provincia": "Sihuas"
      },
      {
        "CodigoDepartamento": "02",
        "Departamento": "Áncash",
        "CodigoProvincia": "20",
        "Provincia": "Yungay"
      },
      {
        "CodigoDepartamento": "03",
        "Departamento": "Apurímac",
        "CodigoProvincia": "01",
        "Provincia": "Abancay"
      },
      {
        "CodigoDepartamento": "03",
        "Departamento": "Apurímac",
        "CodigoProvincia": "02",
        "Provincia": "Andahuaylas"
      },
      {
        "CodigoDepartamento": "03",
        "Departamento": "Apurímac",
        "CodigoProvincia": "03",
        "Provincia": "Antabamba"
      },
      {
        "CodigoDepartamento": "03",
        "Departamento": "Apurímac",
        "CodigoProvincia": "04",
        "Provincia": "Aymaraes"
      },
      {
        "CodigoDepartamento": "03",
        "Departamento": "Apurímac",
        "CodigoProvincia": "05",
        "Provincia": "Cotabambas"
      },
      {
        "CodigoDepartamento": "03",
        "Departamento": "Apurímac",
        "CodigoProvincia": "06",
        "Provincia": "Chincheros"
      },
      {
        "CodigoDepartamento": "03",
        "Departamento": "Apurímac",
        "CodigoProvincia": "07",
        "Provincia": "Grau"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "01",
        "Provincia": "Arequipa"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "02",
        "Provincia": "Camaná"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "03",
        "Provincia": "Caravelí"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "04",
        "Provincia": "Castilla"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "05",
        "Provincia": "Caylloma"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "06",
        "Provincia": "Condesuyos"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "07",
        "Provincia": "Islay"
      },
      {
        "CodigoDepartamento": "04",
        "Departamento": "Arequipa",
        "CodigoProvincia": "08",
        "Provincia": "La Uniòn"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "01",
        "Provincia": "Huamanga"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "02",
        "Provincia": "Cangallo"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "03",
        "Provincia": "Huanca Sancos"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "04",
        "Provincia": "Huanta"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "05",
        "Provincia": "La Mar"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "06",
        "Provincia": "Lucanas"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "07",
        "Provincia": "Parinacochas"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "08",
        "Provincia": "Pàucar del Sara Sara"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "09",
        "Provincia": "Sucre"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "10",
        "Provincia": "Víctor Fajardo"
      },
      {
        "CodigoDepartamento": "05",
        "Departamento": "Ayacucho",
        "CodigoProvincia": "11",
        "Provincia": "Vilcas Huamán"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "01",
        "Provincia": "Cajamarca"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "02",
        "Provincia": "Cajabamba"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "03",
        "Provincia": "Celendín"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "04",
        "Provincia": "Chota"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "05",
        "Provincia": "Contumazá"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "06",
        "Provincia": "Cutervo"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "07",
        "Provincia": "Hualgayoc"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "08",
        "Provincia": "Jaén"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "09",
        "Provincia": "San Ignacio"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "10",
        "Provincia": "San Marcos"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "11",
        "Provincia": "San Miguel"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "12",
        "Provincia": "San Pablo"
      },
      {
        "CodigoDepartamento": "06",
        "Departamento": "Cajamarca",
        "CodigoProvincia": "13",
        "Provincia": "Santa Cruz"
      },
      {
        "CodigoDepartamento": "07",
        "Departamento": "Callao",
        "CodigoProvincia": "01",
        "Provincia": "Prov. Const. del Callao"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "01",
        "Provincia": "Cusco"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "02",
        "Provincia": "Acomayo"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "03",
        "Provincia": "Anta"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "04",
        "Provincia": "Calca"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "05",
        "Provincia": "Canas"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "06",
        "Provincia": "Canchis"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "07",
        "Provincia": "Chumbivilcas"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "08",
        "Provincia": "Espinar"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "09",
        "Provincia": "La Convención"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "10",
        "Provincia": "Paruro"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "11",
        "Provincia": "Paucartambo"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "12",
        "Provincia": "Quispicanchi"
      },
      {
        "CodigoDepartamento": "08",
        "Departamento": "Cusco",
        "CodigoProvincia": "13",
        "Provincia": "Urubamba"
      },
      {
        "CodigoDepartamento": "09",
        "Departamento": "Huancavelica",
        "CodigoProvincia": "01",
        "Provincia": "Huancavelica"
      },
      {
        "CodigoDepartamento": "09",
        "Departamento": "Huancavelica",
        "CodigoProvincia": "02",
        "Provincia": "Acobamba"
      },
      {
        "CodigoDepartamento": "09",
        "Departamento": "Huancavelica",
        "CodigoProvincia": "03",
        "Provincia": "Angaraes"
      },
      {
        "CodigoDepartamento": "09",
        "Departamento": "Huancavelica",
        "CodigoProvincia": "04",
        "Provincia": "Castrovirreyna"
      },
      {
        "CodigoDepartamento": "09",
        "Departamento": "Huancavelica",
        "CodigoProvincia": "05",
        "Provincia": "Churcampa"
      },
      {
        "CodigoDepartamento": "09",
        "Departamento": "Huancavelica",
        "CodigoProvincia": "06",
        "Provincia": "Huaytará"
      },
      {
        "CodigoDepartamento": "09",
        "Departamento": "Huancavelica",
        "CodigoProvincia": "07",
        "Provincia": "Tayacaja"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "01",
        "Provincia": "Huánuco"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "02",
        "Provincia": "Ambo"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "03",
        "Provincia": "Dos de Mayo"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "04",
        "Provincia": "Huacaybamba"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "05",
        "Provincia": "Huamalíes"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "06",
        "Provincia": "Leoncio Prado"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "07",
        "Provincia": "Marañón"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "08",
        "Provincia": "Pachitea"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "09",
        "Provincia": "Puerto Inca"
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "10",
        "Provincia": "Lauricocha "
      },
      {
        "CodigoDepartamento": "10",
        "Departamento": "Huánuco",
        "CodigoProvincia": "11",
        "Provincia": "Yarowilca "
      },
      {
        "CodigoDepartamento": "11",
        "Departamento": "Ica",
        "CodigoProvincia": "01",
        "Provincia": "Ica "
      },
      {
        "CodigoDepartamento": "11",
        "Departamento": "Ica",
        "CodigoProvincia": "02",
        "Provincia": "Chincha "
      },
      {
        "CodigoDepartamento": "11",
        "Departamento": "Ica",
        "CodigoProvincia": "03",
        "Provincia": "Nazca "
      },
      {
        "CodigoDepartamento": "11",
        "Departamento": "Ica",
        "CodigoProvincia": "04",
        "Provincia": "Palpa "
      },
      {
        "CodigoDepartamento": "11",
        "Departamento": "Ica",
        "CodigoProvincia": "05",
        "Provincia": "Pisco "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "01",
        "Provincia": "Huancayo "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "02",
        "Provincia": "Concepción "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "03",
        "Provincia": "Chanchamayo "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "04",
        "Provincia": "Jauja "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "05",
        "Provincia": "Junín "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "06",
        "Provincia": "Satipo "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "07",
        "Provincia": "Tarma "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "08",
        "Provincia": "Yauli "
      },
      {
        "CodigoDepartamento": "12",
        "Departamento": "Junín",
        "CodigoProvincia": "09",
        "Provincia": "Chupaca "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "01",
        "Provincia": "Trujillo "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "02",
        "Provincia": "Ascope "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "03",
        "Provincia": "Bolívar "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "04",
        "Provincia": "Chepén "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "05",
        "Provincia": "Julcán "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "06",
        "Provincia": "Otuzco "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "07",
        "Provincia": "Pacasmayo "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "08",
        "Provincia": "Pataz "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "09",
        "Provincia": "Sánchez Carrión "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "10",
        "Provincia": "Santiago de Chuco "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "11",
        "Provincia": "Gran Chimú "
      },
      {
        "CodigoDepartamento": "13",
        "Departamento": "La Libertad",
        "CodigoProvincia": "12",
        "Provincia": "Virú "
      },
      {
        "CodigoDepartamento": "14",
        "Departamento": "Lambayeque",
        "CodigoProvincia": "01",
        "Provincia": "Chiclayo "
      },
      {
        "CodigoDepartamento": "14",
        "Departamento": "Lambayeque",
        "CodigoProvincia": "02",
        "Provincia": "Ferreñafe "
      },
      {
        "CodigoDepartamento": "14",
        "Departamento": "Lambayeque",
        "CodigoProvincia": "03",
        "Provincia": "Lambayeque "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "01",
        "Provincia": "Lima "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "02",
        "Provincia": "Barranca "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "03",
        "Provincia": "Cajatambo "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "04",
        "Provincia": "Canta "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "05",
        "Provincia": "Cañete "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "06",
        "Provincia": "Huaral "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "07",
        "Provincia": "Huarochirí "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "08",
        "Provincia": "Huaura "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "09",
        "Provincia": "Oyón "
      },
      {
        "CodigoDepartamento": "15",
        "Departamento": "Lima",
        "CodigoProvincia": "10",
        "Provincia": "Yauyos "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "01",
        "Provincia": "Maynas "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "02",
        "Provincia": "Alto Amazonas "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "03",
        "Provincia": "Loreto "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "04",
        "Provincia": "Mariscal Ramón Castilla "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "05",
        "Provincia": "Requena "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "06",
        "Provincia": "Ucayali "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "07",
        "Provincia": "Datem del Marañón "
      },
      {
        "CodigoDepartamento": "16",
        "Departamento": "Loreto",
        "CodigoProvincia": "08",
        "Provincia": "Putumayo"
      },
      {
        "CodigoDepartamento": "17",
        "Departamento": "Madre de Dios",
        "CodigoProvincia": "01",
        "Provincia": "Tambopata "
      },
      {
        "CodigoDepartamento": "17",
        "Departamento": "Madre de Dios",
        "CodigoProvincia": "02",
        "Provincia": "Manu "
      },
      {
        "CodigoDepartamento": "17",
        "Departamento": "Madre de Dios",
        "CodigoProvincia": "03",
        "Provincia": "Tahuamanu "
      },
      {
        "CodigoDepartamento": "18",
        "Departamento": "Moquegua",
        "CodigoProvincia": "01",
        "Provincia": "Mariscal Nieto "
      },
      {
        "CodigoDepartamento": "18",
        "Departamento": "Moquegua",
        "CodigoProvincia": "02",
        "Provincia": "General Sánchez Cerro "
      },
      {
        "CodigoDepartamento": "18",
        "Departamento": "Moquegua",
        "CodigoProvincia": "03",
        "Provincia": "Ilo "
      },
      {
        "CodigoDepartamento": "19",
        "Departamento": "Pasco",
        "CodigoProvincia": "01",
        "Provincia": "Pasco "
      },
      {
        "CodigoDepartamento": "19",
        "Departamento": "Pasco",
        "CodigoProvincia": "02",
        "Provincia": "Daniel Alcides Carrión "
      },
      {
        "CodigoDepartamento": "19",
        "Departamento": "Pasco",
        "CodigoProvincia": "03",
        "Provincia": "Oxapampa "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "01",
        "Provincia": "Piura "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "02",
        "Provincia": "Ayabaca "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "03",
        "Provincia": "Huancabamba "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "04",
        "Provincia": "Morropón "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "05",
        "Provincia": "Paita "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "06",
        "Provincia": "Sullana "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "07",
        "Provincia": "Talara "
      },
      {
        "CodigoDepartamento": "20",
        "Departamento": "Piura",
        "CodigoProvincia": "08",
        "Provincia": "Sechura "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "01",
        "Provincia": "Puno "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "02",
        "Provincia": "Azángaro "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "03",
        "Provincia": "Carabaya "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "04",
        "Provincia": "Chucuito "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "05",
        "Provincia": "El Collao "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "06",
        "Provincia": "Huancané "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "07",
        "Provincia": "Lampa "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "08",
        "Provincia": "Melgar "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "09",
        "Provincia": "Moho "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "10",
        "Provincia": "San Antonio de Putina "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "11",
        "Provincia": "San Román "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "12",
        "Provincia": "Sandia "
      },
      {
        "CodigoDepartamento": "21",
        "Departamento": "Puno",
        "CodigoProvincia": "13",
        "Provincia": "Yunguyo "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "01",
        "Provincia": "Moyobamba "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "02",
        "Provincia": "Bellavista "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "03",
        "Provincia": "El Dorado "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "04",
        "Provincia": "Huallaga "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "05",
        "Provincia": "Lamas "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "06",
        "Provincia": "Mariscal Cáceres "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "07",
        "Provincia": "Picota "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "08",
        "Provincia": "Rioja "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "09",
        "Provincia": "San Martín "
      },
      {
        "CodigoDepartamento": "22",
        "Departamento": "San Martín",
        "CodigoProvincia": "10",
        "Provincia": "Tocache "
      },
      {
        "CodigoDepartamento": "23",
        "Departamento": "Tacna",
        "CodigoProvincia": "01",
        "Provincia": "Tacna "
      },
      {
        "CodigoDepartamento": "23",
        "Departamento": "Tacna",
        "CodigoProvincia": "02",
        "Provincia": "Candarave "
      },
      {
        "CodigoDepartamento": "23",
        "Departamento": "Tacna",
        "CodigoProvincia": "03",
        "Provincia": "Jorge Basadre "
      },
      {
        "CodigoDepartamento": "23",
        "Departamento": "Tacna",
        "CodigoProvincia": "04",
        "Provincia": "Tarata "
      },
      {
        "CodigoDepartamento": "24",
        "Departamento": "Tumbes",
        "CodigoProvincia": "01",
        "Provincia": "Tumbes "
      },
      {
        "CodigoDepartamento": "24",
        "Departamento": "Tumbes",
        "CodigoProvincia": "02",
        "Provincia": "Contralmirante Villar "
      },
      {
        "CodigoDepartamento": "24",
        "Departamento": "Tumbes",
        "CodigoProvincia": "03",
        "Provincia": "Zarumilla "
      },
      {
        "CodigoDepartamento": "25",
        "Departamento": "Ucayali",
        "CodigoProvincia": "01",
        "Provincia": "Coronel Portillo "
      },
      {
        "CodigoDepartamento": "25",
        "Departamento": "Ucayali",
        "CodigoProvincia": "02",
        "Provincia": "Atalaya "
      },
      {
        "CodigoDepartamento": "25",
        "Departamento": "Ucayali",
        "CodigoProvincia": "03",
        "Provincia": "Padre Abad "
      },
      {
        "CodigoDepartamento": "25",
        "Departamento": "Ucayali",
        "CodigoProvincia": "04",
        "Provincia": "Purús"
      }
    ];


    /*let alert = this.alertCtrl.create({
      title: 'Recuerda!',
      subTitle: 'Puedes informarte sobre los horarios de atención y la cobertura de los servicios brindados por Salud Total visitando la web: saludtotalapp.com <br> Muy pronto, llegaremos donde quiera que estés!',
      buttons: ['OK']
    });
    alert.present(); */

    this.precioPasaje = 0.00;
    this.loading();
    this.idUser = window.localStorage.getItem('userID');
    console.log("this.idUser: ", this.idUser);
    //this.typeRequest="0";
    //this.providerSelect="0";
    //this.specialtySelect="0";
    //this.typeTestSelect="0";
    this.igv = 0.18;
    this.typeSpecialtyC = [];
    //this.priceTotal=0;
    this.name = window.localStorage.getItem('nameUser');
    this.apePat = window.localStorage.getItem('paternalSurnameUser') + " " + window.localStorage.getItem('maternalSurnameUser');
    //SOLICITAR LISTA DE TIPO DE ATENCIÓN
    var urlTipAtencion = "http://saludtotalapp.com/wservice/solicitud/listtip/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let bodyTipAtencion = "";
    bodyTipAtencion =
      "&idprov=" + 1 +
      "";
    this.data = this.http.post(urlTipAtencion, bodyTipAtencion, header);
    this.data.subscribe(data => {
      console.log(data);
    }, err => {
      //this.messageError();
      console.log(err);
    });

    //SOLICITAR LISTA DE ASEGURADORAS
    var urlAsegurador = "http://saludtotalapp.com/wservice/solicitud/listaseg/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let bodyAsegurador = "";
    bodyAsegurador =
      "";
    this.data = this.http.post(urlAsegurador, bodyAsegurador, header);
    this.data.subscribe(data => {
      console.log(data);
      this.insurance = data;
    }, err => {
      console.log(err);
    });
    //SOLICITAR LISTA DE ESPECIALIDADES
    var urlEpecialidad = "http://saludtotalapp.com/wservice/solicitud/listesp/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let bodyEspecialidad = "";
    bodyEspecialidad =
      "";
    this.data = this.http.post(urlEpecialidad, bodyEspecialidad, header);
    this.data.subscribe(data => {
      console.log(data);
      this.specialty = data;
    }, err => {
      //this.messageError();
      console.log(err);
    });
    this.geolocatess();
  }

  irSecondPage() {
    this.navCtrl.push(RequestServicePage, {
      segPage: true,
      dniPriPage: this.dni,
      phonePriPage: this.phone,
      serviceSelect: this.serviceSelectFix,
      insuranceSelect: this.insuranceSelect,
      providerSelect: this.providerSelect,
      typeRequest: this.typeRequest,
      specialtySelect: this.specialtySelect,
      serviceTypeSelection: this.serviceTypeSelection,
      servicePrice: this.servicePrice,
      priceTotal: this.priceTotal,
      idUser: this.idUser,
      departamentoIDSelect: this.departamentoIDSelect,
      provinciaIDSelect: this.provinciaIDSelect,
      distritoSelect: this.distritoSelect
    });
  }

  backHistory() {
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  getListDepartamentos() {
    var x;
    var d;
    let dep = this.geoDepartamento;//"Municipalidad Metropolitana de Lima";
    for (x in this.departamentos) {
      if (dep != [] && dep != undefined && dep != "undefined" && dep != null && dep != "null") {
        var depaslice = dep.slice(1, -1);
        var depasplit = depaslice.split(" ");
        var o;
        for (o = 0; o < depasplit.length; o++) {
          if (this.departamentos[x].Departamento == depasplit[o]) {

            this.departamentoIDSelect = this.departamentos[x].Codigo;
            this.hideCiudad = false;
            this.getListProvincias();
          }
        }
      } else {
        let alertccrtff = this.alertCtrl.create({
          title: 'Ocurrió un error',
          subTitle: 'Ingrese manualmente el departamento',
          buttons: ['OK']
        });
        alertccrtff.present();
      }
    }

  }

  getListProvincias() {
    this.provinciasSelect = [];
    var y;
    var p;
    for (y in this.provincias) {
      let prov = this.geoProvincia;//"Provincia de Lima";
      if (prov != [] && prov != undefined && prov != "undefined" && prov != null && prov != "null") {
        var provslice1 = prov.slice(1, -1);
        var provsplit1 = provslice1.split(" ");
        if (this.departamentoIDSelect == this.provincias[y].CodigoDepartamento) {
          this.provinciasSelect.push(this.provincias[y]);
          for (p in provsplit1) {
            var provslice = this.provincias[y].Provincia.slice(0, -1);
            if ((provslice == provsplit1[p])) {
              this.provinciaIDSelect = this.provincias[y].CodigoProvincia;
              this.hideProvincia = false;
              break;
            }
          }
          //break;
        }
      }
    }
    this.getListDistritos();
  }
  getListProvinciasss() {
    this.provinciasSelect = [];
    var y;
    for (y in this.provincias) {
      if (this.departamentoIDSelect == this.provincias[y].CodigoDepartamento) {
        this.provinciasSelect.push(this.provincias[y]);
      }
    }
  }

  getListDistritos() {
    console.log("Obteniendo distritos ...");
    this.distritoRequest = [];
    //SOLICITAR LISTA DE DISTRITOS
    var urlDistrito = "http://saludtotalapp.com/wservice/solicitud/listdist/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let bodyDistrito = "";
    bodyDistrito =
      "&iddep=" + this.departamentoIDSelect +
      "&idprov=" + this.provinciaIDSelect +
      "";
    console.log(bodyDistrito);
    this.data = this.http.post(urlDistrito, bodyDistrito, header);
    this.data.subscribe(data => {
      console.log(data);
      this.distritoRequest = data;
      //this.onChangeTypeRequest();
    }, err => {
      //this.messageError();
      console.log(err);
    });
  }

  goListRequest() {
    this.navCtrl.push(ListRequestPage);
  }

  goMenu() {
    this.navCtrl.push(MenuPage);
  }

  loading() {
    let load = this.loadingCtrl.create({
      content: 'Cargando....',
      duration: 2000
    });
    load.present();
  }

  onClickTypeRequest(loc) {
    console.log("Lugar de atencion: " + loc);
    this.typeRequest = loc;
    this.onChangeTypeRequest();
  }

  //LISTAR SERVICIO
  onChangeTypeRequest() {
    console.log("specialtySelect: ", this.specialtySelect);
    if (this.typeRequest && this.distritoSelect && this.insuranceSelect && this.specialtySelect) {
      console.log("Se obtendrán las aseguradoras o proveedores");
      var asegurado;
      //comparar el id de la especialidad selecionada y compararla con todas las existente, cuando concuerde obtener el tipo de seleccion de esa especialidad, para mostrar el select multiopcion o opcionunica
      for (let i of this.specialty) {
        var idspecialty = i.ID;
        if (idspecialty == this.specialtySelect) {
          console.log("opcion de seleccion: ", i.TipoSeleccion);
          this.serviceTypeSelection = i.TipoSeleccion;
        }
      }
      console.log("this.specialtySelect: ", this.specialtySelect);
      if (this.insuranceSelect == "1") {
        console.log("Listando servicios");
        //LISTAR PROVEEDORES
        asegurado = 0;
        var urlProveedor = "http://saludtotalapp.com/wservice/solicitud/listtse/";
        var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
        let bodyProveedor = "";
        bodyProveedor =
          "&idesp=" + this.specialtySelect +
          "";
        console.log("bodyProveedor: ", bodyProveedor);
        this.data = this.http.post(urlProveedor, bodyProveedor, header);
        this.data.subscribe(data => {
          console.log(data);
          this.service = data;
          //this.insurance = null;
        }, err => {
          //this.messageError();
          let alert = this.alertCtrl.create({
            title: 'Importante!',
            subTitle: 'Por el momento no existen proveedores disponibles para su ubicación. <br> Muy pronto, llegaremos donde quiera que estés!',
            buttons: ['OK']
          });
          alert.present();
          console.log(err);
        });
      } else if (this.insuranceSelect != "1") {
        asegurado = 1;
        //LISTAR ASEURADORAS
        console.log("Listando servicios");
        var urlProveedor = "http://saludtotalapp.com/wservice/solicitud/listtse/";
        var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
        let bodyProveedor = "";
        bodyProveedor =
          "&idesp=" + this.specialtySelect +
          "";
        this.data = this.http.post(urlProveedor, bodyProveedor, header);
        this.data.subscribe(data => {
          console.log(data);
          this.service = data;
          //this.insurance = data;

        }, err => {
          //this.messageError();
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Importante!',
            subTitle: 'Por el momento no existen proveedores disponibles para su ubicación. <br> Muy pronto, llegaremos donde quiera que estés!',
            buttons: ['OK']
          });
          alert.present();
        });
      }
    }
  }

  //LISTAR PROVEEDORES
  listProvider(isMultiple?) {
    if(isMultiple){
      this.serviceSelectFix = this.serviceSelect.map( x=> x.ID )
    } else{
      this.serviceSelectFix = this.serviceSelect.ID;
    }
    //&idtipate=2&dist=150101&esasegurado=0&espe=4&tipserv=192,260
    console.log(this.insuranceSelect);
    //console.log("serviceSelect: ", this.serviceSelect);
    var asegurado;
    if (this.insuranceSelect == "1") {
      asegurado = 0;

      var urlServicio = "http://saludtotalapp.com/wservice/solicitud/listprov/";
      var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
      let bodyServicio = "";
      bodyServicio =
        "&idtipate=" + this.typeRequest +
        "&dist=" + this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect +
        "&esasegurado=" + asegurado +
        "&espe=" + this.specialtySelect +
        "&tipserv=" + this.serviceSelectFix +
        "";
      console.log(bodyServicio);
      this.data = this.http.post(urlServicio, bodyServicio, header);
      this.data.subscribe(data => {
        console.log(data);
        this.provider = data;
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Importante!',
          subTitle: 'Por el momento no existen proveedores disponibles para su ubicación. <br> Muy pronto, llegaremos donde quiera que estés!',
          buttons: ['OK']
        });
        alert.present();
        console.log(err);
      });
    } else if (this.insuranceSelect != "1") {
      //&idtipate=1&esasegurado=1&codaseg=2&dist=150101&espe=9&tipserv=304
      console.log("Asegurado");
      asegurado = 1;
      //En establecimiento de salud
      if (this.typeRequest == "1") {
        console.log("En establecimiento de salud");
        var urlServicio = "http://saludtotalapp.com/wservice/solicitud/listprov/";
        var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
        let bodyServicio = "";
        bodyServicio =
          "&idtipate=" + this.typeRequest +
          "&dist=" + this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect +
          "&esasegurado=" + asegurado +
          "&codaseg=" + this.insuranceSelect +
          "&espe=" + this.specialtySelect +
          "&tipserv=" + this.serviceSelectFix +
          "";
        console.log(bodyServicio);
        this.data = this.http.post(urlServicio, bodyServicio, header);
        this.data.subscribe(data => {
          console.log(data);
          this.provider = data;
          this.servicePrice = 0;
          this.descount = 0;
          this.priceTotal = 0;
        }, err => {
          console.log(err);
        });
      }
      //A domicilio
      else if (this.typeRequest == "2") {
        console.log("A domicilio");
        this.provider = [];
        this.servicePrice = 0;
        this.descount = 0;
        this.priceTotal = 0;
      }
    }
    if (this.providerSelect) {
      this.listPrices();
    }
  }

  //LISTAR PRECIOS
  listPrices(){
    //&idate=2&dist=150101&idprov=28&idesp=4&tipserv=192,260
    this.servicePrice = 0;
    this.descount = 0;
    this.priceTotal  = 0;
    var urlServicio = "http://saludtotalapp.com/wservice/solicitud/listservf/";
    var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
    let bodyServicio = "";
    if (this.serviceTypeSelection=='1') {
      /**/
      bodyServicio = "&idate="         +   this.typeRequest       +
        "&dist="          +   this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect +
        "&idprov="        +   this.providerSelect    +
        "&idesp="         +   this.specialtySelect   +
        "&tipserv="       +   this.serviceSelectFix     +
      "";
      //bodyServicio = "Hola";
      console.log("REVISA AQUI");
      console.log(bodyServicio);
      this.data= this.http.post(urlServicio, bodyServicio, header);
      this.data.subscribe(data=>{
        this.descount = 0;
        console.log(data);
        if(this.insuranceSelect=='1' && this.typeRequest=='2' && this.specialtySelect=='3'){
          if(this.providerSelect=='25'){
            this.precioPasaje=35.00;
          } else if(this.providerSelect=='54'){
            this.precioPasaje=20.00;
          }else{
            this.precioPasaje=25.00;
          }
        }else{
          this.precioPasaje=0.00;
        }
        this.servicePrice = parseFloat(data["0"].Precio);
        this.servicePrice = this.servicePrice.toFixed(2);
        this.descount = this.descount + (parseFloat(data["0"].Precio) - parseFloat(data["0"].TotalIGVConDescuento) );
          if(this.providerSelect == '14'){
            this.priceTotal = parseFloat(data["0"].TotalIGVConDescuento);
          }else{
            this.priceTotal = parseFloat(data["0"].TotalIGVConDescuento) + parseFloat(this.precioPasaje);
          }
        this.priceTotal = this.priceTotal.toFixed(2);
      },err=>{
        console.log(err);
      });
    }else if(this.serviceTypeSelection=='2'){
      /**/
      bodyServicio =
        "&idate="         +   /*2*/this.typeRequest       +
        "&dist="          +   this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect     +
        "&idprov="        +   /*28*/this.providerSelect    +
        "&idesp="         +   /*4*/this.specialtySelect   +
        "&tipserv="       +   /*"192,260"*/this.serviceSelectFix.toString()     +
      "";
      console.log(bodyServicio);
      this.data= this.http.post(urlServicio, bodyServicio, header);
      this.data.subscribe(data=>{
        this.descount = 0;
        console.log(data);
        if(this.insuranceSelect=='1' && this.typeRequest=='2' && this.specialtySelect=='3'){
          if(this.providerSelect=='25'){
            this.precioPasaje=35.00;
          } else if(this.providerSelect=='54'){
            this.precioPasaje=20.00;
          }else{
            this.precioPasaje=25.00;
          }
        }else{
          this.precioPasaje=0.00;
        }
        for (let i of data) {
          console.log("i: ", i);
          this.servicePrice = parseFloat(this.servicePrice) + parseFloat(i["Precio"]);
          this.servicePrice = this.servicePrice.toFixed(2);
          //this.descount = parseFloat(this.descount) + parseFloat(i["Descuento"]);
          this.descount = this.descount + (parseFloat(i["Precio"]) - parseFloat(i["TotalIGVConDescuento"]) );
          this.priceTotal = parseFloat(this.priceTotal) + parseFloat(i["TotalIGVConDescuento"]);//(this.servicePrice - this.descount) +(this.servicePrice*0.18);
          this.priceTotal = this.priceTotal.toFixed(2);
        }
          if(this.providerSelect == '14'){
            //this.priceTotal = 0.00;
            this.priceTotal = parseFloat(this.priceTotal);
          }else{
            this.priceTotal = parseFloat(this.priceTotal) + parseFloat(this.precioPasaje);
          }


      },err=>{
        console.log(err);
      });
    }
  }

  onChangeProviderSelect() {
    //SOLICITAR LISTA DE ASEGURADORAS
    console.log("Listando aseguradoras");
    //console.log("Tipo de atencion: ", this.typeRequest);
    //console.log("Proveedor: ", this.providerSelect);
    //console.log("Especialidades: ", this.specialtySelect);
    var urlServicio = "http://saludtotalapp.com/wservice/solicitud/listservf/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let bodyServicio = "";
    bodyServicio =
      "&idate=" + this.typeRequest +
      "&idprov=" + this.providerSelect +
      "&idesp=" + this.specialtySelect +
      "";
    this.data = this.http.post(urlServicio, bodyServicio, header);
    this.data.subscribe(data => {
      console.log(data);
      this.service = data;
    }, err => {
      console.log(err);
    });
  }

  postRequestService() {
    if (this.dni == "" || this.dni == null || this.phone == "" || this.phone == null) {
      return false;
    }
    var asegurado;
    var proveedor;
    var aseguradora;
    var codigo;
    var codigos;
    var serviciosseleccionados = this.serviceSelectFix.toString();
    if (this.insuranceSelect == "1") {
      asegurado = 0;
      this.providerSelect = this.providerSelect;
      this.insuranceSelect = "0";
    } else {
      asegurado = 1;
      this.providerSelect = this.providerSelect;
      this.insuranceSelect = this.insuranceSelect;
    }
    if (!this.providerSelect || this.providerSelect == null || this.providerSelect == "undefined") {
      this.providerSelect = '-1';
    }
    console.log("------------------------");
    console.log(serviciosseleccionados.search(","));
    console.log(serviciosseleccionados);
    if ((serviciosseleccionados.search(",")) != -1) {
      console.log("se selecciono mas de 1 servicio");
      // hay mas de 1 codigo
      codigos = this.serviceSelectFix.toString();
      codigo = "0";
    } else {
      console.log("se selecciono solo 1 servicio");
      codigo = this.serviceSelectFix;
      codigos = null;
    }
    var url = "http://saludtotalapp.com/wservice/solicitud/save/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&tipsoli=" + this.typeRequest +
      "&asegurado=" + asegurado +
      "&codasegur=" + this.insuranceSelect +
      "&codprov=" + this.providerSelect +
      "&codespeci=" + this.specialtySelect +
      "&tipexamn=" + 1 +
      //this.familyBackground.toString()
      "&codexam=" + codigo +
      "&codtipserv=" + codigos +
      "&tipselect=" + this.serviceTypeSelection +
      "&valpre=" + this.servicePrice +
      "&valimp=" + 0 +
      "&valtot=" + this.priceTotal +
      "&idusr=" + this.idUser +
      "&codpais=" + "PE" +
      "&ubigeo=" + this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect +
      "&direc=" + "" +
      "&ref=" + "" +
      "&nomus=" + "" +
      "&apeus=" + "" +
      //"&matus="        + this.apeMat      +
      "&matus=" + "" +
      "&nrodoc=" + this.dni +
      "&telf=" + this.phone +
      "";
    console.log(body);
    this.data = this.http.post(url, body, header);
    this.data.subscribe(data => {
      console.log(data);
      if (data.code == 500) {
        let alert = this.alertCtrl.create({
          title: 'Registro Fallido:',
          subTitle: 'Ocurrió un problema. Intentelo más tarde.',
          buttons: ['OK']
        });
        alert.present();
        //this.navCtrl.push(HomePage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Registro Exitoso:',
          subTitle: 'La solicitud se envió satisfactoriamente. Pronto el proveedor seleccionado se comunicará con usted.',
          buttons: ['OK']
        });
        alert.present();
        //alert.present();
        this.navCtrl.push(ListRequestPage);
      }

    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Registro Fallido:',
        subTitle: 'Ocurrió un problema. Intentelo más tarde.',
        buttons: ['OK']
      });
      console.log(err);
    });
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }

  geolocate() {

    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.getCountry(position);
      let alert = this.alertCtrl.create({
        title: 'Geo',
        subTitle: 'Obteniendo coordenadas',
        buttons: ['OK']
      });
    }).catch((err) => {
      //alert(err);
      let alert = this.alertCtrl.create({
        title: 'Geo',
        subTitle: 'Fallo obtencion de coordenadas',
        buttons: ['OK']
      });
    });
  }

  getCountry(pos) {
    let options = {
      enableHightAccurracy: true
    };
    let alert = this.alertCtrl.create({
      title: 'Geolocalizacion',
      subTitle: 'Dentro del metodo GETCOUNTRY',
      buttons: ['OK']
    });
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      .then((result: NativeGeocoderReverseResult[]) => {
        let alert = this.alertCtrl.create({
          title: 'Geocoder',
          subTitle: 'Llamando metodos',
          buttons: ['OK']
        });
        console.log(JSON.stringify(result[0]))
        this.dir = JSON.stringify(result[0]);
        this.geoDepartamento = this.dir.administrativeArea;
        this.geoProvincia = this.dir.subAdministrativeArea;
        this.getListDepartamentos();
        //this.getListProvincias();
      })
      .catch((error: any) => console.log(error));
  }

  geolocatess() {
    let options = { enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      //alert("Geo: " + String(position));
      //alert(position.coords.latitude);
      //alert(position.coords.longitude);
      this.getCountryss(position);
    }).catch((err) => {
      alert("Error al obtener localizacion");
    });
  }

  getCountryss(pos) {
    let options = {
      enableHightAccurracy: true
    };
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      .then((result: NativeGeocoderReverseResult[]) => {
        console.log(JSON.stringify(result[0]))
        /*let country = this.toaster.create({
          message: JSON.stringify(result[0]),
          duration: 4000
        });
        country.present();*/
        /*this.dir = JSON.stringify(result[0]);
        this.provincia = "";
        this.ciudad = "";
        this.distrito = this.dir.locality;*/

        this.dir = JSON.stringify(result[0]);
        this.geoDepartamento = JSON.stringify(result[0]["administrativeArea"]);
        //alert(this.geoDepartamento);
        //this.geoDepartamento = this.dir["administrativeArea"];


        this.geoProvincia = JSON.stringify(result[0]["subAdministrativeArea"]);
        //alert(this.geoProvincia);
        this.getListDepartamentos();
      })
      .catch((error: any) => console.log(error));
  }

}
