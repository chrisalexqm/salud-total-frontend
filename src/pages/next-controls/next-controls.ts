import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MenuPage } from '../menu/menu';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-next-controls',
  templateUrl: 'next-controls.html',
})
export class NextControlsPage {
  data: Observable<any>;
  selectedControl: any;
  //icons: string[];
  nex_controls:Array<{speciality: string, date:string, description: string, address:string, district:string}>;
  //items: Array<{title: string, note: string, icon: string}>;
  userDependient:any;
  idForm:any;
  idUser:any;
  fControlDiabetes:any;
  fControlGrasas:any;
  fFur:any;
  fMamografia:any;
  fPapanicolao:any;
  fProstata:any;
  fcontrolColon:any;
  fcontrolGastro:any;
  fcontrolOdontologia:any;
  fcontrolOftalmo:any;
  fcontrolPreventiva:any;
  fcontrolEmbarazo:any;
  fcontrolDiabetes:any;
  fGlucosaAyuna:any;
  fGlucosaDespuesAlimento:any;
  flucosaGlicosilada:any;
  fHemoglobina:any;
  fIMC:any;
  fMedidaAbdominal:any;
  fPresionArterial:any;
  fPresionArterialControl:any;
  fTrigliceridos:any;
  fVacunaAntineumonia:any;
  age:any;
  agereal:any;
  /*idEsDiabetico:any;
  idTipColon:any;
  idTipGastro:any;
  idTipMamografia:any;
  idTipOftalmo:any;
  idTipPapanicolao:any;
  idTipProstata:any;
  idTrataDiabetes:any;*/
  trataDiabetes:any;
  esDiabetico:any;
  tipoColon:any;
  tipoGastro:any;
  tipoMamografia:any;
  tipoOftalmo:any;
  tipoPapanicolao:any;
  tipoProstata:any;
  gender:any;

  fControl:any;
  fVacuna:any;
  fColesterolHDL:any;
  fColesteroLDL:any;
  //tipoProstata:any;
  //trataDiabetes:any;

  proxControlDiabetes:any;
  proxControlGrasas:any
  proxControlMamografia:any;
  proxControlPapanicolao:any;
  proxControlProstata:any;
  proxControlColon:any;
  proxControlGastro:any;
  proxControlOdontologia:any;
  proxControlOfmaltologia:any;

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;

