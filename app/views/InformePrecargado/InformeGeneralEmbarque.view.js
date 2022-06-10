import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView,TouchableWithoutFeedback, Modal} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'
import Select from '../../component/Select/Select.component.js';


import SelectorMultimedia from '../../components/SelectorMultimedia/SelectorMultimediaMultiple.component.js';

import SelectorMultimedia1 from '../../components/SelectorMultimedia/SelectorMultimediaGeneral.component.js';
import SelectorMultimedia2 from '../../components/SelectorMultimedia/SelectorMultimediaLeft.component.js';
import SelectorMultimedia3 from '../../components/SelectorMultimedia/SelectorMultimediaRight.component.js';

import Loading from '../../components/Loading/Loading.component';

import Hint from '../../components/Hint/Hint.component';
import HintAlertas from '../../components/Hint/Hint.component';
import Hint2 from '../../components/Hint/Hint.component';
import HintImagenAmpliada from '../../components/Hint/Hint.component';
import HintPDF from '../../components/Hint/HintPDF.component';
import Icon4 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Feather';
// import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import WSRestApi from '../../services/wsRestApi';


export default class InfoGeneralEmbarque extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,

            orden_embarque:"",
            numero_contenedor:"",
            foto_general_contenedor:"",
            foto_pared_izquierda:"",
            foto_pared_derecha:"",
            exportador_id:"",
            exportador_nombre:"",
            planta_nombre:"",
            fecha_creacion:"",

            exportadorInicio: {},
            data_embarque :{},

            embarque_planta_id:"",
            embarque_id:"",
            informeGeneral:"",
            modalVisible:false,
        };

        this.exportador = React.createRef();

        this.TextInputOrdenEmbarque = React.createRef();
        this.TextInputNumeroContenedor = React.createRef();
        this.Selector1 = React.createRef();
        this.Selector2 = React.createRef();
        this.Selector3 = React.createRef();

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

