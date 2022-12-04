import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

// import { Geolocation, Geoposition } from '@ionic-native/geolocation';
// import { NativeGeocoder } from '@ionic-native/native-geocoder';


import { AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Cart } from '../../models/car';
import { CboGeneral } from '../../models/cbo';
import { Pharmacy } from '../../models/pharmacy';
import { Farmaco, Presentation, Product } from '../../models/product';
import { MenuPage } from '../menu/menu';
import { PharmacyPage } from '../pharmacy/pharmacy';

/**
 * Generated class for the PhamacyStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-phamacy-store',
  templateUrl: 'phamacy-store.html',
})
export class PhamacyStorePage {

  public labelAttribute: string;

  public objects: any[];


  pharmacy: Pharmacy = {} as Pharmacy;

  dir: any;
  geoDepartamento: any;
  geoProvincia: any;
  latitude: any;
  longitude: any;

  distritoSelectPerson: any;
  provinciaIDSelect: any;
  provinciasSelect: any = [];
  departamentoIDSelect: any;
  departamentos: any[];
  provincias: any[];

  provincia: any;
  ciudad: any;
  distrito: any;

  data: Observable<any>;

  typeRequest: string = '2';

  distritoRequest: CboGeneral[] = [] as CboGeneral[];
  distritoSelect: string;

  hideCiudad: boolean = true;
  hideProvincia: boolean = true;

  isItemAvailable = false;
  items = [];

  productModel = '';
  presentationList: Presentation[] = [] as Presentation[];
  presentationSelected: any;
  productList: Farmaco[] = [] as Farmaco[];
  productSelected: Farmaco = {} as Farmaco;

  reciboTypeList: Presentation[] = [] as Presentation[];
  reciboTypeSelected: any;

  cantity : number;

  presentation = '';

  idUser: any;

  cartList: Cart[] = [] as Cart[];

  showListPredictive = false;

  reference = '';

  dni: any;

  adress: any = '';

  phone: any;

  priPage:boolean = false;
  segPage:boolean = false;

  nPage: number;

  codUbigeo: string;
  priceTotal: number;
  priceDelivery: number;
  priceFull: number;
  codFarmacia: any;
  total: any;

  ruc: any;
  diruc: any;
  razsoc: any;

  currentPage: number;

  latitud: string;
  longitud: string;

  ammount: number;

  urlUbi: string;

  pos: any;

  countSendCoor = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: HttpClient,
    public toaster: ToastController,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation, public geocoder: NativeGeocoder
  ) {
    if( !navParams.get('segPage') ){
      this.priPage = false;
      this.segPage = true;
    }else{
      this.segPage = false;
      this.priPage = true;
      // this.dni = navParams.get('dniPriPage');
      // this.phone = navParams.get('phonePriPage');

      this.codFarmacia = navParams.get('codfarmacia');
      this.reference = navParams.get('reference');
      this.codUbigeo = navParams.get('codubigeo');
      this.adress = navParams.get('direccion');
      console.log(this.codUbigeo);
      console.log(this.adress);
      this.typeRequest = navParams.get('referencia');
      this.priceTotal = navParams.get('priceTotal');
      this.idUser = navParams.get('idUser');
      this.departamentoIDSelect = navParams.get('departamentoIDSelect');
      this.provinciaIDSelect = navParams.get('provinciaIDSelect');
      this.distritoSelect = navParams.get('distritoSelect');
    }
    this.pharmacy = navParams.get('pharmacy');
    console.log('this.pharmacy: ');
    console.log(this.pharmacy);
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

    this.initializeItems();

  }

  ionViewDidLoad() {
    this.getTypeRecibo();
    console.log('Pagina recibida: ');
    console.log(this.navParams.get('nPage'));
    if (this.navParams.get('nPage')) {

      this.currentPage = this.navParams.get('nPage');
      console.log('Nuevo currentPage');
      console.log(this.currentPage);
      if(this.navParams.get('longitud') != undefined){
        this.longitud = this.navParams.get('longitud');
      }
      if(this.navParams.get('latitud') != undefined){
        this.latitud = this.navParams.get('latitud');
      }
      this.codFarmacia = this.navParams.get('codfarmacia');
      this.reference = this.navParams.get('reference');
      this.codUbigeo = this.navParams.get('codubigeo');
      this.ammount = this.navParams.get('ammount');
      if(localStorage.getItem('adressPharmacyStore') != null && localStorage.getItem('adressPharmacyStore') != undefined){
        console.log('Direccion de localhost');
        console.log(localStorage.getItem("adressPharmacyStore"));
        this.adress = localStorage.getItem("adressPharmacyStore");
      } else{
        this.adress = this.navParams.get('direccion');
      }

      if(localStorage.getItem('referencePharmacyStore') != null && localStorage.getItem('referencePharmacyStore') != undefined){
        console.log('Direccion de localhost');
        console.log(localStorage.getItem("referencePharmacyStore"));
        this.reference = localStorage.getItem("referencePharmacyStore");
      } else{
        this.reference = this.navParams.get('referencia');
      }
      console.log(this.codUbigeo);
      console.log(this.adress);
      this.typeRequest = this.navParams.get('referencia');
      this.priceTotal = this.navParams.get('priceTotal');
      this.idUser = this.navParams.get('idUser');
      this.departamentoIDSelect = this.navParams.get('departamentoIDSelect');
      this.provinciaIDSelect = this.navParams.get('provinciaIDSelect');
      this.distritoSelect = this.navParams.get('distritoSelect');
      this.urlUbi = this.navParams.get('urlUbi');
      this.reciboTypeSelected = this.navParams.get('recibo');
      this.ruc = this.navParams.get('ruc');
      this.diruc = this.navParams.get('diruc');
      this.razsoc = this.navParams.get('razsoc');

      console.log('this.urlUbi: ');
      console.log(this.urlUbi);

    } else{
      this.currentPage = 1;
    }
    this.idUser = window.localStorage.getItem('userID');
    console.log('ionViewDidLoad PhamacyStorePage');
    this.getCart();
    this.getPresentation();
    this.geolocatess();
  }

  protected filter(keyword) {
    keyword = keyword.toLowerCase();

    return this.objects.filter(
      (object) => {
        const value = object[this.labelAttribute].toLowerCase();

        return value.includes(keyword);
      }
    );
  }

  goMenu() {
    this.navCtrl.push(MenuPage);
  }

  backHistory() {
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }


  onClickTypeRequest(loc) {
    console.log("Lugar de atencion: " + loc);
    this.typeRequest = loc;
  }

  initializeItems() {

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }

  selecProduct(p: Farmaco) {
    this.productModel = p.FarmacoPrin;
    this.productSelected = p;
    // this.presentation = p.Presentacion;
    this.productList = [];
    this.showListPredictive = false;
  }

  productChange(product) {
    this.filterProducts()
    // if(this.productModel.length>2){
    //   this.filterProducts()
    // }
  }

  postRequestCart() {
    // codfarmacia: number
    // codubigeo: string
    // direccion: string
    // referencia: string
    // documento: string
    // telefono: number
    // usr: number
    console.log(this.dni);
    console.log(this.phone);
    console.log(this.departamentoIDSelect);
    console.log(this.provinciaIDSelect);
    console.log(this.distritoSelect);
    console.log(this.adress);
    console.log(this.reference);
    if (this.dni == undefined || this.phone == '') {
      let alert = this.alertCtrl.create({
        title: 'Completar información:',
        subTitle: 'Ingresar dni y celular del solicitante',
        buttons: ['OK']
      });
      alert.present();
    }else{
      if (
        (this.codUbigeo == undefined || this.codUbigeo == '') ||
        (this.adress == '') || (this.reference == '') || (this.dni == NaN) || (this.phone == NaN)
      ) {
        let alert = this.alertCtrl.create({
          title: 'No se pudo generar la solicitud:',
          subTitle: 'Ingrese todos los datos solicitados',
          buttons: ['OK']
        });
        alert.present();
      } else {
        var url = "http://saludtotalapp.com/wservice/frmc/soli/gen/";
        var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
        let body = "";
        body =
          "&codfarmacia=" + parseInt(this.pharmacy.ID) +
          // "&codubigeo=" 	+ parseInt(this.productSelected.Codigo) 	+
          "&codubigeo=" + this.codUbigeo +
          "&direccion=" + this.adress +
          "&referencia=" + this.reference +
          "&documento=" + parseInt(this.dni) +
          "&telefono=" + parseInt(this.phone) +
          "&usr=" + parseInt(this.idUser) +
          "&recibo=" + this.reciboTypeSelected +
          "&ruc=" + this.ruc +
          "&diruc=" + this.diruc +
          "&razsoc=" + this.razsoc +
          "&url=" + this.urlUbi +
          "&monto=" + this.ammount +
          '&lat=' + this.latitud +
          '&long=' + this.longitud +
          "";
        this.data = this.http.post(url, body, header);
        console.log("dentro de: " + url);
        this.data.subscribe(data => {
          localStorage.setItem("adressPharmacyStore", this.adress);
          localStorage.setItem("referencePharmacyStore", this.reference);
          console.log(data);
          let alert = this.alertCtrl.create({
            title: 'Solicitud generada:',
            subTitle: 'Su pedido llegará pronto a la dirección indicada. Gracias',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(PharmacyPage);
        }, err => {
          console.log(err);
          if (err.status == 404) {
          } else {
            this.messageError();
          }
        });
      }
    }
  }

  addToCar() {
    console.log('productSelected: ');
    console.log(this.productSelected);
    if (Object.keys(this.productSelected).length === 0) {
      let alert = this.alertCtrl.create({
        title: 'No se pudo añadir el producto:',
        subTitle: 'Ingrese todos los datos solicitados',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.cantity <= 0) {
      let alert = this.alertCtrl.create({
        title: 'No se pudo añadir el producto:',
        subTitle: 'Ingrese una cantidad mayor a 0',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.productList = [];
      var url = "http://saludtotalapp.com/wservice/frmc/cart/add/";
      var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
      let body = "";
      body =
        "&codfarmacia=" + parseInt(this.pharmacy.ID) +
        "&codfarmaco=" + parseInt(this.productSelected.Codigo) +
        "&codpresentacion=" + parseInt(this.productSelected.CodPresentacion) +
        "&cantidad=" + this.cantity +
        "&usr=" + parseInt(this.idUser) +
        "";
      this.data = this.http.post(url, body, header);
      console.log("dentro de: " + url);
      this.data.subscribe(data => {
        console.log(data);

        this.productModel = '';
        this.presentationSelected = '';
        this.cantity = null;

        // let alert = this.alertCtrl.create({
        //   title: 'Producto añadido:',
        //   subTitle: 'El producto se añadió a tu lista de productos',
        //   buttons: ['OK']
        // });
        // alert.present();
        this.getCart();
      }, err => {
        console.log(err);
        if (err.status == 404) {
        } else {
          this.messageError();
        }
      });
    }
  }

  dropRequestTap(c: Cart){
    console.log(c);
    let alert = this.alertCtrl.create({
      title: 'Retirar producto',
      message: ' El producto seleccionado se retirará de la lista',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.removeProduct(c);
          }
        }
      ]
    });
    alert.present();
  }

  removeProduct(c: Cart) {
    var url = "http://saludtotalapp.com/wservice/frmc/cart/del/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&cod=" + c.Codigo +
      "&usr=" + this.idUser +
      "";
    this.data = this.http.post(url, body, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      // let alert = this.alertCtrl.create({
      //   title: 'Producto eliminado:',
      //   subTitle: 'El producto se eliminó de tu lista de productos',
      //   buttons: ['OK']
      // });
      // alert.present();
      this.getCart();
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  messageError() {
    let alert = this.alertCtrl.create({
      title: 'Ocurrio un problema !',
      subTitle: 'Verifique su conexión a internet.',
      buttons: ['OK']
    });
    alert.present();
  }

  loading() {
    let load = this.loadingCtrl.create({
      content: 'Cargando....',
      duration: 2000
    });
    load.present();
  }

  loadingFull(){
    let load = this.loadingCtrl.create({
      content:'Compartiendo....',
      duration: 5000
    });
    load.present();
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

  geolocatess(isButton?) {
    if(isButton){
      this.loadingFull();
    }
    let options = { enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      if(isButton){
        this.getCountryss(position, true);
      }else{
        this.getCountryss(position, false);
      }

    }).catch((err) => {
      alert("Error al obtener localizacion");
    });
  }

  getCountryss(pos, isButton?) {
    let options = {
      enableHightAccurracy: true
    };
    this.pos = pos;
    this.latitud = this.pos.coords.latitude;
    this.longitud = this.pos.coords.longitude;
    if(isButton){
      this.countSendCoor++;
      this.latitud = this.pos.coords.latitude;
      this.longitud = this.pos.coords.longitude;
      if(this.countSendCoor>1){
        let alert = this.alertCtrl.create({
          title: 'Acción repetida',
          subTitle: 'Su ubicación ya ha sido compartida con el proveedor.',
          buttons: ['OK']
        });
        alert.present();
      } else{
        let alert = this.alertCtrl.create({
          title: 'Ubicacion Enviada',
          subTitle: 'Su ubicación ha sido compartida con éxito.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      .then((result: any[]) => {
        console.log(JSON.stringify(result[0]))
        this.dir = JSON.stringify(result[0]);
        this.geoDepartamento = JSON.stringify(result[0]["administrativeArea"]);
        this.geoProvincia = JSON.stringify(result[0]["subAdministrativeArea"]);
        this.getListDepartamentos();
      })
      .catch((error: any) => console.log(error));
  }

  validateCobertura() {
    var url = "http://saludtotalapp.com/wservice/frmc/val/cobertura";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&codfarm=" + parseInt(this.pharmacy.ID) +
      "&ubi=" + this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect
    "";
    this.data = this.http.post(url, body, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      if (!data.status) {
        let alert = this.alertCtrl.create({
          title: 'Lo sentimos',
          subTitle: 'Por el momento, el proveedor seleccionado no cuenta con cobertura de despacho para su ubicación.',
          buttons: ['OK']
        });
        alert.present();
        this.backHistory();
      }
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  getCart() {
    this.priceTotal = 0;
    this.cartList = [];
    var url = "http://saludtotalapp.com/wservice/frmc/cart/getlist/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&codfarmacia=" + parseInt(this.pharmacy.ID) +
      "&usr=" + parseInt(this.idUser) +
      "";
    this.data = this.http.post(url, body, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        this.cartList = data;
        for (let index = 0; index < this.cartList.length; index++) {
          // this.servicePrice = parseFloat(data["0"].Precio);
          // this.servicePrice = this.servicePrice.toFixed(2);

          var newPrice = parseFloat(this.cartList[index].Total);
          var finalPrice = newPrice.toFixed(2);
          console.log('this.finalPrice: ');
          console.log(finalPrice);
          this.priceTotal += Number(finalPrice);
          if(index >= this.cartList.length-1){
            this.getDelivery();
          }
        }
      } else {

      }
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  getPresentation() {
    this.presentationList = [];
    var url = "http://saludtotalapp.com/wservice/frmc/gtlst/presentacion/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    this.data = this.http.get(url, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        this.presentationList = data;
        this.showListPredictive = true;
      } else {

      }
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  filterProducts() {
    this.productList = [];
    var url = "http://saludtotalapp.com/wservice/frmc/farmaco/filtro/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&cod=" + this.pharmacy.ID +
      "&pres=" + this.presentationSelected +
      "&abc=" + this.productModel +
      "";

    this.data = this.http.post(url, body, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        this.productList = data;
        this.showListPredictive = true;
      } else {

      }
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  irSecondPage(){
    // codfarmacia
    // codubigeo
    // direccion
    // referencia
    // usr
    console.log(this.adress);
    console.log(this.reference);
    console.log(this.distritoSelect);

    if ( this.cartList.length <= 0 ) {
      let alert = this.alertCtrl.create({
        title: 'Lista vacia:',
        subTitle: 'Añada almenos 1 producto al pedido',
        buttons: ['OK']
      });
      alert.present();
    } else if(this.adress == undefined || this.reference == undefined || this.distritoSelect == undefined){
      let alert = this.alertCtrl.create({
        title: 'Sin ubicación:',
        subTitle: 'Especifique los datos de ubicación y dirección',
        buttons: ['OK']
      });
      alert.present();
    } else {
      console.log('this.pharmacy: ');
      console.log(this.pharmacy);
      console.log(this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect);
      console.log(this.adress);
      this.navCtrl.push(PhamacyStorePage, {
        priceTotal: this.priceTotal,
        pharmacy: this.pharmacy,
        segPage: true,
        codfarmacia: parseInt(this.pharmacy.ID),
        reference: this.reference,
        codubigeo : this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect,
        direccion : this.adress,
        referencia : this.reference,
        idUser : this.idUser
      });
    }
  }

  changePage(nPage) {
    // this.currentPage = nPage;
    console.log('nPage');
    console.log(nPage);
    // codfarmacia
    // codubigeo
    // direccion
    // referencia
    // usr
    console.log(this.adress);
    console.log(this.reference);
    console.log(this.distritoSelect);

    if (this.currentPage == 1) {
      if (this.cartList.length <= 0) {
        let alert = this.alertCtrl.create({
          title: 'Lista vacia:',
          subTitle: 'Añada almenos 1 producto al pedido',
          buttons: ['OK']
        });
        alert.present();
      } else if (this.distritoSelect == undefined || this.distritoSelect == '') {
        let alert = this.alertCtrl.create({
          title: 'Ingresar dato:',
          subTitle: 'Por favor seleccione el distrito',
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.navCtrl.push(PhamacyStorePage, {
          nPage: 2,
          priceTotal: this.priceTotal,
          pharmacy: this.pharmacy,
          segPage: true,
          codfarmacia: parseInt(this.pharmacy.ID),
          reference: this.reference,
          codubigeo: this.departamentoIDSelect + this.provinciaIDSelect + this.distritoSelect,
          direccion: this.adress,
          referencia: this.reference,
          idUser: this.idUser,
          urlUbi: "https://www.google.es/maps/@" +  this.longitud+ "," + this.latitud,
          longitud: this.longitud,
          latitud: this.latitud
        });
      }
    } else if (this.currentPage == 2) {
      if (
        (this.adress == undefined || this.reference == undefined || this.ammount == undefined) ||
        (this.adress == '' || this.reference == '' || this.ammount <= 0) ||
        (this.reciboTypeSelected == undefined || this.reciboTypeSelected == '')
        ) {
        let alert = this.alertCtrl.create({
          title: 'Completar información:',
          subTitle: 'Complete todos los campos',
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.navCtrl.push(PhamacyStorePage, {
          nPage: 3,
          priceTotal: this.priceTotal,
          pharmacy: this.pharmacy,
          segPage: true,
          codfarmacia: parseInt(this.pharmacy.ID),
          reference: this.reference,
          codubigeo: this.codUbigeo,
          direccion: this.adress,
          referencia: this.reference,
          idUser: this.idUser,
          urlUbi: this.urlUbi,
          ammount: this.ammount,
          recibo: this.reciboTypeSelected,
          ruc: this.ruc,
          diruc: this.diruc,
          razsoc: this.razsoc,
          longitud: this.longitud,
          latitud: this.latitud
        });
      }
    } else if (this.currentPage == 3) {
      if (this.dni == undefined || this.phone == '') {
        let alert = this.alertCtrl.create({
          title: 'Completar información:',
          subTitle: 'Ingresar dni y celular del solicitante',
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.navCtrl.push(PhamacyStorePage, {
          nPage: 3,
          priceTotal: this.priceTotal,
          pharmacy: this.pharmacy,
          segPage: true,
          codfarmacia: parseInt(this.pharmacy.ID),
          reference: this.reference,
          codubigeo: this.codUbigeo,
          direccion: this.adress,
          referencia: this.reference,
          idUser: this.idUser,
          longitud: this.longitud,
          latitud: this.latitud
        });
      }
    }
  }

  getTypeRecibo() {
    this.reciboTypeList = [];
    var url = "https://saludtotalapp.com/wservice/frmc/gtlst/recibo/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "";
    this.data = this.http.get(url, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        this.reciboTypeList = data;
        if(this.currentPage == 2){
          this.reciboTypeSelected = '1';
        }
        // this.reciboTypeSelected = '1';
      }
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  getDelivery(){
    // this.presentationList = [];
    var url = "http://saludtotalapp.com/wservice/frmc/get/preenvio/";
    var header = { "headers": { "Content-Type": "application/x-www-form-urlencoded" } };
    let body = "";
    body =
      "&cod=" + this.pharmacy.ID+
      "";
    this.data = this.http.post(url, body, header);
    console.log("dentro de: " + url);
    this.data.subscribe(data => {
      console.log(data);
      this.priceDelivery = data[0].fprecio;
      this.priceFull = Number(this.priceDelivery) + Number(this.priceTotal);
    }, err => {
      console.log(err);
      if (err.status == 404) {

      } else {
        this.messageError();
      }
    });
  }

  sendCoor(){
    this.latitud = this.pos.coords.latitude;
    this.longitud = this.pos.coords.longitude;
  }

}