  constructor(private menu: MenuController, public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public http: HttpClient) {
  	this.loading();

    this.proxControlDiabetes = "";
    this.proxControlGrasas = "";
    this.proxControlMamografia = "";
    this.proxControlPapanicolao = "";
    this.proxControlProstata = "";
    this.proxControlColon = "";
    this.proxControlGastro = "";
    this.proxControlOdontologia = "";
    this.proxControlOfmaltologia = "";
    this.userDependient     = navParams.get('idUD');
    this.idUser = parseInt(window.localStorage.getItem('userID'));
  	// If we navigated to this page, we will have an item available as a nav param
    this.selectedControl = navParams.get('selectedControl');
    let bodyUsuarioM = "";
    // Let's populate this page with some filler content for funzies    
    if(!this.userDependient){
      var urlUsuarioM = "http://saludtotalapp.com/wservice/proxcontrol/pcusrc/";
      var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      let bodyUsuarioM = "";
      bodyUsuarioM = 
        "&idusr="      +   this.idUser         +
      "";
      console.log(bodyUsuarioM);
      this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
      this.data.subscribe(data=>{
        console.log(data);
        //= moment(data[0].FecFUR, 'YYYY-MM-DD').format('DD-MM-YYYY');
        //console.log('FUC DIABETES: ', moment(data[0].FControlDiabetes).format('DD-MM-YYYY'));
        this.fControlDiabetes = data[0].Diabetes;
        console.log(" this.fControlDiabetes: ",  this.fControlDiabetes);
        this.fColesterolHDL       = data[0].ColesterolLDL;
        this.fColesteroLDL        = data[0].ColesterolHDL;
        this.fcontrolColon        = data[0].Colonoscopia;
        this.fcontrolGastro       = data[0].Gastroscopia;
        //
        this.fcontrolPreventiva   = data[0].ConsultaPreventiva;
        this.fcontrolEmbarazo     = data[0].ControlEmbarazo;
        //this.fcontrolDiabetes     = data[0].Diabetes;
        //this.fcontrolAlgo         = data[0].FechaNacimiento;
        //this.fcontrolAlgo         = data[0].Gastroscopia;
        this.fGlucosaAyuna        = data[0].GlucosaAyuna;
        this.fGlucosaDespuesAlimento = data[0].GlucosaDespuesAlimento;
        this.flucosaGlicosilada   = data[0].GlucosaGlicosilada;
        this.fHemoglobina         = data[0].Hemoglobina;
        this.fIMC                 = data[0].IMC;
        this.fMedidaAbdominal     = data[0].MedidaAbdominal;      
        this.fPresionArterial         = data[0].PresionArterial;
        this.fPresionArterialControl  = data[0].PresionArterialControl;
        this.fTrigliceridos       = data[0].Trigliceridos;
        this.fVacunaAntineumonia  = data[0].VacunaAntineumonia
        this.fMamografia          = data[0].Mamografia;
        this.fPapanicolao         = data[0].Papanicolaou;
        //        
        this.fcontrolOdontologia = data[0].Odontologia;
        this.fcontrolOftalmo  = data[0].Ojos;
        this.fProstata  = data[0].Prostata;

        this.gender = data[0].Genero;
        var edadFija = "07/03/1940";
        this.age = moment(data[0].FechaNacimiento, 'DD-MM-YYYY').format('YYYY-MM-DD');
        //this.age = moment(this.age).format('YYYY-MM-DD');
        let hoy = moment().format('YYYY-MM-DD');
        console.log(hoy);
        console.log(this.age);
        //FechaNacimiento: "30/06/1980";
        //FechaNacimiento: "07/12/1993";
        //FechaNacimiento: "01/01/1940";
        this.agereal  = this.calculaEdad(hoy, this.age);
        console.log("edad real: ", this.agereal);
      },err=>{
        console.log(err);
      });
    }else if(this.userDependient==1){
      this.idForm = parseInt(window.localStorage.getItem('formIDDependent'));
      var urlUsuarioM = "http://saludtotalapp.com/wservice/proxcontrol/pcusrdc/";
      var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      bodyUsuarioM = 
        "&idform="     +   this.idForm         +//IDFORM DEL USUARIO DEPENDIENTE
        "&idusr="      +   this.idUser         +
        //s"&esdepen="    +   this.userDependient +
        //"&esmenor="   +   1             +
      "";
      console.log(bodyUsuarioM);
      this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
      this.data.subscribe(data=>{
        this.fControlDiabetes = data[0].Diabetes;
        console.log(" data: ",  data);
        this.fColesterolHDL       = data[0].ColesterolLDL;
        this.fColesteroLDL        = data[0].ColesterolHDL;
        this.fcontrolColon        = data[0].Colonoscopia;
        this.fcontrolGastro       = data[0].Gastroscopia;
        //
        this.fcontrolPreventiva   = data[0].ConsultaPreventiva;
        this.fcontrolEmbarazo     = data[0].ControlEmbarazo;
        //this.fcontrolDiabetes     = data[0].Diabetes;
        //this.fcontrolAlgo         = data[0].FechaNacimiento;
        //this.fcontrolAlgo         = data[0].Gastroscopia;
        this.fGlucosaAyuna        = data[0].GlucosaAyuna;
        this.fGlucosaDespuesAlimento = data[0].GlucosaDespuesAlimento;
        this.flucosaGlicosilada   = data[0].GlucosaGlicosilada;
        this.fHemoglobina         = data[0].Hemoglobina;
        this.fIMC                 = data[0].IMC;
        this.fMedidaAbdominal     = data[0].MedidaAbdominal;      
        this.fPresionArterial         = data[0].PresionArterial;
        this.fPresionArterialControl  = data[0].PresionArterialControl;
        this.fTrigliceridos       = data[0].Trigliceridos;
        this.fVacunaAntineumonia  = data[0].VacunaAntineumonia
        this.fMamografia          = data[0].Mamografia;
        this.fPapanicolao         = data[0].Papanicolaou;
        //        
        this.fcontrolOdontologia = data[0].Odontologia;
        this.fcontrolOftalmo  = data[0].Ojos;
        this.fProstata  = data[0].Prostata;

        this.gender = data[0].Genero;

        //this.age = moment(data[0].FechaNacimiento).format('DD-MM-YYYY');
        //this.age = moment(this.age).format('YYYY-MM-DD');
        this.age = moment(data[0].FechaNacimiento, 'DD-MM-YYYY').format('YYYY-MM-DD');
        let hoy = moment().format('YYYY-MM-DD');
        this.agereal  = this.calculaEdad(hoy, this.age);
      },err=>{
        console.log(err);
      });
    }else if(this.userDependient==2){
      this.idForm = parseInt(window.localStorage.getItem('formIDDependent'));
      var urlUsuarioM = "http://saludtotalapp.com/wservice/proxcontrol/pcusrdm/";
      var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
      bodyUsuarioM = 
        "&idusrme="    +   this.idForm         +//IDFORM DEL USUARIO DEPENDIENTE
        "&idusr="      +   this.idUser   +
        //"&esmenor="   +   1             +
      "";
      console.log(bodyUsuarioM);
      this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
      this.data.subscribe(data=>{
        console.log(data);
        this.fHemoglobina     = data[0].Hemoglobina;
        this.fControl         = data[0].Control;
        this.fVacuna          = data[0].Vacuna;
        console.log("---------------");
        console.log(this.fHemoglobina);
        console.log(this.fControl);
        console.log(this.fVacuna);
      },err=>{
        console.log(err);
      });
    }

    var estadoregistronoti = window.localStorage.getItem('statePlayer');
    if(estadoregistronoti=='iniciado'){
    var iduser = window.localStorage.getItem('userID');
      var correouser = window.localStorage.getItem('correoUser');
      this.verificarPlayerID(iduser, correouser);
    }
  }
  