componentDidMount = async () => {
let usuario = this.props.route.params.usuario, 
planta = this.props.route.params.planta, 
embarque = this.props.route.params.embarque, 
embarque_planta = this.props.route.params.embarque_planta;
informeGeneral = this.props.route.params.informeGeneral;
let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');

console.log("datox del embarquex->"+embarque);
console.log("datox del embarque_planta->"+embarque_planta);
console.log("datox del informeGeneral->"+informeGeneral);

this.setState({embarque_id:embarque, embarque_planta_id:embarque_planta})

if (usuario == null || usuario == undefined){
  usuario = await AsyncStorage.getItem('USUARIO_ID')
}

if(embarque==null || embarque == undefined){
  embarque = await AsyncStorage.getItem('embarque_id');
  embarque_planta  = await AsyncStorage.getItem('embarque_planta_id');
  

}
  



          console.log("plantaxxxx -->"+PLANTA_NOMBRE);
            let result;
         await this.embarque_detalle(usuario, planta, embarque, embarque_planta).then(function (data) {
            result = data;
          });

          if (result.state == true) {
        
            console.log("InfoGeneralEmbarque embarque_detalle resultadoxx:-> "+JSON.stringify(result.data));
            //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;
            this.setState({ orden_embarque:result.data.orden_embarque,
            numero_contenedor:result.data.numero_contenedor,
            foto_general_contenedor:result.data.foto_general_contenedor,
            foto_pared_izquierda:result.data.foto_pared_izquierda,
            foto_pared_derecha:result.data.foto_pared_derecha,
            exportador_id:result.data.exportador_id,
            exportador_nombre:result.data.exportador_nombre,
            planta_nombre:PLANTA_NOMBRE,
            fecha_creacion:result.data.pti});

         //   this.props.navigation.navigate('App')
        }else{
           // this.setState({modalVisible:true})
           console.log("2");
        }

        let paso_respuesta =  JSON.stringify(result.data)
        console.log("respuestaxxxxsxsxs"+ paso_respuesta );
        this.setState({data_embarque:paso_respuesta});

       // console.log("data del embarque -->"+JSON.stringify(this.State.data_embarque));


       let exportador_data;
       await this.exportador_detalle(planta).then(function (data) {
        exportador_data = data;
        });

        if (exportador_data.state == true) {
      
          console.log("InfoGeneralEmbarque exportador_detalle resultado:-> "+JSON.stringify(exportador_data.data));
          //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;
            
          let MyArray = [];
          let MyArray2 = [];
          let datos = exportador_data.data;
          datos.forEach((elem) => {
             
                  let data = {
                      value: elem.id,
                      label: elem.name ,
                      selected: '',
                      //isSelect: elem.isSelect,
                      //selectedClass: elem.selectedClass
                  }
                  
                  let data2 = {
                      key: elem.id,
                    value: elem.id,
                    label: elem.name ,
                    //selected: '',
                    //isSelect: elem.isSelect,
                    //selectedClass: elem.selectedClass
                }

                  MyArray.push(data);
                  //MyArray2.push(elem.name);
                  MyArray2.push(data2);
              
          });
  
          

          this.setState({exportadorInicio:MyArray2 });
            console.log("data exportador:"+this.state.exportadorInicio);

            
       
      }else{
         // this.setState({modalVisible:true})
         console.log("2");
      }



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
  carga_imagenes = async () => {


    if (this.state.foto_general_contenedor == 1) {

        console.log("wewewe");
        
    } else {
        let arregloImagenes1 = this.Selector1.current.obtenerArregloImagenes();
        let arregloImagenes2 = this.Selector2.current.obtenerArregloImagenes();
       let arregloImagenes3 = this.Selector3.current.obtenerArregloImagenes();
   
      // console.log("arreglox1 -->"+ JSON.stringify(arregloImagenes1));
       let jsonImagenes1 = "";
   
       console.log("cantidad de imagenes .----> "+arregloImagenes1.length);
   
       if(arregloImagenes1.length ==0 || arregloImagenes2.length == 0 || arregloImagenes3.length == 0){
   
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
   
   
       this.setState({ foto_general_contenedor: jsonImagenes1 });
   
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
   
   
       this.setState({ foto_pared_izquierda: jsonImagenes2 });
   
   
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
   
   
       this.setState({ foto_pared_derecha: jsonImagenes3 });
       return 0;
        
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
    let expor = this.state.exportador_id;
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

            this.Loading.current.mostrar();


            //(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) 
            let resultado = await WSRestApi.fnWSGuardaEmbarqueActualiza(USUARIO_ID,PLANTA_ID,fecha,this.state.embarque_id,this.state.embarque_planta_id,numero,expor,img1, img2, img3);
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

                this.Loading.current.ocultar();
                this.props.navigation.navigate('ConsolidacionCarga', {
                    embarque : resultado.data.embarque_id, 
                    embarque_planta : resultado.data.embarque_planta_id,
                    informeGeneral : "2",
                    identificacionCarga:"1",})


            }else{
                this.Loading.current.ocultar();
                console.log("sin resultadox");
                this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");
            }

          } catch (error) {
            this.Loading.current.ocultar();
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

    envio_menu = async () => {

        //this.Loading.current.mostrar();
        console.log("carga menu --> ");
        let a = await this.carga_imagenes();

        if(a==1){
            return;
        }

        this.guarda_embarque();

        return;

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "1");
                await AsyncStorage.setItem("EspecificacionContenedor", "0");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


        console.info(this.state.foto_general_contenedor);
        console.info(this.state.foto_pared_izquierda);
        console.info(this.state.foto_pared_derecha);

        this.props.navigation.navigate('ConsolidacionCarga',{
          usuario: this.state.usuario_id,
          planta: this.state.planta_id,
          embarque: this.state.embarque_id,
          embarque_planta: this.state.embarque_planta_id,
          informeGeneral:"2",
          identificacionCarga:"1"})
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

               
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18, fontWeight:'bold'}}>General shipment information(Preloaded) </Text>
                    
                    {/* <Icon style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" /> */}
                    <TouchableWithoutFeedback onPress={() => this.setModalVisible(true)}>
                    <View style={{}}>
                    <Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            <Text style={{marginLeft:'9%', marginTop:10}}>Stuffing instruction</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value={this.state.orden_embarque}
                                    />
                                <Text style={{marginLeft:'9%', marginTop:10}}>Container N°</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value={this.state.numero_contenedor}
                                    />
                        <View>

                                    
                          <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                             
                          </View>
                          {this.state.foto_general_contenedor == 1 ? (
                          <View style={{ marginLeft:'9%', flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: 5, width:'80%' }}>
                               <View style={{marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'10%', alignContent:'center'}}>
                        <View style={{flex:0.5}}>
                        <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                        </View>
                        <View style={{flex:2, marginLeft:10}}>
                        <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Container general view</Text> 
                        </View>                        
                        <View style={{flex:.5}}>
                        <TouchableHighlight style={{with:10}}
                              title="Press me"
                              onPress={() => this.setState({foto_general_contenedor:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                  >

                           <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                    </TouchableHighlight>
                                 
                        </View>   
                            
                        </View>
                          </View>):(
                          
                          <View style={{marginLeft:'10%'}}>
                              <SelectorMultimedia1 
                                  ref={this.Selector1}
                                  mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                                  ocultarTeclado={() => this.ocultarTeclado()}
                              />
                          </View>)}
                        

                          {this.state.foto_pared_izquierda == 1 ? (
                              <View style={{marginLeft:'9%', flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: 5, width:'80%' }}>
                              <View style={{marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'10%', alignContent:'center'}}>
                       <View style={{flex:0.5}}>
                       <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                       </View>
                       <View style={{flex:2, marginLeft:10}}>
                       <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>External left side wall1</Text> 
                       </View>                        
                       <View style={{flex:.5}}>
                       <TouchableHighlight style={{with:10}}
                             title="Press me"
                             onPress={() => this.setState({foto_pared_izquierda:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                 >

                          <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                   </TouchableHighlight>
                                
                       </View>   
                           
                       </View>
                         </View>
                          ):(
                              <View style={{marginLeft:'10%'}}>
                              <SelectorMultimedia2
                                  ref={this.Selector2}
                                  mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada2(imagen, key, extension)}
                                  ocultarTeclado={() => this.ocultarTeclado()}
                              />
                          </View>
                          )}

                          


                            
                            {this.state.foto_pared_derecha == 1 ? (
                                <View style={{ marginLeft:'9%',flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: 5, width:'80%' }}>
                                <View style={{marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'10%', alignContent:'center'}}>
                         <View style={{flex:0.5}}>
                         <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                         </View>
                         <View style={{flex:2, marginLeft:10}}>
                         <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>External right side wall</Text> 
                         </View>                        
                         <View style={{flex:.5}}>
                         <TouchableHighlight style={{with:10}}
                               title="Press me"
                               onPress={() => this.setState({foto_pared_derecha:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                   >
  
                            <Icon style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                     </TouchableHighlight>
                                  
                         </View>   
                             
                         </View>
                           </View>
                            ) :(
                                <View style={{marginLeft:'10%'}}>
                                <SelectorMultimedia3
                                    ref={this.Selector3}
                                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada3(imagen, key, extension)}
                                    ocultarTeclado={() => this.ocultarTeclado()}
                                />
                            </View>)}
                            

                            <HintImagenAmpliada
                            ref={this.HintImagenAmpliada1}
                            title={""}
                            componente={<Image style={{ height: 200, width: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.imagenAmpliada1}` }} />}
                            eliminarFotoSelector={(key) => this.eliminarFotoSelector1(key)}
                            >
                            </HintImagenAmpliada>

                            <HintImagenAmpliada
                            ref={this.HintImagenAmpliada2}
                            title={""}
                            componente={<Image style={{ height: 200, width: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.imagenAmpliada2}` }} />}
                            eliminarFotoSelector={(key) => this.eliminarFotoSelector2(key)}
                            >
                            </HintImagenAmpliada>

                            <HintImagenAmpliada
                            ref={this.HintImagenAmpliada3}
                            title={""}
                            componente={<Image style={{ height: 200, width: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.imagenAmpliada3}` }} />}
                            eliminarFotoSelector={(key) => this.eliminarFotoSelector3(key)}
                            >
                            </HintImagenAmpliada>



                            <HintAlertas
                            title={this.state.tituloHintAlerta}
                            ref={this.HintAlertas}
                            ></HintAlertas>



                              <HintPDF
                              title={this.state.tituloHintAlerta}
                              ref={this.HintPDF1}
                              eliminarFotoSelector={(key) => this.eliminarFotoSelector1(key)}
                              ></HintPDF>
                              <HintPDF
                              title={this.state.tituloHintAlerta}
                              ref={this.HintPDF2}
                              eliminarFotoSelector={(key) => this.eliminarFotoSelector2(key)}
                              ></HintPDF>
                              <HintPDF
                              title={this.state.tituloHintAlerta}
                              ref={this.HintPDF3}
                              eliminarFotoSelector={(key) => this.eliminarFotoSelector3(key)}
                              ></HintPDF>

                        </View>
                                
                        <View>
                        <Text style={{marginLeft:'10%', marginTop:10}}>Warehouse</Text> 
                        <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>{this.state.planta_nombre.replace(/['"]+/g, '')}</Text> 
                        </View>
                       

                        <Text style={{marginLeft:'10%', marginTop:10}}>Exporter</Text> 
                        <View  style={{backgroundColor:'#efeeef', width:'80%',height:40, marginLeft:'10%'}} >
                            {/* <Select  
                            ref={this.exportador}
                            label={this.state.exportador_nombre}
                            value={this.state.exportador_id}
                            datos={this.state.exportadorInicio}
                            key='1'
                            //   datos={this.state.beneficiarios} 
                            /> */}

                            {/* <SelectDropdown
                            buttonStyle={{color:'red'}}
                            rowTextStyle={{color:'red'}}
                            
                            dropdownStyle={{color:'red'}}
                            style={{fontSize:10}}
                            data={this.state.exportadorInicio}
                            defaultButtonText ={this.state.exportador_nombre}
                           // disabled={true}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            >
                                
                            </SelectDropdown> */}

                    <Text style={{marginLeft:5,fontSize:15, marginTop:10, fontWeight:'bold'}}>{this.state.exportador_nombre}</Text>


                        {/* <Select
                        value={this.state.exportador_id}
                        //label={this.state.exportador_nombre}
                        //ref={this.especie}
                        datos={this.state.exportadorInicio}
                        xfuncion={async (x) => {
                            //this.setState({ keyC: 0, comunaDeChile: [] })
                            //await this.guardarSoloRegion(x);
                            console.log("usuariox => ", x);
                            this.setState({recibidor_id:x});
                           // this.setState({especie_seleccionada_Arreglo:[x]});
                           // especie_seleccionada_Arreglo
                            //this.mostrarMontoMax(x);

                         }}
                        /> */}

                        </View>

                        <View>
                            <Text style={{marginLeft:'10%', marginTop:10}}>Report date</Text> 
                            <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>{this.state.fecha_creacion}</Text> 
                            </View>
                    
                            <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, paddingBottom:20}}>
                <TouchableHighlight style={{with:10}}
                        title="Press me"
                         onPress={() => this.envio_menu()}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Next</Text>
                            </TouchableHighlight>
                    </View>
                            
                                </ScrollView>
                                

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
                            </View>                           
               
                
                
                            <Loading ref={this.Loading} />
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
      width:'80%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
    },
  });