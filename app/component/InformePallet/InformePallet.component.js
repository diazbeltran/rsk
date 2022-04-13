import React, { Component } from 'react';
import { View, Text, TextInput, Image ,ScrollView, TouchableWithoutFeedback} from 'react-native';
import Styles from './InformePallet.style.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';

import { TouchableHighlight } from 'react-native-gesture-handler';
//import InformeCaja from '../'

class InformeCaja  extends Component {

  constructor(props) {
    super(props);

    this.state = {

      color1: '',
      color2: '',
      color3: '',
     
    }
    
  }

 
  render() {
    
   // console.log("el valor de ver imagen-->"+this.verImagen);
    
    return (

      
      
      
       
        

      <View style={{marginTop:30, flex: 1, backgroundColor: 'steelblue' , flexDirection: 'column', color:'#9f9f9f'}}>
        <ScrollView>
            
                    <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'column', paddingLeft:30 }}>  
                    <TouchableHighlight style={{with:100, flex:1, paddingBottom:20}}
                    title=""
                    // onPress={() => this.props.navigation.navigate('ConsolidacionCarga')}
                    >
                    <Text style={{marginLeft:50, width:200, borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Ingresar pallet n de x</Text>
                    </TouchableHighlight>

                   
                    <View style={{marginBottom:10,borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Ubicación</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Temp °C</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>0.5</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>N° de Pallet</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>404001033</Text>  
                        <Text style={{marginLeft:10}}>Termógrafo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>3567456</Text>                         
                        </View> 
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Posición</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>Punta</Text>  
                                              
                        </View>  
                        <View style={{ flex: .5, backgroundColor: 'white' }}>   
                        <View style={{flex:1,backgroundColor:'#bb4d4b', paddingTop:15, paddingLeft:10}}>
                        <Icon2 style={{}} name="trash-can-outline" size={20} color="white" />
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPalletAgregar')}>
                        <View style={{flex:1,backgroundColor:'#9cc45c', paddingTop:5, paddingLeft:10}}>
                        <Icon style={{paddingTop:5}} name="edit" size={20} color="white" />                      
                        </View>   
                        </TouchableWithoutFeedback>                    
                            </View>
                             </View> 
                    

                    
                    <View style={{marginBottom:10, borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Ubicación</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Temp °C</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>0.5</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>N° de Pallet</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>404001033</Text>  
                        <Text style={{marginLeft:10}}>Termógrafo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>3567456</Text>                         
                        </View> 
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Posición</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>Punta</Text>  
                                              
                        </View>  
                        <View style={{ flex: .5, backgroundColor: 'white' }}>   
                        <View style={{flex:1,backgroundColor:'#bb4d4b', paddingTop:15, paddingLeft:10}}>
                        <Icon2 style={{}} name="trash-can-outline" size={20} color="white" />
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPalletAgregar')}>
                        <View style={{flex:1,backgroundColor:'#9cc45c', paddingTop:5, paddingLeft:10}}>
                        <Icon style={{paddingTop:5}} name="edit" size={20} color="white" />                      
                        </View>  
                        </TouchableWithoutFeedback>                      
                            </View>
                             </View> 
                    

                   
                    <View style={{marginBottom:10,borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Ubicación</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Temp °C</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>0.5</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>N° de Pallet</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>404001033</Text>  
                        <Text style={{marginLeft:10}}>Termógrafo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>3567456</Text>                         
                        </View> 
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Posición</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>Punta</Text>  
                                              
                        </View>  
                        <View style={{ flex: .5, backgroundColor: 'white' }}>   
                        <View style={{flex:1,backgroundColor:'#bb4d4b', paddingTop:15, paddingLeft:10}}>
                        <Icon2 style={{}} name="trash-can-outline" size={20} color="white" />
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPalletAgregar')}>
                        <View style={{flex:1,backgroundColor:'#9cc45c', paddingTop:5, paddingLeft:10}}>
                        <Icon style={{paddingTop:5}} name="edit" size={20} color="white" />                      
                        </View>       
                        </TouchableWithoutFeedback>                 
                            </View>
                             </View> 
                    

                    
                    <View style={{marginBottom:10,borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Ubicación</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Temp °C</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>0.5</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>N° de Pallet</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>404001033</Text>  
                        <Text style={{marginLeft:10}}>Termógrafo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>3567456</Text>                         
                        </View> 
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Posición</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>Punta</Text>  
                                              
                        </View>  
                        <View style={{ flex: .5, backgroundColor: 'white' }}>   
                        <View style={{flex:1,backgroundColor:'#bb4d4b', paddingTop:15, paddingLeft:10}}>
                        <Icon2 style={{}} name="trash-can-outline" size={20} color="white" />
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPalletAgregar')}>
                        <View style={{flex:1,backgroundColor:'#9cc45c', paddingTop:5, paddingLeft:10}}>
                        <Icon style={{paddingTop:5}} name="edit" size={20} color="white" />                      
                        </View>       
                        </TouchableWithoutFeedback>                 
                            </View>
                             </View> 
                   

                    
                    <View style={{marginBottom:10,borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Ubicación</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Temp °C</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>0.5</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>N° de Pallet</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>404001033</Text>  
                        <Text style={{marginLeft:10}}>Termógrafo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>3567456</Text>                         
                        </View> 
                        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Posición</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>Punta</Text>  
                                              
                        </View>  
                        <View style={{ flex: .5, backgroundColor: 'white' }}>   
                        <View style={{flex:1,backgroundColor:'#bb4d4b', paddingTop:15, paddingLeft:10}}>
                        <Icon2 style={{}} name="trash-can-outline" size={20} color="white" />
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPalletAgregar')}>
                        <View style={{flex:1,backgroundColor:'#9cc45c', paddingTop:5, paddingLeft:10}}>
                        <Icon style={{paddingTop:5}} name="edit" size={20} color="white" />                      
                        </View>       
                        </TouchableWithoutFeedback>                 
                            </View>
                             </View> 
                   


      
                      
                      
                    </View>

                  
                    </ScrollView>
        
      </View>
      
    );
  
}
}



export default InformeCaja;