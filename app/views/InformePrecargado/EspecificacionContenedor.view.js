import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
//import TextInput from '../../../components/TextInput/TextInput.component.js';
import SelectDropdown from 'react-native-select-dropdown'
import Select from '../../component/Select/Select.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
import InputSpinner from "react-native-input-spinner";


//import Icon from 'react-native-vector-icons/Feather';
//import Icon2 from 'react-native-vector-icons/Ionicons';

import Icon3 from 'react-native-vector-icons/MaterialIcons';

import SelectorMultimedia from '../../components/SelectorMultimedia/SelectorMultimediaMultiple.component.js';

import SelectorMultimedia1 from '../../components/SelectorMultimedia/SelectorMultimediaGeneral.component.js';

import SelectorDataFrabicacion from '../../components/SelectorMultimedia/EspecificacionContenedor/SelectorDataFrabicacion.component.js';
import SelectorTemperature from '../../components/SelectorMultimedia/EspecificacionContenedor/SelectorTemperature.component.js';
import SelectorPTI from '../../components/SelectorMultimedia/EspecificacionContenedor/SelectorPTI.component.js';
import SelectorMotor from '../../components/SelectorMultimedia/EspecificacionContenedor/SelectorMotor.component.js';
import SelectorVentilacion from '../../components/SelectorMultimedia/EspecificacionContenedor/SelectorVentilacion.component.js';

import SelectorMultimedia2 from '../../components/SelectorMultimedia/SelectorMultimediaLeft.component.js';
import SelectorMultimedia3 from '../../components/SelectorMultimedia/SelectorMultimediaRight.component.js';

import CheckBox from '@react-native-community/checkbox';



import Hint from '../../components/Hint/Hint.component';
import HintAlertas from '../../components/Hint/Hint.component';
import Hint2 from '../../components/Hint/Hint.component';
import HintImagenAmpliada from '../../components/Hint/Hint.component';
import HintPDF from '../../components/Hint/HintPDF.component';

import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import WSRestApi from '../../services/wsRestApi';


