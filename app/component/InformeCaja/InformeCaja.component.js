import React, { Component } from 'react';
import { View, Text, TextInput, Image ,ScrollView, TouchableWithoutFeedback} from 'react-native';
import Styles from './InformeCaja.style.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    
  //  console.log("el valor de ver imagen-->"+this.verImagen);
    
    return (

      
      
      
       
        

      <View style={{marginTop:30, flex: 1, backgroundColor: 'steelblue' , flexDirection: 'column', color:'#9f9f9f'}}>
        <ScrollView>
                    <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'column', paddingLeft:20 }}>   
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque')}>
                    <View style={{borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                        <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Orden de embarque</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Numero de Contenedor</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>345FFD</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>Exportador</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Aerus</Text>  
                        <Text style={{marginLeft:10}}>Tipo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Multiplataforma</Text>                         
                        </View> 
                        <View style={{ flex: .3, backgroundColor: 'white' }}>   
                        <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />                      
                        </View>    

                        
                               {/* <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />  */}
                                  
                      </View> 
      </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque')}>
                    <View style={{borderWidth:1,borderColor:'#9f9f9f', marginTop:10, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                        <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Orden de embarque</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Numero de Contenedor</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>345FFD</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>Exportador</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Aerus</Text>  
                        <Text style={{marginLeft:10}}>Tipo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Multiplataforma</Text>                         
                        </View> 
                        <View style={{ flex: .3, backgroundColor: 'white' }}>   
                        <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />                      
                        </View>    

                        
                               {/* <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />  */}
                                  
                      </View> 
      </TouchableWithoutFeedback>


      
                    



                       

                      <View style={{borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around', marginTop:20}}>
                        <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Orden de embarque</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Numero de Contenedor</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>345FFD</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>Exportador</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Aerus</Text>  
                        <Text style={{marginLeft:10}}>Tipo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Multiplataforma</Text>                         
                        </View> 
                        <View style={{ flex: .3, backgroundColor: 'white' }}>   
                        <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />                      
                        </View>        
                      </View>

                      <View style={{borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around', marginTop:20}}>
                        <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Orden de embarque</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Numero de Contenedor</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>345FFD</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>Exportador</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Aerus</Text>  
                        <Text style={{marginLeft:10}}>Tipo</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Multiplataforma</Text>                         
                        </View> 
                        <View style={{ flex: .3, backgroundColor: 'white' }}>   
                        <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />                      
                        </View>        
                      </View>

                      <View style={{borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around', marginTop:20}}>
                        <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                        <Text style={{marginLeft:10}}>Orden de embarque</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                        <Text style={{marginLeft:10}}>Numero de Contenedor</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>345FFD</Text>                       
                        </View>  
                        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                        <Text style={{marginLeft:10}}>Exportador</Text>
                        <Text style={{marginLeft:10, fontWeight:'bold'}}>Aerus</Text>  
                                            
                        </View> 
                        <View style={{ flex: .3, backgroundColor: 'white' }}>   
                        <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />                      
                        </View>        
                      </View>
                      
                      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque')}>
                        <View style={{borderWidth:1, marginTop:10,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
                            <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
                            <Text style={{marginLeft:10}}>Orden de embarque</Text>
                            <Text style={{marginLeft:10, fontWeight:'bold' }}>A45645</Text>  
                            <Text style={{marginLeft:10}}>Numero de Contenedor</Text>
                            <Text style={{marginLeft:10, fontWeight:'bold'}}>345FFD</Text>                       
                            </View>  
                            <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
                            <Text style={{marginLeft:10}}>Exportador</Text>
                            <Text style={{marginLeft:10, fontWeight:'bold'}}>Aerus</Text>  
                                                  
                            </View> 
                            <View style={{ flex: .3, backgroundColor: 'white' }}>   
                            <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />                      
                            </View>    

                            
                                  {/* <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />  */}
                                      
                          </View> 
                        </TouchableWithoutFeedback>
                      
                      
                    </View>

                  
                    </ScrollView>
        
      </View>
      
    );
  
}
}



export default InformeCaja;