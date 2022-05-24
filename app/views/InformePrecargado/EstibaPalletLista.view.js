import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button, TouchableWithoutFeedback } from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import InformePallet from '../../component/InformePallet/InformePallet.component.js'
import Icon2 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class EstibaPalletLista extends Component {

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
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "2");
                await AsyncStorage.setItem("EstibaPallet", "2");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "1");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
    };
    
    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                    <View style={{}}>
                    <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Estiba de Pallet 1/20 </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
                
                
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                
               <InformePallet navigation={this.props.navigation}></InformePallet>

                
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