import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback, Modal} from 'react-native';
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
import DatePicker2 from 'react-native-modern-datepicker';

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

import Loading from '../../components/Loading/Loading.component';

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

            ano_fabricacion : '',
            foto_ano_fabricacion: '',
               //pti: result.data.pti,
               foto_pti: '',
               pre_enfriado: 0,
              // limpio_sin_olor: result.data.limpio_sin_olor,
               //buen_estado: result.data.buen_estado,
              // temperatura: result.data.temperatura,
               foto_temperatura: '',
               foto_estado_motor: '',
               //ventilacion: result.data.ventilacion,
               foto_ventilacion: '',
               foto_grados_celsius:'1',
               //confirmacion: result.data.confirmacion,

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
            checked1:false,
            checked2:false,
            checked3:false,
            checked4:false,
            selectedDate:'',
            modalVisible:false,

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

        this.Loading = React.createRef();

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


      setModalVisible = async (visible, texto) => {
        this.setState({ modalVisible: visible, texto_busqueda:texto });
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
               ano_fabricacion : result.data.ano_fabricacion,
               foto_ano_fabricacion: result.data.foto_ano_fabricacion,
               pti: result.data.pti,
               foto_pti: result.data.foto_pti,
               pre_enfriado: result.data.pre_enfriado,
               limpio_sin_olor: result.data.limpio_sin_olor,
               buen_estado: result.data.buen_estado,
               temperatura: result.data.temperatura,
               foto_temperatura: result.data.foto_temperatura,
               foto_estado_motor: result.data.foto_estado_motor,
               ventilacion: result.data.ventilacion,
               foto_ventilacion: result.data.foto_ventilacion,
               confirmacion: result.data.confirmacion,
               checked1: result.data.pre_enfriado ==0 ? false : true,
               checked2: result.data.limpio_sin_olor ==0 ? false : true,
               checked3: result.data.buen_estado ==0 ? false : true,
               checked4: result.data.confirmacion ==0 ? false : true,


               //recibidor_data:[...this.state.recibidor_data,[MyArray2]]
               });
   
               console.log("este es el puto año :",this.state.ano_fabricacion);
   
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

        
        

        if (this.state.foto_ano_fabricacion==1) {

            this.setState({ ano_fabricacion: 1 });
            
        } else {

            

            let jsonImagenes1 = "";
            let arregloImagenes1 = this.Selector1.current.obtenerArregloImagenes();

            if(arregloImagenes1.length ==0 ){

                this.HintAlertas.current.mostrarConParametros("Ingresar imagenes 1");
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

        }

            if (this.state.foto_pti==1) {
                this.setState({ foto_pti: 1 });
            } else {

                


                let arregloImagenes2 = this.Selector2.current.obtenerArregloImagenes();
                let jsonImagenes2 = "";

                if( arregloImagenes2.length == 0 ){

                    this.HintAlertas.current.mostrarConParametros("Ingresar imagenes 2");
                    return 1;
                }

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
            }
        
        

            if (this.state.foto_temperatura==1) {
                this.setState({ foto_temperatura: 1 });
                
            } else {

               


                let arregloImagenes3 = this.Selector3.current.obtenerArregloImagenes();
                let jsonImagenes3 = "";
                
                if(arregloImagenes3.length == 0 ){

                    this.HintAlertas.current.mostrarConParametros("Ingresar imagenes 3");
                    return 1;
                }
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
        
        
                this.setState({ foto_temperatura: jsonImagenes3 });
            }

            if (this.state.foto_estado_motor==1) {

                this.setState({ foto_estado_motor: 1 }); 
            } else {
                
                
                let arregloImagenes4 = this.Selector4.current.obtenerArregloImagenes();
                
        let jsonImagenes4 = "";

        if(arregloImagenes4.length == 0 ){

            this.HintAlertas.current.mostrarConParametros("Ingresar imagenes 4");
            return 1;
        }

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
            }
        
            if (this.state.foto_ventilacion==1) {
                this.setState({ foto_ventilacion: 1 });  
            } else {

               


                let arregloImagenes5 = this.Selector5.current.obtenerArregloImagenes();

                let jsonImagenes5 = "";
                if(arregloImagenes5.length == 0){

                    this.HintAlertas.current.mostrarConParametros("Ingresar imagenes 5");
                    return 1;
                }

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


        this.setState({ foto_ventilacion: jsonImagenes5 });


            }
        
        

       // console.log("arreglox1 -->"+ JSON.stringify(arregloImagenes1));
       

       // console.log("cantidad de imagenes .----> "+arregloImagenes1.length);

        
      
         



        return 0;
    }   

    
    
    

    
    envio_menu = async () => {

        // if(this.state.confirmacion==0){
        //     this.HintAlertas.current.mostrarConParametros("Debe confirmar los datos");
        //     return;
        // }
        this.Loading.current.mostrar();
       var a =  await this.carga_imagenes();

        console.log("la validacion img es ["+a+"]", a);
        if (a ==1){
            this.HintAlertas.current.mostrarConParametros("Debe Ingresar imagenes");
            this.Loading.current.ocultar();
            return;}
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
            let resultado = await WSRestApi.fnWSGuardaContenedor(USUARIO_ID,PLANTA_ID,embarque, embarque_planta, '02-06-2022',(this.state.ano_fabricacion==null)?(this.state.ano_fabricacion_contenedor):(this.state.ano_fabricacion), this.state.pti, this.state.preenfriado, this.state.limpio_sin_olor, this.state.buen_estado, this.state.temperatura, this.state.ventilacion, this.state.confirmacion, this.state.foto_ano_fabricacion,this.state.foto_pti, this.state.foto_temperatura, this.state.foto_estado_motor, this.state.foto_ventilacion);
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

                this.Loading.current.ocultar();
                this.props.navigation.navigate('ConsolidacionCarga', {
                    embarque : resultado.data.embarque_id, 
                    embarque_planta : resultado.data.embarque_planta_id,
                    informeGeneral : "2",
                    identificacionCarga:"2",})


            }else{
                console.log("sin resultadox");
                this.Loading.current.ocultar();
                this.HintAlertas.current.mostrarConParametros("Error", resultado.message);
            }   




        }catch(e){
            console.warn(e);
            this.Loading.current.ocultar();
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

               
                    <Text style={{flex:1,marginLeft:10, color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>Container's specification</Text>
                    <TouchableWithoutFeedback onPress={() => this.setModalVisible(true)}>
                    <View style={{}}>
                    <Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />
                                        
                    </View> 
  </TouchableWithoutFeedback>

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Container's fabrication year </Text> 
                            <View style={{width:'80%', marginLeft:'9%'}}>

                        


                            {this.state.ano_fabricacion!=''? (
                            //   <View style={{width:'100%',paddingBottom:20,  marginTop:10, marginBottom:10, backgroundColor:'#efeeef', borderWidth:0.5, borderColor:'#E8E8E8'}}>
                            //   <Text style={{marginLeft:20, marginTop:'3%'}}>{this.state.ano_fabricacion}</Text>
                            //   </View>
                            <Select  
                                ref={this.añoref}
                                label={this.state.añorefInicio.label}
                                value={this.state.añorefInicio.value}
                                datos={[
                                    { label: '2024', value: '2024' },
                                    { label: '2023', value: '2023' },
                                    { label: '2021', value: '2021' },
                                    { label: '2020', value: '2020' },
                                    { label: '2019', value: '2019' },
                                    { label: '2018', value: '2018' },
                                    { label: '2017', value: '2017' },
                                    { label: '2016', value: '2016' },
                                    { label: '2015', value: '2015' },
                                    { label: '2014', value: '2014' },
                                    { label: '2013', value: '2013' },
                                    { label: '2012', value: '2012' },
                                    { label: '2011', value: '2011' },
                                    { label: '2010', value: '2010' },
                                    { label: '2009', value: '2009' },
                                    { label: '2008', value: '2008' },
                                    { label: '2007', value: '2007' },
                                    { label: '2006', value: '2006' },
                                    { label: '2005', value: '2005' },
                                    { label: '2004', value: '2004' },
                                    { label: '2003', value: '2003' },
                                    { label: '2002', value: '2002' },
                                    { label: '2001', value: '2001' },
                                    { label: '2000', value: '2000' },
                                    { label: '1999', value: '1999' },
                                    { label: '1997', value: '1997' },
                                    { label: '1998', value: '1998' },
                                    { label: '1996', value: '1996' },
                                    { label: '1995', value: '1995' },
                                    { label: '1994', value: '1994' },
                                    { label: '1993', value: '1993' },
                                    { label: '1992', value: '1992' },
                                    { label: '1991', value: '1991' },
                                    { label: '1991', value: '1991' },
                                    { label: '1990', value: '1990' },

                                ]}
                                xfuncion={async (x) => {
                                    //this.setState({ keyC: 0, comunaDeChile: [] })
                                    //await this.guardarSoloRegion(x);
                                    console.log("usuariox => ", x);
                                    this.setState({ano_fabricacion_contenedor:x});
                                    //this.mostrarMontoMax(x);
    
                                }}
                                />
                            ) :(
                                <Select  
                                ref={this.añoref}
                                label={this.state.ano_fabricacion}
                                value={this.state.ano_fabricacion}
                                datos={[
                                    { label: '2024', value: '2024' },
                                    { label: '2023', value: '2023' },
                                    { label: '2021', value: '2021' },
                                    { label: '2020', value: '2020' },
                                    { label: '2019', value: '2019' },
                                    { label: '2018', value: '2018' },
                                    { label: '2017', value: '2017' },
                                    { label: '2016', value: '2016' },
                                    { label: '2015', value: '2015' },
                                    { label: '2014', value: '2014' },
                                    { label: '2013', value: '2013' },
                                    { label: '2012', value: '2012' },
                                    { label: '2011', value: '2011' },
                                    { label: '2010', value: '2010' },
                                    { label: '2009', value: '2009' },
                                    { label: '2008', value: '2008' },
                                    { label: '2007', value: '2007' },
                                    { label: '2006', value: '2006' },
                                    { label: '2005', value: '2005' },
                                    { label: '2004', value: '2004' },
                                    { label: '2003', value: '2003' },
                                    { label: '2002', value: '2002' },
                                    { label: '2001', value: '2001' },
                                    { label: '2000', value: '2000' },
                                    { label: '1999', value: '1999' },
                                    { label: '1997', value: '1997' },
                                    { label: '1998', value: '1998' },
                                    { label: '1996', value: '1996' },
                                    { label: '1995', value: '1995' },
                                    { label: '1994', value: '1994' },
                                    { label: '1993', value: '1993' },
                                    { label: '1992', value: '1992' },
                                    { label: '1991', value: '1991' },
                                    { label: '1991', value: '1991' },
                                    { label: '1990', value: '1990' },

                                ]}
                                xfuncion={async (x) => {
                                    //this.setState({ keyC: 0, comunaDeChile: [] })
                                    //await this.guardarSoloRegion(x);
                                    console.log("usuariox => ", x);
                                    this.setState({ano_fabricacion_contenedor:x});
                                    //this.mostrarMontoMax(x);
    
                                }}
                                />
                            )}

                            </View>

                            
                            <View>
                         
                                {this.state.foto_ano_fabricacion==1 ?(
                                     <View style={{marginLeft:'10%',paddingTop:10, paddingBottom:10, marginBottom:10, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                                     <View style={{flex:0.5}}>
                                     <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                                     </View>
                                     <View style={{flex:2, marginLeft:10}}>
                                     <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Photo year of manufacture container</Text> 
                                     </View>                        
                                     <View style={{flex:.5}}>
                                     <TouchableHighlight style={{with:10}}
                                           title="Press me"
                                           onPress={() => this.setState({foto_ano_fabricacion:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                               >
             
                                        <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                                 </TouchableHighlight>
                                              
                                     </View>   
                                         
                                     </View>
                                ):(
                                     
                                     <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                     <SelectorDataFrabicacion 
                                     ref={this.Selector1}
                                     mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                     ocultarTeclado={() => this.ocultarTeclado()}
                                     />
                                     </View>
                                 
                                )}

                                </View>



                        <View> 
                        <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>PTI </Text> 
                            <View>
                                {this.state.pti!=null ? (
                                <DatePicker
                                style={{ width: "80%",marginLeft:'10%', marginTop:10, fontWeight:'bold' }}
                                date={this.state.pti}
                                mode="date"
                                
                                showIcon={true}
                                //placeholder={this.state.fechaActual}
                                format="YYYY-MM-DD"
                                //disabled={true}
                                // minDate={this.state.fechaMinima}
                                //maxDate={this.state.fechaMaxima}
                                confirmBtnText="Confirmar"
                                cancelBtnText="Cancelar"
                                // customStyles={{
                                //     dateInput: { ...styles.inputFechaHora, backgroundColor: "#E6E6E6" }
                                // }
                                // }
                                onDateChange={(date) => { this.setState({ pti: date }) }}
                                /> ):(
                                    <DatePicker
                                style={{ width: "80%",marginLeft:'10%', marginTop:10, fontWeight:'bold' }}
                                date={this.state.pti}
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
                                )}
                                
                            </View>
                            
                                <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                    {this.state.foto_pti==1 ?(
                                        <View style={{marginTop:10,paddingTop:10, paddingBottom:10, marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                                        <View style={{flex:0.5}}>
                                        <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                                        </View>
                                        <View style={{flex:2, marginLeft:10}}>
                                        <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Foto PTI</Text> 
                                        </View>                        
                                        <View style={{flex:.5}}>
                                        <TouchableHighlight style={{with:10}}
                                              title="Press me"
                                              onPress={() => this.setState({foto_pti:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                                  >
                
                                           <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                                    </TouchableHighlight>
                                                 
                                        </View>   
                                            
                                        </View>
                                    ):(
                                        <SelectorPTI
                                        ref={this.Selector2}
                                        mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                        ocultarTeclado={() => this.ocultarTeclado()}
                                        />
                                    )}
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
                                    max={24}
                                    min={-24}
                                    step={0.1}
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
                                    value={this.state.temperatura}
                                    onChange={(num) => {
                                    console.log(num);
                                    this.setState({temperatura:num})
                                    
                                    }}
                                    />
                              
                               
                                   </View> 
                            </View>
                          
                            <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                    {this.state.foto_temperatura== 1 ?(
                                        <View style={{marginBottom:20,marginTop:20, paddingTop:10, paddingBottom:10, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                                        <View style={{flex:0.5}}>
                                        <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                                        </View>
                                        <View style={{flex:2, marginLeft:10}}>
                                        <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Reefer T° screen</Text> 
                                        </View>                        
                                        <View style={{flex:.5}}>
                                        <TouchableHighlight style={{with:10}}
                                              title="Press me"
                                              onPress={() => this.setState({foto_temperatura:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                                  >
                
                                           <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                                    </TouchableHighlight>
                                                 
                                        </View>   
                                            
                                        </View>
                                    ):(
                                        <SelectorTemperature
                                        ref={this.Selector3}
                                        mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                        ocultarTeclado={() => this.ocultarTeclado()}
                                        />
                                    )}
                                    </View>
                                </View>

                                <Text style={{marginLeft:'10%', marginTop:20, fontWeight:'bold'}}>Motor condition (condenser)</Text> 
                                <View>
                                    <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                      {this.state.foto_estado_motor==1 ? (
                                          <View style={{marginBottom:20,marginTop:20, paddingTop:10, paddingBottom:10, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                                          <View style={{flex:0.5}}>
                                          <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                                          </View>
                                          <View style={{flex:2, marginLeft:10}}>
                                          <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Motor condition (condenser)</Text> 
                                          </View>                        
                                          <View style={{flex:.5}}>
                                          <TouchableHighlight style={{with:10}}
                                                title="Press me"
                                                onPress={() => this.setState({estacargado:false, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                                    >
                  
                                             <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                                      </TouchableHighlight>
                                                   
                                          </View>   
                                              
                                          </View>
                                      ):(
                                    <SelectorMotor
                                    ref={this.Selector4}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                    />
                                      )}  
                                    
                                    </View>
                                </View>

                                <Text style={{marginLeft:40, marginTop:40, fontWeight:'bold'}}>Ventilation settings (CBM)</Text> 
                            <View style={{flexDirection:'row',paddingTop:10, borderWidth:1, width:'75%', height:70, marginLeft:40, borderColor:'#D3D3D3'}}>
                               <View style={{flex:1}}>
                               <InputSpinner
                                    max={100}
                                    min={0}
                                    step={5}
                                    height={40}
                                    type={"real"}
                                    accelerationDelay={1000}
                                    longStep={1}
                                    precision={2}
                                    speed={1}
                                    style={{width:'80%', marginLeft:'10%'}}
                                    color={"#F4891F"}
                                    colorMax={"red"}
                                    colorMin={"#F4891F"}
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
                                        {this.state.foto_ventilacion==1?(
                                            <View style={{marginBottom:20,marginTop:20, paddingTop:10, paddingBottom:10, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                                            <View style={{flex:0.5}}>
                                            <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                                            </View>
                                            <View style={{flex:2, marginLeft:10}}>
                                            <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Ventilation settings(CBM)</Text> 
                                            </View>                        
                                            <View style={{flex:.5}}>
                                            <TouchableHighlight style={{with:10}}
                                                  title="Press me"
                                                  onPress={() => this.setState({estacargado:false, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                                      >
                    
                                               <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                                        </TouchableHighlight>
                                                     
                                            </View>   
                                                
                                            </View>
                                        ):(
                                        <SelectorVentilacion
                                        ref={this.Selector5}
                                        mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                        ocultarTeclado={() => this.ocultarTeclado()}
                                        />
                                        )}
                                    
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
                               <Loading ref={this.Loading} />
                        </View>
                                
                        
                        <Modal 
                     style={{height:90, width:90}}
                    animationType="fade"
                   // presentationStyle="formSheet"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                        //Alert.alert('Modal has been closed.');
                    }}>
                        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:'80%',height:'20%' ,backgroundColor:'white'}}>
                                    <View style={{ flex: 1 ,alignItems:'center', flexDirection: 'column'}} >
                                   <View style={{flex:1}}>
                                   <Text style={{fontSize:30}}>¿Sign off?</Text>
                                   </View>

                                    <View style={{flex:2, flexDirection:'row'}}>
                                        <View style={{flex:1, alignItems:'center'}}>
                                    <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
                                    <View style={{}}>
                                    <Icon4 style={{marginRight:20}} name="times" size={30} color="red" />

                                    </View> 
                                    </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{flex:1, alignItems:'center'}}>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')}>
                                    <View style={{}}>
                                    <Icon4 style={{marginRight:20}} name="check" size={30} color="green" />

                                    </View> 
                                    </TouchableWithoutFeedback>
                                    </View>
                                    </View>
                                    </View>

                            </View>
                        
                        </View>
                        
                </Modal>
                                
                            
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