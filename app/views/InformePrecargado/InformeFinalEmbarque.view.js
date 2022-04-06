import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'


import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
export default class InfoFinalEmbarque extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            EstadoProceso :{
                informeGeneral:false,
                identificacionCarga: false,
                EspecificacionContenedor:false,
                FotosContenedor:false,
                EstibaPallet:false,
                FotosConsolidacionCarga:false,
                Observaciones:false
            }
        };

        
    }

    UNSAFE_componentWillMount() {
       // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
       var jsonString = JSON.stringify(this.state.EstadoProceso);
       console.log("estados -..>"+jsonString);
       // this.recibirDatos()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('Se ejecuta componentWillReceiveProps con las propiedades futuras', nextProps)
       // this.recibirDatos()
      }

  

    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('App')}>
                    <View style={{}}>
                    <Icon style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:60, color:'white',marginTop:0, fontSize:16}}>Informe final de carga x</Text><Icon style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: '#6c649c', flexDirection: 'column'}} >
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarqueNuevo', {estados:this.state.EstadoProceso})}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Información general del embarque</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IdentificacionCarga')}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Identificación de carga</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>



                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EspecificacionContenedor')}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Especificación del contenedor</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosContenedor')}>
                    <View style={{paddingTop:5, marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Fotos contenedor vacio</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPallet')}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
                    </View>
                     <View style={{flex:3}}>
                     <Text style={{color:'white',marginTop:10}}>Estiba de pallets</Text>
                     </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                           
                    </View> 
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FotosCarga')}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
                    </View>
                    <View style={{flex:3}}>
                    <Text style={{color:'white',marginTop:10}}>Fotos de consolidacion de carga</Text>
                    </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Observacion')}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20,marginBottom:20, borderWidth:1,opacity:.8, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                    {/* <Icon style={{marginLeft:10, marginTop:10}} name="checkmark-circle" size={20} color="white" /> */}
                    </View>
                    <View style={{flex:3}}>
                    <Text style={{color:'white',marginTop:10}}>Observaciones</Text>
                    </View>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:10, marginTop:10}} name="navigate-next" size={20} color="white" />
                    </View>
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                    
                    
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