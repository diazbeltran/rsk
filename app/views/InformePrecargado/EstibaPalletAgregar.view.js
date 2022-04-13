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
import Icon3 from 'react-native-vector-icons/MaterialIcons';


export default class EstibaPalletAgregar extends Component {

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
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet')}>
                    <View style={{}}>
                    <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:90, color:'white',marginTop:0, fontSize:18}}>Añadir Pallet </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            
                                <Text style={{marginLeft:30, marginTop:30}}>N° de Pallet</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value=''
                                    />
                                    <View style={{marginLeft:120, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:0, flexDirection:'row'}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('TomarFoto')}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:5,paddingRight:5, backgroundColor:'#ef882d', color:'white', }}>Tomar fotografia</Text>
                            </TouchableHighlight>
                            <View style={{flex:1, marginLeft:20}}>
                                    <Icon2 style={{marginRight:0}} name="information-circle-sharp" size={30}  />
                                </View>
                    </View>

                    <Text style={{marginLeft:30, marginTop:30}}>Ubicación</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value=''
                                    
                                    />
                                                          
                      
                        <Text style={{marginLeft:30, marginTop:10}}>Posición</Text>   
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon2 style={{marginLeft:50, color:'#ef882d'}} name="ios-radio-button-off" size={30}   />
                        <Text>Punta</Text>
                        <Icon2 style={{marginLeft:'10%', color:'#ef882d'}} name="ios-radio-button-off" size={30}   />
                        <Text>Espejo</Text>
                        </View>

                          


                           <Text style={{marginLeft:40,marginBottom:20, marginTop:40}}>Temperatura °C</Text> 
                            <View style={{flexDirection:'row',paddingTop:10, borderWidth:1, width:'80%', height:50, marginLeft:40, borderColor:'#D5D8DC'}}>
                               <View style={{flex:1}}>
                               
                               <Icon3 style={{marginLeft:30, color:'#ef882d'}} name="remove-circle" size={30}   />
                                   </View> 
                                   <View style={{flex:1}}>
                                       <Text style={{marginLeft:30, marginTop:5, }} >0</Text>
                                   </View>
                                   <View style={{flex:1}}>
                               <Icon3 style={{marginLeft:30, color:'#ef882d'}} name="add-circle" size={30}   />
                               
                                   </View> 
                            </View>

                            <Text style={{marginLeft:40,marginBottom:20, marginTop:40}}>Incluye termógrafo</Text> 
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon2 style={{marginLeft:50, color:'#ef882d'}} name="ios-radio-button-off" size={30}   />
                        <Text>Si</Text>
                        <Icon2 style={{marginLeft:'18%', color:'#ef882d'}} name="ios-radio-button-off" size={30}   />
                        <Text>No</Text>
                        </View>
                             
                
                                
                            
                                </ScrollView>
                            </View>                           
               
                
                
                <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('EstibaPalletLista')}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Siguiente</Text>
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