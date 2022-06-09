import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback, TouchableOpacity, Modal} from 'react-native';
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


import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

//import Icon from 'react-native-vector-icons/Feather';
//import Icon2 from 'react-native-vector-icons/Ionicons';

import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

import SelectorMultimedia from '../../components/SelectorMultimedia/SelectorMultimediaMultiple.component.js';

import SelectorMultimedia1 from '../../components/SelectorMultimedia/SelectorMultimediaGeneral.component.js';

import SelectorNumeroPallet from '../../components/SelectorMultimedia/PalletsDetail/SelectorNumeroPallet.component.js';
import SelectorTermografo from '../../components/SelectorMultimedia/PalletsDetail/SelectorTermografo.component.js';


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
import { Module } from 'module';


export default class EstibaPalletAgregar
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
            modalVisible:false,
            modalVisible2:false,

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

            ano_fabricacion_contenedor:'2020',
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
            checked2:true,
            checked3:false,
            checked4:true,
            especie_data: {},

                    usuario_id:"",
                    embarque_id:"", 
                    planta_id:"",
                    embarque_planta_id: "",
                    pallet_id:"",
                    especie_id:"",
                    fecha: "2022-05-17 11:11:11",
                    numero_pallet:"",
                    ubicacion :"",
                    posicion:false,
                    temperatura:"0",
                    tiene_termografo:"0",
                    codigo_termografo:"",
                    georeferenciado: "0",
                    termografo_tipo_id:"0",
                    foto_numero_pallet:'',
                    foto_termografo:'',
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

        let id_pallet = this.props.route.params.id_pallet;
        let id_especie = this.props.route.params.id_especie;

        let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');


        informeGeneral = this.props.route.params.informeGeneral


        console.log("datox del EstibaPalletAgregar USUARIO_ID->"+USUARIO_ID);
        console.log("datox del EstibaPalletAgregar PLANTA_ID->"+PLANTA_ID);
        console.log("datox del EstibaPalletAgregar embarque->"+embarque);
        console.log("datox del EstibaPalletAgregar embarque_planta->"+embarque_planta);
        //console.log("datox del InfoGeneralEmbarque informeGeneral->"+informeGeneral);
        this.setState({informeGeneral:informeGeneral, embarque_id:embarque, embarque_planta_id:embarque_planta,
        pallet_id:id_pallet, especie_id:id_especie});

        this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
       // this.carga_recibidor();
        this.carga_especies();
       // this.carga_objetosEspecie();

             

    }
    onSuccess = e => {
        console.log(e);
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
            this.setState({numero_pallet:e.data})
            this.setModalVisible(!this.state.modalVisible)
      };

      onSuccess2 = e => {
        console.log(e);
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
            this.setState({codigo_termografo:e.data})
            this.setModalVisible2(!this.state.modalVisible2)
      };


    carga_especies = async () =>{

       
       
       

       
        let especies_datos;
        await this.especies_detalle().then(function (data) {
           especies_datos = data;
         });

         if (especies_datos.state == true) {

            console.log("IdentificacionCarga especies_detalle resultado:-> "+JSON.stringify(especies_datos.data));
            //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;

            let MyArray = [];
            let MyArray2 = [];
            let datos = especies_datos.data;
            datos.forEach((elem) => {

                    let data = {
                        value: elem.id,
                        label: elem.name ,
                        selected: '',
                        //isSelect: elem.isSelect,
                        //selectedClass: elem.selectedClass
                    }



                    let data2 ={
                         key :elem.id,
                     label: elem.nombre ,
                     value: elem.id,
                     }



                    MyArray.push(data);
                 //  MyArray2.push(elem.name +" "+ elem.last_name);
                   MyArray2.push(data2);


            });

            console.log("matriz especie_data "+JSON.stringify(MyArray2));

            this.setState({especie_data:MyArray2 });
              console.log("data especie:"+this.state.especie_data);



       }else{
          // this.setState({modalVisible:true})
          console.log("2");
       }


    }

    especies_detalle = async () => {
        try {
          let resultado = await WSRestApi.fnWSEspecie();
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


    //   componentDidUpdate(prevProps, prevState) {
    //     console.log('Ejecutando componentDidUpdate. Anteriores propiedades y estado: ', prevProps, prevState)    
    //   }

    shouldComponentUpdate = async(nextProps, nextState) =>{
          console.log('Ejecutando shouldComponentUpdate 1: ', nextProps )
         console.log('Ejecutando shouldComponentUpdate 2: ', nextState )

        console.log("nextState.pallet_id ",nextState.pallet_id);
        console.log("nextProps.route.params.id_pallet_siguiente ",nextProps.route.params.id_pallet_siguiente);
        console.log("nextState.especie_id ",nextState.especie_id);
        console.log("nextProps.route.params.id_especie_siguiente ",nextProps.route.params.id_especie_siguiente);
        console.log("nextProps.route.params.actualiza ",nextProps.route.params.actualiza);
        

        

         try{
          if(nextState.pallet_id != nextProps.route.params.id_pallet_siguiente && 
            nextProps.route.params.actualiza==true){
            
            let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
            let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');
           // this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, nextProps.route.params.embarque, nextProps.route.params.embarque_planta);

            this.setState({pallet_id:nextProps.route.params.id_pallet_siguiente,  especie_id:nextProps.route.params.id_especie_siguiente  }); 
            
             console.log("hay que actualizar 1",nextProps);
             console.log("hay que actualizar 2",nextState);
          //return true;
          //this.props.navigation.navigate('DenunciaSiniestro', {ir:"Accidente2"});
          
                if(nextProps.route.params.nuevo==true){
                    this.setState({
                        
                        numero_pallet:"",
                        ubicacion :"",
                        posicion:false,
                        temperatura:"0",
                        tiene_termografo:"0",
                        codigo_termografo:"",
                        georeferenciado: "0",
                        termografo_tipo_id:"0",
                        foto_numero_pallet:'',
                        foto_termografo:'',
                    })
                }
             
          }
         }catch(e){
          console.log("error accidente  "+e);
         };
          
          return false
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
               //temperatura: result.data.temperatura,
               foto_temperatura: result.data.foto_temperatura,
               foto_estado_motor: result.data.foto_estado_motor,
               ventilacion: result.data.ventilacion,
               foto_ventilacion: result.data.foto_ventilacion,
               confirmacion: result.data.confirmacion,
              // checked1: result.data.pre_enfriado ==0 ? false : true,
              // checked2: result.data.limpio_sin_olor ==0 ? false : true,
              // checked3: result.data.buen_estado ==0 ? false : true,
               //checked4: result.data.confirmacion ==0 ? false : true,


               //recibidor_data:[...this.state.recibidor_data,[MyArray2]]
               });
   
               //let MyArray = [];
                let MyArray22 = [];
               
               let contador_pallet_vacios = 0;
               let contador_pallet_ok = 0;
               let id_pallet_siguiente = 0;
               let id_especie_siguiente = 0;
   
               result.data.pallets.forEach((a) =>{
                //   console.log("el datox es"+ JSON.stringify(a))
   
                   if (a.pallet_numero_pallet==null){
                       contador_pallet_vacios = contador_pallet_vacios + 1;
                       id_pallet_siguiente = a.pallet_id;
                       id_especie_siguiente = a.pallet_especie.especie_id;
                      
   
                   }else{
                       contador_pallet_ok = contador_pallet_ok +1;

                       let objetoPallet = {
                        key: a.pallet_id,
                        //value: "Especie 1",
                       // value: item.id,
                       pallet_numero_pallet : a.pallet_numero_pallet,
                       pallet_ubicacion: a.pallet_ubicacion,
                       pallet_posicion: a.pallet_posicion,
                       pallet_temperatura: a.pallet_temperatura,
                       pallet_termografo_tipo_id: a.pallet_termografo_tipo_id,
                       //pallet_ubicacion: a.pallet_ubicacion
                    }
    
                   MyArray22.push(objetoPallet);


                   }
   
                   
                   //this.setState({ arregloEspecies: [...this.state.arregloEspecies, objetoEspecie] });
                 //  this.setState({ indexInicial: this.state.indexInicial + 1 });
   
                 //  this.setState({ suma_pallet: this.state.suma_pallet + a.especie_cantidad_pallets });
                  // this.setState({ suma_box: this.state.suma_box + a.especie_cantidad_cajas });
   
                  // this.setState({ precarga:true, creado_web:result.data.creado_web});
   
   
                   
   
                } );
                console.info(MyArray22);
                this.setState({data_pallet_cargados:MyArray22})
   
                   console.log("cantidad de pallet "+result.data.pallets.length);
                   console.log("cantidad de pallet ok "+contador_pallet_ok);
                   console.log("cantidad de pallet vacios "+contador_pallet_vacios);
                   console.log("ID siguiente pallet "+id_pallet_siguiente);
                   console.log("ID siguiente especie "+id_especie_siguiente);
                   //console.log("ID siguiente especie "+);
                
                
                   this.setState({pallet_id:id_pallet_siguiente,
                       especie_id:id_especie_siguiente,
                       tipo_nombre:result.data.tipo_nombre,
                    total_pallet:result.data.pallets.length,
                total_pallet_ok:contador_pallet_ok,
            total_pallet_faltantes:contador_pallet_vacios})



              
   
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

 

    carga_imagenes = async () => {

        let arregloImagenes1 = this.Selector1.current.obtenerArregloImagenes();
        let arregloImagenes2 = this.Selector2.current.obtenerArregloImagenes();
        //let arregloImagenes3 = this.Selector3.current.obtenerArregloImagenes();
       // let arregloImagenes4 = this.Selector4.current.obtenerArregloImagenes();
       // let arregloImagenes5 = this.Selector5.current.obtenerArregloImagenes();

        console.log("arreglox1xxxxx -->"+ JSON.stringify(arregloImagenes1));
        let jsonImagenes1 = "";

        console.log("cantidad de imagenes .1----> "+arregloImagenes1.length);
        console.log("cantidad de imagenes .2----> "+arregloImagenes2.length);

        // if(arregloImagenes1.length ==0 ){

        //     this.HintAlertas.current.mostrarConParametros("Ingresar imagenes");
        //     return 1;
        // }


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

        console.log("jjjjj ",jsonImagenes1);


        this.setState({ foto_numero_pallet: jsonImagenes1=='' ? '0': jsonImagenes1});

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

        console.log("jjjjj ",jsonImagenes2);
        this.setState({ foto_termografo: jsonImagenes2=='' ? '0': jsonImagenes2});



        return 0;
    }   

    
    carga_termografo = async () =>{

        let especies_datos;
        await this.termografo_detalle().then(function (data) {
           especies_datos = data;
         });

         if (especies_datos.state == true) {

            console.log("IdentificacionCarga especies_detalle resultado:-> "+JSON.stringify(especies_datos.data));
            //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;

           // let MyArray = [];
            let MyArray2 = [];
            let datos = especies_datos.data;
            datos.forEach((elem) => {

                    

                    let data2 ={
                         key :elem.id,
                     label: elem.manufacturer ,
                     value: elem.id,
                     }

                    //MyArray.push(data);
                 //  MyArray2.push(elem.name +" "+ elem.last_name);
                   MyArray2.push(data2);


            });

            console.log("matriz especie_data "+JSON.stringify(MyArray2));

            this.setState({termografo_data:MyArray2 });
          //    console.log("data especie:"+this.state.especie_data);



       }else{
          // this.setState({modalVisible:true})
          console.log("2");
       }


    }
    
    UNSAFE_shouldComponentUpdate(nextProps, nextState) {
        console.log('UNSAFE_shouldComponentUpdate estribapalletagregar  nextProps ', nextProps)
        console.log('UNSAFE_shouldComponentUpdate estribapalletagregar nextState', nextState)
       // this.recibirDatos()

       try {
        const { route } = this.props;

       
        
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        //  const responseJson = navigation.getParam("EstadoProceso");
         const responseJson2 = route.params["EstadoProceso"];

         
        // console.log("data -->"+JSON.stringify(datacarga));

            // var jsonString = JSON.stringify(this.state.EstadoProceso);
            // console.log("estados -..>"+jsonString);
            // console.log("estados -..>"+JSON.stringify(responseJson2));
            // this.setState({informeGeneral :responseJson2.informeGeneral, 
            // identificacionCarga:responseJson2.identificacionCarga,
            // EspecificacionContenedor:responseJson2.EspecificacionContenedor,
            // FotosContenedor:responseJson2.FotosContenedor,
            // EstibaPallet:responseJson2.EstibaPallet,
            // FotosConsolidacionCarga:responseJson2.FotosConsolidacionCarga,
            // Observaciones:responseJson2.Observaciones,
            // })
        //return nextState.count != this.state.count;
        return true
        // this.recibirDatos()

    }
    catch(error){
        console.log(error);
    }


      }

      setModalVisible = async (visible) => {
        this.setState({ modalVisible: visible});
    }  

    setModalVisible2 = async (visible) => {
        this.setState({ modalVisible2: visible});
    } 


    
    envio_menu = async () => {

        if(this.state.numero_pallet==""){
            this.HintAlertas.current.mostrarConParametros("Debe Ingresar un numero de pallet");
            return;
        }

        if(this.state.ubicacion==""){
            this.HintAlertas.current.mostrarConParametros("Debe ingresar una ubicacion");
            return;
        }

        

        this.carga_imagenes()

        // if (this.carga_imagenes() !=0){
        //     this.HintAlertas.current.mostrarConParametros("error en las imagenes");
        //     return;
        // }

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
            let resultado = await WSRestApi.fnWSGuardaPallet(USUARIO_ID,PLANTA_ID,embarque, embarque_planta,this.state.pallet_id, this.state.especie_id, this.state.numero_pallet, this.state.ubicacion, this.state.posicion, this.state.temperatura, this.state.tiene_termografo, this.state.codigo_termografo,this.state.georeferenciado,this.state.termografo_tipo_id, this.state.foto_numero_pallet, this.state.foto_termografo );
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
                await AsyncStorage.setItem("FotosContenedor", "2");
                await AsyncStorage.setItem("EstibaPallet", "1");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


                this.props.navigation.navigate('EstibaPalletLista', {
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

               
                    <Text style={{flex:1,marginLeft:10, color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>Pallet's details</Text><Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'row'}} >
                <ScrollView>
                            <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Pallet N°</Text> 
                            <View style={{width:'70%', marginLeft:'0%', flexDirection:'row'}}>

                                <TextInput
                                style={styles.input}
                                selectTextOnFocus={true}
                                onChangeText={(valor) => this.setState({numero_pallet:valor})}
                                keyboardType={'numeric'}
                                value={this.state.numero_pallet}
                                />
                               <TouchableWithoutFeedback onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                    <View style={{marginTop:15}}>
                    <Icon3  name="barcode-scan" size={30} color="#F4891F" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                    
                    
                            </View>
                            <Modal animationType="fade"
                    presentationStyle="overFullScreen"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                        //Alert.alert('Modal has been closed.');
                    }}>
                            <View style={{width:'80%', height:100}}>
                        <QRCodeScanner style={{width:'80%', height:100}}
                    onRead={this.onSuccess}
                    // flashMode={RNCamera.Constants.FlashMode.torch}
                    topContent={
                    <Text style={styles.centerText}>
                    Go to{' '}
                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                    your computer and scan the QR code.
                    </Text>
                    }
                    bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                    }
                    />
                        </View>
                            </Modal>
                        

                            
                            <View> 
                                     <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                     <SelectorNumeroPallet
                                     ref={this.Selector1}
                                     mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                     ocultarTeclado={() => this.ocultarTeclado()}
                                     />
                                     </View>
                               

                            </View>

                                <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Location</Text> 
                            <View style={{width:'90%', marginLeft:'0%'}}>

                                <TextInput
                                style={styles.input}
                                selectTextOnFocus={true}
                                onChangeText={(valor) => this.setState({ubicacion:valor})}

                                value={this.state.ubicacion}
                                />

                            </View>


                        <View> 
                        <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Position</Text> 
                           
                            <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20}} >
                            
                                <CheckBox
                                            value={this.state.posicion}
                                            boxType={'square'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                                posicion: value,
                                                preenfriado:  opcion
                                            })}
                                            }
                                            />
                                            
                                            <Text style={{marginTop:5}}>Front</Text>
                            
                                            <CheckBox
                                            value={!this.state.posicion}
                                            boxType={'cirule'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                               posicion: !value,
                                               //posicion:  opcion
                                            })
                                        }
                                            }
                                            />
                                            <Text style={{marginTop:5}}>Side</Text>
                            </View>

                            <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Product </Text>               
                            <View style={{width:'80%', marginLeft:'10%'}}>
                                <Select
                                 disabled={true}
                                value={this.state.especie_id}
                                key={this.state.especie_id}
                               //ref={this.especie}
                                datos={this.state.especie_data}
                                xfuncion={async (x) => {
                                    //this.setState({ keyC: 0, comunaDeChile: [] })
                                    //await this.guardarSoloRegion(x);
                                    console.log("usuariox => ", x);
                                    //this.setState({especie_seleccionada:x});
                                   // this.setState({especie_seleccionada_Arreglo:[x]});
                                   // especie_seleccionada_Arreglo
                                    //this.mostrarMontoMax(x);

                                }}
                                /></View>


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
                                    precision={1}
                                    speed={1}
                                    style={{width:'80%', marginLeft:'10%'}}
                                    color={"#F4891F"}
                                    colorMax={"red"}
                                    colorMin={"blue"}
                                    height={40}
                                    size={20}
                                    prepend={(numero)=>{ <Text>{numero}</Text>}}
                                    value={this.state.temperatura}
                                    onChange={(num) => {
                                    console.log(num);
                                    this.setState({temperatura:num})
                                    
                                    }}
                                    />
                              
                               
                                   </View> 
                            </View>
                            <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Temperature device</Text> 
                           
                           <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20}} >
                           
                               <CheckBox
                                           value={this.state.checked1}
                                           boxType={'square'}
                                           animationDuration={0.1}
                                           tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                           onValueChange={(value) =>
                                           {console.log("el valorx es "+value);
                                           let x = !value;
                                           let opcion = value==true ? 1:0;
                                           console.log("el opcion es "+opcion);
                                           this.setState({
                                               checked1: value,
                                               tiene_termografo:  opcion,
                                               checked2:x
                                           })}
                                           }
                                           />
                                           
                                           <Text style={{marginTop:5}}>Yes</Text>
                           
                                           <CheckBox
                                           value={this.state.checked2}
                                           boxType={'cirule'}
                                           animationDuration={0.1}
                                           tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                           onValueChange={(value) =>
                                           {console.log("el valorx es "+value);
                                           let opcion = value==true ? 1:0;
                                           let x = !value;
                                           console.log("el opcion es "+opcion);
                                           this.setState({
                                            checked2: value,
                                            tiene_termografo:  opcion,
                                            checked1:x

                                              
                                           })
                                        }
                                           }
                                           />
                                           <Text style={{marginTop:5}}>No</Text>
                           </View>
                           
                           {this.state.checked1==true ? (
                               <View>
                                   <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Serial N°</Text> 
                            <View style={{width:'70%', marginLeft:'0%', flexDirection:'row'}}>

                                <TextInput
                                style={styles.input}
                                selectTextOnFocus={true}
                                onChangeText={(valor) => this.setState({codigo_termografo:valor})}

                                value={this.state.codigo_termografo}
                                />
                                    <TouchableWithoutFeedback onPress={() => this.setModalVisible2(!this.state.modalVisible)}>
                    <View style={{marginTop:15}}>
                    <Icon3  name="barcode-scan" size={30} color="#F4891F" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                            </View>
                            <Modal animationType="fade"
                    presentationStyle="overFullScreen"
                    transparent={true}
                    visible={this.state.modalVisible2}
                    onRequestClose={() => {
                        this.setModalVisible2(false);
                        //Alert.alert('Modal has been closed.');
                    }}>
                            <View style={{width:'80%', height:100}}>
                        <QRCodeScanner style={{width:'80%', height:100}}
                    onRead={this.onSuccess2}
                    // flashMode={RNCamera.Constants.FlashMode.torch}
                    topContent={
                    <Text style={styles.centerText}>
                    Go to{' '}
                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                    your computer and scan the QR code.
                    </Text>
                    }
                    bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                    }
                    />
                        </View>
                            </Modal> 

                            
                            <View> 
                                     <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                     <SelectorTermografo
                                     ref={this.Selector2}
                                     mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                     ocultarTeclado={() => this.ocultarTeclado()}
                                     />
                                     </View>
                               

                            </View>
                               </View>
                           ):(<View></View>)}
                     
                          
                     <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Real time logger</Text> 
                           
                           <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20}} >
                           
                               <CheckBox
                                           value={this.state.checked3}
                                           boxType={'cirule'}
                                           animationDuration={0.1}
                                           tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                           onValueChange={(value) =>
                                           {console.log("el valorx es "+value);
                                           let x = !value;
                                           let opcion = value==true ? 1:0;
                                           console.log("el opcion es "+opcion);
                                           this.setState({
                                               checked3: value,
                                               preenfriado:  opcion,
                                               checked4:x
                                           })}
                                           }
                                           />
                                           
                                           <Text style={{marginTop:5}}>Yes</Text>
                           
                                           <CheckBox
                                           value={this.state.checked4}
                                           boxType={'cirule'}
                                           animationDuration={0.1}
                                           tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                           onValueChange={(value) =>
                                           {console.log("el valorx es "+value);
                                           let x = !value;
                                           let opcion = value==true ? 1:0;
                                           console.log("el opcion es "+opcion);
                                          // this.setState({
                                           //    checked4: value,
                                           //    posicion:  opcion,
                                           //    checked3:x
                                           //})
                                        }
                                           }
                                           />
                                           <Text style={{marginTop:5}}>No</Text>
                           </View>
                           {this.state.checked3==true ? (
                               <View>
                                   <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>Manufacture</Text> 
                            <View style={{width:'90%', marginLeft:'0%'}}>
                                <View style={{width:'90%', marginLeft:'0%'}}>

                                <TextInput
                                style={styles.input}
                                selectTextOnFocus={true}
                                onChangeText={(valor) => this.setState({termografo_tipo_id:valor})}

                                value={this.state.termografo_tipo_id}
                                />

                                {/* <View style={{width:'80%', marginLeft:'10%'}}>
                                <Select
                                disabled={true}
                                value={this.state.especie_id}
                                key={this.state.especie_id}
                                //ref={this.especie}
                                datos={this.state.especie_data}
                                xfuncion={async (x) => {
                                //this.setState({ keyC: 0, comunaDeChile: [] })
                                //await this.guardarSoloRegion(x);
                                console.log("usuariox => ", x);
                                //this.setState({especie_seleccionada:x});
                                // this.setState({especie_seleccionada_Arreglo:[x]});
                                // especie_seleccionada_Arreglo
                                //this.mostrarMontoMax(x);

                                }}
                                /></View> */}



                                </View>


                                    {/* <View style={{width:'80%', marginLeft:'10%'}}>
                                        <Select
                                        // disabled={true}
                                        value={this.state.especie_id}
                                        key={this.state.especie_id}
                                    //ref={this.especie}
                                        datos={this.state.especie_data}
                                        xfuncion={async (x) => {
                                            //this.setState({ keyC: 0, comunaDeChile: [] })
                                            //await this.guardarSoloRegion(x);
                                            console.log("usuariox => ", x);
                                            //this.setState({especie_seleccionada:x});
                                        // this.setState({especie_seleccionada_Arreglo:[x]});
                                        // especie_seleccionada_Arreglo
                                            //this.mostrarMontoMax(x);

                                        }}
                                        /></View> */}

                            </View>

                            
                            {/* <View> 
                                     <View style={{marginLeft:'0%', flexDirection:'column', alignItems:'center'}}>
                                     <SelectorTermografo
                                     ref={this.Selector1}
                                     mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                     ocultarTeclado={() => this.ocultarTeclado()}
                                     />
                                     </View>
                               

                            </View> */}
                               </View>
                           ):(<View></View>)}                             
                                

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
      width:'90%',
      opacity:.5,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
    },
  });