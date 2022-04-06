import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button, TouchableWithoutFeedback } from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import InformePallet from '../../component/InformePallet/InformePallet.component.js'
import Icon2 from 'react-native-vector-icons/Ionicons';

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

    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}>
                    <View style={{}}>
                    <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Estiba de Pallet 1/20 </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
                
                
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                
               <InformePallet navigation={this.props.navigation}></InformePallet>

                
                </View>
                <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, paddingBottom:20}}>

                <View style={{flexDirection:'row'}} >
                <Icon style={{marginLeft:50}} name="check-box-outline-blank" size={30} color="#ef882d" />
                
                <View style={{flex:1, marginLeft:2,paddingBottom:10, color:'#ef882d'}}>
                <Text style={{color:'#ef882d'}}> Confirmo que los datos de los pallets son correctos</Text>    
                </View>
                
                </View>
    
                    
                        <TouchableHighlight style={{with:10}}
                        title=""
                        onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
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