  backHistory(){
    console.log("Retrocediendo");
    this.navCtrl.pop();
  }

  goMenu(){
    this.navCtrl.push(MenuPage);
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

  loading(){
    let load = this.loadingCtrl.create({
      content:'Cargando....',
      duration: 2000
    });
    load.present();
  }

  mostrarControl(){
  //fechas
    let hoy = moment().format('YYYY-MM-DD');
    var edad  = this.calculaEdad(hoy, this.age);
    console.log("edad: ", edad);
    //DIABETES: BIEN HECHO <= 6 MESES ... INADECUADO > 6
    //if(this.fControlDiabetes!='01-01-1900' && this.fControlDiabetes!='1900-01-01'){
    if(true){
      var difControlDiabetes = this.calcularMeses(this.fControlDiabetes);
      if(difControlDiabetes<=6){
        this.proxControlDiabetes = moment(this.fControlDiabetes).format("DD-MM-YYYY");
        this.proxControlDiabetes = moment().add(6, 'months').format("DD-MM-YYYY");
      }else{
        //AHORA
        this.proxControlDiabetes = moment().add(7, 'day').format("DD-MM-YYYY");
        //this.proxControlDiabetes = this.proxControlDiabetes.add(7, 'days');
      }
    }
    
    //GRASAS: CONTROLADO  <= 11 MESES && >35 AÑOS ... >11 MESES && 35 AÑOS
    //if(this.fControlGrasas!='01-01-1900' && this.fControlGrasas!='1900-01-01'){
    if(true){
      var difControlGrasas = this.calcularMeses(this.fControlGrasas);
      if(difControlGrasas<=11 && edad > 35){        
        //this.proxControlGrasas = this.fControlGrasas.add(11, 'months');
        this.proxControlGrasas = moment(this.fControlGrasas).format("DD-MM-YYYY");
        this.proxControlGrasas = moment().add(11, 'months').format("DD-MM-YYYY");
      }else if(difControlGrasas > 11 && edad > 35){
        //AHORA
        this.proxControlGrasas = moment().add(7, 'day').format("DD-MM-YYYY");
      }
    }
    
    // CONTROLES DE EMBARAZO: SEMANA 8, 26, 32, 38
    this.fFur;//FEMENINO Y DATOS INGRESADOS
    //MAMOGRAFIA OK <= 11 MESES && RESULTADONORMAL ... > 11 MESES &&RESULTADONORMAL
    //MAMOGRAFIA OK <= 6 MESES && RESULTADOANORMAL ... > 6 MESES &&RESULTADOANORMAL
    //FEMENINO Y DATOS INGRESADOS  
    //console.log('this.fMamografia: ', this.fMamografia);
    console.log("this.tipoMamografia: ", this.tipoMamografia);
    if(true){
    //if(this.fMamografia!='01-01-1900' && this.fMamografia!='1900-01-01'){ 
      var difControMamografia = this.calcularMeses(this.fMamografia);
      if( this.tipoMamografia==0 && difControMamografia <= 11 ) {
        //this.proxControlMamografia = moment(this.fMamografia).add(11, 'months');
        this.proxControlMamografia = moment(this.fMamografia).format("DD-MM-YYYY");
        this.proxControlMamografia = moment().add(11, 'months').format("DD-MM-YYYY");
      }else if( this.tipoMamografia==1 && difControMamografia > 11){
        //AHORA
        this.proxControlMamografia = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoMamografia==0 && difControMamografia <= 6 ){
        //this.proxControlMamografia = this.fMamografia.add(6, 'months');
        this.proxControlMamografia = moment(this.fMamografia).format("DD-MM-YYYY");
        this.proxControlMamografia = moment().add(6, 'months').format("DD-MM-YYYY");
      }else if( this.tipoMamografia==1 && difControMamografia > 6 ){
        //AHORA
        this.proxControlMamografia = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoMamografia != 0 || this.tipoMamografia != 1 || this.tipoMamografia !=2){
        this.proxControlMamografia = moment().add(7, 'day').format("DD-MM-YYYY");
      }
    }
    
    //PAPANICOLAO OK <= 11 MESES && RESULTADONORMAL ... > 11 MESES &&RESULTADONORMAL
    //PAPANICOLAO OK <= 6 MESES && RESULTADOANORMAL ... > 6 MESES &&RESULTADOANORMAL
    //this.fPapanicolao;//FEMENINO Y DATOS INGRESADOS
    //this.tipoPapanicolao;
    //console.log('this.fPapanicolao: ', this.fPapanicolao);
    //if(this.fPapanicolao!='01-01-1900' && this.fPapanicolao!='1900-01-01'){
    if(true){
      var difControPapanicolao = this.calcularMeses(this.fPapanicolao);
      if( this.tipoPapanicolao==0 && difControPapanicolao <= 11 ) {
        //this.proxControlPapanicolao = this.fPapanicolao.add(11, 'months');
        this.proxControlPapanicolao = moment(this.fPapanicolao).format("DD-MM-YYYY");
        this.proxControlPapanicolao = moment().add(11, 'months').format("DD-MM-YYYY");
      }else if( this.tipoPapanicolao==1 && difControPapanicolao > 11){
        //AHORA
        this.proxControlPapanicolao = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoPapanicolao==0 && difControPapanicolao <= 6 ){
        //this.proxControlPapanicolao = this.fPapanicolao.add(6, 'months');
        this.proxControlPapanicolao = moment(this.fPapanicolao).format("DD-MM-YYYY");
        this.proxControlPapanicolao = moment().add(6, 'months').format("DD-MM-YYYY");
      }else if( this.tipoPapanicolao==1 && difControPapanicolao > 6 ){
        //AHORA
        this.proxControlPapanicolao = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoPapanicolao != 0 || this.tipoPapanicolao != 1 || this.tipoPapanicolao !=2){
        this.proxControlPapanicolao = moment().add(7, 'day').format("DD-MM-YYYY");
      } 
    }
    
    //PROSTATA OK <= 11 MESES && RESULTADONORMAL ... > 11 MESES &&RESULTADONORMAL
    //PROSTATA OK <= 6 MESES && RESULTADOANORMAL ... > 6 MESES &&RESULTADOANORMAL
    //this.fProstata;// MASCULINO Y DATOS INGRESADOS
    //this.tipoProstata;
    //console.log('this.fProstata: ', this.fProstata);
    //if(this.fProstata!='01-01-1900' && this.fProstata!='1900-01-01'){
    if(true){
      var difControProstata = this.calcularMeses(this.fProstata);
      if( this.tipoProstata==0 && difControProstata <= 11 ) {
        //this.proxControlProstata = this.fProstata.add(11, 'months');
        this.proxControlProstata = moment(this.fProstata).format("DD-MM-YYYY");
        this.proxControlProstata = moment().add(11, 'months').format("DD-MM-YYYY");
      }else if( this.tipoProstata==1 && difControProstata > 11){
        //AHORA
        this.proxControlProstata = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoProstata==0 && difControProstata <= 6 ){
        //this.proxControlProstata = this.fProstata.add(6, 'months');
        this.proxControlProstata = moment(this.fProstata).format("DD-MM-YYYY");
        this.proxControlProstata = moment().add(6, 'months').format("DD-MM-YYYY");
      }else if( this.tipoProstata==1 && difControProstata > 6 ){
        //AHORA
        this.proxControlProstata = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoProstata != 0 || this.tipoProstata != 1 || this.tipoProstata !=2){
        this.proxControlProstata = moment().add(7, 'day').format("DD-MM-YYYY");
      } 
    }
    
    //COLON OK <= 11 MESES && RESULTADONORMAL ... > 11 MESES &&RESULTADONORMAL
    //COLON OK <= 6 MESES && RESULTADOANORMAL ... > 6 MESES &&RESULTADOANORMAL
    //this.fcontrolColon;
    //this.tipoColon;
    //console.log('this.fcontrolColon: ', this.fcontrolColon);
    //if(this.fcontrolColon!='01-01-1900' && this.fcontrolColon!='1900-01-01'){
    if(true){
      var difControColon = this.calcularMeses(this.fcontrolColon);
      if( this.tipoColon==0 && difControColon <= 11 ) {
        //this.proxControlColon = this.fcontrolColon.add(11, 'months');
        this.proxControlColon = moment(this.fcontrolColon).format("DD-MM-YYYY");
        this.proxControlColon = moment().add(11, 'months').format("DD-MM-YYYY");
      }else if( this.tipoColon==1 && difControColon > 11){
        //AHORA
        this.proxControlColon = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoColon==0 && difControColon <= 6 ){
        //this.proxControlColon = this.fcontrolColon.add(6, 'months');
        this.proxControlColon = moment(this.fcontrolColon).format("DD-MM-YYYY");
        this.proxControlColon = moment().add(6, 'months').format("DD-MM-YYYY");
      }else if( this.tipoColon==1 && difControColon > 6 ){
        //AHORA
        this.proxControlColon = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoColon != 0 || this.tipoColon != 1 || this.tipoColon !=2){
        this.proxControlColon = moment().add(7, 'day').format("DD-MM-YYYY");
      } 
    }
    
    //GASTRO OK <= 11 MESES && RESULTADONORMAL ... > 11 MESES &&RESULTADONORMAL
    //GASTRO OK <= 6 MESES && RESULTADOANORMAL ... > 6 MESES &&RESULTADOANORMAL
    //this.fcontrolGastro;
    //this.tipoGastro;
    //console.log('this.fcontrolGastro: ', this.fcontrolGastro);
    //if(this.fcontrolGastro!='01-01-1900' && this.fcontrolGastro!='1900-01-01'){
    if(true){
      var difControGastro = this.calcularMeses(this.fcontrolGastro);
      if( this.tipoGastro==0 && difControGastro <= 11 ) {
        //this.proxControlGastro = this.fcontrolGastro.add(11, 'months');
        this.proxControlGastro = moment(this.fcontrolGastro).format("DD-MM-YYYY");
        this.proxControlGastro = moment().add(11, 'months').format("DD-MM-YYYY");
      }else if( this.tipoGastro==1 && difControGastro > 11){
        //AHORA
        this.proxControlGastro = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoGastro==0 && difControGastro <= 6 ){
        //this.proxControlGastro = this.fcontrolGastro.add(6, 'months');
        this.proxControlGastro = moment(this.fcontrolGastro).format("DD-MM-YYYY");
        this.proxControlGastro = moment().add(6, 'months').format("DD-MM-YYYY");
      }else if( this.tipoGastro==1 && difControGastro > 6 ){
        //AHORA
        this.proxControlGastro = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoGastro != 0 || this.tipoGastro != 1 || this.tipoGastro !=2){
        this.proxControlGastro = moment().add(7, 'day').format("DD-MM-YYYY");
      } 
    }
    
    //ODONTOLOGIA OK <= 18 MESES ... >18 
    //this.fcontrolOdontologia;
    //if(this.fcontrolOdontologia!='01-01-1900' && this.fcontrolOdontologia!='1900-01-01'){
    if(true){
      var difControlOdontologia = this.calcularMeses(this.fcontrolOdontologia);
      if(difControlOdontologia<=6){
        //AHORA
        //this.proxControlOdontologia = this.fcontrolOdontologia.add(6, 'months');
        this.proxControlOdontologia = moment(this.fcontrolOdontologia).format("DD-MM-YYYY");
        this.proxControlOdontologia = moment().add(6, 'months').format("DD-MM-YYYY");
      }else{
        //AHORA
        this.proxControlOdontologia = moment().add(7, 'day').format("DD-MM-YYYY");
      }
    }
    
    //FALTA QUE EL WS DEVUELVA ESTE DATO
    //OJOS OK <= 18 MESES && RESULTADONORMAL ... > 18 MESES &&RESULTADONORMAL
    //OJOS OK <= 12 MESES && RESULTADOANORMAL ... > 12 MESES &&RESULTADOANORMAL
    //this.fcontrolOftalmo;
    //this.tipoOftalmo;
    //console.log('this.fcontrolOftalmo: ', this.fcontrolOftalmo);
    //if(this.fcontrolOftalmo!='01-01-1900' && this.fcontrolOftalmo!='1900-01-01'){
    if(true){
      var difControOfmaltologia = this.calcularMeses(this.fcontrolOftalmo);
      if( this.tipoOftalmo==0 && difControOfmaltologia <= 11 ) {
        //this.proxControlOfmaltologia = this.fcontrolOftalmo.add(11, 'months');
        this.proxControlOfmaltologia = moment(this.fcontrolOftalmo).format("DD-MM-YYYY");
        this.proxControlOfmaltologia = moment().add(11, 'months').format("DD-MM-YYYY");
      }else if( this.tipoOftalmo==1 && difControOfmaltologia > 11){
        //AHORA
        this.proxControlOfmaltologia = moment().add(7, 'day').format("DD-MM-YYYY");
      }else if( this.tipoOftalmo==0 && difControOfmaltologia <= 6 ){
        //this.proxControlOfmaltologia = this.fcontrolOftalmo.add(6, 'months');
        this.proxControlOfmaltologia = moment(this.fcontrolOftalmo).format("DD-MM-YYYY");
        this.proxControlOfmaltologia = moment().add(6, 'months').format("DD-MM-YYYY");
      }else if( this.tipoOftalmo==1 && difControOfmaltologia > 6 ){
        //AHORA
        this.proxControlOfmaltologia = moment().add(7, 'day').format("DD-MM-YYYY");
      }
    }
  }

  itemTapped(event, control_selected) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(NextControlsPage, {
      selectedControl: control_selected
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextControlsPage');
    this.menu.swipeEnable(false);
  }

  calcularMeses(fechaexamen){
    var hoy = moment().format('YYYY-MM-DD');
    var fnacimiento = moment(fechaexamen);//moment(this.birthdate, "DD-MM-YYYY").format('YYYY-MM-DD');
  
    var fnacimientof = moment(fnacimiento);
    var hoyf = moment(hoy);

    var meses_diferencia = hoyf.diff(fnacimientof, 'months');
    //console.log(meses_diferencia);

    return meses_diferencia;
  }

  calculaEdad(fecha,fecha_nac){
    var a = moment(fecha);
    var b = moment(fecha_nac);

    var years = a.diff(b, 'year');
    b.add(years, 'years');

    var months = a.diff(b, 'months');
    b.add(months, 'months');

    var days = a.diff(b, 'days');

    if(years==0){
      if(months<=1){
        if(days<=1){
          console.log(months + ' mes ' + days + ' dia');
          return 0;       
          }else{
          console.log( months + ' mes ' + days + ' dias');
          return 0;       
          }
       }else{
        if(days<=1){
          console.log( months + ' meses ' + days + ' dia');
          return 0;        
        }else{
          console.log( months + ' meses ' + days + ' dias');
          return 0;        
        }  
       }

    }else{
      if(years==1){
        console.log( years + ' año');
        return years;     
        }else{
        console.log( years + ' años');
        return years;     
        } 
    }
  }

}
