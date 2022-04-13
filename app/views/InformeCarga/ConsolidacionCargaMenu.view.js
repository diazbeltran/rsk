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
export default class ConsolidacionCarga extends Component {

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
    async UNSAFE_componentWillMount() {

        try {}
        catch{}
    }
    async   UNSAFE_componentWillMount() {

        try {
            const { route } = this.props;
            console.log("weas");
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

        console.log("estadox --> "+this.state.informeGeneral);
        console.log("estadox --> "+this.state.identificacionCarga);
        console.log("estadox --> "+this.state.EspecificacionContenedor);
        console.log("estadox --> "+this.state.FotosContenedor);
        console.log("estadox --> "+this.state.EstibaPallet);
        console.log("estadox --> "+this.state.FotosConsolidacionCarga);
        console.log("estadox --> "+this.state.Observaciones);
       

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
        //let buttonidentificacionCarga, buttonidentificacionCarga;
        // if (DatoInforme==true) {

        //     buttonInfoGeneral = 
        //     <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque', {estados:this.state.EstadoProceso})}>
        //     <View style={{ backgroundColor:'#75BE48', paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
        //     <View style={{flex:0.4}}>
        //     <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
        //     </View>
        //      <View style={{flex:3}}>
        //      <Text style={{color:'white',marginTop:10}}>Información general del embarque</Text>
        //      </View>
        //     <View style={{flex:0.5}}>
        //     <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
        //     </View>
                                   
        //     </View> 
        //     </TouchableWithoutFeedback>
        //     ;
           

        // } else {
            
        //     buttonInfoGeneral = <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque', {estados:this.state.EstadoProceso})}>
        //     <View style={{backgroundColor:'red',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.2, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
        //     <View style={{flex:0.4}}>
        //     {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
        //     </View>
        //      <View style={{flex:3}}>
        //      <Text style={{color:'white',marginTop:10}}>Información general del embarque</Text>
        //      </View>
        //     <View style={{flex:0.5}}>
        //     <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
        //     </View>
                                   
        //     </View> 
        //     </TouchableWithoutFeedback>;
        // }

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
                     <Text style={{color:'white',marginTop:10}}>Estiba de pallets</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonEstibaPallet=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet')}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Estiba de pallets</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
            case "2":
                buttonEstibaPallet=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet')}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Estiba de pallets</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
            case "3":
                buttonEstibaPallet=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet')}>
                                <View style={{backgroundColor:'#B94848',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                                <View style={{flex:0.4}}>
                                <Icon3 style={{marginLeft:10, marginTop:10}} name="warning" size={20} color="white" />
                                </View>
                                 <View style={{flex:3}}>
                                 <Text style={{color:'white',marginTop:10}}>Estiba de pallets</Text>
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
                     <Text style={{color:'white',marginTop:10}}>Fotos de consolidacion de carga</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="lock-outline" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                break;

            case "1":
                buttonFotosConsolidacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosCarga')}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Fotos de consolidacion de carga</Text>
                 </View>
                <View style={{flex:0.5}}>
                <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                </View>
                                       
                </View> 
                </TouchableWithoutFeedback>;
                break;
            case "2":
                buttonFotosConsolidacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosCarga')}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Fotos de consolidacion de carga</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>;
                    break;
            case "3":
                buttonFotosConsolidacionCarga=<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosCarga')}>
                                <View style={{backgroundColor:'#B94848',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                                <View style={{flex:0.4}}>
                                <Icon3 style={{marginLeft:10, marginTop:10}} name="warning" size={20} color="white" />
                                </View>
                                 <View style={{flex:3}}>
                                 <Text style={{color:'white',marginTop:10}}>Fotos de consolidacion de carga</Text>
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
                     <Text style={{color:'white',marginTop:10}}>Observaciones</Text>
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
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Observacion')}>
                <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                <View style={{flex:0.4}}>
                
                </View>
                 <View style={{flex:3}}>
                 <Text style={{color:'white',marginTop:10}}>Observaciones</Text>
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
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Observacion')}>
                    <View style={{backgroundColor:'#75BE48',paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:1, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" />
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Observaciones</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>

                    <View style={{alignItems:'center', marginTop:'5%', marginBottom:20}} >

<View style={{flexDirection:'row'}} >
<Icon2 style={{marginLeft:50}} name="check-box-outline-blank" size={30} color="white" />

<View style={{flex:1, marginLeft:2,paddingBottom:10, color:'white'}}>
<Text style={{color:'white'}}> Confirmo que los datos del informe son correctos</Text>    
</View>

</View>

    
        <TouchableHighlight style={{height:'100%', width:'50%'}}
        title=""
        onPress={() => this.props.navigation.navigate('App')}
            >
                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Ingresar</Text>
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

               
                    <Text style={{flex:1,marginLeft:20, color:'white',marginTop:0, fontSize:16}}>Informe consolidación de carga</Text><Icon style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: '#6c649c', flexDirection: 'column'}} >
                <ScrollView>

                    {buttonInfoGeneral}


                    {buttonIdentificacionCarga}

                    {buttonEspecificacionContenedor}
                    {buttonFotosContenedor}

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