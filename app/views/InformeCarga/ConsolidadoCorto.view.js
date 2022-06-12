import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback, FlatList} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'
import datacarga from '../../assets/json/informesPrecargados.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/FontAwesome5';


import HintAlertas from '../../components/Hint/Hint.component';


import CheckBox from '@react-native-community/checkbox';

import WSRestApi from '../../services/wsRestApi';



export default class ConsolidadoCorto extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            informeGeneral:0,
            identificacionCarga: 0,
            EspecificacionContenedor:0,
            FotosContenedor:0,
            EstibaPallet:0,
            FotosConsolidacionCarga:0,
            Observaciones:0,
            EstadoProceso :{
                informeGeneral:false,
                identificacionCarga: 0,
                EspecificacionContenedor:false,
                FotosContenedor:false,
                EstibaPallet:false,
                FotosConsolidacionCarga:false,
                Observaciones:false
            }
        };

        
    }

    componentDidMount = async () => {
        let usuario = this.props.route.params.usuario, 
        planta = this.props.route.params.planta, 
        embarque = this.props.route.params.embarque, 
        embarque_planta = this.props.route.params.embarque_planta;
        let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');

        
        informeGeneral = this.props.route.params.informeGeneral


        console.log("datox del ConsolidadoCorto embarquex->"+embarque);
        console.log("datox del ConsolidadoCorto embarque_planta->"+embarque_planta);
        console.log("datox del ConsolidadoCorto informeGeneral->"+informeGeneral);
        this.setState({informeGeneral:informeGeneral,embarque_id:embarque, embarque_planta_id:embarque_planta});
    }

    

    finaliza = async () => {


        if(this.state.confirmacion==false){
            this.HintAlertas.current.mostrarConParametros("Debe confirmar");
            return;
        }


        let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;

        let img1 = this.state.foto_general_contenedor;
        let img2 = this.state.foto_pared_izquierda;
      

           

           // console.log("Orden -->"+orden);
           // console.log("numero -->"+numero);
            console.log("USUARIO_ID -->"+USUARIO_ID);
            console.log("PLANTA_ID -->"+PLANTA_ID);
            //console.log("fecha -->"+fecha);
           // console.log("expor -->"+expor);
            
           // console.log("img1 -->"+img1);
           // console.log("img2 -->"+img2);
           // console.log("img3 -->"+img3);

            try {
                //(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) 
                let resultado = await WSRestApi.fnWSCierre(USUARIO_ID,PLANTA_ID,embarque,embarque_planta, this.state.confirmacion);
                //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
                console.log("resultadox ->"+JSON.stringify(resultado)) ;

                //this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");

                if(resultado.state==true)
                {   
                    console.log("okkkkkk");
                    let embarque_paso ='"'+ resultado.data.embarque_id + '"'

                    await AsyncStorage.setItem("embarque_id",'"'+ resultado.data.embarque_id+'"');
                    await AsyncStorage.setItem("embarque_planta_id",'"'+ resultado.data.embarque_planta_id+'"');


                    console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "2");
                await AsyncStorage.setItem("EstibaPallet", "2");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "2");
                await AsyncStorage.setItem("Observaciones", "2");


                    this.props.navigation.navigate('App')



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

    }



   
    async   UNSAFE_componentWillMount() {

        try {
            const { route } = this.props;
        // console.log("weas");
            this.carga_estados();
            
             // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
           //  const responseJson = navigation.getParam("EstadoProceso");
    //          const responseJson2 = route.params["EstadoProceso"];

             
    //    //     console.log("data -->"+JSON.stringify(datacarga));

    //    var jsonString = JSON.stringify(this.state.EstadoProceso);
    //   // console.log("estados -..>"+jsonString);
    //   // console.log("estados -..>"+JSON.stringify(responseJson2));
    //         this.setState({informeGeneral :responseJson2.informeGeneral, 
    //             identificacionCarga:responseJson2.identificacionCarga,
    //             EspecificacionContenedor:responseJson2.EspecificacionContenedor,
    //             FotosContenedor:responseJson2.FotosContenedor,
    //             EstibaPallet:responseJson2.EstibaPallet,
    //             FotosConsolidacionCarga:responseJson2.FotosConsolidacionCarga,
    //             Observaciones:responseJson2.Observaciones,
    //         })
            
       // this.recibirDatos()

        }
        catch(error){
            console.log(error);
        }


      
    }

    carga_estados = async () => {
       // let identificacionCarga = await AsyncStorage.getItem("identificacionCarga");
        
       this.setState({informeGeneral:await AsyncStorage.getItem("informeGeneral")});

        this.setState({identificacionCarga:await AsyncStorage.getItem("identificacionCarga")});
        this.setState({EspecificacionContenedor:await AsyncStorage.getItem("EspecificacionContenedor")});
        this.setState({FotosContenedor:await AsyncStorage.getItem("FotosContenedor")});
        this.setState({EstibaPallet:await AsyncStorage.getItem("EstibaPallet")});
        this.setState({FotosConsolidacionCarga:await AsyncStorage.getItem("FotosConsolidacionCarga")});
        this.setState({Observaciones:await AsyncStorage.getItem("Observaciones")});

        // console.log("estadox --> "+this.state.informeGeneral);
        // console.log("estadox --> "+this.state.identificacionCarga);
        // console.log("estadox --> "+this.state.EspecificacionContenedor);
        // console.log("estadox --> "+this.state.FotosContenedor);
        // console.log("estadox --> "+this.state.EstibaPallet);
        // console.log("estadox --> "+this.state.FotosConsolidacionCarga);
        // console.log("estadox --> "+this.state.Observaciones);
       

    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        this.carga_estados();
        console.log('Se ejecuta componentWillReceiveProps con las propiedades futuras', nextProps)
       // this.recibirDatos()

       try {
       
        
   // this.recibirDatos()

    }
    catch(error){
        console.log(error);
    }


      }


      UNSAFE_shouldComponentUpdate(nextProps, nextState) {
        console.log('UNSAFE_shouldComponentUpdate  nextProps ', nextProps)
        console.log('UNSAFE_shouldComponentUpdate nextState', nextState)
       // this.recibirDatos()

       try {
        const { route } = this.props;

       
        
         // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
       //  const responseJson = navigation.getParam("EstadoProceso");
         const responseJson2 = route.params["EstadoProceso"];

         
       // console.log("data -->"+JSON.stringify(datacarga));

   var jsonString = JSON.stringify(this.state.EstadoProceso);
   console.log("estados -..>"+jsonString);
   console.log("estados -..>"+JSON.stringify(responseJson2));
        this.setState({informeGeneral :responseJson2.informeGeneral, 
            identificacionCarga:responseJson2.identificacionCarga,
            EspecificacionContenedor:responseJson2.EspecificacionContenedor,
            FotosContenedor:responseJson2.FotosContenedor,
            EstibaPallet:responseJson2.EstibaPallet,
            FotosConsolidacionCarga:responseJson2.FotosConsolidacionCarga,
            Observaciones:responseJson2.Observaciones,
        })
        return nextState.count != this.state.count;
   // this.recibirDatos()

    }
    catch(error){
        console.log(error);
    }


      }


      mostrarCuadrosImagen = ({ item }) => {
        return (
            <TouchableOpacity
                
                onPress={console.log("hola")}
            >
                <View >
                   <Text>hola</Text>
                </View>
            </TouchableOpacity>
        )
    }



  

    render() {
        const DatoObservaciones = this.state.EstadoProceso.Observaciones;
        const DatoInforme = this.state.informeGeneral;
        const DatoCarga = this.state.identificacionCarga;
        let buttonInfoGeneral, buttonIdentificacionCarga,buttonEspecificacionContenedor,
        buttonFotosContenedor,
        buttonEstibaPallet,
        buttonFotosConsolidacionCarga,
        buttonObservaciones;
      
           
     
        switch (this.state.informeGeneral) {
            case "0":
                buttonInfoGeneral=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque')}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Información general del embarque</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonInfoGeneral=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarqueNuevo')}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{fontWeight:'bold', color:'white',marginTop:10}}>Información general del embarque</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
            case "2":
            buttonInfoGeneral=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque')}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Información general del embarque</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
            
            
            
            default:
                break;
        } 



        switch (this.state.identificacionCarga) {
            case "0":
                buttonIdentificacionCarga=<TouchableWithoutFeedback >
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Identificación de carga</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonIdentificacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IdentificacionCarga')}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Identificación de carga</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
        case "2":
                    buttonIdentificacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IdentificacionCarga')}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Identificación de carga</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
            
            
            
            default:
                break;
        } 
        //FotosContenedor, EstibaPallet, FotosConsolidacionCarga, Observaciones
        switch (this.state.EspecificacionContenedor) {
            case "0":
                buttonEspecificacionContenedor=<TouchableWithoutFeedback >
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Especificación del contenedor</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonEspecificacionContenedor=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EspecificacionContenedor')}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Especificación del contenedor</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
        case "2":
            buttonEspecificacionContenedor=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EspecificacionContenedor')}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Especificación del contenedor</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
        case "3":
            buttonEspecificacionContenedor=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EspecificacionContenedor')}>
                                <View style={{backgroundColor:'#B94848',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                                <View style={{flex:0.4}}>
                                <Icon3 style={{marginLeft:10, marginTop:10}} name="warning" size={20} color="white" />
                                </View>
                                 <View style={{flex:3}}>
                                 <Text style={{color:'white',marginTop:10}}>Especificación del contenedor</Text>
                                 </View>
                                <View style={{flex:0.5}}>
                                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                                </View>
                                                       
                                </View> 
                                </TouchableWithoutFeedback>;
                                break;
        
            default:
                break;
        }

        //FotosContenedor, EstibaPallet, FotosConsolidacionCarga, Observaciones
        switch (this.state.FotosContenedor) {
            case "0":
                buttonFotosContenedor=<TouchableWithoutFeedback >
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Fotos contenedor vacio</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonFotosContenedor=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosContenedor')}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Fotos contenedor vacio</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
            case "2":
                buttonFotosContenedor=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosContenedor')}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Fotos contenedor vacio</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
            case "3":
                        buttonFotosContenedor=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosContenedor')}>
                                <View style={{backgroundColor:'#B94848',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                                <View style={{flex:0.4}}>
                                <Icon3 style={{marginLeft:10, marginTop:10}} name="warning" size={20} color="white" />
                                </View>
                                 <View style={{flex:3}}>
                                 <Text style={{color:'white',marginTop:10}}>Fotos contenedor vacio</Text>
                                 </View>
                                <View style={{flex:0.5}}>
                                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                                </View>
                                                       
                                </View> 
                                </TouchableWithoutFeedback>;
                                break;
        
            default:
                break;
        }

        //EstibaPallet, FotosConsolidacionCarga, Observaciones
        switch (this.state.EstibaPallet) {
            case "0":
                buttonEstibaPallet=<TouchableWithoutFeedback >
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Stuffing report</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonEstibaPallet=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Stuffing report</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
            case "2":
                buttonEstibaPallet=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Stuffing report</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
            case "3":
                buttonEstibaPallet=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                                <View style={{backgroundColor:'#B94848',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                                <View style={{flex:0.4}}>
                                <Icon3 style={{marginLeft:10, marginTop:10}} name="warning" size={20} color="white" />
                                </View>
                                 <View style={{flex:3}}>
                                 <Text style={{color:'white',marginTop:10}}>Stuffing report</Text>
                                 </View>
                                <View style={{flex:0.5}}>
                                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                                </View>
                                                       
                                </View> 
                                </TouchableWithoutFeedback>;
                                break;
        
            default:
                break;
        }

        // FotosConsolidacionCarga, Observaciones
        switch (this.state.FotosConsolidacionCarga) {
            case "0":
                buttonFotosConsolidacionCarga=<TouchableWithoutFeedback >
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Cargo's stuffing photos</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonFotosConsolidacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosCarga',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Cargo's stuffing photos</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
            case "2":
                buttonFotosConsolidacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosCarga',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Cargo's stuffing photos</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
            case "3":
                buttonFotosConsolidacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosCarga',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                                <View style={{backgroundColor:'#B94848',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                                <View style={{flex:0.4}}>
                                <Icon3 style={{marginLeft:10, marginTop:10}} name="warning" size={20} color="white" />
                                </View>
                                 <View style={{flex:3}}>
                                 <Text style={{color:'white',marginTop:10}}>Cargo's stuffing photos</Text>
                                 </View>
                                <View style={{flex:0.5}}>
                                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                                </View>
                                                       
                                </View> 
                                </TouchableWithoutFeedback>;
                                break;
        
            default:
                break;
        }

        // FotosConsolidacionCarga, Observaciones
        switch (this.state.Observaciones) {
            case "0":
                buttonObservaciones=
                <View style={{marginBottom:50}}>
                <TouchableWithoutFeedback  >
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Comments</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>
                    </View>;
                break;

            case "1":
                buttonObservaciones=
                <View style={{marginBottom:50}}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Observacion',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Comments</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>
                </View>;
                break;
            case "2":
                buttonObservaciones=<View>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Observacion',{
                    usuario: this.state.usuario_id,
                    planta: this.state.planta_id,
                    embarque: this.state.embarque_id,
                    embarque_planta: this.state.embarque_planta_id
                })}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Comments</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>

                    <View style={{alignItems:'center', marginTop:'5%', marginBottom:20}} >

                    <View style={{flexDirection:'row',width:'80%'}} >
                    <CheckBox
                                            value={this.state.confirmacion}
                                            boxType={'square'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                                confirmacion: value
                                                
                                            })}
                                            }
                                            />

                    <View style={{flex:1, marginLeft:2,paddingBottom:10, color:'white'}}>
                    <Text style={{color:'white'}}> I confirm than the information in this report is correct</Text>    
                    </View>

                    </View>

    
        <TouchableHighlight style={{height:'100%', width:'50%'}}
        title=""
        onPress={() => {this.finaliza()}}
            >
                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Send report</Text>
            </TouchableHighlight>
    </View>
                
                    </View>;
                    break;
            case "3":
                buttonObservaciones=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Observacion')}>
                                <View style={{backgroundColor:'#B94848',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                                <View style={{flex:0.4}}>
                                <Icon3 style={{marginLeft:10, marginTop:10}} name="warning" size={20} color="white" />
                                </View>
                                 <View style={{flex:3}}>
                                 <Text style={{color:'white',marginTop:10}}>Observaciones</Text>
                                 </View>
                                <View style={{flex:0.5}}>
                                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                                </View>
                                                       
                                </View> 
                                </TouchableWithoutFeedback>;
                                break;
        
            default:
                break;
        }

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('App')}>
                    <View style={{}}>
                    <Icon style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                     <Text style={{flex:1,marginLeft:'0%', color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>Stuffing report</Text><Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: '#6c649c', flexDirection: 'column'}} >
                <ScrollView>

                    
                    
                    
                    
                    {buttonEstibaPallet}
                    {buttonFotosConsolidacionCarga}
                    {buttonObservaciones}
                    
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
      width:'80%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
    },
    a :{
        backgroundColor:'red',
       // name:"navigate-next"
    },
    b : {
        backgroundColor:'blue',
        //name:"trash"
    }
  });