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


export default class ConsultaContenedor extends Component {

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
    componentDidMount = async () =>{
        let usuario = this.props.route.params.usuario, 
        planta = this.props.route.params.planta, 
        embarque = this.props.route.params.embarque, 
        embarque_planta = this.props.route.params.embarque_planta;
        let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');
    
        console.log("datox planta>.->>"+ this.props.route.params.planta,);

    }

    envio_menu = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "0");
                await AsyncStorage.setItem("identificacionCarga", "0");
                await AsyncStorage.setItem("EspecificacionContenedor", "0");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "1");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('ConsolidacionCargaCorto',{
            usuario: this.props.route.params.usuario,
            planta: this.props.route.params.planta,
            embarque: this.props.route.params.embarque,
            embarque_planta: this.props.route.params.embarque_planta,
            informeGeneral:"1",
        })
    };

    
    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('App')}>
                    <View style={{flex:0.1}}>
                    <Icon style={{marginLeft:'50%'}} name="angle-left" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:'0%', color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>Check container</Text>
                    <Icon style={{marginRight:'10%'}} name="sign-out-alt" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column', alignItems:'center'}} >
                    <Text style={{fontWeight:'bold', marginTop:'10%'}}>Contenedor </Text>
                    <Text style={{marginTop:'2%'}}>¿El contenedor viene vacio?</Text>  
                    
                    <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop:'10%'}}>
                   <View>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque',{
                            usuario: this.props.route.params.usuario,
                            planta: this.props.route.params.planta,
                            embarque: this.props.route.params.embarque,
                            embarque_planta: this.props.route.params.embarque_planta,
                            informeGeneral:"1",
                        })} 
                        >
                        <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#75BE48', color:'white', }}>Si</Text>
                        </TouchableHighlight>
                   </View>
                   <View>
                       <TouchableHighlight style={{with:10, marginLeft:20}}
                        title="Press me"
                        onPress={() => this.envio_menu()}
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