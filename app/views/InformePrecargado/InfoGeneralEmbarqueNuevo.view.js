import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
//import TextInput from '../../../components/TextInput/TextInput.component.js';
import SelectDropdown from 'react-native-select-dropdown'
import Select from '../../component/Select/Select.component.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/Feather';
//import Icon2 from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
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
            
           

            orden_embarque:'',
            numero_contenedor:'',

            exportadorInicio: {},

        };

        this.exportador = React.createRef();
        
        this.TextInputOrdenEmbarque = React.createRef();
        this.TextInputNumeroContenedor = React.createRef();

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


     
    componentDidMount =async () =>{

        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');
        let exportador_data;
        await this.exportador_detalle(PLANTA_ID).then(function (data) {
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
                   MyArray2.push(elem.name +" "+ elem.last_name);
               
           });
   
           
 
           this.setState({exportadorInicio:MyArray2 });
             console.log("data exportador:"+this.state.exportadorInicio);
 
             
        
       }else{
          // this.setState({modalVisible:true})
          console.log("2");
       }

    }

    onChangeText =(e) =>{
       // console.log("wewe "+e);
        this.setState({orden_embarque:e})
    }

    onChangeTextNumeroContenedor =(e) =>{
        //console.log("wewe "+e);
        this.setState({numero_contenedor:e})
    }



    validarOrdenEmbarque = (item) => {

        let validacion = true;

        let expNumeros = /^[0-9]+$/;
        let expLetras = /^[a-zA-Z\s]+$/;

    //     let orden_embarquex = this.TextInputOrdenEmbarque.current.devolverTexto() == null ? "" : this.TextInputOrdenEmbarque.current.devolverTexto();

    //    console.log("se ha ingresado esta direccion ->", orden_embarquex);

    //     if (orden_embarquex.trim() != "") {
    //         //si ha ingresado una palabra debemos verificar que no ingresen caracteres especiales 
    //         for (let i = 0; i < orden_embarquex.length; i++) {
    //             if (expLetras.test(orden_embarquex.charAt(i)) || expNumeros.test(orden_embarquex.charAt(i))) {
    //                // this.TextInputDireccion.current.msjAlert("");
    //                console.log("aqui 1");
    //             } else {
    //                 //this.TextInputDireccion.current.msjAlert("Ingresa la dirección válida.");
    //                 console.log("aqui 2");
    //                 validacion = false;
    //             }
    //         }
    //     } else if (orden_embarquex.trim() == "") {
    //        // this.TextInputDireccion.current.msjAlert("Ingresa la dirección donde ocurrió el siniestro.");
    //        console.log("aqui 3");
    //         validacion = false;
    //     }
        let datox = JSON.stringify(item)
        console.log("validacion embarque"+datox );
        if (validacion == true) {
            this.setState({ orden_embarque: item });
        } else {
            //this.setState({ direccion: null });
            this.setState({ orden_embarque: orden_embarquex });
        }

        console.log("el resultado de la validacion es : ", validacion);
        return validacion;
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


        this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
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

               
                    <Text style={{flex:1,marginLeft:10, color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>General shipment information</Text><Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            <Text style={{marginLeft:20, marginTop:10}}>Orden de Embarque</Text> 
                            <TextInput
                                    style={styles.input}
                                    ref={ this.TextInputOrdenEmbarque }
                                    // onChangeText={(clave) => this.setState({clave})}
                                   // onChangeText={(text) => this.validate(text)} 
                                   //onBlur={(item) => this.validarOrdenEmbarque(item.texto)}
                                   onChangeText={text => this.onChangeText(text)} 
                                   texto={this.state.orden_embarque}
                                    />
                                <Text style={{marginLeft:20, marginTop:10}}>Numero de Contenedor</Text> 
                            <TextInput
                                    style={styles.input}
                                    ref={ this.TextInputNumeroContenedor }
                                    onChangeText={text => this.onChangeTextNumeroContenedor(text)} 
                                    // onChangeText={(clave) => this.setState({clave})}
                                   // onChangeText={(text) => this.validate(text)} 
                                   texto={this.state.numero_contenedor}
                                    />
                        <View>
                       

                        <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('TomarFoto')}
                            >
                        <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:70,paddingRight:80, backgroundColor:'#ef882d', color:'white', }}
                        >Foto general contenedor</Text>
                            </TouchableHighlight>
                    </View>
                    <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('TomarFoto')}
                            >
                        <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:65,paddingRight:60, backgroundColor:'#ef882d', color:'white', }}
                        >Foto general paded izquierda</Text>
                            </TouchableHighlight>
                    </View>
                    <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('TomarFoto')}
                            >
                        <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:70,paddingRight:60, backgroundColor:'#ef882d', color:'white', }}
                        >Foto general pared derecha</Text>
                            </TouchableHighlight>
                    </View>

                            
                            

                            
                        </View>
                                
                        <View>
                        <Text style={{marginLeft:20, marginTop:10}}>Planta</Text> 
                        <Text style={{marginLeft:20, marginTop:10, fontWeight:'bold'}}>Nombre de la Planta</Text> 
                        </View>
                       

                        <Text style={{marginLeft:20, marginTop:10}}>Exportador</Text> 
                        {/* <TextInput
                                style={styles.input}
                                // onChangeText={(clave) => this.setState({clave})}
                                //onChangeText={(text) => this.validate(text)} 
                                value={this.state.clave}
                                /> */}

                        <View  style={{backgroundColor:'#efeeef', width:'85%', marginLeft:30}} >
                            {/* <Select  
                                ref={this.exportador}
                                label={this.state.exportadorInicio.label}
                                value={this.state.exportadorInicio.value}
                                datos={[
                                    { label: 'Opción 1', value: '1' },
                                    { label: 'Opción 2', value: '2' },
                                    { label: 'Opción 3', value: '3' },
                                ]}
                            //   datos={this.state.beneficiarios} 
                                /> */}
                                <SelectDropdown width='100%'
                            data={this.state.exportadorInicio}
                            defaultButtonText ='Seleccionar un exportador'
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
                        <Text style={{marginLeft:20, marginTop:10, fontWeight:'bold'}}>22-09-2021</Text> 
                        </View>
                    
                        
                        <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, paddingBottom:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.envio_menu()}
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
      width:'85%',
      opacity:.5,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
    },
  });