export default class EspecificacionContenedor
 extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            
            imagenAmpliada1: "",
            imagenAmpliada2: "",
            imagenAmpliada3: "",

            fontLoaded: false,
            arregloImagenes: [],

            foto_general_contenedor:"",
            foto_pared_izquierda:"",
            foto_pared_derecha:"",


            orden_embarque:'',
            numero_contenedor:'',
            nombre_planta:'',
            fechaSeleccionada:'',
            exportador_seleccionado:'',
            exportadorInicio: {},
            tecladoMostrado:false,
            rawDate: new Date(),

            focoOrden:false,
            
            añorefInicio: {
                label: "2022 ",
                value: "1"
            },
            ano_fabricacion_contenedor:'',
            pti:'',
            preenfriado:0,
            limpio_sin_olor:0,
            buen_estado:0,
            temperatura:0,
            temperatura_entero:0,
            temperatura_decimal:0,
            ventilacion:0,
            confirmacion:0,
            arregloEspecies:'',

        };

        this.exportador = React.createRef();
        
        this.TextInputOrdenEmbarque = React.createRef();
        this.TextInputNumeroContenedor = React.createRef();
        this.Selector1 = React.createRef();
        this.Selector2 = React.createRef();
        this.Selector3 = React.createRef();
        this.Selector4 = React.createRef();
        this.Selector5 = React.createRef();

        this.TextInput2 = React.createRef();
        this.Hint = React.createRef();
        this.Hint2 = React.createRef();
        this.HintImagenAmpliada1 = React.createRef();
        this.HintImagenAmpliada2 = React.createRef();
        this.HintImagenAmpliada3 = React.createRef();
        this.HintAlertas = React.createRef();
        this.HintPDF1 = React.createRef();
        this.HintPDF2 = React.createRef();
        this.HintPDF3 = React.createRef();



    }

    exportador_detalle = async (planta) => {
        try {
          let resultado = await WSRestApi.fnWSExportador( planta);
          //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
          return resultado;
        } catch (error) {
          let resultado = JSON.stringify(error);
          //let resultado = "errorx";
          console.log("ERROR exportador ??? : " + error);
          return resultado;
         // return false
        }
      }


     
    

    componentDidMount = async () => {

        let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;
        let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');


        informeGeneral = this.props.route.params.informeGeneral


        console.log("datox del EspecificacionContenedor USUARIO_ID->"+USUARIO_ID);
        console.log("datox del EspecificacionContenedor PLANTA_ID->"+PLANTA_ID);
        console.log("datox del EspecificacionContenedor embarque->"+embarque);
        console.log("datox del EspecificacionContenedor embarque_planta->"+embarque_planta);
        //console.log("datox del InfoGeneralEmbarque informeGeneral->"+informeGeneral);
        this.setState({informeGeneral:informeGeneral, embarque_id:embarque, embarque_planta_id:embarque_planta});

        this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
       // this.carga_recibidor();
       // this.carga_especies();
       // this.carga_objetosEspecie();

             

    }


    embarque_detalle = async (usuario, planta,embarque, embarque_planta) => {
        try {
          let resultado = await WSRestApi.fnWSDetalleembarque(usuario, planta,embarque, embarque_planta);
          //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
          return resultado;
        } catch (error) {
          let resultado = JSON.stringify(error);
          //let resultado = "errorx";
          console.log("ERROR1??? : " + error);
          return resultado;
         // return false
        }
      }



    carga_datos_embarque = async (usuario, planta, embarque, embarque_planta) =>{

        //   console.log("carga_datos_embarque -->"+PLANTA_NOMBRE);
               let result;
            await this.embarque_detalle(usuario, planta, embarque, embarque_planta).then(function (data) {
               result = data;
             });
   
             if (result.state == true) {
   
               console.log("InfoGeneralEmbarque embarque_detalle resultado:-> "+JSON.stringify(result.data));
   
               console.log("array especies -->" + JSON.stringify(result.data.especies));
               let paso_especie = JSON.stringify(result.data.especies);
   
               console.log("array especies --> paso_especie  "+paso_especie);
               console.log("array especies --> paso_especie  "+result.data.especies.length);
               
   
   
                let MyArray = [];
                let MyArray2 = [];
               
   
   
              
   
                
   
               //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;
               this.setState({ orden_embarque:result.data.orden_embarque,
               numero_contenedor:result.data.numero_contenedor,
               motonave: result.data.motonave,
               recibidor_id: result.data.recibidor_id,
               recibidor_nombre:result.data.recibidor_nombre,
               puerto_carga:result.data.puerto_carga ,
               puerto_destino:result.data.puerto_destino,
               numero_booking:result.data.numero_booking,
               foto_general_contenedor:result.data.foto_general_contenedor,
               foto_pared_izquierda:result.data.foto_pared_izquierda,
               foto_pared_derecha:result.data.foto_pared_derecha,
               exportador_id:result.data.exportador_id,
               exportador_nombre:result.data.exportador_nombre,
              // planta_nombre:PLANTA_NOMBRE,
               fecha_creacion:result.data.pti,
               listado_especies:paso_especie,
               foto_numero_contenedor:result.data.foto_numero_contenedor,
               //recibidor_data:[...this.state.recibidor_data,[MyArray2]]
               });
   
              
   
            //   this.props.navigation.navigate('App')
           }else{
              // this.setState({modalVisible:true})
              console.log("2");
           }
   
   
       }




    onChangeText =(e) =>{
       // console.log("wewe "+e);
        this.setState({orden_embarque:e})
    }

    onChangeTextNumeroContenedor =(e) =>{
        //console.log("wewe "+e);
        this.setState({numero_contenedor:e})
    }



    validarOrdenEmbarque = (item) => {

        let validacion = true;

        let expNumeros = /^[0-9]+$/;
        let expLetras = /^[a-zA-Z\s]+$/;

    //     let orden_embarquex = this.TextInputOrdenEmbarque.current.devolverTexto() == null ? "" : this.TextInputOrdenEmbarque.current.devolverTexto();

    //    console.log("se ha ingresado esta direccion ->", orden_embarquex);

    //     if (orden_embarquex.trim() != "") {
    //         //si ha ingresado una palabra debemos verificar que no ingresen caracteres especiales 
    //         for (let i = 0; i < orden_embarquex.length; i++) {
    //             if (expLetras.test(orden_embarquex.charAt(i)) || expNumeros.test(orden_embarquex.charAt(i))) {
    //                // this.TextInputDireccion.current.msjAlert("");
    //                console.log("aqui 1");
    //             } else {
    //                 //this.TextInputDireccion.current.msjAlert("Ingresa la dirección válida.");
    //                 console.log("aqui 2");
    //                 validacion = false;
    //             }
    //         }
    //     } else if (orden_embarquex.trim() == "") {
    //        // this.TextInputDireccion.current.msjAlert("Ingresa la dirección donde ocurrió el siniestro.");
    //        console.log("aqui 3");
    //         validacion = false;
    //     }
        let datox = JSON.stringify(item)
        console.log("validacion embarque"+datox );
        if (validacion == true) {
            this.setState({ orden_embarque: item });
        } else {
            //this.setState({ direccion: null });
            this.setState({ orden_embarque: orden_embarquex });
        }

        console.log("el resultado de la validacion es : ", validacion);
        return validacion;
    }

    ocultarTeclado = () => {

        if (this.state.tecladoMostrado) {
            console.log("se ha llamado a ocultar teclado");
            Keyboard.dismiss();
            this.setState({ tecladoMostrado: false });
        }

    }

    eliminarFotoSelector1 = (key) => {
        //console.log("KEEEEEY", key)
        this.Selector1.current.setState({ imagenKeyEliminar: key });
        this.Selector1.current.eliminarImagen2(key);
    }

    eliminarFotoSelector2 = (key) => {
        //console.log("KEEEEEY", key)
        this.Selector2.current.setState({ imagenKeyEliminar: key });
        this.Selector2.current.eliminarImagen2(key);
    }

    eliminarFotoSelector3 = (key) => {
        //console.log("KEEEEEY", key)
        this.Selector3.current.setState({ imagenKeyEliminar: key });
        this.Selector3.current.eliminarImagen2(key);
    }


    mostrarImagenAmpliada1 = (imagen, key, extension) => {

        this.setState({ imagenAmpliada1: imagen });

        if(extension == 'pdf'){
            let MyArray = this.Selector1.current.obtenerArregloImagenes();
            let pdfBase64 = "";
            MyArray.forEach(e => {
                if (e.key == key) {
                    pdfBase64 = e.Archivo;
                }
            });
            this.HintPDF1.current.mostrarConParametros5(pdfBase64, key);
        }else{
            this.HintImagenAmpliada1.current.mostrarConParametros2(imagen, key);
        }

    }

    mostrarImagenAmpliada2 = (imagen, key, extension) => {

        this.setState({ imagenAmpliada2: imagen });

        if(extension == 'pdf'){
            let MyArray = this.Selector2.current.obtenerArregloImagenes();
            let pdfBase64 = "";
            MyArray.forEach(e => {
                if (e.key == key) {
                    pdfBase64 = e.Archivo;
                }
            });
            this.HintPDF2.current.mostrarConParametros5(pdfBase64, key);
        }else{
            this.HintImagenAmpliada2.current.mostrarConParametros2(imagen, key);
        }

    }

    mostrarImagenAmpliada3 = (imagen, key, extension) => {

        this.setState({ imagenAmpliada3: imagen });

        if(extension == 'pdf'){
            let MyArray = this.Selector3.current.obtenerArregloImagenes();
            let pdfBase64 = "";
            MyArray.forEach(e => {
                if (e.key == key) {
                    pdfBase64 = e.Archivo;
                }
            });
            this.HintPDF3.current.mostrarConParametros5(pdfBase64, key);
        }else{
            this.HintImagenAmpliada3.current.mostrarConParametros2(imagen, key);
        }

    }

    carga_imagenes = async () => {

        let arregloImagenes1 = this.Selector1.current.obtenerArregloImagenes();
        let arregloImagenes2 = this.Selector2.current.obtenerArregloImagenes();
        let arregloImagenes3 = this.Selector3.current.obtenerArregloImagenes();
        let arregloImagenes4 = this.Selector4.current.obtenerArregloImagenes();
        let arregloImagenes5 = this.Selector5.current.obtenerArregloImagenes();

       // console.log("arreglox1 -->"+ JSON.stringify(arregloImagenes1));
        let jsonImagenes1 = "";

       // console.log("cantidad de imagenes .----> "+arregloImagenes1.length);

        if(arregloImagenes1.length ==0 || arregloImagenes2.length == 0 || arregloImagenes3.length == 0 || arregloImagenes4.length == 0 || arregloImagenes5.length == 0){

            this.HintAlertas.current.mostrarConParametros("Ingresar imagenes");
            return 1;
        }


        for (let i = 0; i < arregloImagenes1.length; i++) {
            let elemento = arregloImagenes1[i];
            //let nombre = arregloImagenes[i].NombreArchivo;
            let nombre = "rem_";
            let numero = i + 1;
            if (i < 10) {
                nombre = nombre + "0" + numero.toString();
            } else {
                nombre = nombre + numero.toString();
            }

            let extension = arregloImagenes1[i].Extension;
            let archivo = arregloImagenes1[i].Archivo;

            //let hash = await this.setJsStringHash(archivo);

            // con parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Hash":"' + hash + '","Archivo":"' + archivo + '"}';
            jsonImagenes1 += '' + archivo + '';

            // sin parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Archivo":"' + archivo + '"}';


            if (i != arregloImagenes1.length - 1) {
                jsonImagenes1 += ',';
            }
        }

        //console.log(jsonImagenes);


        this.setState({ foto_ano_fabricacion: jsonImagenes1 });

        let jsonImagenes2 = "";

        for (let i = 0; i < arregloImagenes2.length; i++) {
            let elemento = arregloImagenes2[i];
            //let nombre = arregloImagenes[i].NombreArchivo;
            let nombre = "rem_";
            let numero = i + 1;
            if (i < 10) {
                nombre = nombre + "0" + numero.toString();
            } else {
                nombre = nombre + numero.toString();
            }

            let extension = arregloImagenes2[i].Extension;
            let archivo = arregloImagenes2[i].Archivo;

            //let hash = await this.setJsStringHash(archivo);

            // con parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Hash":"' + hash + '","Archivo":"' + archivo + '"}';
            jsonImagenes2 += '' + archivo + '';

            // sin parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Archivo":"' + archivo + '"}';


            if (i != arregloImagenes2.length - 1) {
                jsonImagenes2 += ',';
            }
        }

        //console.log(jsonImagenes);


        this.setState({ foto_pti: jsonImagenes2 });


        let jsonImagenes3 = "";

        for (let i = 0; i < arregloImagenes3.length; i++) {
            let elemento = arregloImagenes3[i];
            //let nombre = arregloImagenes[i].NombreArchivo;
            let nombre = "rem_";
            let numero = i + 1;
            if (i < 10) {
                nombre = nombre + "0" + numero.toString();
            } else {
                nombre = nombre + numero.toString();
            }

            let extension = arregloImagenes3[i].Extension;
            let archivo = arregloImagenes3[i].Archivo;

            //let hash = await this.setJsStringHash(archivo);

            // con parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Hash":"' + hash + '","Archivo":"' + archivo + '"}';
            jsonImagenes3 += '' + archivo + '';

            // sin parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Archivo":"' + archivo + '"}';


            if (i != arregloImagenes3.length - 1) {
                jsonImagenes3 += ',';
            }
        }

        //console.log(jsonImagenes);


        this.setState({ foto_grados_celsius: jsonImagenes3 });

        let jsonImagenes4 = "";

        for (let i = 0; i < arregloImagenes4.length; i++) {
            let elemento = arregloImagenes4[i];
            //let nombre = arregloImagenes[i].NombreArchivo;
            let nombre = "rem_";
            let numero = i + 1;
            if (i < 10) {
                nombre = nombre + "0" + numero.toString();
            } else {
                nombre = nombre + numero.toString();
            }

            let extension = arregloImagenes4[i].Extension;
            let archivo = arregloImagenes4[i].Archivo;

            //let hash = await this.setJsStringHash(archivo);

            // con parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Hash":"' + hash + '","Archivo":"' + archivo + '"}';
            jsonImagenes4 += '' + archivo + '';

            // sin parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Archivo":"' + archivo + '"}';


            if (i != arregloImagenes4.length - 1) {
                jsonImagenes4 += ',';
            }
        }

        //console.log(jsonImagenes);


        this.setState({ foto_estado_motor: jsonImagenes4 });


        let jsonImagenes5 = "";

        for (let i = 0; i < arregloImagenes5.length; i++) {
            let elemento = arregloImagenes5[i];
            //let nombre = arregloImagenes[i].NombreArchivo;
            let nombre = "rem_";
            let numero = i + 1;
            if (i < 10) {
                nombre = nombre + "0" + numero.toString();
            } else {
                nombre = nombre + numero.toString();
            }

            let extension = arregloImagenes5[i].Extension;
            let archivo = arregloImagenes5[i].Archivo;

            //let hash = await this.setJsStringHash(archivo);

            // con parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Hash":"' + hash + '","Archivo":"' + archivo + '"}';
            jsonImagenes5 += '' + archivo + '';

            // sin parametro hash
            //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Archivo":"' + archivo + '"}';


            if (i != arregloImagenes5.length - 1) {
                jsonImagenes5 += ',';
            }
        }

        //console.log(jsonImagenes);


        this.setState({ foto_ventilacion: jsonImagenes4 });



        return 0;
    }   

    validarCampos = async () => {
        
        let a = await this.carga_imagenes();

        if(a==1){
            return;
        }

        let valida_orden = this.state.orden_embarque;

        console.log("valida_orden = "+valida_orden);

        if (valida_orden=='' || valida_orden ==undefined || valida_orden==null){
            this.HintAlertas.current.mostrarConParametros("Faltan datos por ingresar*Orden de Embarque");
            //this.TextInputOrdenEmbarque.focus();
            
            //this.setState({focoOrden:true})
            console.log("validarxxx");
            return;
            
        }

        let valida_numero = this.state.numero_contenedor;

        console.log("valida_numero = "+valida_numero);

        if (valida_numero=='' || valida_numero ==undefined || valida_numero==null){
            this.HintAlertas.current.mostrarConParametros("Faltan datos por ingresar*Numero de Contenedor");
            //this.TextInputOrdenEmbarque.focus();
            
            //this.setState({focoOrden:true})
            console.log("validarxxx valida_numero");
            return;
            
        }

        let valida_exportador = this.state.exportador_seleccionado;

        console.log("valida_exportador = "+valida_exportador);

        if (valida_exportador=='' || valida_exportador ==undefined || valida_exportador==null){
            this.HintAlertas.current.mostrarConParametros("Faltan datos por ingresar*Exportador");
            //this.TextInputOrdenEmbarque.focus();
            
            //this.setState({focoOrden:true})
            console.log("validarxxx valida_exportador");
            return;
            
        }
        
        


        

  
        if (1==1) {

            //console.log("Mensaje final para enviar datos  ", this.state.mensajeAprobado, " ", this.state.IdSolicitud);

            this.guarda_embarque();
           // this.setState({ hint: "aprobado" });
            /*
                aca irá el codigo donde subimos los datos al servidor
            */
            //console.log("antes de anviar");
           // console.log("weweweeeeesxx-> "+this.state.arregloImagenes);

           // this.enviarDatosReembolso(numeroPoliza, this.state.grupo, this.state.version, montoReclamado, rutBeneficiario, nombreBeneficiario, jsonImagenes);

            //---prueba
            //AsyncStorage.removeItem("contadorReembolso");
            // this.mostrarModal();





        } else {
            console.log("El monto excede el maximo disponible");
            //this.setState({ hint: "rechazado" });

            //this.Hint2.current.mostrar();
            //Alert.alert("Error en campos", "Debe llenar correctamente todos los campos.")

        }
    }

    
    

    guarda_embarque = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");

        let orden = this.state.orden_embarque;
        let numero = this.state.numero_contenedor;
        let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');
        let fecha = this.state.fechaSeleccionada;
        let expor = this.state.exportador_seleccionado;
        let img1 = this.state.foto_general_contenedor;
        let img2 = this.state.foto_pared_izquierda;
        let img3 = this.state.foto_pared_derecha;

           

            console.log("Orden -->"+orden);
            console.log("numero -->"+numero);
            console.log("USUARIO_ID -->"+USUARIO_ID);
            console.log("PLANTA_ID -->"+PLANTA_ID);
            console.log("fecha -->"+fecha);
            console.log("expor -->"+expor);
            
           // console.log("img1 -->"+img1);
           // console.log("img2 -->"+img2);
           // console.log("img3 -->"+img3);

            try {
                //(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) 
                let resultado = await WSRestApi.fnWSGuardaEmbarque(USUARIO_ID,PLANTA_ID,fecha,orden,numero,expor,img1, img2, img3);
                //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
                console.log("resultadox ->"+JSON.stringify(resultado)) ;

                //this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");

                if(resultado.state==true)
                {   
                    console.log("okkkkkk");
                    let embarque_paso ='"'+ resultado.data.embarque_id + '"'

                    await AsyncStorage.setItem("embarque_id",'"'+ resultado.data.embarque_id+'"');
                    await AsyncStorage.setItem("embarque_planta_id",'"'+ resultado.data.embarque_planta_id+'"');


                    await AsyncStorage.setItem("informeGeneral", "2");
                    await AsyncStorage.setItem("identificacionCarga", "1");
                    await AsyncStorage.setItem("EspecificacionContenedor", "0");
                    await AsyncStorage.setItem("FotosContenedor", "0");
                    await AsyncStorage.setItem("EstibaPallet", "0");
                    await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                    await AsyncStorage.setItem("Observaciones", "0");


                    this.props.navigation.navigate('ConsolidacionCarga', {
                        embarque : resultado.data.embarque_id, 
                        embarque_planta : resultado.data.embarque_planta_id,
                        informeGeneral : "2",
                        identificacionCarga:"1",})


                }else{
                    console.log("sin resultadox");
                    this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");
                }

              } catch (error) {
                let resultado = JSON.stringify(error);
                //let resultado = "errorx";
                console.log("ERROR exportador ??? : " + error);
                return resultado;
               // return false
              }

              
               
    };
    envio_menu = async () => {

        if(this.state.confirmacion==0){
            this.HintAlertas.current.mostrarConParametros("Debe confirmar los datos");
            return;
        }

        this.carga_imagenes();

        //return;
       // this.carga_objetosEspecie();
        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "1");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");

       // console.log("arregloEspeciesx "+ JSON.stringify(this.state.arregloEspecies) );
       // console.info(this.state.arregloEspecies);


        try {

            



            let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;
        
        


            //(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) 
            let resultado = await WSRestApi.fnWSGuardaContenedor(USUARIO_ID,PLANTA_ID,embarque, embarque_planta, '02-06-2022',this.state.ano_fabricacion_contenedor, this.state.pti, this.state.preenfriado, this.state.limpio_sin_olor, this.state.buen_estado, this.state.temperatura, this.state.ventilacion, this.state.confirmacion, this.state.foto_ano_fabricacion,this.state.foto_pti, this.state.foto_grados_celsius, this.state.foto_estado_motor, this.state.foto_ventilacion);
            //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
            console.log("resultadox ->"+JSON.stringify(resultado)) ;

            if(resultado.state==true)
            {   
                //console.log("okkkkkk");
               // let embarque_paso ='"'+ resultado.data.embarque_id + '"'

                //await AsyncStorage.setItem("embarque_id",'"'+ resultado.data.embarque_id+'"');
                //await AsyncStorage.setItem("embarque_planta_id",'"'+ resultado.data.embarque_planta_id+'"');


                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "1");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


                this.props.navigation.navigate('ConsolidacionCarga', {
                    embarque : resultado.data.embarque_id, 
                    embarque_planta : resultado.data.embarque_planta_id,
                    informeGeneral : "2",
                    identificacionCarga:"2",})


            }else{
                console.log("sin resultadox");
                this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");
            }   




        }catch(e){
            console.warn(e);
        }

        
       // this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
    };
    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                    <View style={{}}>
                    <Icon style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:10, color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>Container's specification</Text><Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Container's fabrication year</Text> 
                            <View style={{width:'80%', marginLeft:'9%'}}>
                            <Select  
                            ref={this.añoref}
                            label={this.state.añorefInicio.label}
                            value={this.state.añorefInicio.value}
                            datos={[
                            { label: '2021', value: '2021' },
                            { label: '2020', value: '2020' },
                            { label: '2019', value: '2019' },
                            ]}
                            xfuncion={async (x) => {
                                //this.setState({ keyC: 0, comunaDeChile: [] })
                                //await this.guardarSoloRegion(x);
                                console.log("usuariox => ", x);
                                this.setState({ano_fabricacion_contenedor:x});
                                //this.mostrarMontoMax(x);

                            }}
                            
                            
                            
                            />
                            </View>

                            

                         
                                

                                <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                    <SelectorDataFrabicacion 
                                    ref={this.Selector1}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                    />
                                    </View>
                                </View>



                        <View> 
                        <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>PTI</Text> 
                            <View>
                                
                                <DatePicker
                                style={{ width: "80%",marginLeft:'10%', marginTop:10, fontWeight:'bold' }}
                                date={this.state.fechaSeleccionada}
                                mode="date"
                                showIcon={true}
                                //placeholder={this.state.fechaActual}
                                format="YYYY-MM-DD"
                                // minDate={this.state.fechaMinima}
                                //maxDate={this.state.fechaMaxima}
                                confirmBtnText="Confirmar"
                                cancelBtnText="Cancelar"
                                // customStyles={{
                                //     dateInput: { ...styles.inputFechaHora, backgroundColor: "#E6E6E6" }
                                // }
                                // }
                                onDateChange={(date) => { this.setState({ pti: date }) }}
                                /> 
                            </View>

                            {/* <View>
                                    <View style={{marginLeft:'10%'}}>
                                    <SelectorPTI
                                    ref={this.Selector2}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                    />
                                    </View>
                                </View> */}

                                <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                    <SelectorPTI
                                    ref={this.Selector2}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                    />
                                    </View>
                                </View>



                        
                            <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20}} >
                                            <CheckBox
                                            value={this.state.checked1}
                                            boxType={'square'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                                checked1: value,
                                                preenfriado:  opcion
                                            })}
                                            }
                                            />
                                            <Text style={{marginTop:5}}>Pre-cooler container</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20}} >
                                            <CheckBox
                                            value={this.state.checked2}
                                            boxType={'square'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                                checked2: value,
                                                limpio_sin_olor:  opcion
                                            })}
                                            }
                                            />
                                            <Text style={{marginTop:5}}>Clean and without odours</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20}} >
                                            <CheckBox
                                            value={this.state.checked3}
                                            boxType={'square'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                                checked3: value,
                                                buen_estado:  opcion
                                            })}
                                            }
                                            />
                                            <Text style={{marginTop:5}}>Container in good condition</Text>
                            </View>


                            <Text style={{marginLeft:40, marginTop:40, fontWeight:'bold'}}>Temperature settings (Celcius)</Text> 
                            <View style={{flexDirection:'row',paddingTop:10, borderWidth:1, width:'75%', height:70, marginLeft:40, borderColor:'#D3D3D3'}}>
                               <View style={{flex:1}}>
                               <InputSpinner
                                    max={100}
                                    min={-100}
                                    step={0.01}
                                    type={"real"}
                                    accelerationDelay={1000}
                                    longStep={1}
                                    precision={2}
                                    speed={1}
                                    style={{width:'80%', marginLeft:'10%'}}
                                    color={"#F4891F"}
                                    colorMax={"red"}
                                    colorMin={"blue"}
                                    height={40}
                                    size={20}
                                    value={this.state.number}
                                    onChange={(num) => {
                                    console.log(num);
                                    this.setState({temperatura:num})
                                    
                                    }}
                                    />
                              
                               
                                   </View> 
                            </View>
                          
                            <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                    <SelectorTemperature
                                    ref={this.Selector3}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                    />
                                    </View>
                                </View>

                                <Text style={{marginLeft:'10%', marginTop:20, fontWeight:'bold'}}>Motor condition (condenser)</Text> 
                                <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                    <SelectorMotor
                                    ref={this.Selector4}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                    />
                                    </View>
                                </View>

                                <Text style={{marginLeft:40, marginTop:40, fontWeight:'bold'}}>Ventilation settings (CBM)</Text> 
                            <View style={{flexDirection:'row',paddingTop:10, borderWidth:1, width:'75%', height:70, marginLeft:40, borderColor:'#D3D3D3'}}>
                               <View style={{flex:1}}>
                               <InputSpinner
                                    max={100}
                                    min={-100}
                                    step={0.01}
                                    height={40}
                                    type={"real"}
                                    accelerationDelay={1000}
                                    longStep={1}
                                    precision={2}
                                    speed={1}
                                    style={{width:'80%', marginLeft:'10%'}}
                                    color={"#F4891F"}
                                    colorMax={"red"}
                                    colorMin={"blue"}
                                    size={20}
                                    value={this.state.number}
                                    onChange={(num) => {
                                    console.log(num);
                                    this.setState({ventilacion:num})
                                    
                                    }}
                                    />
                              
                               
                                   </View> 
                            </View>

                            <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                    <SelectorVentilacion
                                    ref={this.Selector5}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                    />
                                    </View>
                                </View>

                                                               
                                <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20, width:'60%'}} >
                                            <CheckBox
                                            value={this.state.checked4}
                                            boxType={'square'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                                checked4: value,
                                                confirmacion:  opcion
                                            })}
                                            }
                                            />
                                            <Text style={{marginTop:5, color:'#F4891F', fontWeight:'bold'}}>I confirm that the temperature and ventilation information is correct</Text>
                            </View>

                            <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, paddingBottom:20}}>
                <TouchableHighlight style={{with:10}}
                        title="Press me"
                         onPress={() => this.envio_menu()}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Next</Text>
                            </TouchableHighlight>
                    </View>

                                <HintAlertas
                                    title={this.state.tituloHintAlerta}
                                    ref={this.HintAlertas}
                                ></HintAlertas>

                                
                                
                                <HintPDF
                                    title={this.state.tituloHintAlerta}
                                    ref={this.HintPDF1}
                                    eliminarFotoSelector={(key) => this.eliminarFotoSelector1(key)}
                                ></HintPDF>
                               
                        </View>
                                
                        
                                
                                
                            
                                </ScrollView>
                            </View>                           
               
                
                
               
                <View style={{ flex: 0.02, backgroundColor: 'steelblue' }} >
                    
                    <Footer
                    Imagen={this.state.Imagen}></Footer>
                </View>

          </View>
        );
    }



}
const styles = StyleSheet.create({
    input: {
      marginLeft:30,
      height: 40,
      width:'85%',
      opacity:.5,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
    },
  });