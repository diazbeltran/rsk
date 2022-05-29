import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView,TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'
import Select from '../../component/Select/Select.component.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Feather';
// import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import WSRestApi from '../../services/wsRestApi';


export default class InfoGeneralEmbarque extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,

            orden_embarque:"",
            numero_contenedor:"",
            foto_general_contenedor:"",
            foto_pared_izquierda:"",
            foto_pared_derecha:"",
            exportador_id:"",
            exportador_nombre:"",
            planta_nombre:"",
            fecha_creacion:"",

            exportadorInicio: {},
            data_embarque :{}
        };

        this.exportador = React.createRef();
    }

componentDidMount = async () => {
let usuario = this.props.route.params.usuario, 
planta = this.props.route.params.planta, 
embarque = this.props.route.params.embarque, 
embarque_planta = this.props.route.params.embarque_planta;
let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');


console.log("plantaxxxx -->"+PLANTA_NOMBRE);
            let result;
         await this.embarque_detalle(usuario, planta, embarque, embarque_planta).then(function (data) {
            result = data;
          });

          if (result.state == true) {
        
            console.log("InfoGeneralEmbarque embarque_detalle resultado:-> "+JSON.stringify(result.data));
            //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;
            this.setState({ orden_embarque:result.data.orden_embarque,
            numero_contenedor:result.data.orden_embarque,
            foto_general_contenedor:result.data.orden_embarque,
            foto_pared_izquierda:result.data.orden_embarque,
            foto_pared_derecha:result.data.orden_embarque,
            exportador_id:result.data.orden_embarque,
            exportador_nombre:result.data.orden_embarque,
            planta_nombre:PLANTA_NOMBRE,
            fecha_creacion:result.data.pti});

         //   this.props.navigation.navigate('App')
        }else{
           // this.setState({modalVisible:true})
           console.log("2");
        }

        let paso_respuesta =  JSON.stringify(result.data)
        console.log("respuestaxxxxsxsxs"+ paso_respuesta );
        this.setState({data_embarque:paso_respuesta});

       // console.log("data del embarque -->"+JSON.stringify(this.State.data_embarque));


       let exportador_data;
       await this.exportador_detalle(planta).then(function (data) {
        exportador_data = data;
        });

        if (exportador_data.state == true) {
      
          console.log("InfoGeneralEmbarque exportador_detalle resultado:-> "+JSON.stringify(exportador_data.data));
          //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;
            
          let MyArray = [];
          let MyArray2 = [];
          let datos = exportador_data.data;
          datos.forEach((elem) => {
             
                  let data = {
                      value: elem.id,
                      label: elem.name ,
                      selected: '',
                      //isSelect: elem.isSelect,
                      //selectedClass: elem.selectedClass
                  }
                  
                  let data2 = {
                    value: elem.id,
                    label: elem.name ,
                    selected: '',
                    //isSelect: elem.isSelect,
                    //selectedClass: elem.selectedClass
                }

                  MyArray.push(data);
                  MyArray2.push(elem.name);
              
          });
  
          

          this.setState({exportadorInicio:MyArray2 });
            console.log("data exportador:"+this.state.exportadorInicio);

            
       
      }else{
         // this.setState({modalVisible:true})
         console.log("2");
      }



}

exportador_detalle = async (planta) => {
    try {
      let resultado = await WSRestApi.fnWSExportador( planta);
      //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
      return resultado;
    } catch (error) {
      let resultado = JSON.stringify(error);
      //let resultado = "errorx";
      console.log("ERROR exportador ??? : " + error);
      return resultado;
     // return false
    }
  }

embarque_detalle = async (usuario, planta,embarque, embarque_planta) => {
    try {
      let resultado = await WSRestApi.fnWSDetalleembarque(usuario, planta,embarque, embarque_planta);
      //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
      return resultado;
    } catch (error) {
      let resultado = JSON.stringify(error);
      //let resultado = "errorx";
      console.log("ERROR1??? : " + error);
      return resultado;
     // return false
    }
  }


    envio_menu = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "1");
                await AsyncStorage.setItem("EspecificacionContenedor", "0");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('ConsolidacionCarga')
    };


    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
               <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                    <View style={{}}>
                    <Icon style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18, fontWeight:'bold'}}>Información general del embarque (Precargado) </Text><Icon style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            <Text style={{marginLeft:20, marginTop:10}}>Orden de Embarque</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value={this.state.orden_embarque}
                                    />
                                <Text style={{marginLeft:20, marginTop:10}}>Numero de Contenedor</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value={this.state.numero_contenedor}
                                    />
                        <View>
                        <View style={{marginLeft:30,marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                            <View style={{flex:0.5}}>
                            <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                            </View>
                            <View style={{flex:2, marginLeft:10}}>
                            <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Foto general del contenedor</Text> 
                            </View>                        
                            <View style={{flex:.5}}>
                            <Icon style={{marginLeft:20, marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />           
                            </View>   
                                
                            </View>

                            

                            <View style={{marginLeft:30,marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                            <View style={{flex:0.5}}>
                            <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                            </View>
                            <View style={{flex:2, marginLeft:10}}>
                            <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Foto general pared izquierda</Text> 
                            </View>                        
                            <View style={{flex:.5}}>
                            <Icon style={{marginLeft:20, marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />           
                            </View>   
                                
                            </View>

                            <View style={{marginLeft:30,marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                            <View style={{flex:0.5}}>
                            <Icon style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                            </View>
                            <View style={{flex:2, marginLeft:10}}>
                            <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Foto general pared derecha</Text> 
                            </View>                        
                            <View style={{flex:.5}}>
                            <Icon style={{marginLeft:20, marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />           
                            </View>   
                                
                            </View>

                            
                        </View>
                                
                        <View>
                        <Text style={{marginLeft:20, marginTop:10}}>Planta</Text> 
                        <Text style={{marginLeft:20, marginTop:10, fontWeight:'bold'}}>{this.state.planta_nombre.replace(/['"]+/g, '')}</Text> 
                        </View>
                       

                        <Text style={{marginLeft:20, marginTop:10}}>Exportador</Text> 
                        <View  style={{backgroundColor:'#efeeef', width:'85%', marginLeft:30}} >
                            {/* <Select  
                            ref={this.exportador}
                            label={this.state.exportador_nombre}
                            value={this.state.exportador_id}
                            datos={this.state.exportadorInicio}
                            key='1'
                            //   datos={this.state.beneficiarios} 
                            /> */}

                            <SelectDropdown
                            data={this.state.exportadorInicio}
                            defaultButtonText ={this.state.exportador_nombre}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            >
                                
                            </SelectDropdown>
                        </View>

                        <View>
                            <Text style={{marginLeft:20, marginTop:10}}>Fecha creacion</Text> 
                            <Text style={{marginLeft:20, marginTop:10, fontWeight:'bold'}}>{this.state.fecha_creacion}</Text> 
                            </View>
                    
                            <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, paddingBottom:20}}>
                <TouchableHighlight style={{with:10}}
                        title="Press me"
                         onPress={() => this.envio_menu()}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Ingresar</Text>
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