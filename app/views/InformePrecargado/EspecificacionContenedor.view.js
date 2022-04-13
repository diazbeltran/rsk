import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Select from '../../component/Select/Select.component.js';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
export default class EspecificacionContenedor extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,

            añorefInicio: {
                label: "2022 ",
                value: "1"
            },


        };
        this.añoref = React.createRef();
        
    }

    envio_menu = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "1");
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

               
                    <Text style={{flex:1,marginLeft:30, color:'white',marginTop:0, fontSize:15}}>Especificación de Contenedor </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            
                                <Text style={{marginLeft:30, marginTop:30}}>Año de fabricación contenedor</Text> 
                                <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >
                            <Select  
                            ref={this.añoref}
                            label={this.state.añorefInicio.label}
                            value={this.state.añorefInicio.value}
                            datos={[
                            { label: '2021', value: '1' },
                            { label: '2020', value: '2' },
                            { label: '2019', value: '3' },
                            ]}
                            //   datos={this.state.beneficiarios} 
                            />
                        </View>
                                    <View style={{marginLeft:120, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
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

                    <Text style={{marginLeft:30, marginTop:30}}>PTI</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value=''
                                    
                                    />
                                    <View style={{marginLeft:120, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
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


                       <View style={{flexDirection:'row', marginTop:30}}>
                       <Icon3 style={{marginLeft:30, color:'#ef882d'}} name="check-box" size={30}   />
                       <Text style={{marginLeft:10, marginTop:5}} >Contenedor Pre-enfriado</Text> 
                            
                           </View>   

                           <View style={{flexDirection:'row'}}>
                       <Icon3 style={{marginLeft:30, color:'#ef882d'}} name="check-box-outline-blank" size={30}   />
                       <Text style={{marginLeft:10, marginTop:5}} >Limpio y sin olores</Text> 
                            
                           </View> 

                           <View style={{flexDirection:'row'}}>
                       <Icon3 style={{marginLeft:30, color:'#ef882d'}} name="check-box-outline-blank" size={30}   />
                       <Text style={{marginLeft:10, marginTop:5}} >Contenedor en buen estado</Text> 
                            
                           </View>   


                           <Text style={{marginLeft:40, marginTop:40}}>Seteo contenedor (grados celcius)</Text> 
                            <View style={{flexDirection:'row',paddingTop:10, borderWidth:1, width:'70%', height:50, marginLeft:40, borderColor:'#black'}}>
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
                                    <View style={{marginLeft:120, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
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

                    <View>
                    <Text style={{marginLeft:40, marginTop:40}}>Estado del motor (condensador)</Text> 
                            
                            
                                    <View style={{marginLeft:120, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
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
                    </View>

                         
                           
                    <View>
                    <Text style={{marginLeft:40, marginTop:40}}>Ventilación (CBM)</Text> 
                            <View style={{flexDirection:'row',paddingTop:10, borderWidth:1, width:'70%', height:50, marginLeft:40, borderColor:'#black'}}>
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
                                    <View style={{marginLeft:120, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
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
                    </View>
                           
                    
                                
                            
                                </ScrollView>
                            </View>                           
               
                
                
                <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.envio_menu()}
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