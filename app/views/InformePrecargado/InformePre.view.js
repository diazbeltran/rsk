import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button } from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'

import AsyncStorage from '@react-native-async-storage/async-storage';
//import ConsultaContenedor from '../Contenedor/ConsultaContenedor.view';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';



export default class InformePrecargado extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false
        };

        
    }
    envio_menu = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "1");
                await AsyncStorage.setItem("identificacionCarga", "0");
                await AsyncStorage.setItem("EspecificacionContenedor", "0");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
    };
    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6d65a5'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >

                    <Text style={{flex:1,marginLeft:80, color:'white',marginTop:0, fontSize:18, fontFamily:'Nunito'}}>Informes precargados </Text><Icon style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />

                </View>
                
                
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                
               <InformeCaja navigation={this.props.navigation}></InformeCaja>
               
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
  });