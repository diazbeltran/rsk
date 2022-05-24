import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Select from '../../component/Select/Select.component.js';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
export default class TomarFoto extends Component {

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

            
        };
        this.recibidor = React.createRef();
        
    }
    envio_menu = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "1");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
    };
    

    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ConsolidacionCarga')}>
                    <View style={{}}>
                    <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Identificación de carga </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column', alignItems:'center'}} >
               
                            
                                <Text style={{marginLeft:20, marginTop:10, fontWeight:'bold'}}>Toma de fotografía</Text> 
                            
                                <Text style={{marginLeft:20, marginTop:10, marginBottom:'10%',}}>texto texto texto texto texto texto </Text> 

                           <View style={{flex:0.9, width:'70%', borderWidth:5, alignItems:'center'}}>
                           <Icon2 style={{marginLeft:10, marginTop:'2%'}} name="ios-qr-code-sharp" size={100} color="black" />
                           </View>
                        
                           <View style={{flex:1, paddingTop:20,  alignItems:'center'}}>
                           <TouchableHighlight 
                        title="Press me"
                        onPress={() => this.props.navigation.goBack()}
                            >
                                <Text style={{ marginTop:'0%', borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>
                                    Volver</Text>
                            </TouchableHighlight>
                           </View>
                               
                            
                                
                            </View>                           
               
                
                
                <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                
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