import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'
import Select from '../../component/Select/Select.component.js';

import { TouchableHighlight } from 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/Feather';
//import Icon2 from 'react-native-vector-icons/Ionicons';


import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


export default class ConsultaEstibaConfirma extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            
            exportadorInicio: {
                label: "Aeurus ",
                value: "1"
            },
        };

        this.exportador = React.createRef();
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

        //this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
       // this.carga_recibidor();
       // this.carga_especies();
       // this.carga_objetosEspecie();

       
       

    }




    envio_menu = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "2");
                await AsyncStorage.setItem("EstibaPallet", "2");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "1");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('ConsolidacionCarga')
    };

    
    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                    <View style={{flex:0.1}}>
                    <Icon style={{marginLeft:'50%'}} name="angle-left" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:'0%', color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>Closing container</Text>
                    <Icon style={{marginRight:'10%'}} name="sign-out-alt" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column', alignItems:'center'}} >
                    <Text style={{fontWeight:'bold', marginTop:'10%'}}>IMPORTANT INFORMATION</Text>
                   <View style={{flex:.3, width:'70%'}}>
                    <Text style={{marginTop:'2%'}}>Will atmosphere curtain (CA) be installed?</Text>  
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop:'10%'}}>
                   <View>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('EstibaPalletFotos',{
                            embarque : this.state.embarque_id, 
                        embarque_planta : this.state.embarque_planta_id,
                        id_pallet : this.state.id_proximo_pallet,
                        id_especie : this.state.id_proximo_especie,
                        })}
                        >
                        <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#75BE48', color:'white', }}>Yes</Text>
                        </TouchableHighlight>
                   </View>
                   <View>
                       <TouchableHighlight style={{with:10, marginLeft:20}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('EstibaPalletFotos',{
                            embarque : this.state.embarque_id, 
                        embarque_planta : this.state.embarque_planta_id,
                        id_pallet : this.state.id_proximo_pallet,
                        id_especie : this.state.id_proximo_especie,
                        })}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#6f6aaa', color:'white', }}>No</Text>
                            </TouchableHighlight>
                    </View>
                    
                            
            
                    </View>

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