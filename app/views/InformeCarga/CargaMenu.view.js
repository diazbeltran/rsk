import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback, FlatList} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'
import datacarga from '../../assets/json/informesPrecargados.json'

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


class  botonesMenu extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            informeGeneral:false,
                identificacionCarga: false,
                EspecificacionContenedor:false,
                FotosContenedor:false,
                EstibaPallet:false,
                FotosConsolidacionCarga:false,
                Observaciones:false,
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
}

export default class ConsolidacionCarga extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            informeGeneral:false,
                identificacionCarga: false,
                EspecificacionContenedor:false,
                FotosContenedor:false,
                EstibaPallet:false,
                FotosConsolidacionCarga:false,
                Observaciones:false,
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
    async UNSAFE_componentWillMount() {

        try {}
        catch{}
    }
    async   UNSAFE_componentWillMount() {

        try {
            const { route } = this.props;

           
            
             // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
           //  const responseJson = navigation.getParam("EstadoProceso");
             const responseJson2 = route.params["EstadoProceso"];

             
            console.log("data -->"+JSON.stringify(datacarga));

       var jsonString = JSON.stringify(this.state.EstadoProceso);
       console.log("estados -..>"+jsonString);
       console.log("estados -..>"+JSON.stringify(responseJson2));
            this.setState({informeGeneral :responseJson2.informeGeneral})
       // this.recibirDatos()

        }
        catch(error){
            console.log(error);
        }


      
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('Se ejecuta componentWillReceiveProps con las propiedades futuras', nextProps)
       // this.recibirDatos()
      }

      mostrarCuadrosImagen = ({ item }) => {
        return (
            <TouchableOpacity
                
                onPress={console.log("hola")}
            >
                <View >
                   <Text>hola</Text>
                </View>
            </TouchableOpacity>
        )
    }



  

    render() {
        const DatoObservaciones = this.state.EstadoProceso.Observaciones;
        const DatoInforme = this.state.informeGeneral;
        let button;
        

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('App')}>
                    <View style={{}}>
                    <Icon style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:20, color:'white',marginTop:0, fontSize:16}}>Informe consolidación de carga</Text><Icon style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: '#6c649c', flexDirection: 'column'}} >
                <ScrollView>

               

                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoGeneralEmbarqueNuevo', {estados:this.state.EstadoProceso})}>
                    <View style={{paddingTop:5,marginLeft:20,marginTop:20, borderWidth:1,opacity:.3, borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', height:50, justifyContent:'space-around'}}>
                    <View style={{flex:0.4}}>
                   
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
                       
                    <Icon2 style={[(this.state.EstadoProceso.Observaciones) ? styles.a : styles.b]} name="navigate-next" size={20} color="white" />
                    </View>
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                    
                    
                </ScrollView>

                </View>   

                <View>
                <FlatList
                        data={datacarga}
                        renderItem={this.mostrarCuadrosImagen}
                        
                        showsHorizontalScrollIndicator={false}
                    >
                    </FlatList></View>                        
               
                
                
               
               
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
    a :{
        backgroundColor:'red',
       // name:"navigate-next"
    },
    b : {
        backgroundColor:'blue',
        //name:"trash"
    }
  });