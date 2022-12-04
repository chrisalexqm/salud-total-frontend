import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { UserDependentPage } from '../user-dependent/user-dependent';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
//import { RequestServicePage } from '../request-service/request-service';

/**
 * Generated class for the RegisterDataUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-data-user',
  templateUrl: 'register-data-user.html',
})
export class RegisterDataUserPage {
  //Declarando dependencias
  data: Observable<any>;
  //Datos generales
  idUser:string;
  nameUser:string;
  paternalSurnameUser:string;
  maternalSurnameUser:string;
  genderOption:number;
  age:number;
  nameAndSurnameUser: string;
  //habito de fumar
  cuantityForDaySmoke:any;
  cuantityYearOfSmoke:any;
  stateSmoke:number;
  stateDiseaseSmoke:number;
  //maternidad
  weeksPregnancy:number;
  dateBirth:any;
  lastRuller:any;
  typeTestMamografia:number;
  lastTestMamografia:any;
  //cuidado del hombre
  genderManTypeTestProstata:number;
  statePregnancy:number;

  //cuidado de la mujer
  typeTestPapanicolao:number;
  firstControlPregnancy:boolean;
  secondControlPregnancy:boolean;
  threeControlPregnancy:boolean;
  fourControlPregnancy:boolean;
  lastTestPapanicolao:any;  

  //presion arterial
  lastTestBloodPressure:any;
  valueBloodPressureN:any;
  valueBloodPressureD:any;
  stateTreatmentBloodPPressure:number;
  stateHypertension:number;

  //estado nutricional
  size:any;
  weight:any;
  bodyMassIndex:any;  
  glucoseY:any;
  glucoseMoreEat:any;
  cholesterolLdl:any;
  cholesterolLdlInt:any;
  cholesterolHdl:any;
  triglycerides:any;
  abdominalWaist:any;
  stateDiabetes:number;
  stateTreatmentDiabetes:number;
  hemoglobin:any; 
  hemoglobinGlin:any; 
  //checkeos
  lastTestOdontology:string
  lastTestGastroscopy:string;
  lastTestColonoscopy:string;
  lastTestEye:string;
  typeTestGastroscopy:number;
  typeTestColonoscopy:number;
  typeTestEye:number;
  lastTestCheckPrevent:string;
  resumeTestCheckPreventFL:boolean;
  resumeTestCheckPreventOK:boolean;
  //prefil de grasas
  lastTestFat:string;  
  //antecedentes medicos
  stateFamilyBackground:number;
  familyBackground:any;

  controls:Array<{Id: number, Semana:number, Descripcion:string}>;
  controlPregnantSelect:any;

  //iconos y secciones
  sectionBloodPressure:boolean;
  iconALBloodPressure:boolean;
  iconADBloodPressure:boolean;
  sectionLevelSugar:boolean;
  iconALLevelSugar:boolean;
  iconADLevelSugar:boolean;
  sectionFatProfile:boolean;
  iconALFatProfile:boolean;
  iconADFatProfile:boolean;
  sectioncheckAndControl:boolean;
  iconALcheckAndControl:boolean;
  iconADcheckAndControl:boolean;
  sectionNutrition:boolean;
  iconALNutrition:boolean;
  iconADNutrition:boolean;
  resumeControllerPregnantOk:boolean;
  resumeControllerPregnantBad:boolean;
  resumeTestEyeFL:boolean =false;
  resumeTestEyeOK:boolean =false;
  resumeTestColonoscopyFL:boolean =false;
  resumeTestColonoscopyOK:boolean =false;
  resumeTestGastroscopyFL:boolean =false;
  resumeTestGastroscopyOK:boolean =false;
  resumeTestOdontologyOK:boolean = false;
  resumeTestOdontologyFL:boolean = false;
  resumeProstataOK:boolean = false;
  resumeProstataFL:boolean = false;
  resumeMamografiaFL:boolean = false;
  resumeMamografiaOK:boolean = false;
  resumePapanicolaoFL:boolean = false;
  resumePapanicolaoOK:boolean = false;
  resumeBloodPressureResult1:boolean = false;
  resumeBloodPressureResult2:boolean = false;
  resumeBloodPressureResult3:boolean = false;
  resumeBloodPressureResult4:boolean = false;
  resumeBloodPressureResult5:boolean = false;
  resumeBloodPressureResultN1:boolean = false;
  resumeBloodPressureResultN2:boolean = false;
  resumeBloodPressureResultN3:boolean = false;
  resumeBloodPressureResultN4:boolean = false;
  resumeBloodPressureResultN5:boolean = false;  
  resumeLastTestlBloodPPressureFL:boolean = false;
  resumeLastTestlBloodPPressureOK:boolean = false;
  resumeLastTestDiabetesFL:boolean = false;
  resumeLastTestDiabetesOK:boolean = false;
  resumeLastTestFatFL:boolean = false;
  resumeLastTestFatOK:boolean = false;
  resumeLastTestDiabetes:any;
  antyNeumony:any;
  glucoseN: any;
  typeSmoke: any;
  //hemoglobinGlin:number;
  
  hideBtnRegData:boolean;
  hideBtnModData:boolean;
  sectionSmoke:boolean;
  iconALSmoke:boolean;
  iconADSmoke:boolean;
  sectionCareMan:boolean;
  iconALCareMan:boolean;
  iconADCareMan:boolean;
  sectionCareWoman:boolean;
  iconALCareWoman:boolean;
  iconADCareWoman:boolean;
  sectionFamilyBackground:boolean;
  iconALFamilyBackground:boolean;
  iconADFamilyBackground:boolean;
  title:string;  
  userNEW:string;
  idFormulario:number;
  updateUD:any;
  birthdateEnable:boolean;
  today = new Date().toJSON().split('T')[0];

  userObject:any;

  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;

  saludSelect:any;

  pregenderOption:any;
  prebirthdate:any;

  constructor(private menu: MenuController, public navCtrl: NavController,public loadingCtrl: LoadingController, public storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient) {
  		this.saludSelect = navParams.get('saludSelect');

  		this.loading();
  		this.updateUD = navParams.get('updateUD');
  		
  		//this.lastTestOdontology = '1990-02-19';
  		this.resumeControllerPregnantBad=false;
		this.resumeControllerPregnantOk=false;
  		this.sectionNutrition=false;
  		this.iconALNutrition=true;
  		this.iconADNutrition=false;
  		this.sectionBloodPressure=false;
		this.iconALBloodPressure=true;
		this.iconADBloodPressure=false;
		this.sectionLevelSugar=false;
		this.iconALLevelSugar=true;
		this.iconADLevelSugar=false;		
		this.sectionFatProfile=false;
		this.iconALFatProfile=true;
		this.iconADFatProfile=false;
		this.sectioncheckAndControl=false;
		this.iconALcheckAndControl=true;
		this.iconADcheckAndControl=false;
		this.hideBtnRegData=false;
		this.title="Actualizar mis datos";
		this.hideBtnModData=true;
		this.iconALSmoke = true;
		this.iconADSmoke = false;
		this.sectionSmoke = false;
		this.iconALCareMan = true;
		this.iconADCareMan = false;
		this.sectionCareMan = false;
		this.iconALCareWoman = true;
		this.iconADCareWoman = false;
		this.sectionCareWoman = false;
		this.iconALFamilyBackground = true;
		this.iconADFamilyBackground = false;
		this.sectionFamilyBackground = false;
		this.stateFamilyBackground=0;
		this.birthdateEnable = false;
		/*window.localStorage.getItem('userNEW').then((val) => {
		  console.log(val);
	      this.userNEW=val;
	    });*/
	    this.userNEW = window.localStorage.getItem('userNEW');
	    this.idUser = window.localStorage.getItem('userID');
		this.hideBtnRegData = navParams.get("hideBtnRegData");
		if(this.hideBtnRegData){
			//this.hideBtnModData=false;
			//this.hideBtnRegData=true;
			//this.title="Registrar mis datos";
			this.hideBtnModData=true;
			this.hideBtnRegData=false;			
			this.title="Actualizar mis datos";	

		}else{
			this.hideBtnModData=true;
			this.hideBtnRegData=false;
			this.title="Actualizar mis datos";		
		}
		if(this.updateUD){
			console.log("usuario dependiente");
  			console.log(this.updateUD);
			//this.idFormulario = this.updateUD.idForm;
			let gidform;
			let giduser;
			if(!this.updateUD.idForm || this.updateUD.idForm == undefined || this.updateUD.idForm == null){
				console.log("ES UNDEFINED");
				gidform = this.updateUD.IDF;				
			}else{
				console.log("NO ES UNDEFINED");
				gidform = this.updateUD.idForm;
			}
			if(!this.updateUD.idUsr || this.updateUD.idUsr == undefined || this.updateUD.idUsr == null){				
			   	giduser = this.updateUD.Idusr;
			}else{
				giduser = this.updateUD.idUsr;			   	
			}
			

			console.log("gidform ", gidform);
			console.log("giduser ", giduser);

  			var url = "http://saludtotalapp.com/wservice/formulario/consfrm/";
				var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
	  			let body = "";
	  			body = 
			  			"&idform=" 	+ gidform  +
			  			"&idusr=" 	+ giduser	+ 
				"";
				console.log("body: ", body);
				this.data= this.http.post(url, body, header);
			    this.data.subscribe(data=>{
			    	url="";
			    	console.log('data obtenida', data);
					if(data[0].Nombre){
						this.userObject = data[0];
						if(parseInt(data[0].Anosfumando) <= 0){
							this.cuantityYearOfSmoke = "";
						}else{
							this.cuantityYearOfSmoke = data[0].Anosfumando;
						}
						this.stateFamilyBackground = data[0].Antecedentefamiliar;
						//this.cuantityForDaySmoke = data[0].Cigarrosxdia;
						if(parseInt(data[0].Cigarrosxdia) <= 0){
							this.cuantityForDaySmoke = "";
						}else{
							this.cuantityForDaySmoke = data[0].Cigarrosxdia;
						}
						this.familyBackground = data[0].Codigoenfermdad;
						if(parseFloat(data[0].ColesterolHDL) <= 0){
							this.cholesterolHdl = "";
						}else{
							this.cholesterolHdl = data[0].ColesterolHDL;
						}
						if(parseFloat(data[0].ColesterolLDL) <= 0){
							this.cholesterolLdl = "";
						}else{
							this.cholesterolLdl = data[0].ColesterolLDL;
						}						
						//this.cholesterolLdl = data[0].ColesterolLDL;
						this.typeSmoke =  data[0].TipoFumador;
						this.genderOption = data[0].Genero;
						this.pregenderOption = data[0].Genero;
						this.stateDiabetes = data[0].Esdiabetico;
						this.stateSmoke = data[0].Esfumador;
						this.statePregnancy = data[0].Esgestante;
						this.stateHypertension = data[0].Eshipertenso;
						var enfermedades = data[0].Codigoenfermdad.split(",");
						this.familyBackground = enfermedades;
						this.lastRuller 		= moment(data[0].FecFUR).format('YYYY-MM-DD');
						this.lastTestMamografia = moment(data[0].FecMamografia).format('YYYY-MM-DD');
						this.birthdate.month 	= moment(data[0].FecNacimiento).format('YYYY-MM-DD');
						
						this.prebirthdate = moment(data[0].FecNacimiento).format('YYYY-MM-DD');
						//console.log("data[0].FecNacimiento", data[0].FecNacimiento);
						//console.log("data[0].FecMamografia", data[0].FecMamografia);
						//console.log("this.birthdate.month moment", moment(data[0].FecNacimiento).format('YYYY-MM-DD'));
						this.genderManLastTestProstata.month = moment(data[0].FecProstata).format('YYYY-MM-DD');
						this.resumeLastTestDiabetes = moment(data[0].FecUCdiabetes).format('YYYY-MM-DD');
						this.lastTestFat = moment(data[0].FecUCgrasas).format('YYYY-MM-DD');
						this.lastTestColonoscopy = moment(data[0].FecUVcolonoscopia).format('YYYY-MM-DD');
						this.lastTestGastroscopy = moment(data[0].FecUVgastro).format('YYYY-MM-DD');
						this.lastTestOdontology = moment(data[0].FecUVodonto).format('YYYY-MM-DD');
						this.lastTestEye = moment(data[0].FecUVojos).format('YYYY-MM-DD');
						this.dateBirth = moment(data[0].Fecestparto).format('YYYY-MM-DD');
						console.log("fecha de parto: ", this.dateBirth);
						this.lastTestPapanicolao = moment(data[0].Fecpapanico).format('YYYY-MM-DD');
						//this.lastTestCheckPrevent = moment(data[0].Fecpapanico).format('YYYY-MM-DD');
						this.onChangeBirthdate();
						this.genderOption = data[0].Genero;
						if(parseFloat(data[0].Hemoglobina) <= 0){
							this.hemoglobin = "";
						}else{
							this.hemoglobin = data[0].Hemoglobina;
						}
						//this.hemoglobin = data[0].Hemoglobina;
						if(parseFloat(data[0].Hemoglobinaalimentos) <= 0){
							this.glucoseMoreEat = "";
						}else{
							this.glucoseMoreEat = data[0].Hemoglobinaalimentos;
						}
						//this.glucoseMoreEat = data[0].Hemoglobinaalimentos;
						if(parseFloat(data[0].Hemoglobinaayunas) <= 0){
							this.glucoseY = "";
						}else{
							this.glucoseY = data[0].Hemoglobinaayunas;
						}
						//this.glucoseY = data[0].Hemoglobinaayunas;
						if(parseFloat(data[0].Hemoglobinaglic) <= 0){
							this.hemoglobinGlin = "";
						}else{
							this.hemoglobinGlin = data[0].Hemoglobinaglic;
						}
						//this.hemoglobinGlin = data[0].Hemoglobinaglic;						
						this.maternalSurnameUser = data[0].Materno;
						if(parseFloat(data[0].Medidaabdominal) <= 0){
							this.abdominalWaist = "";
						}else{
							this.abdominalWaist = data[0].Medidaabdominal;
						}
						//this.abdominalWaist = data[0].Medidaabdominal;
						window.localStorage.setItem('nameUser', data[0].Nombre);
				        window.localStorage.setItem('paternalSurnameUser', data[0].Paterno);
				        window.localStorage.setItem('maternalSurnameUser', data[0].Materno);
						this.nameUser = data[0].Nombre;
						this.paternalSurnameUser = data[0].Paterno;
						var nombres = this.nameUser.split(" ");
						var apellidos = this.paternalSurnameUser.split(" ");
						this.nameAndSurnameUser = nombres[0] + " " + apellidos[0];

						if(parseFloat(data[0].Peso) <= 0){
							this.weight = "";
						}else{
							this.weight = data[0].Peso;
						}
						//this.size = data[0].Peso;
						if(parseFloat(data[0].Talla) <= 0){
							this.size = "";
						}else{
							this.size = data[0].Talla;
						}
						//this.weight = data[0].Talla;
						this.typeTestColonoscopy = data[0].Tipocolonoscopia;
						this.typeTestGastroscopy = data[0].Tipogastro;
						this.typeTestMamografia = data[0].Tipomamografia;
						this.typeTestEye = data[0].Tipoojos;
						this.genderManTypeTestProstata = data[0].Tipoprostata;
						this.stateTreatmentDiabetes = data[0].Tratamientodiabetes;
						if(parseFloat(data[0].Trigliceridos) <= 0){
							this.triglycerides = "";
						}else{
							this.triglycerides = data[0].Trigliceridos;
						}
						//this.triglycerides = data[0].Trigliceridos;
						this.lastTestCheckPrevent = moment(data[0].FUltConsMedicPrevent).format('YYYY-MM-DD');
						this.lastTestBloodPressure = moment(data[0].FecUCPresionArterial, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.stateTreatmentBloodPPressure = data[0].EsTratamientoPresionArterial;
						var presionarterial = data[0].Presionarterial.split("/");
						if(parseFloat(presionarterial[0]) <= 0 || presionarterial[0] =="-"){
							this.valueBloodPressureN = "";
						}else{
							this.valueBloodPressureN = presionarterial[0];
						}
						//this.valueBloodPressureN = presionarterial[0];
						if(parseFloat(presionarterial[1]) <= 0 || presionarterial[1] =="-"){
							this.valueBloodPressureD = "";
						}else{
							this.valueBloodPressureD = presionarterial[1];
						}
						//this.valueBloodPressureD = presionarterial[1];						
						this.antyNeumony = data[0].VacNeumo;						
						if(parseFloat(data[0].Glucosa) <= 0){
							this.glucoseN = "";
						}else{
							this.glucoseN = data[0].Glucosa;
						}
						//this.glucoseN = data[0].Glucosa;
						this.idFormulario= data[0].IDF;
						this.calculateFURWS();
						this.controlPregnantSelect = data[0].CodControlEmbarazo.split(",");
						
						this.onChangeCareMan();
						this.onChangeCareWomanMamografia();
						this.onChangeCareWomanPapanicolao();
						this.calculateHypertensionYes();
						this.onChangeCareBloodPressure();
						this.onChangeDiseaseSmoke();
						this.calculateBodyMassIndex();
						this.onChangeLastTestDiabetes();
						this.onChangeLastTestFat();
						this.onChangeCholesterolLdl();
						this.onChangeCholesterolHdl();
						this.onChangeCholesterolTriglycerides();
						this.onChangeLastTestCheckPrevent();
						this.onChangeLastTestOdontology();
						this.onChangeLastTestEye();
						this.onChangeLastTestGastroscopy();
						this.onChangeLastTestColonoscopy();
						this.validateWeeksPregnant();

						if(this.birthdate.month == "2000-01-01" || this.birthdate.month == "2000/01/01"){
							this.birthdateEnable = true;
						}else{
							this.birthdateEnable = false;
						}

					}else if(data.code=="500"){
						console.log('MAL');
					}
			    });
  		}else{
  			console.log("usuario principal");
  			console.log("_________________");
			if(this.userNEW!='true'){
				var url = "http://saludtotalapp.com/wservice/formulario/consfrm/";
				var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
	  			let body = "";
	  			body = 
			  			"&idform=" 	+ -1 			+
			  			"&idusr=" 	+ this.idUser 	+ 
				"";
				console.log(body);
				this.data= this.http.post(url, body, header);
			    this.data.subscribe(data=>{
			    	url="";
					console.log(data);
					if(data[0].Nombre){
						
						
						if(parseInt(data[0].Anosfumando) <= 0){
							this.cuantityYearOfSmoke = "";
						}else{
							this.cuantityYearOfSmoke = data[0].Anosfumando;
						}
						this.stateFamilyBackground = data[0].Antecedentefamiliar;
						if(parseInt(data[0].Cigarrosxdia) <= 0){
							this.cuantityForDaySmoke = "";
						}else{
							this.cuantityForDaySmoke = data[0].Cigarrosxdia;
						}
						var enfermedades = data[0].Codigoenfermdad.split(",");
						this.familyBackground = enfermedades;
						/*for (let i of enfermedades) {
					      this.familyBackground.push(enfermedades[i]);
					    }*/
						
						if(parseFloat(data[0].ColesterolHDL) <= 0){
							this.cholesterolHdl = "";
						}else{
							this.cholesterolHdl = data[0].ColesterolHDL;
						}
						if(parseFloat(data[0].ColesterolLDL) <= 0){
							this.cholesterolLdl = "";
						}else{
							this.cholesterolLdl = data[0].ColesterolLDL;
						}
						this.stateDiabetes = data[0].Esdiabetico;
						this.stateSmoke = data[0].Esfumador;
						this.statePregnancy = data[0].Esgestante;
						this.stateHypertension = data[0].Eshipertenso;

						
						this.lastTestMamografia = moment(data[0].FecMamografia, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.birthdate.month = moment(data[0].FecNacimiento,'DD-MM-YYYY').format('YYYY-MM-DD');
						
						this.prebirthdate = moment(data[0].FecNacimiento,'DD-MM-YYYY').format('YYYY-MM-DD');
						//var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');
						console.log("birthdate.month: ", this.birthdate.month);
						this.genderManLastTestProstata.month = moment(data[0].FecProstata, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.resumeLastTestDiabetes = moment(data[0].FecUCdiabetes, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.lastTestFat = moment(data[0].FecUCgrasas, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.lastTestColonoscopy = moment(data[0].FecUVcolonoscopia, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.lastTestGastroscopy = moment(data[0].FecUVgastro, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.lastTestOdontology = moment(data[0].FecUVodonto, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.lastTestEye = moment(data[0].FecUVojos, 'DD-MM-YYYY').format('YYYY-MM-DD');
						
						this.lastRuller = moment(data[0].FecFUR, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.dateBirth = moment(data[0].Fecestparto, 'DD-MM-YYYY').format('YYYY-MM-DD');
						console.log("fecha de FUR obtenida del WS: ", this.lastRuller);
						this.lastTestPapanicolao = moment(data[0].Fecpapanico, 'DD-MM-YYYY').format('YYYY-MM-DD');
						//this.lastTestCheckPrevent = moment(data[0].Fecpapanico).format('YYYY-MM-DD');
						this.onChangeBirthdate();
						this.typeSmoke =  data[0].TipoFumador;
						this.genderOption = data[0].Genero;
						this.pregenderOption = data[0].Genero;
						if(parseFloat(data[0].Hemoglobina) <= 0){
							this.hemoglobin = "";
						}else{
							this.hemoglobin = data[0].Hemoglobina;
						}
						//this.hemoglobin = data[0].Hemoglobina;
						if(parseFloat(data[0].Hemoglobinaalimentos) <= 0){
							this.glucoseMoreEat = "";
						}else{
							this.glucoseMoreEat = data[0].Hemoglobinaalimentos;
						}
						//this.glucoseMoreEat = data[0].Hemoglobinaalimentos;
						if(parseFloat(data[0].Hemoglobinaayunas) <= 0){
							this.glucoseY = "";
						}else{
							this.glucoseY = data[0].Hemoglobinaayunas;
						}
						//this.glucoseY = data[0].Hemoglobinaayunas;
						if(parseFloat(data[0].Hemoglobinaglic) <= 0){
							this.hemoglobinGlin = "";
						}else{
							this.hemoglobinGlin = data[0].Hemoglobinaglic;
						}
						this.maternalSurnameUser = data[0].Materno;
						if(parseFloat(data[0].Medidaabdominal) <= 0){
							this.abdominalWaist = "";
						}else{
							this.abdominalWaist = data[0].Medidaabdominal;
						}
						this.nameUser = data[0].Nombre;
						this.paternalSurnameUser = data[0].Paterno;
						var nombres = this.nameUser.split(" ");
						var apellidos = this.paternalSurnameUser.split(" ");
						this.nameAndSurnameUser = nombres[0] + " " + apellidos[0];
						
						if(parseFloat(data[0].Peso) <= 0){
							this.weight = "";
						}else{
							this.weight = data[0].Peso;
						}
						//this.size = data[0].Peso;
						if(parseFloat(data[0].Talla) <= 0){
							this.size = "";
						}else{
							this.size = data[0].Talla;
						}
						this.typeTestColonoscopy = data[0].Tipocolonoscopia;
						this.typeTestGastroscopy = data[0].Tipogastro;
						this.typeTestMamografia = data[0].Tipomamografia;
						this.typeTestEye = data[0].Tipoojos;
						this.genderManTypeTestProstata = data[0].Tipoprostata;
						this.stateTreatmentDiabetes = data[0].Tratamientodiabetes;
						if(parseFloat(data[0].Trigliceridos) <= 0){
							this.triglycerides = "";
						}else{
							this.triglycerides = data[0].Trigliceridos;
						}
						this.lastTestCheckPrevent = moment(data[0].FUltConsMedicPrevent, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.lastTestBloodPressure = moment(data[0].FecUCPresionArterial, 'DD-MM-YYYY').format('YYYY-MM-DD');
						this.stateTreatmentBloodPPressure = data[0].EsTratamientoPresionArterial;
						var presionarterial = data[0].Presionarterial.split("/");
						if(parseFloat(presionarterial[0]) <= 0 || presionarterial[0] =="-"){
							this.valueBloodPressureN = "";
						}else{
							this.valueBloodPressureN = presionarterial[0];
						}
						//this.valueBloodPressureN = presionarterial[0];
						if(parseFloat(presionarterial[1]) <= 0 || presionarterial[1] =="-"){
							this.valueBloodPressureD = "";
						}else{
							this.valueBloodPressureD = presionarterial[1];
						}
						this.antyNeumony = data[0].VacNeumo;
						if(parseFloat(data[0].Glucosa) <= 0){
							this.glucoseN = "";
						}else{
							this.glucoseN = data[0].Glucosa;
						}
						this.idFormulario= data[0].IDF;
						this.calculateFURWS();
						this.controlPregnantSelect = data[0].CodControlEmbarazo.split(",");
						
						this.onChangeCareMan();
						this.onChangeCareWomanMamografia();
						this.onChangeCareWomanPapanicolao();
						this.calculateHypertensionYes();
						this.onChangeCareBloodPressure();
						this.onChangeDiseaseSmoke();
						this.calculateBodyMassIndex();
						this.onChangeLastTestDiabetes();
						this.onChangeLastTestFat();
						this.onChangeCholesterolLdl();
						this.onChangeCholesterolHdl();
						this.onChangeCholesterolTriglycerides();
						this.onChangeLastTestCheckPrevent();
						this.onChangeLastTestOdontology();
						this.onChangeLastTestEye();
						this.onChangeLastTestGastroscopy();
						this.onChangeLastTestColonoscopy();
						this.validateWeeksPregnant();
						//alert(this.birthdate.month);
						if(this.birthdate.month == "2000-01-01" || this.birthdate.month == "2000/01/01"){
							this.birthdateEnable = true;
						}else{
							this.birthdateEnable = false;
						}
						
					}else if(data.code=="500"){
						console.log('MAL');
					}
			    },err=>{
			    	console.log(err);
			    	var url = "http://saludtotalapp.com/wservice/usuario/dtgn/";
					var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
		  			let body = "";
		  			body = 
			  			"&icodusr=" 	+ this.idUser 	+ 
					"";
					this.data= this.http.post(url, body, header);
					this.data.subscribe(data=>{
						this.nameUser = data[0].Nombre;
						this.paternalSurnameUser = data[0].Paterno;
						this.maternalSurnameUser = data[0].Materno;
					},err=>{
				      this.messageError();
				    });
				});		    	
			}else{
				console.log('MAL');
				this.nameUser = window.localStorage.getItem('nameUser');
				this.paternalSurnameUser = window.localStorage.getItem('paternalSurnameUser');
				this.maternalSurnameUser = window.localStorage.getItem('maternalSurnameUser');
			}
		}
		this.test();
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
  goPageRequestService(){
  	this.navCtrl.push(HomePage);
  }

  tapSelectSalud(select){
  	console.log(this.prebirthdate);
  	if( this.genderOption == -1 || this.birthdate.month == "2000-01-01" || this.birthdate.month == "2000/01/01"){
  		let alertF = this.alertCtrl.create({
	      title: 'Datos incompletos:',
	      subTitle: 'Guarde su género y fecha de nacimiento',
	      buttons: ['OK']
	    });
	    alertF.present();
  		return false;
  	}

  	if( this.pregenderOption == -1 || this.prebirthdate == "2000-01-01" || this.prebirthdate == "2000/01/01" ){
  		let alertF = this.alertCtrl.create({
	      title: 'Datos incompletos:',
	      subTitle: 'Guarde su género y fecha de nacimiento',
	      buttons: ['OK']
	    });
	    alertF.present();
  		return false;  		
  	}

  	if(this.updateUD){
  		//this.postRequestUpdate();
  		this.navCtrl.push(RegisterDataUserPage, {
  		  saludSelect: select,
	      updateUD: this.updateUD
	    });
    	/*this.navCtrl.push(UserDependentPage, {
          userTap: this.userObject,
          tu: 'esconvencional'
        });*/
    }else{
    	//this.postRequestUpdate();
    	this.navCtrl.push(RegisterDataUserPage, {
	      saludSelect: select
	    });
    }
    
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

  test(){
  	var cadena = "9.5";
  	var hg = cadena.substr(0,2);
  }

  onChangeMaxLenght(){
  	/*if (this.value.length > this.maxLength){
  		this.value = this.value.slice(0, this.maxLength);
  	}*/ 
  	if (this.cholesterolLdl) {
  		if (this.cholesterolLdl.length > this.cholesterolLdl.maxLength){
  			this.cholesterolLdl.value=this.cholesterolLdl.value.slice(0,this.cholesterolLdl.maxLength);
	  		//this.cholesterolLdl = this.cholesterolLdl.slice(0, this.cholesterolLdl.maxLength);
	  	} 
  	}
  	
  }

  showFamilyBackground(){  	
		if(this.sectionFamilyBackground == false){
			//icon
			this.iconALFamilyBackground = false;
			this.iconADFamilyBackground = true;
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALCareMan = true;
			this.iconADCareMan = false;
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionFamilyBackground = true;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
		}else{
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			//this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
			//icon
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
		}  	
  }
  showCareWoman(){  	
		if(this.sectionCareWoman == false){
			//icon
			this.iconALCareWoman = false;
			this.iconADCareWoman = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
			this.iconALCareMan = true;
			this.iconADCareMan = false;
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionCareWoman = true;
			this.sectionFamilyBackground = false;
			this.sectionCareMan = false;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
		}else{
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			//this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
			//icon
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;			
		}  	
  }
  showCareMan(){  	
		if(this.sectionCareMan == false){
			//icon
			this.iconALCareMan = false;
			this.iconADCareMan = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = true;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
		}else{
			this.sectionFamilyBackground = false;
			//this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;			
			this.sectionCareMan = false;
			this.sectionCareWoman = false;
			this.iconALCareMan = true;
			this.iconADCareMan = false;
		}  	
  }
  showSmoke(){  	
		if(this.sectionSmoke == false){
			//icon
			this.iconALSmoke = false;
			this.iconADSmoke = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			this.sectionSmoke = true;			
			//this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
		}else{
			this.iconALSmoke = true;
			this.iconADSmoke = false;

			this.sectionFamilyBackground = false;
			//this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;			
			this.sectionSmoke = false;
			this.sectionCareMan = false;
			this.sectionCareWoman = false;
		}  	
  }
  showBloodPressure(){  	
		if(this.sectionBloodPressure == false){
			//icon
			this.iconALBloodPressure = false;
			this.iconADBloodPressure = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			this.sectionBloodPressure = true;
			this.sectionSmoke = false;
			//this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
		}else{
			this.iconADBloodPressure = false;
			this.sectionBloodPressure = false;

			this.sectionFamilyBackground = false;
			this.sectionSmoke = false;
			//this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
			this.iconALBloodPressure = true;			
			this.sectionCareMan = false;
			this.sectionCareWoman = false;
		}  	
  }
  showNutrition(){  	
		if(this.sectionNutrition == false){
			//icon
			this.iconALNutrition = false;
			this.iconADNutrition = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			this.sectionNutrition = true;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			//this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
		}else{
			this.iconALNutrition = true;
			this.iconADNutrition = false;

			this.sectionFamilyBackground = false;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			//this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;			
			this.sectionNutrition = false;
			this.sectionCareMan = false;
			this.sectionCareWoman = false;
		}  	
  }
  showLevelSugar(){  	
		if(this.sectionLevelSugar == false){
			//icon
			this.iconALLevelSugar = false;
			this.iconADLevelSugar = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			this.sectionLevelSugar = true;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			//this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
			//this.iconALLevelSugar = true;
			//this.iconADLevelSugar = false;
			//this.sectionLevelSugar = false;
		}else{
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;

			this.sectionFamilyBackground = false;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			//this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;			
			this.sectionLevelSugar = false;
			this.sectionCareMan = false;
			this.sectionCareWoman = false;
		}  	
  }
  showFatProfile(){  	
		if(this.sectionFatProfile == false){
			//icon
			this.iconALFatProfile = false;
			this.iconADFatProfile = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			this.sectionFatProfile = true;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			//this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;
			//this.iconALFatProfile = true;
			//this.iconADFatProfile = false;
			//this.sectionFatProfile = false;
		}else{
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;

			this.sectionFamilyBackground = false;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			//this.sectionFatProfile = false;
			this.sectioncheckAndControl = false;			
			this.sectionFatProfile = false;
			this.sectionCareMan = false;
			this.sectionCareWoman = false;
		}  	
  }  
  showcheckAndControl(){  	
		if(this.sectioncheckAndControl == false){
			//icon
			this.iconALcheckAndControl = false;
			this.iconADcheckAndControl = true;
			this.iconALFamilyBackground = true;
			this.iconADFamilyBackground = false;			
			this.iconALBloodPressure = true;
			this.iconADBloodPressure = false;
			this.iconALSmoke = true;
			this.iconADSmoke = false;
			this.iconALCareWoman = true;
			this.iconADCareWoman = false;
			this.iconALNutrition = true;
			this.iconADNutrition = false;
			this.iconALLevelSugar = true;
			this.iconADLevelSugar = false;
			this.iconALFatProfile = true;
			this.iconADFatProfile = false;
			//section
			this.sectionFamilyBackground = false;
			this.sectionCareWoman = false;
			this.sectionCareMan = false;
			this.sectioncheckAndControl = true;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			//this.sectioncheckAndControl = false;
		}else{
			this.iconALcheckAndControl = true;
			this.iconADcheckAndControl = false;

			this.sectionFamilyBackground = false;
			this.sectionSmoke = false;
			this.sectionBloodPressure = false;
			this.sectionNutrition = false;
			this.sectionLevelSugar = false;
			this.sectionFatProfile = false;
			//this.sectioncheckAndControl = false;			
			this.sectioncheckAndControl = false;
			this.sectionCareMan = false;
			this.sectionCareWoman = false;
		}  	
  }

  onChangeBirthdate(){
	  	var birthdateBridge:string[] = this.birthdate.month.split("-");
		let hoy = moment().format('YYYY-MM-DD');
		this.age=this.calculaEdad(hoy,this.birthdate.month);
		/*
	  	let hoyArray = hoy.split("-");
	  	let hoyYear = hoyArray[0];
	  	let hoyMonth = hoyArray[1];
	  	let hoyDays = hoyArray[2];
	  	let ageYear = parseFloat(hoyArray[0]) - parseFloat(birthdateBridge[0]);
	  	let ageMonth = parseFloat(hoyArray[1]) - parseFloat(birthdateBridge[1]);
	  	let ageDays = parseFloat(hoyArray[2]) - parseFloat(birthdateBridge[2]);
	  	if (ageDays< 0) {	  		
	  		if(ageMonth <0){
	  			this.age=ageYear;
	  		}else if(ageMonth >0){
	  			this.age=ageYear-1;
	  		}else{
	  			this.age=ageYear;
	  		}
	  	}else if (ageDays> 0) {
	  		if(ageMonth <0){
	  			this.age=ageYear;
	  		}else if(ageMonth >0){
	  			this.age=ageYear-1;
	  		}else{
	  			this.age=ageYear -1;
	  		}	  		
	  	}else if (ageDays == 0) {
	  		if(ageMonth < 0){
	  			this.age=ageYear;
	  		}else if(ageMonth > 0){
	  			this.age=ageYear - 1;
	  		}else{
	  			this.age=ageYear;
	  		}	  		
	  	}
	    console.log('meses: ', ageMonth);
	    console.log('dias: ', ageDays);*/
  }

  // recibe fecha actual y fecha de nacimiento
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
					return 0;				
			    }else{
					return 0;				
			    }
		   }else{
				if(days<=1){
					return 0;			   
				}else{
					return 0;			   
				}  
		   }

		}else{
			if(years==1){
				return years;			
		    }else{
				return years;			
		    }	
		}
  }
  onChangeLastTestCheckPrevent() {
  		if(this.lastTestCheckPrevent){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestOdontologyMiliseconds = Date.parse(this.lastTestCheckPrevent);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestOdontologyMiliseconds;
			//11 meses=	28908000000
			//6  meses= 15768000000
			//18 meses= 47335500000
			if(diferenceMonthsMiliseconds<47335500000){
				this.resumeTestCheckPreventFL=false;
				this.resumeTestCheckPreventOK=true;
			}else{
				this.resumeTestCheckPreventFL=true;
				this.resumeTestCheckPreventOK=false;
			}
		}
  }

  onChangeLastTestOdontology() {
  		if(this.lastTestOdontology){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestOdontologyMiliseconds = Date.parse(this.lastTestOdontology);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestOdontologyMiliseconds;
			//11 meses=	28908000000
			//6  meses= 15768000000			
			// Antes = 	47336400000					  
			if(diferenceMonthsMiliseconds<46656000000){//Bien
				this.resumeTestOdontologyFL=false;
				this.resumeTestOdontologyOK=true;
			}else{// Mal
				this.resumeTestOdontologyFL=true;
				this.resumeTestOdontologyOK=false;
			}
		}
  }
  onChangeLastTestColonoscopy() {
  		if(this.lastTestColonoscopy){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestColonoscopyMiliseconds = Date.parse(this.lastTestColonoscopy);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let typeTestColonoscopy= this.typeTestColonoscopy;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestColonoscopyMiliseconds;
			//11 meses=	28908000000 // Antes
			//6  meses= 15768000000 // Antes
			if(typeTestColonoscopy==0){
				if(diferenceMonthsMiliseconds<315360000000){
					this.resumeTestColonoscopyFL=false;
					this.resumeTestColonoscopyOK=true;
				}else{
					this.resumeTestColonoscopyFL=true;
					this.resumeTestColonoscopyOK=false;
				}
			}else if(typeTestColonoscopy==1){
				if(diferenceMonthsMiliseconds<15552000000){
					this.resumeTestColonoscopyFL=false;
					this.resumeTestColonoscopyOK=true;
				}else{
					this.resumeTestColonoscopyFL=true;
					this.resumeTestColonoscopyOK=false;
				}
			}
		}
  }
  onChangeLastTestEye() {
  		if(this.lastTestEye && this.typeTestEye){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestEyeMiliseconds = Date.parse(this.lastTestEye);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let typeTestEye= this.typeTestEye;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestEyeMiliseconds;
			//11 meses=	28908000000
			//6  meses= 15768000000
			if(typeTestEye==0){

				if(diferenceMonthsMiliseconds<46656000000){ // Antes 47335500000
					this.resumeTestEyeFL=false;
					this.resumeTestEyeOK=true;
				}else{
					this.resumeTestEyeFL=true;
					this.resumeTestEyeOK=false;
				}
			}else if(typeTestEye==1){

				if(diferenceMonthsMiliseconds<31557000000){ // Antes 31557000000
					this.resumeTestEyeFL=false;
					this.resumeTestEyeOK=true;
				}else{
					this.resumeTestEyeFL=true;
					this.resumeTestEyeOK=false;
				}
			}
		}
  }
  onChangeLastTestGastroscopy() {
  		if(this.lastTestGastroscopy && this.typeTestGastroscopy){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestGastroscopyMiliseconds = Date.parse(this.lastTestGastroscopy);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let typeTestGastroscopy= this.typeTestGastroscopy;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestGastroscopyMiliseconds;
			//11 meses=	28908000000 // Antes
			//6  meses= 15768000000 // Antes
			if(typeTestGastroscopy==0){
				if(diferenceMonthsMiliseconds<93312000000){
					this.resumeTestGastroscopyFL=false;
					this.resumeTestGastroscopyOK=true;
				}else{
					this.resumeTestGastroscopyFL=true;
					this.resumeTestGastroscopyOK=false;
				}
			}else if(typeTestGastroscopy==1){
				if(diferenceMonthsMiliseconds<15552000000){
					this.resumeTestGastroscopyFL=false;
					this.resumeTestGastroscopyOK=true;
				}else{
					this.resumeTestGastroscopyFL=true;
					this.resumeTestGastroscopyOK=false;
				}
			}
		}
  }
  onChangeCareMan() {
	  	if(this.genderManLastTestProstata.month && this.genderManTypeTestProstata){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestProstataMiliseconds = Date.parse(this.genderManLastTestProstata.month);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let typeTestProstata= this.genderManTypeTestProstata;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestProstataMiliseconds;
			//11 meses=	28908000000 Antes
			//6  meses= 15768000000 Antes
			if(typeTestProstata==0){
				if(diferenceMonthsMiliseconds>93312000000){
					this.resumeProstataFL=false;
					this.resumeProstataOK=true;
				}else{
					this.resumeProstataFL=true;
					this.resumeProstataOK=false;
				}
			}else if(typeTestProstata==1){
				if(diferenceMonthsMiliseconds>31104000000){
					this.resumeProstataFL=false;
					this.resumeProstataOK=true;
				}else{
					this.resumeProstataFL=true;
					this.resumeProstataOK=false;
				}
			}
		}
  }
  calculateFUR(){
  		console.log("SEMANAS DE EMBARAZO POR CAMBIO");
	  	let te = moment(this.lastRuller).subtract(3, 'months').format('YYYY-MM-DD');
	  	let tes = moment(te).add(7, 'days').format('YYYY-MM-DD');
	  	let tess = moment(tes).add(1, 'years').format('YYYY-MM-DD');
		//let time = moment().format('HHmmss');
		this.dateBirth=tess;
		let hoy = moment().format('YYYY-MM-DD');
		let semanasD = moment(hoy).diff(moment(this.lastRuller), 'weeks')
		console.log("Cambiando las semanas de embarazo");
		this.weeksPregnancy = semanasD;
		this.validateWeeksPregnant();
		this.firstControlPregnancy=false;
		this.secondControlPregnancy=false;
		this.fourControlPregnancy=false;
		this.threeControlPregnancy=false;
		/*if(this.weeksPregnancy>=8){
			this.resumeControllerPregnantBad=true;
			this.resumeControllerPregnantOk=false;
		}*/
  }
  calculateFURWS(){
  		console.log("SEMANAS DE EMBARAZO POR WS");
  		console.log("FUR WS", this.lastRuller);
	  	let te = moment(this.lastRuller).subtract(3, 'months').format('YYYY-MM-DD');
	  	let tes = moment(te).add(7, 'days').format('YYYY-MM-DD');
	  	let tess = moment(tes).add(1, 'years').format('YYYY-MM-DD');
		//let time = moment().format('HHmmss');
		this.dateBirth=tess;
		let hoy = moment().format('YYYY-MM-DD');
		let semanasD = moment(hoy).diff(moment(this.lastRuller), 'weeks')
		console.log("FUR WS 2", this.lastRuller);
		console.log("Cambiando las semanas de embarazo");
		this.weeksPregnancy = semanasD;
		console.log("SEMANAS POR WS", this.weeksPregnancy);
		this.validateWeeksPregnant();
		this.firstControlPregnancy=false;
		this.secondControlPregnancy=false;
		this.fourControlPregnancy=false;
		this.threeControlPregnancy=false;
		/*if(this.weeksPregnancy>=8){
			this.resumeControllerPregnantBad=true;
			this.resumeControllerPregnantOk=false;
		}*/
  }
  validateWeeksPregnant(){	
  		console.log("se cambio la cantidad de semanas de embarazo");
  		//control de la semana 8
	  	if(this.weeksPregnancy<=25){
	  	  console.log("generando lista de controles");
	  	  this.controls = [];
	      this.controls.push(
	          {Id: 1,Semana: 8,Descripcion: 'Control de la semana 8'}         
	      );
	    }
	    //control de la semana 26
	    else if(this.weeksPregnancy<=31){
	      console.log("generando lista de controles");
	      this.controls = [];
	      this.controls.push(
	          {Id: 1,Semana: 8,Descripcion: 'Control de la semana 8'},
	          {Id: 2,Semana: 26,Descripcion: 'Control de la semana 26'}       
	      );
	    }
	    //control de la semana 32
	    else if(this.weeksPregnancy<=37){
	      console.log("generando lista de controles");
	      this.controls = [];
	      this.controls.push(
	          {Id: 1,Semana: 8,Descripcion: 'Control de la semana 8'},
	          {Id: 2,Semana: 26,Descripcion: 'Control de la semana 26'},
	          {Id: 3,Semana: 32,Descripcion: 'Control de la semana 32'}
	      );
	    }
	    //control de la semana 38
	    else if(this.weeksPregnancy>=38 ){
	      console.log("generando lista de controles");
	      this.controls = [];
	      this.controls.push(
	          {Id: 1,Semana: 2,Descripcion: 'Control de la semana 8'},
	          {Id: 2,Semana: 26,Descripcion: 'Control de la semana 26'},
	          {Id: 3,Semana: 32,Descripcion: 'Control de la semana 32'},
	          {Id: 4,Semana: 38,Descripcion: 'Control de la semana 38'}
	      );
	    }
	    if(this.controlPregnantSelect){
	    	if(this.controlPregnantSelect[0] == 1 && this.controlPregnantSelect[1] == 2 && this.controlPregnantSelect[2] == 3 && this.controlPregnantSelect[3] == 4){
				this.controlPregnantSelect = "1,2,3,4".split(",");
				console.log("revisa aqui");
			}else if(this.controlPregnantSelect[0] == 1 && this.controlPregnantSelect[1] == 2 && this.controlPregnantSelect[2] == 3){
				this.controlPregnantSelect = "1,2,3".split(",");  
				console.log("revisa aqui");
			}else if(this.controlPregnantSelect[0] == 1 && this.controlPregnantSelect[1] == 2){
				this.controlPregnantSelect = "1,2".split(",");
				console.log("revisa aqui");
			}else if(this.controlPregnantSelect[0] == 1){
				this.controlPregnantSelect = "1".split(",");
				console.log("revisa aqui");
			}
			this.changeControlsPregnant();
			console.log("this.controlPregnantSelect", this.controlPregnantSelect);
		    }
	    
  }

  changeControlsPregnant(){
  	console.log("Cambio de controles");
  	///this.controlPregnantSelect
  	var cantidad_controles = this.controls.length;
    var cantidad_controles_seleccionados = this.controlPregnantSelect;
    var cantidad_controles_seleccionados2 = cantidad_controles_seleccionados.length;
    console.log("cantidad_controles: ", cantidad_controles);
    console.log("cantidad_controles_seleccionados: ", cantidad_controles_seleccionados2);
    if(cantidad_controles_seleccionados2 == cantidad_controles){
      this.resumeControllerPregnantBad =  false;
      this.resumeControllerPregnantOk = true;
    }else{
      this.resumeControllerPregnantBad =  true;
      this.resumeControllerPregnantOk = false;
    }
  }
  calculateHypertensionYes() {
  		this.resumeBloodPressureResult5=false;
		this.resumeBloodPressureResult4=false;
		this.resumeBloodPressureResult3=false;
		this.resumeBloodPressureResult2=false;
		this.resumeBloodPressureResult1=false;
		if(this.valueBloodPressureN && this.valueBloodPressureD){

			if(parseInt(this.valueBloodPressureN)<=89){
				this.resumeBloodPressureResult5=false;
				this.resumeBloodPressureResult4=false;
				this.resumeBloodPressureResult3=false;
				this.resumeBloodPressureResult2=false;
				this.resumeBloodPressureResult1=true;
			}else if((parseInt(this.valueBloodPressureN)>89&&parseInt(this.valueBloodPressureN)<=129) && 
					(parseInt(this.valueBloodPressureD)>59&&parseInt(this.valueBloodPressureD)<=89 )){//
					this.resumeBloodPressureResult5=false;
					this.resumeBloodPressureResult4=false;
					this.resumeBloodPressureResult3=false;
					this.resumeBloodPressureResult2=true;
					this.resumeBloodPressureResult1=false;
			}else if((parseInt(this.valueBloodPressureN)>129&&parseInt(this.valueBloodPressureN)<=139) &&
					(parseInt(this.valueBloodPressureD)<=89)){
					this.resumeBloodPressureResult5=false;
					this.resumeBloodPressureResult4=false;
					this.resumeBloodPressureResult3=true;
					this.resumeBloodPressureResult2=false;
					this.resumeBloodPressureResult1=false;
			}
			//*Conflicto condicional. Solicitar informacion a Joshep
			else if((parseInt(this.valueBloodPressureN)>=140||parseInt(this.valueBloodPressureD)>=90)){
				this.resumeBloodPressureResult5=false;
				this.resumeBloodPressureResult4=true;
				this.resumeBloodPressureResult3=false;
				this.resumeBloodPressureResult2=false;
				this.resumeBloodPressureResult1=false;
			}
			else if(parseInt(this.valueBloodPressureN)>=150 && this.age>80){
				this.resumeBloodPressureResult5=true;
				this.resumeBloodPressureResult4=false;
				this.resumeBloodPressureResult3=false;
				this.resumeBloodPressureResult2=false;
				this.resumeBloodPressureResult1=false;
			}
		}
  }  
  calculateHypertensionNo() {
		if(this.valueBloodPressureN&&this.valueBloodPressureD){
			if(parseInt(this.valueBloodPressureN)<=89){
				this.resumeBloodPressureResult5=false;
				this.resumeBloodPressureResult4=false;
				this.resumeBloodPressureResult3=false;
				this.resumeBloodPressureResult2=false;
				this.resumeBloodPressureResult1=true;
			}else if((parseInt(this.valueBloodPressureN)>89&&parseInt(this.valueBloodPressureN)<=129) && 
					(parseInt(this.valueBloodPressureD)>59&&parseInt(this.valueBloodPressureD)<=89)){//
					this.resumeBloodPressureResult5=false;
					this.resumeBloodPressureResult4=false;
					this.resumeBloodPressureResult3=false;
					this.resumeBloodPressureResult2=true;
					this.resumeBloodPressureResult1=false;
			}else if((parseInt(this.valueBloodPressureN)>129&&parseInt(this.valueBloodPressureN)<=139) &&
					(parseInt(this.valueBloodPressureD)<=89)){
					this.resumeBloodPressureResult5=false;
					this.resumeBloodPressureResult4=false;
					this.resumeBloodPressureResult3=true;
					this.resumeBloodPressureResult2=false;
					this.resumeBloodPressureResult1=false;
			}
			//*Conflicto condicional. Solicitar informacion a Joshep
			else if((parseInt(this.valueBloodPressureN)>=140||parseInt(this.valueBloodPressureD)>=90)){
				this.resumeBloodPressureResult5=false;
				this.resumeBloodPressureResult4=true;
				this.resumeBloodPressureResult3=false;
				this.resumeBloodPressureResult2=false;
				this.resumeBloodPressureResult1=false;
			}
			else if(parseInt(this.valueBloodPressureN)>=150 && this.age>80){
				this.resumeBloodPressureResult5=true;
				this.resumeBloodPressureResult4=false;
				this.resumeBloodPressureResult3=false;
				this.resumeBloodPressureResult2=false;
				this.resumeBloodPressureResult1=false;
			}
		}
  }
  onChangeCareBloodPressure() {
  		if(this.lastTestBloodPressure){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestBloodPressureMiliseconds = Date.parse(this.lastTestBloodPressure);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			//let typeTestBloodPressure= this.genderManTypeTestBloodPressure;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestBloodPressureMiliseconds;
			//11 meses=	28908000000
			//6  meses= 15768000000
			if(diferenceMonthsMiliseconds<15768000000){
				this.resumeLastTestlBloodPPressureFL=false;
				this.resumeLastTestlBloodPPressureOK=true;
			}else{
				this.resumeLastTestlBloodPPressureFL=true;
				this.resumeLastTestlBloodPPressureOK=false;
			}
		}
  }
  onChangeCareWomanMamografia() {
  		if(this.lastTestMamografia && this.typeTestMamografia){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestMamografiaMiliseconds = Date.parse(this.lastTestMamografia);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let typeTestMamografia= this.typeTestMamografia;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestMamografiaMiliseconds;
			//11 meses=	28908000000
			//6  meses= 15768000000
			if(typeTestMamografia==0){
				if(diferenceMonthsMiliseconds<28908000000){
					this.resumeMamografiaFL=false;
					this.resumeMamografiaOK=true;
				}else{
					this.resumeMamografiaFL=true;
					this.resumeMamografiaOK=false;
				}
			}else if(typeTestMamografia==1){
				if(diferenceMonthsMiliseconds<15768000000){
					this.resumeMamografiaFL=false;
					this.resumeMamografiaOK=true;
				}else{
					this.resumeMamografiaFL=true;
					this.resumeMamografiaOK=false;
				}
			}
		}
  }
  onChangeCareWomanPapanicolao() {
  		if(this.lastTestPapanicolao&&this.typeTestPapanicolao){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestMamografiaMiliseconds = Date.parse(this.lastTestPapanicolao);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			let typeTestMamografia= this.typeTestPapanicolao;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestMamografiaMiliseconds;
			//11 meses=	28908000000// Antes
			//6  meses= 15768000000// Antes
			if(typeTestMamografia==0){//Normal
				if(diferenceMonthsMiliseconds<62208000000){// Bien
					this.resumePapanicolaoFL=false;
					this.resumePapanicolaoOK=true;
				}else{// Mal
					this.resumePapanicolaoFL=true;
					this.resumePapanicolaoOK=false;
				}
			}else if(typeTestMamografia==1){// Anormal
				if(diferenceMonthsMiliseconds<15552000000){// Bien
					this.resumePapanicolaoFL=false;
					this.resumePapanicolaoOK=true;
				}else{// Mal
					this.resumePapanicolaoFL=true;
					this.resumePapanicolaoOK=false;
				}
			}
		}
  }
  onChangeLastTestDiabetes() {
  		if(this.resumeLastTestDiabetes){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestDiabetesMiliseconds = Date.parse(this.resumeLastTestDiabetes);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			//let typeTestDiabetes= this.genderManTypeTestDiabetes;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestDiabetesMiliseconds;
			//11 meses=	28908000000
			//6  meses= 15768000000
			if(diferenceMonthsMiliseconds<15768000000){
				this.resumeLastTestDiabetesFL=false;
				this.resumeLastTestDiabetesOK=true;
			}else{
				this.resumeLastTestDiabetesFL=true;
				this.resumeLastTestDiabetesOK=false;
			}
		}
  }
  onChangeLastTestFat() {
  		if(this.lastTestFat){
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //January is 0!
			let yyyy = today.getFullYear();
			let dateTestFatMiliseconds = Date.parse(this.lastTestFat);	
			let dateToday = yyyy+'-'+mm+'-'+dd;
			let dateTodayMiliseconds = Date.parse(dateToday);
			//let typeTestFat= this.genderManTypeTestFat;
			let diferenceMonthsMiliseconds = dateTodayMiliseconds - dateTestFatMiliseconds;
			//11 meses=	28908000000
			//6  meses= 15768000000
						//17816400000
			if(diferenceMonthsMiliseconds<28908000000){
				//this.lastTestFat=true;
				this.resumeLastTestFatFL=false;
				this.resumeLastTestFatOK=true;
			}else{
				//this.lastTestFat=true;
				this.resumeLastTestFatFL=true;
				this.resumeLastTestFatOK=false;
			}
		}
  }
  calculateBodyMassIndex(){
	  	//let size = parseFloat(this.size);
	  	//let weight = parseFloat(this.weight);
	  	if(this.size && this.weight){
	  		this.bodyMassIndex = this.weight/Math.pow(parseFloat(this.size), 2);
	  		//console.log("peso", this.weight);
	  		//console.log("altura", this.size);
	  									   //Math.pow(1.79, 2)
	  		//console.log("altura potencia", Math.pow(parseFloat(this.size), 2));
	  		//console.log("estado nutricional", this.bodyMassIndex);
	  		//this.bodyMassIndex= result;
	  	}
  }
  helpProfileLipidico() {
  		let alert = this.alertCtrl.create({
	      title: 'Perfil de grasas:',
	      subTitle: 'Realice en ayunas el examen de sangre llamado perfil lipídico, para medir sus niveles de colesterol y triglicéridos',
	      buttons: ['OK']
	    });
	    alert.present(); 
  }
  advertancyWeightPregnant(){
  		let alert = this.alertCtrl.create({
	      title: 'Importante!',
	      subTitle: 'En caso de encontrarte gestando, debes llevar el control de tu peso según las indicaciones del especialista que te evalúa en tus controlaes del embarazo',
	      buttons: ['OK']
	    });
	    alert.present(); 
  }
  helpFamilyBackground() {
	    let alert = this.alertCtrl.create({
	      title: 'Antecedentes familiares:',
	      subTitle: 'Seleccione las enfermedades conocidas de sus parientes directos, solo de sus padres y sus abuelos .',
	      buttons: ['OK']
	    });
	    alert.present();    
  }
  helpCheckAndControl() {
	    let alert = this.alertCtrl.create({
	      title: 'Chequeos y controles:',
	      subTitle: 'Coloque las fechas de sus últimos chequeos y controles que recuerde. Pueden ser aproximadas.',
	      buttons: ['OK']
	    });
	    alert.present();    
  }
  helpBloodPressure() {
	    let alert = this.alertCtrl.create({
	      title: 'Presión arterial:',
	      subTitle: 'Mida su presión en el brazo dominante con un aparato automático, luego de 5 minutos de reposo, en posición sentado, sin cruzar los pies, sin apuros y lejos del consumo de alimentos.',
	      buttons: ['OK']
	    });
	    alert.present();    
  }
  helpHemoglobinGlin() {
	    let alert = this.alertCtrl.create({
	      title: 'Hemoglobina Glicosilada:',
	      subTitle: 'Es la prueba más valiosa para el seguimiento de la diabetes porque muestra si esta adecuadamente controlada o no.',
	      buttons: ['OK']
	    });
	    alert.present();    
  }
  helpAbdominalWaist() {
	    let alert = this.alertCtrl.create({
	      title: 'Medida de la cintura abdominal:',
	      subTitle: 'Usando la cinta métrica en posición de pie, luego de expulsar el aire, relaje y mida la cintura rodeándola a la altura del ombligo.',
	      buttons: ['OK']
	    });
	    alert.present();    
  }
  
  ionViewDidLoad() {
  		this.menu.swipeEnable(false);
    	console.log('ionViewDidLoad RegisterDataUserPage');
  }

  public genderManLastTestProstata = {
	    month: '2010-01-01',
	    timeStarts: '07:43',
	    timeEnds: '1990-02-20'
  }
  
  public birthdate = {
	    month: '1990-02-19',
	    timeStarts: '07:43',
	    timeEnds: '1990-02-20'
  }

  postRequestUpdate(){
  		var stateUD = 0;
  		if(this.updateUD){
  			stateUD = 1;
  			this.idUser = window.localStorage.getItem('userID');
  			//this.idUser = this.updateUD.idUsr;
  		}else{
  			this.idUser = window.localStorage.getItem('userID');
  		}
  		
	    var url = "http://saludtotalapp.com/wservice/formulario/upd/";

	    if(!this.nameUser){
	    	this.nameUser=""
	    }if(!this.paternalSurnameUser){
	    	this.paternalSurnameUser="";
	    }if(!this.maternalSurnameUser){
	    	this.maternalSurnameUser="";
	    }if(!this.genderOption){
	    	this.genderOption=-1;
	    }if(!this.birthdate.month){
	    	this.birthdate.month="2000/01/01";
	    }if(!this.genderManLastTestProstata.month){
	    	this.genderManLastTestProstata.month="1900/01/01";
	    }if(!this.genderManTypeTestProstata){
	    	this.genderManTypeTestProstata=-1;
	    }if(!this.lastTestMamografia){
	    	this.lastTestMamografia="1900/01/01";
	    }if(!this.typeTestMamografia){
	    	this.typeTestMamografia=-1;
	    }if(!this.lastTestCheckPrevent || this.lastTestCheckPrevent==null){
	    	this.lastTestCheckPrevent="1900/01/01";
	    }if(!this.lastTestPapanicolao){
	    	this.lastTestPapanicolao="1900/01/01";
	    }if(!this.typeTestPapanicolao){
	    	this.typeTestPapanicolao=-1;
	    }if(!this.statePregnancy){
	    	this.statePregnancy=-1;
	    }if(!this.lastRuller){
	    	this.lastRuller="1900/01/01";
	    }if(!this.dateBirth){
	    	this.dateBirth="1900/01/01";
	    }if(!this.size || this.size=="" || this.size==null){
	    	this.size=0;
	    }if(!this.weight || this.weight=="" || this.weight==null){
	    	this.weight=0;
	    }if(!this.hemoglobin || this.hemoglobin=="" || this.hemoglobin==null){
	    	this.hemoglobin=0;
	    }if(!this.stateHypertension){
	    	this.stateHypertension=-1;
	    }if(!this.valueBloodPressureN || this.valueBloodPressureN=="" || this.valueBloodPressureN==null){
	    	this.valueBloodPressureN=0;
	    }if(!this.valueBloodPressureD || this.valueBloodPressureD=="" || this.valueBloodPressureD==null){
	    	this.valueBloodPressureD=0;
	    }if(!this.stateDiabetes){
	    	this.stateDiabetes=-1;
	    }if(!this.stateTreatmentDiabetes){
	    	this.stateTreatmentDiabetes=-1;
	    }if(!this.resumeLastTestDiabetes){
	    	this.resumeLastTestDiabetes="1900/01/01";
	    }if(!this.hemoglobinGlin || this.hemoglobinGlin=="" || this.hemoglobinGlin==null){
	    	this.hemoglobinGlin=0;
	    }if(!this.glucoseY || this.glucoseY=="" || this.glucoseY==null){
	    	this.glucoseY=0;
	    }if(!this.glucoseN || this.glucoseN=="" || this.glucoseN==null){
	    	this.glucoseN=0;
	    }if(!this.glucoseMoreEat || this.glucoseMoreEat=="" || this.glucoseMoreEat==null){
	    	this.glucoseMoreEat=0;
	    }if(!this.lastTestFat){
	    	this.lastTestFat="1900/01/01";
	    }if(!this.cholesterolLdl || this.cholesterolLdl=="" || this.cholesterolLdl==null){
	    	this.cholesterolLdl=0;
	    }if(!this.cholesterolHdl || this.cholesterolHdl=="" || this.cholesterolHdl==null){
	    	this.cholesterolHdl=0;
	    }if(!this.triglycerides || this.triglycerides=="" || this.triglycerides==null){
	    	this.triglycerides=0;
	    }if(!this.abdominalWaist || this.abdominalWaist=="" || this.abdominalWaist==null){
	    	this.abdominalWaist=0;
	    }if(!this.stateSmoke){
	    	this.stateSmoke=-1;
	    }if(!this.cuantityForDaySmoke || this.cuantityForDaySmoke=="" || this.cuantityForDaySmoke==null){
	    	this.cuantityForDaySmoke=0;
	    }if(!this.cuantityYearOfSmoke || this.cuantityYearOfSmoke=="" || this.cuantityYearOfSmoke==null){
	    	this.cuantityYearOfSmoke=0;
	    }if(!this.lastTestOdontology){
	    	this.lastTestOdontology="1900/01/01";
	    }if(!this.lastTestGastroscopy){
	    	this.lastTestGastroscopy="1900/01/01";
	    }if(!this.typeTestGastroscopy){
	    	this.typeTestGastroscopy=-1;
	    }if(!this.lastTestColonoscopy){
	    	this.lastTestColonoscopy="1900/01/01";
	    }if(!this.typeTestColonoscopy){
	    	this.typeTestColonoscopy=-1;
	    }if(!this.lastTestEye){
	    	this.lastTestEye="1900/01/01";
	    }if(!this.typeTestEye){
	    	this.typeTestEye=-1;
	    }if(!this.stateFamilyBackground){
	    	this.stateFamilyBackground=-1;
	    }if(!this.familyBackground){
	    	this.familyBackground=-1;
	    }if(!this.antyNeumony){
	    	this.antyNeumony=1;
	    }if(!this.typeSmoke || this.typeSmoke == null){
	    	this.typeSmoke = -1;
	    }
	    if(!this.stateTreatmentBloodPPressure || this.stateTreatmentBloodPPressure==null){
	    	this.stateTreatmentBloodPPressure=-1;
	    }

	    //if (this.firstControlPregnancy || this.secondControlPregnancy || this.threeControlPregnancy || this.fourControlPregnancy) {
    	/*var controlesEmbarazo= "";
    	if (this.firstControlPregnancy && this.secondControlPregnancy && this.threeControlPregnancy && this.fourControlPregnancy) {
    		controlesEmbarazo = "1,1,1,1";    		
    	}else if(this.firstControlPregnancy && this.secondControlPregnancy && this.threeControlPregnancy){
    		controlesEmbarazo = "1,1,1,0";
    	}else if(this.firstControlPregnancy && this.secondControlPregnancy){
    		controlesEmbarazo = "1,1,0,0";
    	}else if(this.firstControlPregnancy){
    		controlesEmbarazo = "1,0,0,0";
    	}*/
	    //}
	    console.log("fur: ", this.lastRuller);
	    console.log("fecha estimada de parto: ", this.dateBirth);
	    console.log("controles seleccionados: ", this.controlPregnantSelect);
	    var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
  		let body = "";
  		var hemoGli = this.hemoglobinGlin;
  		body =   		
  			"&tipofumador=" 	+ this.typeSmoke			+
  			"&idform=" 	+ this.idFormulario			+
  			"&nom=" 	+ this.nameUser 			+
  			"&pat=" 	+ this.paternalSurnameUser 	+ 
  			"&mat=" 	+ this.maternalSurnameUser	+ 
  			"&gen=" 	+ this.genderOption			+
  			"&fnac="	+ this.birthdate.month 		+
  			"&fprost="	+ this.genderManLastTestProstata.month+
  			"&tprost="	+ this.genderManTypeTestProstata+
  			"&fmamo="	+ this.lastTestMamografia	+
  			"&tmamo="	+ this.typeTestMamografia	+
  			"&fpapa="	+ this.lastTestPapanicolao	+
			"&tpapa="	+ this.typeTestPapanicolao	+
			"&igest="	+ this.statePregnancy		+
			"&ffur="	+ moment(this.lastRuller).format("YYYY-MM-DD")			+
			"&fepart="	+ moment(this.dateBirth).format("YYYY-MM-DD")		+
			//"&fepart="	+ "1900-01-01"			+		
			"&contembar="	+ this.controlPregnantSelect.toString()			+	
			"&talla="	+ this.size					+
			"&peso=" 	+ this.weight				+
			"&hemo=" 	+ this.hemoglobin			+
			"&hipt=" 	+ this.stateHypertension	+
			"&prart="	+ this.valueBloodPressureN+
			"&preartedenom="+ this.valueBloodPressureD+
			"&estratpresarte="	+ this.stateTreatmentBloodPPressure +
			"&ucprearte="	+  this.lastTestBloodPressure +
			"&diabe="	+ this.stateDiabetes		+
			"&tdiabe="	+ this.stateTreatmentDiabetes+
			"&fucdiabe="+ this.resumeLastTestDiabetes+
			"&glucosa="	+ this.glucoseN							+
			"&hemoglic="+ this.hemoglobinGlin		+
			"&hemoayun="+ this.glucoseY				+
			"&hemoalim="+ this.glucoseMoreEat		+
			"&fucgra="	+ this.lastTestFat 			+
			"&coleldl="	+ this.cholesterolLdl		+
			"&colehdl="	+ this.cholesterolHdl		+
			"&trigli="	+ this.triglycerides		+
			"&mabdom="	+ this.abdominalWaist		+
			"&fuma="  	+ this.stateSmoke			+
			"&cigxdia="	+ this.cuantityForDaySmoke	+
			"&aosfuma="	+ this.cuantityYearOfSmoke	+
			"&fodon="	+ this.lastTestOdontology	+
			"&fgastr="	+ this.lastTestGastroscopy	+
			"&tgastr="	+ this.typeTestGastroscopy	+
			"&fcolo=" 	+ this.lastTestColonoscopy	+			
			"&tcolo=" 	+ this.typeTestColonoscopy	+
			"&fojo="  	+ this.lastTestEye 			+
			"&tojo="  	+ this.typeTestEye			+
			"&ucmp="  	+ this.lastTestCheckPrevent	+
			"&vacneumo="+ this.antyNeumony			+
			"&depen=" 	+ stateUD					+
			"&menedad="	+ 0							+
			"&antfam=" 	+ this.stateFamilyBackground+
			"&codenf=" 	+ this.familyBackground.toString()		+
			"&usr="    	+ this.idUser				+
		"";

	    this.data= this.http.post(url, body, header);
	    this.data.subscribe(data=>{
	    	console.log(body);
			console.log(data);
			if(data.code=="100"){
				console.log('BIEN');
				let alert = this.alertCtrl.create({
			      title: 'Datos actualizados !',
			      subTitle: 'Sus datos fueron actualizados correctamente',
			      buttons: ['OK']
			    });
			    alert.present();
			    if(this.updateUD){
			    	this.navCtrl.push(UserDependentPage, {
			          userTap: this.userObject,
			          tu: 'esconvencional'
			        });
			    }else{
			    	this.navCtrl.push(RegisterDataUserPage);
			    }
			//this.registerOk(data.success);			
			}else if(data.code=="500"){				
				console.log('MAL');
				let alert = this.alertCtrl.create({
			      title: 'Ocurrio un problema !',
			      subTitle: 'Intentelo más tarde. Si el problema persiste porfavor contactar con el soporte.',
			      buttons: ['OK']
			    });
			    alert.present();			    
			//this.registerOk(data.error);
			}
	    });
  }

  postRequestRegister(){
  		this.idUser = window.localStorage.getItem('userID');
	    var url = "http://saludtotalapp.com/wservice/formulario/save/";

	    if(!this.nameUser){
	    	this.nameUser=""
	    }if(!this.paternalSurnameUser){
	    	this.paternalSurnameUser="";
	    }if(!this.maternalSurnameUser){
	    	this.maternalSurnameUser="";
	    }if(!this.genderOption){
	    	this.genderOption=-1;
	    }if(!this.birthdate.month){
	    	this.birthdate.month="1900/01/01";
	    }if(!this.genderManLastTestProstata.month){
	    	this.genderManLastTestProstata.month="1900/01/01";
	    }if(!this.genderManTypeTestProstata){
	    	this.genderManTypeTestProstata=-1;
	    }if(!this.lastTestMamografia){
	    	this.lastTestMamografia="1900/01/01";
	    }if(!this.typeTestMamografia){
	    	this.typeTestMamografia=-1;
	    }if(!this.lastTestPapanicolao){
	    	this.lastTestPapanicolao="1900/01/01";
	    }if(!this.typeTestPapanicolao){
	    	this.typeTestPapanicolao=-1;
	    }if(!this.statePregnancy){
	    	this.statePregnancy=-1;
	    }if(!this.lastRuller){
	    	this.lastRuller="1900/01/01";
	    }if(!this.dateBirth){
	    	this.dateBirth="1900/01/01";
	    }if(!this.size){
	    	this.size=-1;
	    }if(!this.weight){
	    	this.weight=-1;
	    }if(!this.hemoglobin){
	    	this.hemoglobin=-1;
	    }if(!this.stateHypertension){
	    	this.stateHypertension=-1;
	    }if(!this.valueBloodPressureN){
	    	this.valueBloodPressureN=-1;
	    }if(!this.valueBloodPressureD){
	    	this.valueBloodPressureD=-1;
	    }if(!this.stateDiabetes){
	    	this.stateDiabetes=-1;
	    }if(!this.stateTreatmentDiabetes){
	    	this.stateTreatmentDiabetes=-1;
	    }if(!this.resumeLastTestDiabetes){
	    	this.resumeLastTestDiabetes="1900/01/01";
	    }if(!this.hemoglobinGlin){
	    	this.hemoglobinGlin=-1;
	    }if(!this.glucoseY){
	    	this.glucoseY=-1;
	    }if(!this.glucoseMoreEat){
	    	this.glucoseMoreEat=-1;
	    }if(!this.lastTestFat){
	    	this.lastTestFat="1900/01/01";
	    }if(!this.cholesterolLdl){
	    	this.cholesterolLdl=-1;
	    }if(!this.cholesterolHdl){
	    	this.cholesterolHdl=-1;
	    }if(!this.triglycerides){
	    	this.triglycerides=-1;
	    }if(!this.abdominalWaist){
	    	this.abdominalWaist=-1;
	    }if(!this.stateSmoke){
	    	this.stateSmoke=-1;
	    }if(!this.cuantityForDaySmoke){
	    	this.cuantityForDaySmoke=-1;
	    }if(!this.cuantityYearOfSmoke){
	    	this.cuantityYearOfSmoke=-1;
	    }if(!this.lastTestOdontology){
	    	this.lastTestOdontology="1900/01/01";
	    }if(!this.lastTestGastroscopy){
	    	this.lastTestGastroscopy="1900/01/01";
	    }if(!this.typeTestGastroscopy){
	    	this.typeTestGastroscopy=-1;
	    }if(!this.lastTestColonoscopy){
	    	this.lastTestColonoscopy="1900/01/01";
	    }if(!this.typeTestColonoscopy){
	    	this.typeTestColonoscopy=-1;
	    }if(!this.lastTestEye){
	    	this.lastTestEye="1900/01/01";
	    }if(!this.typeTestEye){
	    	this.typeTestEye=-1;
	    }if(!this.stateFamilyBackground){
	    	this.stateFamilyBackground=-1;
	    }if(!this.familyBackground){
	    	this.familyBackground=-1;
	    }
	   
   		var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
  		let body = "";
  		body = 
  			"&nom=" 	+ this.nameUser 			+
  			"&pat=" 	+ this.paternalSurnameUser 	+ 
  			"&mat=" 	+ this.maternalSurnameUser	+ 
  			"&gen=" 	+ this.genderOption			+
  			"&fnac="	+ this.birthdate.month 		+
  			"&fprost="	+ this.genderManLastTestProstata.month+
  			"&tprost="	+ this.genderManTypeTestProstata+
  			"&fmamo="	+ this.lastTestMamografia	+
  			"&tmamo="	+ this.typeTestMamografia	+
  			"&fpapa="	+ this.lastTestPapanicolao	+
			"&tpapa="	+ this.typeTestPapanicolao	+
			"&igest="	+ this.statePregnancy		+
			"&ffur="	+ this.lastRuller			+
			"&fepart="	+ this.dateBirth			+
			"&talla="	+ this.size					+
			"&peso=" 	+ this.weight				+
			"&hemo=" 	+ this.hemoglobin			+
			"&hipt=" 	+ this.stateHypertension	+
			"&prart="	+ this.valueBloodPressureN/this.valueBloodPressureD+
			"&diabe="	+ this.stateDiabetes		+
			"&tdiabe="	+ this.stateTreatmentDiabetes+
			"&fucdiabe="+ this.resumeLastTestDiabetes+
			"&hemoglic="+ this.hemoglobinGlin		+
			"&hemoayun="+ this.glucoseY				+
			"&hemoalim="+ this.glucoseMoreEat		+
			"&fucgra="	+ this.lastTestFat 			+
			"&coleldl="	+ this.cholesterolLdl		+
			"&colehdl="	+ this.cholesterolHdl		+
			"&trigli="	+ this.triglycerides		+
			"&mabdom="	+ this.abdominalWaist		+
			"&fuma="  	+ this.stateSmoke			+
			"&cigxdia="	+ this.cuantityForDaySmoke	+
			"&aosfuma="	+ this.cuantityYearOfSmoke	+
			"&fodon="	+ this.lastTestOdontology	+
			"&fgastr="	+ this.lastTestGastroscopy	+
			"&tgastr="	+ this.typeTestGastroscopy	+
			"&fcolo=" 	+ this.lastTestColonoscopy	+			
			"&tcolo=" 	+ this.typeTestColonoscopy	+
			"&fojo="  	+ this.lastTestEye 			+
			"&tojo="  	+ this.typeTestEye			+
			"&depen=" 	+ 0							+
			"&menedad="	+ 0							+
			"&antfam=" 	+ this.stateFamilyBackground+
			"&codenf=" 	+ this.familyBackground		+
			"&usr="    	+ this.idUser				+
		"";

	    this.data= this.http.post(url, body, header);
	    this.data.subscribe(data=>{
	    	console.log(this.stateFamilyBackground);
			console.log(this.familyBackground);
			console.log(data);
			if(data.code=="100"){
				let alert = this.alertCtrl.create({
			      title: 'Datos registrados !',
			      subTitle: 'Sus datos fueron registrados correctamente',
			      buttons: ['OK']
			    });
			    alert.present();
			//this.registerOk(data.success);
			//this.navCtrl.push(RegisterDataUserPage);
			}else if(data.code=="500"){
				console.log('MAL');
				console.log('MAL');
				let alert = this.alertCtrl.create({
			      title: 'Ocurrio un problema !',
			      subTitle: 'Intentelo más tarde. Si el problema persiste porfavor contactar con el soporte.',
			      buttons: ['OK']
			    });
			    alert.present();
			//this.registerOk(data.error);
			}
	    },err=>{
	      this.messageError();
	    });
  }
  messageError(){
    let alert = this.alertCtrl.create({
      title: 'Ocurrio un problema !',
      subTitle: 'Verifique su conexión a internet.',
      buttons: ['OK']
    });
    alert.present();
  }

  onChangeDiseaseSmoke(){
  	var resultado = 0;
  	if(this.cuantityForDaySmoke && this.cuantityYearOfSmoke){
  		resultado =(this.cuantityForDaySmoke*this.cuantityYearOfSmoke)/20;
  		if(resultado>=30){
  			console.log("resultado: ", resultado);
  			this.stateDiseaseSmoke = 1;
  		}else{
  			console.log("resultado: ", resultado);
  			this.stateDiseaseSmoke = 2;
  		}
  	}  	
  }
  
  onChangeCholesterolLdl(){
  	//cholesterolLdlInt
  	//this.cholesterolLdl = parseInt(this.cholesterolLdl);
  }
  onChangeCholesterolHdl(){
  	//this.cholesterolHdl = parseInt(this.cholesterolHdl);
  }
  onChangeCholesterolTriglycerides(){
  	//this.triglycerides = parseInt(this.triglycerides);
  }
}
