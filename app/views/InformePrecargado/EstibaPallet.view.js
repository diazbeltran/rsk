import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, 
    TouchableWithoutFeedback, SafeAreaView, FlatList,Item, TouchableOpacity,Modal} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon33 from 'react-native-vector-icons/AntDesign';
import Select from '../../component/Select/Select.component.js';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';

import SelectorMultimedia from '../../components/SelectorMultimedia/SelectorMultimediaMultiple.component.js';
import SelectorMultimediaCargo from '../../components/SelectorMultimedia/SelectorCargoDetails.component.js';

import SelectorEspecies from '../../components/SelectorMultimedia/SelectorEspeciesDinamico.component.js';
import HintImagenAmpliada from '../../components/Hint/Hint.component';


import HintAlertas from '../../components/Hint/Hint.component';



import WSRestApi from '../../services/wsRestApi';



export default class EstibaPallet extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,

            recibidorInicio: {
                label: " ",
                value: "0"
            },

            total_pallet:0,
            total_pallet_ok:0,
            id_proximo_pallet:0,
            id_proximo_especie:0,

            embarque_id:'',
            embarque_planta_id:'',

            orden_embarque:'',
            numero_contenedor:'',
            motonave:'',

            recibidor_data: {},
            especie_data: {},
            recibidor_seleccionado:'',
            especie_seleccionada:'',
            data_especies:{},
            arregloEspecies: [],
            indexInicial:0,
            especie_seleccionada_Arreglo:[],
            recibidor_id:'',
            recibidor_nombre:'',
            puerto_carga:'',
            puerto_destino:'',
            numero_booking:'',
            suma_pallet:0,
            suma_box:0,

            texto_paso_box:'',
            texto_paso_producto_id:'',
            texto_paso_pallet:'',
            seteo:0,
            pallet_base:0,
            caja_base:30,
            foto_cargo:"",
            listado_especies:{},

            precarga:false,
            creado_web:'',
            foto_numero_contenedor:'',
            informeGeneral:'',
            modalVisible:false,
            tipo_id:0,
        };
        this.recibidor = React.createRef();
        this.especie = React.createRef();
        this.seteo = React.createRef();
        this.box = React.createRef();
        this.pallet_base = React.createRef();

        this.textInput_box = React.createRef();


        this.TextInputOrdenEmbarque = React.createRef();
        this.TextInputNumeroContenedor = React.createRef();
        this.Selector1 = React.createRef();
        this.SelectorEspecies_data = React.createRef();




        this.Hint = React.createRef();
        this.Hint2 = React.createRef();
        this.HintImagenAmpliada1 = React.createRef();

        this.HintAlertas = React.createRef();
        this.HintPDF1 = React.createRef();




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


        console.log("datox del InfoGeneralEmbarque USUARIO_ID->"+USUARIO_ID);
        console.log("datox del InfoGeneralEmbarque PLANTA_ID->"+PLANTA_ID);
        console.log("datox del InfoGeneralEmbarque embarque->"+embarque);
        console.log("datox del InfoGeneralEmbarque embarque_planta->"+embarque_planta);
        //console.log("datox del InfoGeneralEmbarque informeGeneral->"+informeGeneral);
        this.setState({informeGeneral:informeGeneral, embarque_id:embarque, embarque_planta_id:embarque_planta});

        this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
       // this.carga_recibidor();
       // this.carga_especies();
       // this.carga_objetosEspecie();

       
       

    }

   

    elimina_dato_especie = async (id) => {

            console.log("eliminar dato"+id);
            console.info(this.state.arregloEspecies[id]);
        var a = this.eliminaItem(this.state.arregloEspecies, id);
        console.info(a);
    }

    eliminaItem = (array, item) =>{
        return array.filter((e) => {
            return e !== item;
        });

    }

     removeItem(index) {
          this.setState((arregloEspecies) => ({
            arregloEspecies: [...arregloEspecies.slice(0,index), ...arregloEspecies.slice(index+1)] })) }

   

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

    recibidor_detalle = async () => {
        try {
          let resultado = await WSRestApi.fnWSRecibidor();
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

    carga_recibidor = async () =>{

       // let plantax = await AsyncStorage.getItem('PLANTA_ID');
        //console.log("xxxxxx xxx xxx "+listado_especies);

        let recibidor_datos;
        await this.recibidor_detalle().then(function (data) {
            recibidor_datos = data;
         });

         if (recibidor_datos.state == true) {

            console.log("IdentificacionCarga recibidor_detalle resultado:-> "+JSON.stringify(recibidor_datos.data));
            //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;

            let MyArray = [];
            let MyArray2 = [];
            let datos = recibidor_datos.data;
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

            console.log("matriz recibidor_data "+JSON.stringify(MyArray2));

            this.setState({recibidor_data:MyArray2 });
              console.log("data recibidor:"+this.state.recibidor_data);



       }else{
          // this.setState({modalVisible:true})
          console.log("2");
       }


    }

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



    carga_datos_embarque = async (usuario, planta, embarque, embarque_planta) =>{

     //   console.log("carga_datos_embarque -->"+PLANTA_NOMBRE);
            let result;
         await this.embarque_detalle(usuario, planta, embarque, embarque_planta).then(function (data) {
            result = data;
          });

          if (result.state == true) {

            console.log("Estiba Pallet embarque_detalle resultado:-> "+JSON.stringify(result.data));

            console.log("array especies -->" + JSON.stringify(result.data.especies));
            let paso_pallet = JSON.stringify(result.data.pallets);

            console.log("array pallets --> paso_pallet  "+paso_pallet);
            console.log("array pallets --> paso_especie  "+result.data.pallets.length);

            this.setState({total_pallet:result.data.pallets.length})


             let MyArray = [];
             let MyArray2 = [];
            
            let contador_pallet_vacios = 0;
            let contador_pallet_ok = 0;
            let id_pallet_siguiente = 0;
            let id_especie_siguiente = 0;

            result.data.pallets.forEach((a) =>{
                console.log("el datox es"+ JSON.stringify(a))

                if (a.pallet_numero_pallet==null){
                    contador_pallet_vacios = contador_pallet_vacios + 1;
                    id_pallet_siguiente = a.pallet_id;
                    id_especie_siguiente = a.pallet_especie.especie_id;

                }else{
                    contador_pallet_ok = contador_pallet_ok +1;
                }

                let objetoEspecie = {
                    key: "" + this.state.indexInicial,
                    //value: "Especie 1",
                   // value: item.id,
                    producto_id : a.especie_id,
                    cantidad_pallet: a.especie_cantidad_pallets,
                    cantidad_cajas: a.especie_cantidad_cajas
                }

               //MyArray2.push(objetoEspecie);
                this.setState({ arregloEspecies: [...this.state.arregloEspecies, objetoEspecie] });
              //  this.setState({ indexInicial: this.state.indexInicial + 1 });

              //  this.setState({ suma_pallet: this.state.suma_pallet + a.especie_cantidad_pallets });
               // this.setState({ suma_box: this.state.suma_box + a.especie_cantidad_cajas });

                this.setState({ precarga:true, creado_web:result.data.creado_web});


                

             } );

                console.log("cantidad de pallet "+result.data.pallets.length);
                console.log("cantidad de pallet ok "+contador_pallet_ok);
                console.log("cantidad de pallet vacios "+contador_pallet_vacios);
                console.log("ID siguiente pallet "+id_pallet_siguiente);
                console.log("ID siguiente especie "+id_especie_siguiente);
                //console.log("ID siguiente especie "+);


                this.setState({id_proximo_pallet:id_pallet_siguiente,
                    id_proximo_especie:id_especie_siguiente,tipo_nombre:result.data.tipo_nombre,
                total_pallet_ok:contador_pallet_ok               })
                    

                this.setState({tipo_id:result.data.tipo_id})
            
        //     //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;
        //     this.setState({ orden_embarque:result.data.orden_embarque,
        //     numero_contenedor:result.data.numero_contenedor,
        //     motonave: result.data.motonave,
        //     recibidor_id: result.data.recibidor_id,
        //     recibidor_nombre:result.data.recibidor_nombre,
        //     puerto_carga:result.data.puerto_carga ,
        //     puerto_destino:result.data.puerto_destino,
        //     numero_booking:result.data.numero_booking,
        //     foto_general_contenedor:result.data.foto_general_contenedor,
        //     foto_pared_izquierda:result.data.foto_pared_izquierda,
        //     foto_pared_derecha:result.data.foto_pared_derecha,
        //     exportador_id:result.data.exportador_id,
        //     exportador_nombre:result.data.exportador_nombre,
        //    // planta_nombre:PLANTA_NOMBRE,
        //     fecha_creacion:result.data.pti,
        //     listado_especies:paso_especie,
        //     foto_numero_contenedor:result.data.foto_numero_contenedor,
        //     //recibidor_data:[...this.state.recibidor_data,[MyArray2]]
        //     });

           

         //   this.props.navigation.navigate('App')
        }else{
           // this.setState({modalVisible:true})
           console.log("2");
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





    

    

    carga_imagenes = async () =>{

        if(this.state.foto_numero_contenedor==1){
            this.setState({foto_cargo:'0'});
        }
        else{

        let arregloImagenes1 = this.Selector1.current.obtenerArregloImagenes();
           // let arregloImagenes2 = this.Selector2.current.obtenerArregloImagenes();
           // let arregloImagenes3 = this.Selector3.current.obtenerArregloImagenes();
    
           // console.log("arreglox1 -->"+ JSON.stringify(arregloImagenes1));
            let jsonImagenes1 = "";
    
            console.log("cantidad de imagenes .----> "+arregloImagenes1.length);
    
            if(arregloImagenes1.length ==0 ){
    
                this.HintAlertas.current.mostrarConParametros("Please upload image");
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
    
            console.log(jsonImagenes1);
    
    
            this.setState({ foto_cargo: jsonImagenes1 });

        }

    }

    envio_menu = async () => {
        this.carga_imagenes();

       // this.carga_objetosEspecie();
        //this.Loading.current.mostrar();
        if(this.state.arregloEspecies.length==0){
        this.HintAlertas.current.mostrarConParametros("must enter a product");
        return;
        }
        else{
        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "1");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");

                console.log("arregloEspeciesx "+ JSON.stringify(this.state.arregloEspecies) );
                console.info(this.state.arregloEspecies);


        try {

            



            let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
            let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;
        
        let var_paso = this.state.arregloEspecies;

       // console.info(var_paso);
        var paso = [];
        var_paso.forEach((e) =>
        {
            let objeto_especie = {
                especie_id : e.producto_id,
                especie_cantidad_pallets: e.cantidad_pallet,
                especie_cantidad_cajas: e.cantidad_cajas

            }
            paso.push(objeto_especie);
        //    console.info(e);
        });


            //(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) 
            let resultado = await WSRestApi.fnWSGuardaCargoDetail(USUARIO_ID,PLANTA_ID,embarque, embarque_planta, '02-06-2022',this.state.motonave,this.state.recibidor_id, this.state.puerto_carga, this.state.puerto_destino, this.state.numero_booking, paso,this.state.foto_cargo);
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
                await AsyncStorage.setItem("EspecificacionContenedor", "1");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");

            switch (this.state.tipo_id) {
                case 1:
                    this.props.navigation.navigate('ConsolidacionCarga', {
                        embarque : resultado.data.embarque_id, 
                        embarque_planta : resultado.data.embarque_planta_id,
                        informeGeneral : "2",
                        identificacionCarga:"2",})


                    break;
                case 2:
                        this.props.navigation.navigate('ConsolidacionCargaCorto', {
                            embarque : resultado.data.embarque_id, 
                            embarque_planta : resultado.data.embarque_planta_id,
                            informeGeneral : "2",
                            identificacionCarga:"2",})
    
    
                        break;
                default:
                    break;
            }
                


            }else{
                console.log("sin resultadox");
                this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");
            }   




        }catch(e){
            console.warn(e);
        }

        }
       // this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
    };


    render() {

        //console.log("la pregarga es1 :"+ this.state.precarga)
            
        //if(this.state.precarga==true){
   
    return (
        <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
            <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
            <TouchableWithoutFeedback onPress={() => {
                (this.state.tipo_id==1)? 
                this.props.navigation.navigate('ConsolidacionCarga')
                :
                this.props.navigation.navigate('ConsolidacionCargaCorto')}}>
                <View style={{}}>
                <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />

                </View>
                </TouchableWithoutFeedback>


                <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Pallets' stowage</Text>
                
<TouchableWithoutFeedback onPress={() => this.setModalVisible(true)}>
                    <View style={{}}>
                    <Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />
                                        
                    </View> 
  </TouchableWithoutFeedback>

            </View>

            <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >

            <Text style={{marginLeft:'35%', marginTop:30}}>Type {this.state.tipo_nombre}</Text> 
                                <Text style={{marginLeft:80, marginTop:30,fontWeight:'bold'}}>Pallets have not been added</Text> 
                                <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => {
                            if (this.state.total_pallet_ok==this.state.total_pallet) {
                                this.props.navigation.navigate('EstibaPalletLista',{
                                    embarque : this.state.embarque_id, 
                                embarque_planta : this.state.embarque_planta_id,
                                id_pallet : this.state.id_proximo_pallet,
                                id_especie : this.state.id_proximo_especie,
                                })
                            } else {
                                this.props.navigation.navigate('EstibaPalletAgregar',{
                                    embarque : this.state.embarque_id, 
                                embarque_planta : this.state.embarque_planta_id,
                                id_pallet : this.state.id_proximo_pallet,
                                id_especie : this.state.id_proximo_especie,
                                })
                            }
                        }}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>
                                    Add pallet {(this.state.total_pallet_ok!=this.state.total_pallet?(this.state.total_pallet_ok+1):(this.state.total_pallet_ok))} of {this.state.total_pallet}</Text>
                            </TouchableHighlight>
                    </View>

                    
            <HintAlertas
            title={this.state.tituloHintAlerta}
            ref={this.HintAlertas}
            ></HintAlertas>

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


            <View style={{ flex: 0.02, backgroundColor: 'steelblue' }} >

                <Footer
                Imagen={this.state.Imagen}></Footer>
            </View>

      </View>
    );
 





        
    }



}

class InputTextDinamico extends Component {

    constructor(props) {
      super(props);

      this.state = {
        carga: false,

      };

     // let hora = Redirect.getTimeNow();
     console.log("carga input");
    }

    render() {


        return (
          <Text>
              hola mundox
          </Text>
        )


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