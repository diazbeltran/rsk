import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'


import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
export default class FotosContenedor extends Component {

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

               
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Fotos contenedor vacio </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            
                                
                            
                                    
                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#767676'}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                color:"#767676"}}>
                                Foto fondo del contenedor

                                </Text><Icon2 style={{paddingTop:10,marginLeft:50, paddingRight:20}} name="camera" size={30} color="#ef882d" />
                                </View>


                                </TouchableWithoutFeedback>
                                </View>
                                    
                                <View style={{marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300 , borderColor:'#767676'}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                color:'black', 
                                color:"#767676"}}>
                                Foto fondo del contenedor

                                </Text><Icon2 style={{paddingTop:10, marginLeft:50, paddingRight:20}} name="camera" size={30} color="#ef882d" />
                                </View>


                                </TouchableWithoutFeedback>
                                </View>
                        

                           
                                                                                <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Siguiente</Text>
                            </TouchableHighlight>
                    </View>

                        
                                
                            
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
  });