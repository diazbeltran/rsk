import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button } from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

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

    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >

                    <Text style={{flex:1,marginLeft:80, color:'white',marginTop:0, fontSize:18}}>Informes precargados </Text><Icon style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
                
                
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                
               <InformeCaja></InformeCaja>
               
                </View>
                <View style={{alignItems:'center', backgroundColor:'white', flex:0.1, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('ConsultaContenedor')}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Ingresar</Text>
                            </TouchableHighlight>
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