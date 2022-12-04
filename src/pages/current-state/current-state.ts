import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import moment from 'moment';
/**
 * Generated class for the CurrentStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-state',
  templateUrl: 'current-state.html',
})
export class CurrentStatePage {
  data: Observable<any>;
  idUser:number;
  idForm:number;
  userDependient:any;
  medidaAbdominal:any;

  nameUser:number;
  paternalSurnameUser:number;
  maternalSurnameUser:number;
  genderUser:string;
  nacimiento:number;
  tallaUser:number;
  pesoUser:number;
  hemoglobinaUser:number;
  estadoHipertensoUser:number;
  presioArterialUser:string;
  estadoDiabeticoUser:number;
  estadoEmbarazoUser:number;
  trataDiabetesUser:number;
  hemoblobinaGlicUser:number;
  hemoglobinaAyunUser:number;
  hemoglobinaAlimUser:number;
  colesterolLDLUser:number;
  colesterolHDLUser:number;
  trigliceridosUser:number;
  estadoFumadorUser:number;
  nroCigarroXDia:number;
  anosFumando:number;
  FUltimoAnalisisColesterol:any;
  FUltimoAnalisisDiabetes:any;
  FUltimoControlOdontologico:any;
  FUltimoControlMamo:any;
  FUltimoControlPapa:any;
  FUltimoContrlProsta:any;
  FUltimoControlGastro:any;
  FUltimoControlColo:any;
  FUltimoControlOjos:any;
  FUltimoControlPreve:any;
  mamoExam:string;
  papoExam:string;
  proExam:string;
  gastroExam:string;
  coloExam:string;
  ojoExam:string;
  lastRuller:string;
  weeksPregnancy:number;
  controlsPregnant:string;
  controlsMinor:string;
  vacunasMinor:string;
  msgPesoIdealNino:string;
  classPesoIdealNino:string;
  pesoIdealOKNino:boolean;
  pesoIdealERRORNino:boolean;

  glucosaAyunUser:any;
  edadMeses:number;
  glucosaSDiabetes:any;
  //glucosaAyunUser:number;
  //glucosaAlimUser:number;

  //msgHipertension:string;
  //classHipertension:string;
  colesterolLDLUserMsg:string;
  colesterolHDLUserMsg:string;
  trigliceridosUserMsg:string;
  msgDiagnosticoOK1:string;
  msgDiagnosticoOK2:string;
  msgDiagnosticoOK3:string;
  msgRegCantAlimentos:string;
  msgRedGrasAlimentos:string;
  msgConsultXBajoPeso:string;
  msgConsumeComHierro:string;
  msgConsultExcHemogl:string;
  msgLimitaConsAlcoho:string;
  msgConsultPreBajo:string;
  msgConsultAzuAlto:string;
  msgDejaFumar:string;
  msgCheqPendiente:string;
  msgContEmabarazo:string;
  vacunasOK:any;
  vacunasERROR:any;
  msgPesoIdealNinoMSG:any;
  msgPesoMSG:any;
  msgTallaMSG:any;
  msgHemoglobinaMSG:any;
  msgRedGrasAlimentosMSG:any;
  msgPresionAnterialMSG
  glucosaDiabetesMSG:any;
  msgHemoglobinaDiabetesMSG:any;
  hemoblobinaGlicUserMSG:any;
  hemoglobinaAlimUserMSG:any;
  hemoglobinaAyunUserMSG:any;
  medidaAbdominalMSG:any;
  glucosaSDiabetesMSG :any;
  //msgTieneDiabetes:string;

  msgHemoPendiente:any;
  msgVacPendiente:string;
  msgTieneDiabetes:string;
  classTieneDiabetes:string;
  msgPesoIdeal:string;
  classPesoIdeal:string;
  msgHemoglobina:string;
  classHemoglobina:string;
  msgPresionArterial:string;
  classPresionArterial:string;
  msgHemoglobinaGli:string;
  classHemoglobinaGli:string;
  msgHemoglobinaDiabetes:string;
  classHemoglobinaDiabetes:string;
  msgColesterol:string;
  classMsgColesterol:string;
  msgFumador:string;
  msgChequeos:string;
  classMsgChequeos:string;
  msgControlesPreg:string;
  classMsgControlesPreg:string;
  msgControlesMenor:string;
  classMsgControlesMenor:string;
  msgVacunas:string;
  classMsgVacunas:string;

  chequeosOK:boolean;
  chequeosERROR:boolean;
  pesoIdealOK:boolean;
  hemoglobinOK:boolean;
  presArteriOK:boolean;
  stateDiabeOK:boolean;
  hemogDiabeOK:boolean;
  colesterolOK:boolean;
  //chequeosOK:boolean;
  pregnantOK:boolean;
  pesoIdealERROR:boolean;
  hemoglobinERROR:boolean;
  presArteriERROR:boolean;
  stateDiabeERROR:boolean;
  hemogDiabeERROR:boolean;
  colesterolERROR:boolean;
  //chequeosERROR:boolean;
  pregnantERROR:boolean;
  edad_actual:any;
  playerID:any;
  pushToken:any;
  segundo:number;
  iverificarPlayerID:any;

  constructor(private menu: MenuController, public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient) {
 	this.loading();
 	this.userDependient     = navParams.get('idUD');
 	this.idUser = parseInt(window.localStorage.getItem('userID'));
 	this.pesoIdealOK=false;//
	this.hemoglobinOK=false;//
	this.presArteriOK=false;//
	this.stateDiabeOK=false;//
	this.hemogDiabeOK=false;//
	this.colesterolOK=false;//
	this.chequeosOK=false;//
	this.pregnantOK=false;
	this.pesoIdealERROR=false;//
	this.hemoglobinERROR=false;//
	this.presArteriERROR=false;//
	this.stateDiabeERROR=false;//
	this.hemogDiabeERROR=false;//
	this.colesterolERROR=false;//
	this.chequeosERROR=false;//
	this.pregnantERROR=false;
	this.msgChequeos="";
    //SOLICITAR LISTA DE USUARIOS MENORES
	var urlUsuarioM = "http://saludtotalapp.com/wservice/formulario/estact/";
	var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };
	let bodyUsuarioM = "";
	console.log("this.userDependient: ", this.userDependient);
	if(this.userDependient==1){
		this.idForm = parseInt(window.localStorage.getItem('formIDDependent'));
		bodyUsuarioM =
		  "&idform="     +   this.idForm   		   +//IDFORM DEL USUARIO DEPENDIENTE
		  "&idusr="      +   this.idUser   +
		  "&esdepen="    +   this.userDependient			   +
		  //"&esmenor="   +   1             +
		"";
		console.log("bodyUsuarioM: ",bodyUsuarioM);
		this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
		this.data.subscribe(data=>{
			console.log('estado actual: ', data);
			console.log('estado actual: ', data);
			this.nameUser = data[0].Nombre;
			this.paternalSurnameUser = data[0].Paterno;
			this.maternalSurnameUser = data[0].Materno;
			this.genderUser = data[0].Genero;
			this.nacimiento = data[0].Nacimiento;
			this.tallaUser = data[0].Talla;
			this.pesoUser = data[0].Peso;
			this.hemoglobinaUser = data[0].Hemoglobina;
			this.estadoHipertensoUser = data[0].EsHipertenso;

			this.presioArterialUser = data[0].PresionArterial;

			this.estadoDiabeticoUser = data[0].EsDiabetico;
			this.trataDiabetesUser = data[0].TratamientoDiabetes;
			this.hemoblobinaGlicUser = data[0].HemoglobinaGlic;
			this.hemoglobinaAyunUser = data[0].HemoglobinaAyunas;
			this.hemoglobinaAlimUser = data[0].HemoglobinaAlimentos;
			this.colesterolLDLUser = data[0].ColesterolLDL;
			this.colesterolHDLUser = data[0].ColesterolHDL;
			this.trigliceridosUser = data[0].Trigliceridos;
			this.estadoFumadorUser = data[0].EsFumador;
			this.nroCigarroXDia = data[0].CigarroXdia;
			this.anosFumando = data[0].AosFumando;

			//this.FUltimoAnalisisDiabetes = data[0].FecUCDiabetes;
			this.FUltimoAnalisisDiabetes = moment(data[0].FecUCDiabetes).format('DD-MM-YYYY');
        	this.FUltimoAnalisisDiabetes = moment(this.FUltimoAnalisisDiabetes).format('YYYY-MM-DD');
			this.FUltimoAnalisisColesterol = data[0].FecUCGrasas;
			this.FUltimoControlOdontologico = data[0].FecUVOdonto;
			this.FUltimoControlMamo = data[0].FecMamografia;
			this.FUltimoControlPapa = data[0].FecPapanicolao;
			this.FUltimoContrlProsta = data[0].FecProstata;
			this.FUltimoControlGastro = data[0].FecUVGastro;
			this.FUltimoControlColo = data[0].FecUVColonos;
			this.FUltimoControlOjos = data[0].FecUVOculista;
			this.FUltimoControlPreve = data[0].FecUVMedicaPreventiva;
			this.mamoExam = data[0].TipoMamografia;
			this.papoExam = data[0].TipPapanicolao;
			this.proExam = data[0].TipoProstata;
			this.gastroExam = data[0].TipoGastro;
			this.coloExam = data[0].TipoColonos;
			this.ojoExam = data[0].TipoOculista;

			this.estadoEmbarazoUser = data[0].EsGestante;

			this.medidaAbdominal = data[0].MedidaAbdominal;

			this.lastRuller = data[0].FUR;
			//this.weeksPregnancy = data[0].columna ;
			this.controlsPregnant = data[0].CodigosControlEmbarazo;
			//this.controlsMinor = data[0].columna;
			this.glucosaSDiabetes = data[0].Glucosa;
			this.mostrarMsgPesoIdeal();
			this.mostrarMsgHemoglobina();
			this.mostrarMsgPresionArterial();
			this.mostrarMsgHemoglobinaAzucar();
			this.mostrarMsgHemoglobinaDiabetes();
			this.mostrarMsgColesterol();
			this.mostrarMsgChequeosOk();
			this.mostrarMsgEmbarazoControlado();
			this.mostrarFumador();
			this.mostrarMedidaAbdminal();
			var hoy = moment().format('YYYY-MM-DD');
		  	var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');
		  	this.edad_actual = this.calculaEdad(hoy,fnacimiento);
		  	//alert(this.edad_actual);
		},err=>{
			console.log(err);
		});
	}else if(this.userDependient==2){
		this.idForm = parseInt(window.localStorage.getItem('formIDDependent'));
		bodyUsuarioM =
		  "&idform="     +   this.idForm   		   +//IDFORM DEL USUARIO DEPENDIENTE
		  "&idusr="      +   this.idUser   +
		  "&esdepen="    +   this.userDependient			   +
		  //"&esmenor="   +   1             +
		"";
		console.log("bodyUsuarioM: ",bodyUsuarioM);
		this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
		this.data.subscribe(data=>{
			console.log(data);
			this.nacimiento = data[0].FecNac;
			console.log("this.nacimiento: ", this.nacimiento);
			this.controlsMinor = data[0].CodigoControl;
			this.vacunasMinor = data[0].CodigoVacunas;
			this.hemoglobinaUser = data[0].Hemoglobina;
			this.mostrarMsgNinoControlado();
			this.mostrarMsgNinoVacuna();
			this.mostrarMsgHemoglobinaNino();

		},err=>{
			this.msgHemoPendiente="Pendiente descarte de anemia";
			this.classHemoglobina="";
			this.hemoglobinOK=false;
			this.hemoglobinERROR=true;
			this.msgHemoglobinaMSG="Medir hemoglobina";

			this.msgPesoIdealNino="";
	    	this.classPesoIdealNino="";
	    	this.pesoIdealOKNino=false;
			this.pesoIdealERRORNino=true;
			this.msgPesoIdealNinoMSG="Medir peso";

			this.msgVacunas="Vacunación pendiente";
			this.msgVacPendiente="Coloque las vacunas pendientes";
			this.classMsgVacunas="error";
			this.vacunasOK=false;
			this.vacunasERROR=true;

			this.chequeosOK=false;
			this.chequeosERROR=true;
			this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
			this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
			console.log(err);
		});
	}else{
		bodyUsuarioM =
		  "&idform="     +   0   		   +
		  "&idusr="      +   this.idUser   +//this.idUser
		  "&esdepen="    +   0			   +
		  //"&esmenor="   +   1             +
		"";
		console.log("bodyUsuarioM: ",bodyUsuarioM);
		this.data= this.http.post(urlUsuarioM, bodyUsuarioM, header);
		this.data.subscribe(data=>{
			console.log('estado actual: ', data);
			this.nameUser = data[0].Nombre;
			this.paternalSurnameUser = data[0].Paterno;
			this.maternalSurnameUser = data[0].Materno;
			this.genderUser = data[0].Genero;
			this.nacimiento = data[0].Nacimiento;
			this.tallaUser = data[0].Talla;
			this.pesoUser = data[0].Peso;
			this.hemoglobinaUser = data[0].Hemoglobina;
			this.estadoHipertensoUser = data[0].EsHipertenso;

			this.presioArterialUser = data[0].PresionArterial;

			//this.FUltimoAnalisisColesterol = data[0].EsDiabetico;

			this.estadoDiabeticoUser = data[0].EsDiabetico;
			this.trataDiabetesUser = data[0].TratamientoDiabetes;
			this.hemoblobinaGlicUser = data[0].HemoglobinaGlic;
			this.hemoglobinaAyunUser = data[0].HemoglobinaAyunas;
			this.hemoglobinaAlimUser = data[0].HemoglobinaAlimentos;
			this.colesterolLDLUser = data[0].ColesterolLDL;
			this.colesterolHDLUser = data[0].ColesterolHDL;
			this.trigliceridosUser = data[0].Trigliceridos;
			this.estadoFumadorUser = data[0].EsFumador;
			this.nroCigarroXDia = data[0].CigarroXdia;
			this.anosFumando = data[0].AosFumando;

			//this.FUltimoAnalisisDiabetes = data[0].FecUCDiabetes;
			this.FUltimoAnalisisDiabetes = moment(data[0].FecUCDiabetes).format('DD-MM-YYYY');
        	this.FUltimoAnalisisDiabetes = moment(this.FUltimoAnalisisDiabetes).format('YYYY-MM-DD');
			this.FUltimoAnalisisColesterol = data[0].FecUCGrasas;
			this.FUltimoControlOdontologico = data[0].FecUVOdonto;
			this.FUltimoControlMamo = data[0].FecMamografia;
			this.FUltimoControlPapa = data[0].FecPapanicolao;
			this.FUltimoContrlProsta = data[0].FecProstata;
			this.FUltimoControlGastro = data[0].FecUVGastro;
			this.FUltimoControlColo = data[0].FecUVColonos;
			this.FUltimoControlOjos = data[0].FecUVOculista;
			this.FUltimoControlPreve = data[0].FecUVMedicaPreventiva;
			this.mamoExam = data[0].TipoMamografia;
			this.papoExam = data[0].TipPapanicolao;
			this.proExam = data[0].TipoProstata;
			this.gastroExam = data[0].TipoGastro;
			this.coloExam = data[0].TipoColonos;
			this.ojoExam = data[0].TipoOculista;

			this.medidaAbdominal = data[0].MedidaAbdominal;

			this.estadoEmbarazoUser = data[0].EsGestante;

			this.lastRuller = data[0].FUR;
			//this.weeksPregnancy = data[0].columna ;
			this.controlsPregnant = data[0].CodigosControlEmbarazo;
			//this.controlsMinor = data[0].columna;
			this.glucosaSDiabetes = data[0].Glucosa;
			this.mostrarMsgPesoIdeal();
			this.mostrarMsgHemoglobina();
			this.mostrarMsgPresionArterial();
			this.mostrarMsgHemoglobinaAzucar();
			this.mostrarMsgHemoglobinaDiabetes();
			this.mostrarMsgColesterol();
			this.mostrarMsgChequeosOk();
			this.mostrarMsgEmbarazoControlado();
			this.mostrarFumador();
			this.mostrarMedidaAbdminal();

			var hoy = moment().format('YYYY-MM-DD');
		  	var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');
		  	this.edad_actual = this.calculaEdad(hoy,fnacimiento);
		  	//alert(this.edad_actual);
			console.log("estadoDiabeticoUser: ", this.estadoDiabeticoUser);
		},err=>{
			console.log(err);
		});
	}
	//NORMAL Y TODOS LOS DIAGNOSTICOS
	this.msgDiagnosticoOK1="Realiza 30 minutos de ejercicio al día";
	this.msgDiagnosticoOK2="Mantén una alimentación balanceada";
	this.msgDiagnosticoOK3="Consume verduras diariamente";
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
  mostrarMsgPesoIdealNino() {
  		if(!this.pesoUser||this.pesoUser<=0||this.pesoUser==null){
  			this.msgPesoIdealNino="";
	    	this.classPesoIdealNino="";
	    	this.pesoIdealOKNino=false;
			this.pesoIdealERRORNino=true;
			this.msgPesoIdealNinoMSG="Medir peso";
  		}else{
		  	var pesoIdeal = this.pesoUser;
		  	console.log("pesoIdeal:", pesoIdeal);
		    if(pesoIdeal>=2.5&&pesoIdeal<=4){
		    	this.pesoIdealOKNino=true;
				this.pesoIdealERRORNino=false;
		    	this.msgPesoIdealNino="Peso normal";
		    	this.classPesoIdealNino="ok";
		    	//BAJO PESO
				//this.msgConsultXBajoPeso="Realiza consulta por bajo peso";
		    }else if(pesoIdeal<2.5){
		    	this.pesoIdealOKNino=false;
				this.pesoIdealERRORNino=true;
		    	this.msgPesoIdealNino="Bajo peso";
		    	this.classPesoIdealNino="error";
		    }else if(pesoIdeal>4){
		    	this.pesoIdealOKNino=false;
				this.pesoIdealERRORNino=true;
		    	this.msgPesoIdealNino="Peso excesivo bebe en riesgo de enfermedad";
		    	this.classPesoIdealNino="error";
		    	//SOBREPESO, OBESIDAD, MORBIDO
				//this.msgRegCantAlimentos="Regula cantidad de alimentos";
				//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
				console.log("revisa aqui");
		    }
  		}
  }
  mostrarMsgHemoglobinaNino(){
  		var hoy = moment().format('YYYY-MM-DD');
	  	//var fnacimiento = moment(this.nacimiento);//moment(this.birthdate, "DD-MM-YYYY").format('YYYY-MM-DD');
		var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');
  		var fnacimientof = moment(fnacimiento);
	  	var hoyf = moment(hoy);

	  	this.edadMeses = hoyf.diff(fnacimientof, 'months');
  		console.log("hemoglobina niño ...");
  		console.log("this.hemoglobinaUser: ", this.hemoglobinaUser);
		console.log("this.edadMeses: ", this.edadMeses);
		let revalidationhemo:any =  this.hemoglobinaUser.toString();
		console.log('revalidationhemo: ', revalidationhemo);
		if(revalidationhemo=="" || revalidationhemo=="undefined" || revalidationhemo=="0"){
			this.msgHemoPendiente="Pendiente descarte de anemia";
			this.classHemoglobina="";
			this.hemoglobinOK=false;
			this.hemoglobinERROR=true;
			this.msgHemoglobinaMSG="Medir hemoglobina";
			return;
		}
  		if(!this.hemoglobinaUser||this.hemoglobinaUser<=0||this.hemoglobinaUser==null){
  			console.log("revisa aquiiiiiiiiiiiiii");
  			console.log("no hay data - mostrarMsgHemoglobina");
			  /**/
			  //msgHemoglobinaMSG
			  //hemoglobinERROR
  			this.msgHemoglobinaMSG="Medir hemoglobina";
  			this.msgHemoglobina="";
	    	this.classHemoglobina="";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;

  		}else if(this.edadMeses==2 &&(this.hemoglobinaUser>=13.5&&this.hemoglobinaUser<=18.5)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Niño sin anemia";
	    	this.classHemoglobina="ok";
	    	this.hemoglobinOK=true;
			this.hemoglobinERROR=false;
  		}else if((this.edadMeses>2&&this.edadMeses<=5) &&(this.hemoglobinaUser>=9.5&&this.hemoglobinaUser<=13.5)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Niño sin anemia";
	    	this.classHemoglobina="ok";
	    	this.hemoglobinOK=true;
			this.hemoglobinERROR=false;
  		}else if((this.edadMeses>=6&&this.edadMeses<=59) &&(this.hemoglobinaUser>=11&&this.hemoglobinaUser<=14)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Niño sin anemia";
	    	this.classHemoglobina="ok";
	    	this.hemoglobinOK=true;
			this.hemoglobinERROR=false;
  		}else if((this.edadMeses==2) &&(this.hemoglobinaUser<13.5)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Niño con anemia";
	    	this.classHemoglobina="error";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;

			this.msgHemoPendiente = "Alimentación con carnes y vísceras de animales, control médico y suplemento de hierro."
  		}else if((this.edadMeses>2&&this.edadMeses<=5) &&(this.hemoglobinaUser<9.5)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Niño con anemia";
	    	this.classHemoglobina="error";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;

			this.msgHemoPendiente = "Alimentación con carnes y vísceras de animales, control médico y suplemento de hierro."
  		}else if((this.edadMeses>=6&&this.edadMeses<=59) &&(this.hemoglobinaUser<11)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Niño con anemia";
	    	this.classHemoglobina="error";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;

			this.msgHemoPendiente = "Alimentación con carnes y vísceras de animales, control médico y suplemento de hierro."
  		}else if((this.edadMeses==2) &&(this.hemoglobinaUser>18.5)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Hemoglobina anormal alta";
	    	this.classHemoglobina="error";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;
  		}else if((this.edadMeses>2&&this.edadMeses<=5) &&(this.hemoglobinaUser>13.5)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Hemoglobina anormal alta";
	    	this.classHemoglobina="error";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;
  		}else if((this.edadMeses>=6&&this.edadMeses<=59) &&(this.hemoglobinaUser>14)){
  			console.log("revisa aqui");
  			this.msgHemoglobina="Hemoglobina anormal alta";
	    	this.classHemoglobina="error";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;
  		}
  }
  //NIÑO CONTROLADO: CHEQUEOS CUMPLIDOS + VACUNAS
  mostrarMsgNinoControlado() {
	  	/*
		USUARIO DEPENDIENTE MENOR A 5 ANOS
		FECHA DE NACIMIENTO
		CODIGO DE CHEQUEOS CUMPLIDOS
		CODIGO DE VACUNAS
	  	*/

	  	var hoy = moment().format('YYYY-MM-DD');
	  	//var fnacimiento = moment(this.nacimiento);//moment(this.birthdate, "DD-MM-YYYY").format('YYYY-MM-DD');
		var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');
  		var fnacimientof = moment(fnacimiento);
	  	var hoyf = moment(hoy);

	  	var meses_diferencia = hoyf.diff(fnacimientof, 'months');
  		console.log('edadMeses', this.edadMeses);

  		var controles;
  		var nrocontrolesrealizados;
  		controles = this.controlsMinor.split(",");
		//nrocontrolesrealizados = controles.length+1;
		console.log("meses_diferencia: ", meses_diferencia);
		console.log("controles: ", controles);
		if(!meses_diferencia || !controles || controles=="undefined" || controles==""){
			this.chequeosOK=false;
			this.chequeosERROR=true;
			this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
			this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
			console.log("revisa aqui, niño");
		}else{
	  		switch (true) {
			    case (meses_diferencia == 0):
			    		console.log("REVISAR AQUI");
			        if(controles[0]==1){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;
			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia == 1):
			    		console.log("REVISAR AQUI");
			        if(controles[0]==1){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=2):
			    		console.log("REVISAR AQUI");
			        if(controles[1]==2){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=3):
			    		console.log("REVISAR AQUI");
			        if(controles[2]==3){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=4):
			    		console.log("REVISAR AQUI");
			        if(controles[3]==4){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=5):
			    		console.log("REVISAR AQUI");
			        if(controles[4]==5){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=6):
			    		console.log("REVISAR AQUI");
			        if(controles[5]==6){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=7):
			    		console.log("REVISAR AQUI");
			        if(controles[5]==6){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=9 && meses_diferencia!=7/**/):
			    	console.log("REVISAR AQUI");
			        if(controles[6]==7){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=11 && meses_diferencia!=7 && meses_diferencia!=9):
			    	console.log("REVISAR AQUI");
			        if(controles[7]==8){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=14 && meses_diferencia!=7 && meses_diferencia!=9 && meses_diferencia!=1):
			    		console.log("REVISAR AQUI");
			        if(controles[8]==9){
			        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgVacunas="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;

			        	}else{
				        	this.msgChequeos="Niño controlado";
							this.classMsgChequeos="ok";
							this.chequeosOK=true;
							this.chequeosERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
						this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
						this.classMsgChequeos="error";
						this.chequeosOK=false;
						this.chequeosERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=17 && meses_diferencia!=7 && meses_diferencia!=9 && meses_diferencia!=11 &&
             			meses_diferencia!=13 && meses_diferencia!=14):
			    		console.log("REVISAR AQUI");
				        if(controles[9]==10){
				        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
				        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
								this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
								this.classMsgVacunas="error";
								this.chequeosOK=false;
								this.chequeosERROR=true;

				        	}else{
					        	this.msgChequeos="Niño controlado";
								this.classMsgChequeos="ok";
								this.chequeosOK=true;
								this.chequeosERROR=false;
							}
				        }else{
				        	console.log("revisa aqui, niño");
				        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgChequeos="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;
							//EMBARAZO EN RIESGO
							//this.msgContEmabarazo="Realizate el control de embarazo";
				        }
				        break;
			    case (meses_diferencia<=20 && meses_diferencia!=7 && meses_diferencia!=9 && meses_diferencia!=11 &&
	             		meses_diferencia!=13 && meses_diferencia!=14 && meses_diferencia!=16 && meses_diferencia!=17):
			    		console.log("REVISAR AQUI");
				        if(controles[10]==11){
				        	console.log("controles ok");
				        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
				        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
								this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
								this.classMsgVacunas="error";
								this.chequeosOK=false;
								this.chequeosERROR=true;
				        	}else{
				        		console.log("NIÑO CONTROLADO");
				        		this.chequeosOK=true;
								this.chequeosERROR=false;
					        	this.msgChequeos="Niño controlado";
								this.classMsgChequeos="ok";

							}
				        }else{
				        	console.log("controles mal");
				        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgChequeos="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;
							//EMBARAZO EN RIESGO
							//this.msgContEmabarazo="Realizate el control de embarazo";
				        }
				        break;
			    case (meses_diferencia<=23 && meses_diferencia!=7 && meses_diferencia!=9 && meses_diferencia!=11 &&
		             meses_diferencia!=13 && meses_diferencia!=14 && meses_diferencia!=16 && meses_diferencia!=17 &&
		             meses_diferencia!=19 && meses_diferencia!=20):
			    		console.log("REVISAR AQUI");
				        if(controles[11]==12){
				        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
				        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
								this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
								this.classMsgVacunas="error";
								this.chequeosOK=false;
								this.chequeosERROR=true;

				        	}else{
					        	this.msgChequeos="Niño controlado";
								this.classMsgChequeos="ok";
								this.chequeosOK=true;
								this.chequeosERROR=false;
							}
				        }else{
				        	console.log("revisa aqui, niño");
				        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgChequeos="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;
							//EMBARAZO EN RIESGO
							//this.msgContEmabarazo="Realizate el control de embarazo";
				        }
				        break;
			    case (meses_diferencia<=29 && meses_diferencia!=7 && meses_diferencia!=9 && meses_diferencia!=11 &&
		             meses_diferencia!=13 && meses_diferencia!=14 && meses_diferencia!=16 && meses_diferencia!=17 &&
		             meses_diferencia!=19 && meses_diferencia!=20 && meses_diferencia!=23 && meses_diferencia!=22):
			    		console.log("REVISAR AQUI");
				        if(controles[12]==13){
				        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
				        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
								this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
								this.classMsgVacunas="error";
								this.chequeosOK=false;
								this.chequeosERROR=true;

				        	}else{
					        	this.msgChequeos="Niño controlado";
								this.classMsgChequeos="ok";
								this.chequeosOK=true;
								this.chequeosERROR=false;
							}
				        }else{
				        	console.log("revisa aqui, niño");
				        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgChequeos="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;
							//EMBARAZO EN RIESGO
							//this.msgContEmabarazo="Realizate el control de embarazo";
				        }
				        break;
			    case (meses_diferencia<=35 && meses_diferencia!=7 && meses_diferencia!=9 &&
		             meses_diferencia!=11 && meses_diferencia!=13 && meses_diferencia!=14 &&
		             meses_diferencia!=16 && meses_diferencia!=17 && meses_diferencia!=19 &&
		             meses_diferencia!=20 && meses_diferencia!=23 && meses_diferencia!=22 &&
		             meses_diferencia!=29 && meses_diferencia!=28 && meses_diferencia!=27 && meses_diferencia!=26 && meses_diferencia!=25):
			    		console.log("REVISAR AQUI");
					        if(controles[13]==14){
					        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
					        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
									this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
									this.classMsgVacunas="error";
									this.chequeosOK=false;
									this.chequeosERROR=true;

					        	}else{
						        	this.msgChequeos="Niño controlado";
									this.classMsgChequeos="ok";
									this.chequeosOK=true;
									this.chequeosERROR=false;
								}
					        }else{
					        	console.log("revisa aqui, niño");
					        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
								this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
								this.classMsgChequeos="error";
								this.chequeosOK=false;
								this.chequeosERROR=true;
								//EMBARAZO EN RIESGO
								//this.msgContEmabarazo="Realizate el control de embarazo";
					        }
					        break;
			    case (meses_diferencia<=36 && meses_diferencia!=7 && meses_diferencia!=9 &&
		              meses_diferencia!=11 && meses_diferencia!=13 && meses_diferencia!=14 &&
		              meses_diferencia!=16 && meses_diferencia!=17 && meses_diferencia!=19 &&
		              meses_diferencia!=20 && meses_diferencia!=23 && meses_diferencia!=22 &&
		              meses_diferencia!=29 && meses_diferencia!=28 && meses_diferencia!=27 &&
		              meses_diferencia!=26 && meses_diferencia!=25 && meses_diferencia!=35 &&
		              meses_diferencia!=34 && meses_diferencia!=33 && meses_diferencia!=32 && meses_diferencia!=31 && meses_diferencia!=30):
			    		console.log("REVISAR AQUI");
				        if(controles[14]==15){
				        	if(this.msgChequeos=="Control pendiente. Niño en riesgo de salud."){
				        		this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
								this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
								this.classMsgVacunas="error";
								this.chequeosOK=false;
								this.chequeosERROR=true;

				        	}else{
					        	this.msgChequeos="Niño controlado";
								this.classMsgChequeos="ok";
								this.chequeosOK=true;
								this.chequeosERROR=false;
							}
				        }else{
				        	console.log("revisa aqui, niño");
				        	this.msgChequeos="Control pendiente. Niño en riesgo de salud.";
							this.msgCheqPendiente="Realice su control de crecimiento y desarrollo";
							this.classMsgChequeos="error";
							this.chequeosOK=false;
							this.chequeosERROR=true;
							//EMBARAZO EN RIESGO
							//this.msgContEmabarazo="Realizate el control de embarazo";
				        }
				        break;
			}
		}
  }
  mostrarMsgNinoVacuna() {
	  	/*
		USUARIO DEPENDIENTE MENOR A 5 ANOS
		FECHA DE NACIMIENTO
		CODIGO DE CHEQUEOS CUMPLIDOS
		CODIGO DE VACUNAS
	  	*/

	  	var hoy = moment().format('YYYY-MM-DD');
	  	var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');//moment(this.birthdate, "DD-MM-YYYY").format('YYYY-MM-DD');

  		var fnacimientof = moment(fnacimiento);
	  	var hoyf = moment(hoy);

	  	var meses_diferencia = hoyf.diff(fnacimientof, 'months');
  		console.log('this.edadMeses', this.edadMeses);

  		var vacunas;
  		var nrocontrolesrealizados;
  		vacunas = this.vacunasMinor.split(",");
  		console.log("meses_diferencia: ", meses_diferencia);
  		console.log("vacunas: ", vacunas);
  		if(!vacunas || !meses_diferencia || vacunas=="undefined" || vacunas==""){
					this.msgVacunas="Vacunación pendiente";
					this.msgVacPendiente="Coloque las vacunas pendientes";
					this.classMsgVacunas="error";
					this.vacunasOK=false;
					this.vacunasERROR=true;
					console.log("revisa aqui, niño");
  		}else{
	  		switch (true) {
			    case (meses_diferencia<=3):
			        if(vacunas[0]==1){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=5):
			        if(vacunas[1]==2){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (/*meses_diferencia<=7*/ meses_diferencia<7 && meses_diferencia!=5):
			        if(vacunas[2]==3){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia==7):
			        if(vacunas[3]==4){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niñooooooooooo");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=11):
			        if(vacunas[4]==5){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=14 && meses_diferencia!=9 && meses_diferencia!=10 && meses_diferencia!=11):
			        if(vacunas[5]==6){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=17 && meses_diferencia!=14 && meses_diferencia!=13):
			        if(vacunas[6]==7){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia<=47 && meses_diferencia!=17 && meses_diferencia!=16):
			        if(vacunas[7]==8){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			    case (meses_diferencia>=48):
			        if(vacunas[8]==9){
			        	if(this.msgVacunas=="Control pendiente. Niño en riesgo de salud."){
			        		this.msgVacunas="Vacunación pendiente";
							this.msgVacPendiente="Coloque las vacunas pendientes";
							this.classMsgVacunas="error";
							this.vacunasOK=false;
							this.vacunasERROR=true;

			        	}else{
				        	this.msgVacunas="Niño protegido con vacunas";
				        	console.log("revisa aqui, niño");
							this.classMsgChequeos="ok";
							this.vacunasOK=true;
							this.vacunasERROR=false;
						}
			        }else{
			        	console.log("revisa aqui, niño");
			        	this.msgVacunas="Vacunación pendiente";
						this.msgVacPendiente="Coloque las vacunas pendientes";
						this.classMsgVacunas="error";
						this.vacunasOK=false;
						this.vacunasERROR=true;
						//EMBARAZO EN RIESGO
						//this.msgContEmabarazo="Realizate el control de embarazo";
			        }
			        break;
			}
		}
  }


  mostrarMedidaAbdminal(){
	  	if(this.medidaAbdominal == 0){
	  		this.medidaAbdominalMSG="Medir cintura abdominal";
	  		this.msgRedGrasAlimentos="";
	  		this.msgLimitaConsAlcoho="";
	  	}else if(this.genderUser=='Masculino' && this.medidaAbdominal > 90){
	  		this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
	  		this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
	  		console.log("revisa aqui ahora");
	  	}else if(this.genderUser!='Masculino' && this.medidaAbdominal > 88){
	  		this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
	  		this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
	  		console.log("revisa aqui ahora");
	  	}
  }

  mostrarFumador(){
  		console.log("this.estadoFumadorUser: ", this.estadoFumadorUser);
	  	if(this.estadoFumadorUser==0){
	  		//FUMADOR
			this.msgDejaFumar="Deja de fumar";
	  	}

  }
  mostrarMsgPesoIdeal() {
  		if(!this.pesoUser||this.pesoUser<=0||this.pesoUser==null||
  		   !this.tallaUser||this.tallaUser<=0||this.tallaUser==null){
  			this.msgPesoIdeal="";
	    	this.classPesoIdeal="";
	    	this.pesoIdealOK=false;
			this.pesoIdealERROR=true;
			if(!this.pesoUser||this.pesoUser<=0||this.pesoUser==null){
				this.msgPesoMSG="Medir peso";
			}
			if(!this.tallaUser||this.tallaUser<=0||this.tallaUser==null){
				this.msgTallaMSG="Medir talla";
			}


  		}else{
		  	var pesoIdeal = this.pesoUser/Math.pow(this.tallaUser,2);
		  	console.log("pesoIdeal:", pesoIdeal);
		    if(pesoIdeal<18.5){
		    	this.pesoIdealOK=false;
				this.pesoIdealERROR=true;
		    	this.msgPesoIdeal="Bajo peso";
		    	this.classPesoIdeal="error";
		    	//BAJO PESO
				this.msgConsultXBajoPeso="Realiza consulta por bajo peso";
		    }else if(pesoIdeal>=18.5 && pesoIdeal<24.99){
		    	this.pesoIdealOK=true;
				this.pesoIdealERROR=false;
		    	this.msgPesoIdeal="Peso ideal";
		    	this.classPesoIdeal="ok";
		    }else if(pesoIdeal>=25   && pesoIdeal<29.99){
		    	this.pesoIdealOK=false;
				this.pesoIdealERROR=true;
		    	this.msgPesoIdeal="Sobrepeso";
		    	this.classPesoIdeal="error";
		    	//SOBREPESO, OBESIDAD, MORBIDO
				this.msgRegCantAlimentos="Regula cantidad de alimentos";
				//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
				console.log("revisa aqui");
		    }else if(pesoIdeal>=30   && pesoIdeal<39.99){
		    	this.pesoIdealOK=false;
				this.pesoIdealERROR=true;
		    	this.msgPesoIdeal="Obesidad";
		    	this.classPesoIdeal="error";
		    	//SOBREPESO, OBESIDAD, MORBIDO
		    	this.msgRegCantAlimentos="Regula cantidad de alimentos";
		    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
				console.log("revisa aqui");
		    }else if(pesoIdeal>=40){
		    	this.pesoIdealOK=false;
				this.pesoIdealERROR=true;
		    	this.msgPesoIdeal="Morbido";
		    	this.classPesoIdeal="error";
		    	//SOBREPESO, OBESIDAD, MORBIDO
		    	this.msgRegCantAlimentos="Regula cantidad de alimentos";
		    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
				console.log("revisa aqui");
		    }
  		}
  }
  mostrarMsgHemoglobina() {
  		console.log("this.hemoglobinaUser: ", this.hemoglobinaUser);
  		console.log("en mostrarMsgHemoglobina");
  		if(!this.hemoglobinaUser||this.hemoglobinaUser<=0||this.hemoglobinaUser==null || this.hemoglobinaUser ){
  			/**/console.log("no hay data - mostrarMsgHemoglobina");
  			this.msgHemoglobina="Pendiente descarte de anemia";
	    	this.classHemoglobina="";
	    	this.hemoglobinOK=false;
			this.hemoglobinERROR=true;
			this.msgHemoglobinaMSG="Medir hemoglobina";
  		}else{


  			console.log("si hay data - mostrarMsgHemoglobina");
  			//(hemoglobin>=12 && hemoglobin<=15.3 && genderOption==0)||(hemoglobin>=13 && hemoglobin<=17.5 && genderOption==1)
		    if( (this.hemoglobinaUser>=12 && this.hemoglobinaUser<=15.3 && this.genderUser!='Masculino') ||
		    	(this.hemoglobinaUser>=13 && this.hemoglobinaUser<=17.5 && this.genderUser=='Masculino') ){
		    	this.hemoglobinOK=true;
				this.hemoglobinERROR=false;
		    	this.msgHemoglobina="Sin anemia";
		    	this.classHemoglobina="ok";
		    }else if( (this.hemoglobinaUser<12&&this.genderUser!='Masculino') || (this.hemoglobinaUser<13&&this.genderUser=='Masculino')){
		    	//(hemoglobin<12 && genderOption==0)||(hemoglobin<13 && genderOption==1)
		    	this.hemoglobinOK=false;
				this.hemoglobinERROR=true;
		    	this.msgHemoglobina="Anemia";
		    	this.classHemoglobina="error";
		    	//ANEMIA
				this.msgConsumeComHierro="Consume complemento de hierro";
		    }
		    //(hemoglobin>15.3 && genderOption==0)||(hemoglobin>17.5 && genderOption==1)
		    else if(this.hemoglobinaUser>=17.5 && this.genderUser=="Masculino"){
		    	this.hemoglobinOK=false;
				this.hemoglobinERROR=true;
		    	this.msgHemoglobina="Hemoglobina anormal alta";
		    	this.classHemoglobina="error";
		    	//HEMOGLOBINA ELEVADA
				this.msgConsultExcHemogl="Consulta al médico por exceso de hemoglobina";
		    }else if(this.hemoglobinaUser>=15.3 && this.genderUser!="Masculino"){
		    	this.hemoglobinOK=false;
				this.hemoglobinERROR=true;
		    	this.msgHemoglobina="Hemoglobina anormal alta";
		    	this.classHemoglobina="error";
		    	//HEMOGLOBINA ELEVADA
				this.msgConsultExcHemogl="Consulta al médico por exceso de hemoglobina";
		    }
  		}
  }
  mostrarMsgPresionArterial() {
  		if(this.presioArterialUser || this.presioArterialUser!=null || this.presioArterialUser!=='-1'){
  			var presionArterial = this.presioArterialUser.split("/");
  			console.log("presionArterial: ", presionArterial);
		  	var presionArterialN = parseInt(presionArterial[0]);
		  	var presionArterialD = parseInt(presionArterial[1]);
		  	var hoy = moment().format('YYYY-MM-DD');
		  	var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');
		  	var edad = this.calculaEdad(hoy,fnacimiento);
		  	/*if(this.estadoHipertensoUser==0){
		  		this.msgHipertension = ""
				this.classHipertension = "ok";
		  	}*/
		  	console.log('edad: ', edad);
		  	//hipertension si/no
		  		//90 a 129/60 89 -> NORMAL
		  		//130 a 139/<89  -> LIMITE ALTO
		  		//>=140/CUALQUIER VALOR -> ELEVADO, salud en riesgo
		  		//CUALQUIER VALOR/>=90  -> ELEVADO, salud en riesgo
		  		//>=150/CUALQUIER VALOR && EDAD > 80 -> ELEVADO, salud en riesgo
		  		//<=89 /CUALQUIER VALOR -> PRESION BAJA, salud en riesgo
		  	console.log("presionArterialN: ", presionArterialN);
		  	console.log("presionArterialD: ", presionArterialD);
		    if(presionArterialN==0 || presionArterialD==0){
		    	this.msgPresionAnterialMSG = "Medir presión arterial";
		    }else if((presionArterialN>=90&&presionArterialN<=129) && (presionArterialD>=60&&presionArterialD<=89)){
		    	this.msgPresionArterial="Presión arterial adecuada";
		    	this.classPresionArterial="ok";
				this.presArteriOK=true;
				this.presArteriERROR=false;
		    }else if((presionArterialN>=130&&presionArterialN<=139) && (presionArterialD<89)){
		    	this.presArteriOK=true;
				this.presArteriERROR=false;
		    	this.msgPresionArterial="Presión en limite alto";
		    	this.classPresionArterial="ok";
		    	//PRESION ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINA INADECUADA
				this.msgLimitaConsAlcoho="";
				//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="";
		    }else if((presionArterialN>=140)){
		    	this.presArteriOK=false;
				this.presArteriERROR=true;
		    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
				this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
				console.log("revisa aqui");
		    	this.msgPresionArterial="Presión elevada";
		    	this.classPresionArterial="error";
		    }else if((presionArterialD>=90)){
		    	this.presArteriOK=false;
				this.presArteriERROR=true;
		    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
				this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
				console.log("revisa aqui");
				//PRESION ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINA INADECUADA
				this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
		    	this.msgPresionArterial="Presión elevada";
		    	this.classPresionArterial="error";
		    }else if((presionArterialN>=150)&&(edad>80)){
		    	this.presArteriOK=false;
				this.presArteriERROR=true;
		    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
				this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
				this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
				console.log("revisa aqui");
		    	this.msgPresionArterial="Presión elevada";
		    	//PRESION ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINA INADECUADA
				this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
		    	this.classPresionArterial="error";
		    }else if((presionArterialN<=89 && presionArterialN>0)){
		    	this.presArteriOK=false;
				this.presArteriERROR=true;
		    	this.msgPresionArterial="Presión baja";
		    	this.classPresionArterial="error";
		    	//PRESION BAJA
				this.msgConsultPreBajo="Consulta al médico por presión baja";
		    }else{
		    	/*this.presArteriOK=true;
				this.presArteriERROR=false;
	  			this.msgPresionArterial="No completo estos datos";
			    this.classPresionArterial="";*/
		    }
  		}else{
  			//this.msgPresionArterial="PRESION BAJA, salud en riesgo";
	    	/*this.presArteriOK=true;
			this.presArteriERROR=false;
  			this.msgPresionArterial="No completo estos datos";
		    this.classPresionArterial="";*/
  		}

  }
  //TIENE DIABETES ?
  mostrarMsgHemoglobinaAzucar() {
	    if(this.estadoDiabeticoUser>=1){
	    	this.stateDiabeOK=true;
			this.stateDiabeERROR=false;
	    	this.msgTieneDiabetes="Sin diabetes";
	    	this.classTieneDiabetes="ok";
	    }else if(this.estadoDiabeticoUser==0){
	    	this.stateDiabeOK=false;
			this.stateDiabeERROR=true;
	    	this.msgTieneDiabetes="Con diabetes";
	    	this.classTieneDiabetes="error";
	    }
  }
  //DIABETES CONTROLADA ?
  mostrarMsgHemoglobinaDiabetes() {
	  	/* 0=NO; 1=SI */
		console.log("-------------------------");
		if(this.estadoDiabeticoUser==1){
			if(this.glucosaSDiabetes == 0){
				this.glucosaSDiabetesMSG = "Medir glucosa";
			}else if(this.glucosaSDiabetes<= 116&&this.glucosaSDiabetes >= 60){

			}else if(this.glucosaSDiabetes > 116){
		   		this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
		   		this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
		   		this.hemogDiabeOK=false;
				this.hemogDiabeERROR=true;
		    	this.msgHemoglobinaDiabetes="Azúcar alta";
			}else if(this.glucosaSDiabetes<60 && this.glucosaSDiabetes>0){
				this.msgConsultAzuAlto="Consulta al médico por azúcar baja";
				this.hemogDiabeOK=false;
				this.hemogDiabeERROR=true;
		    	this.msgHemoglobinaDiabetes="Azúcar baja";
			}
		}else if(this.estadoDiabeticoUser==0){
			if(!this.FUltimoAnalisisDiabetes || this.FUltimoAnalisisDiabetes==null||this.FUltimoAnalisisDiabetes=='1900/01/01'
		  		|| !this.trataDiabetesUser == null || this.trataDiabetesUser == 0 || this.trataDiabetesUser == null
		  		|| !this.hemoblobinaGlicUser || this.hemoblobinaGlicUser == 0 || this.hemoblobinaGlicUser == null
		  		|| !this.hemoglobinaAlimUser || this.hemoglobinaAlimUser == 0 || this.hemoglobinaAlimUser == null
		  		|| !this.hemoglobinaAyunUser || this.hemoglobinaAyunUser == 0 || this.hemoglobinaAyunUser == null){
		  		/**/this.msgHemoglobinaDiabetes="";
			    this.classHemoglobinaDiabetes="";
			    this.hemogDiabeOK=true;
				this.hemogDiabeERROR=false;
				if(this.hemoblobinaGlicUser == 0){
					this.hemoblobinaGlicUserMSG = "Medir hemoglobina glucosilada";
				}
				if(this.hemoglobinaAlimUser == 0){
					this.hemoglobinaAlimUserMSG = "Medir glucosa despues de alimentos";
				}
				if(this.hemoglobinaAyunUser == 0){
					this.hemoglobinaAyunUserMSG = "Medir glucosa despues de ayunas";
				}
			}else{
				var hoy = moment().format('YYYY-MM-DD');
				console.log("this.FUltimoAnalisisDiabetes: ", this.FUltimoAnalisisDiabetes);
				var ultimo_control = moment(this.FUltimoAnalisisDiabetes);
				var hoyf = moment(hoy);
				var ultimo_controlf = moment(ultimo_control);
				console.log("hoy: ", hoyf);
				console.log("ucf" , ultimo_controlf);
				var meses_uc = hoyf.diff(ultimo_controlf, 'months');
				console.log("this.trataDiabetesUser: ", this.trataDiabetesUser);
				console.log("this.meses_uc: ", meses_uc);
				console.log("this.hemoblobinaGlicUser: ", this.hemoblobinaGlicUser);
				console.log("this.hemoglobinaAyunUser: ", this.hemoglobinaAyunUser);
				console.log("this.hemoglobinaAyunUser: ", this.hemoglobinaAyunUser);
				console.log("this.hemoglobinaAlimUser: ", this.hemoglobinaAlimUser);
				console.log("-------------------------");
			    if(	this.trataDiabetesUser==0 &&  meses_uc<=6 &&
			    	this.hemoblobinaGlicUser<7  &&  (this.hemoglobinaAyunUser<= 116&&this.hemoglobinaAyunUser >= 60)&&
			    	(this.hemoglobinaAlimUser <= 200 && this.hemoglobinaAlimUser >=60) ){
			    	this.hemogDiabeOK=true;
					this.hemogDiabeERROR=false;
			    	this.msgHemoglobinaDiabetes="Diabetes controlada";
			    	this.classHemoglobinaDiabetes="ok";
			    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
					//this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
					//console.log("revisa aqui");
					//AZUCAR BAJA
					if(this.hemoglobinaAyunUser<60 && this.hemoglobinaAyunUser>0){
			    		this.msgConsultAzuAlto="Consulta al médico por azúcar baja";
			    		this.hemogDiabeOK=false;
						this.hemogDiabeERROR=true;
				    	this.msgHemoglobinaDiabetes="Azúcar baja";
			    	}
			    }else{
			    	if(this.hemoblobinaGlicUser>=7 || this.hemoglobinaAyunUser > 116 || this.hemoglobinaAlimUser > 200){
			    		this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
			    		this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
			    		this.hemogDiabeOK=false;
						this.hemogDiabeERROR=true;
						this.msgHemoglobinaDiabetes="Diabetes no controlada";
						this.classHemoglobinaDiabetes="error";
			    		if(this.hemoglobinaAyunUser > 116){
			    			this.hemogDiabeOK=false;
							this.hemogDiabeERROR=true;
					    	this.msgHemoglobinaDiabetes="Azúcar alta";
			    		}else if(this.hemoblobinaGlicUser>=7){
			    			this.hemogDiabeOK=false;
							this.hemogDiabeERROR=true;
					    	this.msgHemoglobinaDiabetes="Azúcar alta";
			    		}else if(this.hemoglobinaAlimUser>200){
			    			this.hemogDiabeOK=false;
							this.hemogDiabeERROR=true;
					    	this.msgHemoglobinaDiabetes="Azúcar alta";
			    		}
			    	}
			    	this.hemogDiabeOK=false;
					this.hemogDiabeERROR=true;
					this.msgHemoglobinaDiabetes="Diabetes no controlada";
					this.classHemoglobinaDiabetes="error";
			    	if(this.hemoglobinaAyunUser<60 && this.hemoglobinaAyunUser>0){
			    		this.msgConsultAzuAlto="Consulta al médico por azúcar baja";
			    		this.hemogDiabeOK=false;
						this.hemogDiabeERROR=true;
				    	this.msgHemoglobinaDiabetes="Azúcar baja";
			    	}
			    	if(this.hemoglobinaAyunUser > 116){
		    			this.hemogDiabeOK=false;
						this.hemogDiabeERROR=true;
				    	this.msgHemoglobinaDiabetes="Azúcar alta";
		    		}else if(this.hemoblobinaGlicUser>=7){
		    			this.hemogDiabeOK=false;
						this.hemogDiabeERROR=true;
				    	this.msgHemoglobinaDiabetes="Azúcar alta";
		    		}else if(this.hemoglobinaAlimUser>200){
		    			this.hemogDiabeOK=false;
						this.hemogDiabeERROR=true;
				    	this.msgHemoglobinaDiabetes="Azúcar alta";
		    		}
			    	//this.hemogDiabeOK=false;
					//this.hemogDiabeERROR=true;
			    	//this.msgHemoglobinaDiabetes="Diabetes no controlada";
			    	//this.classHemoglobinaDiabetes="error";
			    }
			}
		}/*else{
			if(this.hemoblobinaGlicUser == 0){
				this.hemoblobinaGlicUserMSG = "Medir hemoglobina glucosilada";
			}
			if(this.hemoglobinaAlimUser == 0){
				this.hemoglobinaAlimUserMSG = "Medir glucosa despues de alimentos";
			}
			if(this.hemoglobinaAyunUser == 0){
				this.hemoglobinaAyunUserMSG = "Medir glucosa despues de ayunas";
			}
		}*/

  }
  //GRASAS EN SANGRE(TIGLICERIDOS)
  mostrarMsgColesterol() {
  		var hoy = moment().format('YYYY-MM-DD');
		var fnacimiento = moment(this.nacimiento, "DD-MM-YYYY").format('YYYY-MM-DD');
  		var edad = this.calculaEdad(hoy,fnacimiento);
	  	/*
		FECHA DEL ULTIMO ANALISIS
		COLESTEROL LDL
		COLESTEROL HDL
		TRIGLICERIDOS
	  	*/
		    /* 0=NO; 1=SI */
		    console.log("-----------GRASAS-----------");
		    console.log("this.estadoDiabeticoUser: ", this.estadoDiabeticoUser);
		    console.log("this.colesterolLDLUser: ", this.colesterolLDLUser);
		    console.log("this.colesterolHDLUser: ", this.colesterolHDLUser);
		    console.log("this.trigliceridosUser: ", this.trigliceridosUser);
		    console.log("this.FUltimoAnalisisColesterol: ", this.FUltimoAnalisisColesterol);
		    if(/*!this.estadoDiabeticoUser || this.estadoDiabeticoUser==-1 || this.estadoDiabeticoUser==null ||*/
		       !this.colesterolLDLUser || this.colesterolLDLUser==0 || this.colesterolLDLUser==null ||
		       !this.colesterolHDLUser || this.colesterolHDLUser==0 || this.colesterolHDLUser==null ||
		       !this.trigliceridosUser || this.trigliceridosUser==0 || this.trigliceridosUser==null ||
		       !this.FUltimoAnalisisColesterol || this.FUltimoAnalisisColesterol=='1900/01/01' || this.FUltimoAnalisisColesterol==null ){
		    	/**/
		    	this.msgColesterol="";
			    this.classMsgColesterol="";
			    this.colesterolOK=false;
				this.colesterolERROR=true;
				if(this.colesterolLDLUser){
					this.colesterolLDLUserMsg = "Medir colesterol LDL";
				}
				if(this.colesterolHDLUser){
					this.colesterolHDLUserMsg = "Medir colesterol HDL";
				}
				if(this.trigliceridosUser){
					this.trigliceridosUserMsg = "Medir triglicéridos";
				}
		    }
		    else{
		    	var hoy = moment().format('YYYY-MM-DD');
				var ultimo_control = moment(this.FUltimoAnalisisColesterol);
				var hoyf = moment(hoy);
				var ultimo_controlf = moment(ultimo_control);
				var meses_uc = hoyf.diff(ultimo_controlf, 'months');

				if(this.estadoDiabeticoUser==0){
					console.log("con diabetes");
					if(this.colesterolLDLUser<130 && this.colesterolHDLUser>=40 && this.trigliceridosUser<=150){
				    	this.msgColesterol="Grasas en sangre normales";
				    	this.classMsgColesterol="ok";
				    	this.colesterolOK=true;
						this.colesterolERROR=false;
				    }else{
						this.colesterolOK=false;
						this.colesterolERROR=true;
				    	this.msgColesterol="Nivel de grasas en sangre inadecuado";
				    	this.classMsgColesterol="error";
				    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
						this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
						this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
						console.log("revisa aqui");
						//PRESION ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINA INADECUADA
						this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
			    	}
				}else{
					console.log("sin diabetes");
					// 02/01/2019: Se cambió el || por el &&
					if(this.colesterolLDLUser<130 && this.colesterolHDLUser>=40 && this.trigliceridosUser<=160){
				    	this.msgColesterol="Grasas en sangre normales";
				    	this.classMsgColesterol="ok";
						this.colesterolOK=true;
						this.colesterolERROR=false;
				    }else{
						this.colesterolOK=false;
						this.colesterolERROR=true;
				    	this.msgColesterol="Nivel de grasas en sangre inadecuado";
				    	this.classMsgColesterol="error";
				    	//SOBREPESO, OBESIDAD, MORBIDO, PRESIÓN ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINAL INADECUADA
						this.msgRedGrasAlimentos="Reduce los alimentos grasosos, dulces y salados";
						this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
						console.log("revisa aqui");
						//PRESION ALTA, AZUCAR ALTA, GRASAS ALTERADA, CINTURA ABDOMINA INADECUADA
						this.msgLimitaConsAlcoho="Limita el consumo de alcohol";
			    	}
				}
		    }
  }

  //CHEQUEOS REALIZADOS
  mostrarMsgChequeosOk() {
	  	/*
	  	ULTIMA CONSULTA MEDICA PREVENTIVA
	  	ULTIMO CHEQUEO DENTAL
		ULTIMO CHEQUEO DE LA VISTA
		RESULTADO DEL CHEQUEO DE LA VISTA
		ULTIMO CHEQUEO DE ENDOSCOPIA GASTRICA
		RESULTADO DEL EXAMEN DE ENDOSCOPIA GASTRICA
		ULTIMO CHEQUEO DE COLONOSCOPIA
		RESULTADO DE COLONOSCOPIA
		VACUNA CONTRA LA NEUMONIA
	  	*/
  		/* 0=NO; 1=SI */
  		console.log("this.FUltimoControlOdontolog: ", this.FUltimoControlOdontologico);
  		console.log("this.FUltimoControlGastro: ", this.FUltimoControlGastro);
  		console.log("this.FUltimoControlColo: ", this.FUltimoControlColo);
  		console.log("this.FUltimoControlOjos: ", this.FUltimoControlOjos);
  		console.log("this.FUltimoControlPreve: ", this.FUltimoControlPreve);
  		console.log("this.gastroExam: ", this.gastroExam);
  		console.log("this.coloExam: ", this.coloExam);
  		console.log("this.ojoExam: ", this.ojoExam);

  		if(!this.FUltimoControlOdontologico||this.FUltimoControlOdontologico=='1900/01/01'||this.FUltimoControlOdontologico==null||
  		   //!this.FUltimoControlMamo||this.FUltimoControlMamo=='1900/01/01'||this.FUltimoControlMamo==null||
  		   //!this.FUltimoControlPapa||this.FUltimoControlPapa=='1900/01/01'||this.FUltimoControlPapa==null||
  		   //!this.FUltimoContrlProsta||this.FUltimoContrlProsta=='1900/01/01'||this.FUltimoContrlProsta==null||
  		   !this.FUltimoControlGastro||this.FUltimoControlGastro=='1900/01/01'||this.FUltimoControlGastro==null||
  		   !this.FUltimoControlColo||this.FUltimoControlColo=='1900/01/01'||this.FUltimoControlColo==null||
  		   !this.FUltimoControlOjos||this.FUltimoControlOjos=='1900/01/01'||this.FUltimoControlOjos==null||
  		   !this.FUltimoControlPreve||this.FUltimoControlPreve=='1900/01/01'||this.FUltimoControlPreve==null||
  		   //!this.mamoExam||this.mamoExam== '-1' ||this.mamoExam==null||
  		   //!this.papoExam||this.papoExam== '-1' ||this.papoExam==null||
  		   //!this.proExam||this.proExam== '-1' ||this.proExam==null||
  		   !this.gastroExam||this.gastroExam== '-1' ||this.gastroExam==null||
  		   !this.coloExam||this.coloExam== '-1' ||this.coloExam==null||
  		   !this.ojoExam||this.ojoExam== '-1' ||this.ojoExam==null){
  		   	/*console.log("no completo datos")
  			this.msgChequeos="No completo estos datos";
			this.classMsgChequeos="";
			this.chequeosOK=true;
			this.chequeosERROR=false;*/
			console.log("no se realizo chequeos");
			this.msgCheqPendiente="Realízate chequeos pendientes";
			this.msgChequeos="Chequeos no realizados"
			this.chequeosOK=false;
			this.chequeosERROR=true;
  		}else{
		  	var hoy = moment().format('YYYY-MM-DD');
		  	var hoyf = moment(hoy);

			var ultimo_control_odo = moment(this.FUltimoControlOdontologico);
			//ultimo_control_odo = moment(ultimo_control);
			var ultimo_control_mam = moment(this.FUltimoControlMamo);
			//ultimo_control_mam = moment(ultimo_control);
			var ultimo_control_pap = moment(this.FUltimoControlPapa);
			//ultimo_control_pap = moment(ultimo_control);
			var ultimo_control_pro = moment(this.FUltimoContrlProsta);
			//ultimo_control_pro = moment(ultimo_control);
			var ultimo_control_gas = moment(this.FUltimoControlGastro);
			//ultimo_control_gas = moment(ultimo_control);
			var ultimo_control_col = moment(this.FUltimoControlColo);
			//ultimo_control_col = moment(ultimo_control);
			var ultimo_control_ojo = moment(this.FUltimoControlOjos);
			//ultimo_control_ojo = moment(ultimo_control);
			var ultimo_control_pre = moment(this.FUltimoControlPreve);
			//ultimo_control_pre = moment(ultimo_control);

			// >18
			var meses_uc_odo = hoyf.diff(ultimo_control_odo, 'months');
			//NORMAL: >= 11; ANORMAL: >6
			var meses_uc_mam = hoyf.diff(ultimo_control_mam, 'months');
			//NORMAL: >= 11; ANORMAL: >6
			var meses_uc_pap = hoyf.diff(ultimo_control_pap, 'months');
			//NORMAL: >= 11; ANORMAL: >6
			var meses_uc_pro = hoyf.diff(ultimo_control_pro, 'months');
			//NORMAL: >= 11; ANORMAL: >6
			var meses_uc_gas = hoyf.diff(ultimo_control_gas, 'months');
			//NORMAL: >= 11; ANORMAL: >6
			var meses_uc_col = hoyf.diff(ultimo_control_col, 'months');
			//NORMAL: >= 18; ANORMAL: >12
			var meses_uc_ojo = hoyf.diff(ultimo_control_ojo, 'months');
			// >18
			var meses_uc_pre = hoyf.diff(ultimo_control_pre, 'months');
			console.log("meses_uc_odo: ", meses_uc_odo);
			//Antes: 18
		    if(meses_uc_odo>=17.7413){
		    	this.chequeosOK=false;
				this.chequeosERROR=true;
		    	this.msgChequeos="Chequeos no realizados";
				this.classMsgChequeos="error";
				//CHEQUEOS PENDIENTES
				this.msgCheqPendiente="Realízate chequeos pendientes";
		    }else{
		    	if(this.msgChequeos=="Chequeos no realizados"){
		    		this.chequeosOK=false;
					this.chequeosERROR=true;
			    	this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else{
		    		this.chequeosOK=true;
					this.chequeosERROR=false;
			    	this.msgChequeos="Chequeos realizados";
					this.classMsgChequeos="ok";
		    	}
		    }
		    if(this.mamoExam="0"){
		    	if(meses_uc_mam>11){
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_mam>6){
		    		if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		if(this.msgChequeos=="Chequeos no realizados"){
				    		this.chequeosOK=false;
							this.chequeosERROR=true;
					    	this.msgChequeos="Chequeos no realizados";
							this.classMsgChequeos="error";
							//CHEQUEOS PENDIENTES
							this.msgCheqPendiente="Realízate chequeos pendientes";
				    	}else{
				    		this.chequeosOK=true;
							this.chequeosERROR=false;
					    	this.msgChequeos="Chequeos realizados";
							this.classMsgChequeos="ok";
				    	}
			    	}
		    	}
		    }else if(this.mamoExam="1"){
		    	if(meses_uc_mam>11){
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_mam>6){
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }
		    if(this.papoExam="0"){// Normal // Antes 11
		    	if(meses_uc_pap>23.655){
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_pap>6){
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }else if(this.papoExam="1"){// Anormal // Antes 11
		    	if(meses_uc_pap>23.655){
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_pap>6){
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }
		    if(this.proExam="0"){
		    	if(meses_uc_pro>35.4825){ // Antes 11
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_pro>11.8275){ // Antes 6
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }else if(this.proExam="1"){
		    	if(meses_uc_pro>35.4825){ // Antes 11
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_pro>11.8275){ // Antes 6
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }
		    if(this.gastroExam="0"){
		    	if(meses_uc_gas>35.4825){// Antes 11
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_gas>5.9138){// Antes 6
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }else if(this.gastroExam="1"){
		    	if(meses_uc_gas>35.4825){// Antes 11
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else if(meses_uc_gas>5.9138){ // Antes 6
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }
		    if(this.coloExam="0"){
		    	if(meses_uc_col>119.92){ // Antes 11
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else{
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }else if(this.coloExam="1"){
		    	if(meses_uc_col>5.9138){ // Antes 12
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}else{
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}
		    }
		    if(this.ojoExam="0"){
		    	if(meses_uc_ojo>17.7413){// Antes 11
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else{
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}
		    }else if(this.ojoExam="1"){
		    	if(meses_uc_ojo>17.7413){ // Antes 12
					if(this.msgChequeos=="Chequeos no realizados"){
			    		this.chequeosOK=false;
						this.chequeosERROR=true;
				    	this.msgChequeos="Chequeos no realizados";
						this.classMsgChequeos="error";
						//CHEQUEOS PENDIENTES
						this.msgCheqPendiente="Realízate chequeos pendientes";
			    	}else{
			    		this.chequeosOK=true;
						this.chequeosERROR=false;
				    	this.msgChequeos="Chequeos realizados";
						this.classMsgChequeos="ok";
			    	}
		    	}else{
					this.chequeosOK=false;
					this.chequeosERROR=true;
		    		this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}
		    }
	    	if(meses_uc_pre>18){
				this.chequeosOK=false;
				this.chequeosERROR=true;
	    		this.msgChequeos="Chequeos no realizados";
				this.classMsgChequeos="error";
				//CHEQUEOS PENDIENTES
				this.msgCheqPendiente="Realízate chequeos pendientes";
	    	}else{
				if(this.msgChequeos=="Chequeos no realizados"){
		    		this.chequeosOK=false;
					this.chequeosERROR=true;
			    	this.msgChequeos="Chequeos no realizados";
					this.classMsgChequeos="error";
					//CHEQUEOS PENDIENTES
					this.msgCheqPendiente="Realízate chequeos pendientes";
		    	}else{
		    		this.chequeosOK=true;
					this.chequeosERROR=false;
			    	this.msgChequeos="Chequeos realizados";
					this.classMsgChequeos="ok";
		    	}
	    	}
  		}
  }

  //EMBARAZO CONTROLADO CORRESPONDIENTE PARA EDAD GESTACIONAL
	  mostrarMsgEmbarazoControlado() {
	  	/*
		ESTA EMBARAZADA?
		FECHA DE LA ULTIMA REGLA
		CODIGO DE LOS CONTROLES REALIZADOS
	  	*/

	  	if(!this.lastRuller || this.lastRuller=='1900/01/01'||this.lastRuller==null||
	  	   !this.controlsPregnant || this.controlsPregnant==null){
	  		if(this.estadoEmbarazoUser==0){
	  			this.pregnantOK=false;
				this.pregnantERROR=true;
	        	this.msgControlesPreg="Embarazo en riesgo";
	        	this.msgContEmabarazo="Realízate el control de embarazo"
				this.classMsgControlesPreg="error";
				console.log("revisa embarazo aqui");
	  		}
	  		/*this.msgControlesPreg="No completo estos datos";
			this.classMsgControlesPreg="";
			this.pregnantOK=true;
			this.pregnantERROR=false;*/
	  	}else{
		  	this.calculateFUR();
	  		var controles;
	  		var nrocontrolesrealizados;
	  		controles = this.controlsPregnant.split(",");
			//nrocontrolesrealizados = controles.length+1;
			console.log("this.weeksPregnancy: ", this.weeksPregnancy);
	  		switch (true) {
			    case (this.weeksPregnancy <= 25):
			        if(controles[0]==1){
						this.pregnantOK=true;
						this.pregnantERROR=false;
			        	this.msgControlesPreg="Embarazo controlado";
						this.classMsgControlesPreg="ok";
			        }else{
						this.pregnantOK=false;
						this.pregnantERROR=true;
			        	this.msgControlesPreg="Embarazo en riesgo";
			        	console.log("revisa embarazo aqui");
			        	this.msgContEmabarazo="Realízate el control de embarazo"
						this.classMsgControlesPreg="error";
			        }
			        break;
			    case (this.weeksPregnancy <= 31):
			        if(controles[1]==2){
						this.pregnantOK=true;
						this.pregnantERROR=false;
			        	this.msgControlesPreg="Embarazo controlado";
						this.classMsgControlesPreg="ok";
			        }else{
						this.pregnantOK=false;
						this.pregnantERROR=true;
			        	this.msgControlesPreg="Embarazo en riesgo";
			        	console.log("revisa embarazo aqui");
			        	this.msgContEmabarazo="Realízate el control de embarazo"
						this.classMsgControlesPreg="error";
			        }
			        break;
			    case (this.weeksPregnancy <= 37):
			        if(controles[2]==3){
						this.pregnantOK=true;
						this.pregnantERROR=false;
			        	this.msgControlesPreg="Embarazo controlado";
						this.classMsgControlesPreg="ok";
			        }else{
						this.pregnantOK=false;
						this.pregnantERROR=true;
			        	this.msgControlesPreg="Embarazo en riesgo";
			        	console.log("revisa embarazo aqui");
			        	this.msgContEmabarazo="Realízate el control de embarazo"
						this.classMsgControlesPreg="error";
			        }
			        break;
			    case (this.weeksPregnancy >= 38):
			        if(controles[3]==4){
						this.pregnantOK=true;
						this.pregnantERROR=false;
			        	this.msgControlesPreg="Embarazo controlado";
						this.classMsgControlesPreg="ok";
			        }else{
						this.pregnantOK=false;
						this.pregnantERROR=true;
			        	this.msgControlesPreg="Embarazo en riesgo";
			        	console.log("revisa embarazo aqui");
			        	this.msgContEmabarazo="Realízate el control de embarazo"
						this.classMsgControlesPreg="error";
			        }
			        break;
			}
	  	}
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
  calcularEdadMeses(){
	  	var hoy = moment().format('YYYY-MM-DD');
		var fnacimiento = moment(this.nacimiento);//moment(this.birthdate, "DD-MM-YYYY").format('YYYY-MM-DD');

	  	var fnacimientof = moment(fnacimiento);
		var hoyf = moment(hoy);

		var meses_diferencia = hoyf.diff(fnacimientof, 'months');
	  	console.log(meses_diferencia);

	  	this.edadMeses = meses_diferencia;
  }
  calculateFUR(){
	  	let te = moment(this.lastRuller).subtract(3, 'months').format('YYYY-MM-DD');
	  	let tes = moment(te).add(7, 'days').format('YYYY-MM-DD');
	  	let tess = moment(te).add(1, 'years').format('YYYY-MM-DD');
		//let time = moment().format('HHmmss');
		//this.dateBirth=tess;
		let hoy = moment().format('YYYY-MM-DD');
		let semanasD = moment(hoy).diff(moment(this.lastRuller), 'weeks')
		this.weeksPregnancy = semanasD;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentStatePage');
    this.menu.swipeEnable(false);
  }

}

