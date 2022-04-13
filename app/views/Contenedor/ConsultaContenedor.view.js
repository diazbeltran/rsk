import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'
import Select from '../../component/Select/Select.component.js';

import { TouchableHighlight } from 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/Feather';
//import Icon2 from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


export default class ConsultaContenedor extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            
            exportadorInicio: {
                label: "Aeurus ",
                value: "1"
            },
        };

        this.exportador = React.createRef();
    }

    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}>
                    <View style={{}}>
                    <Icon style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:10, color:'white',marginTop:0, fontSize:18, textAlign:'center'}}>Consulta Contenedorx</Text><Icon style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            <Text style={{marginLeft:20, marginTop:10}}>Orden de Embarque</Text> 
                            <TextInput
                                    style={styles.input}
                                    
                                    // onChangeText={(clave) => this.setState({clave})}
                                   // onChangeText={(text) => this.validate(text)} 
                                    value=''
                                    />
                                <Text style={{marginLeft:20, marginTop:10}}>Numero de Contenedor</Text> 
                            <TextInput
                                    style={styles.input}
                                   
                                    // onChangeText={(clave) => this.setState({clave})}
                                   // onChangeText={(text) => this.validate(text)} 
                                    value=''
                                    />
                        <View>
                       

                        <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                            >
                        <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:70,paddingRight:80, backgroundColor:'#ef882d', color:'white', }}
                        >Foto general contenedor</Text>
                            </TouchableHighlight>
                    </View>
                    <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                            >
                        <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:65,paddingRight:60, backgroundColor:'#ef882d', color:'white', }}
                        >Foto general paded izquierda</Text>
                            </TouchableHighlight>
                    </View>
                    <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
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
    <Select  
        ref={this.exportador}
        label={this.state.exportadorInicio.label}
        value={this.state.exportadorInicio.value}
        datos={[
            { label: 'Opción 1', value: '1' },
            { label: 'Opción 2', value: '2' },
            { label: 'Opción 3', value: '3' },
        ]}
     //   datos={this.state.beneficiarios} 
        />
</View>
                        <View>
                            <Text style={{marginLeft:20, marginTop:10}}>Fecha creacion</Text> 
                            <Text style={{marginLeft:20, marginTop:10, fontWeight:'bold'}}>22-09-2021</Text> 
                            </View>
                    
                                
                            
                                </ScrollView>
                            </View>                           
               
                
                
                <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
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