import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';



import Select from '../../component/Select/Select.component.js';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
export default class InfoGeneralEmbarque extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,

            recibidorInicio: {
                label: "Aeurus ",
                value: "1"
            },

            
        };
        this.recibidor = React.createRef();
        
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

               
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Identificación de carga </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            
                                <Text style={{marginLeft:20, marginTop:10}}>Numero de Contenedor</Text> 
                            <TextInput
                                    style={styles.input}
                                    editable={false}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value='345'
                                    />
                                    <View style={{marginLeft:100, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:5,paddingRight:5, backgroundColor:'#ef882d', color:'white', }}>Tomar fotografia</Text>
                            </TouchableHighlight>
                            <View style={{flex:1, marginLeft:20}}>
                                    <Icon2 style={{marginRight:0}} name="information-circle-sharp" size={30}  />
                                </View>
                    </View>
                        

                       <View>
                       <Text style={{marginLeft:30, marginTop:10}}>Motonave</Text> 
                            <TextInput
                                    style={styles.input}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value={this.state.clave}
                                    />
                           </View>     


                           <View>
                       <Text style={{marginLeft:30, marginTop:10}}>Recibidor</Text> 
                       <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >
                            <Select  
                            ref={this.recibidor}
                            label={this.state.recibidorInicio.label}
                            value={this.state.recibidorInicio.value}
                            datos={[
                            { label: 'Agro World', value: '1' },
                            { label: 'Avrora', value: '2' },
                            { label: 'Berry Fresh LLC', value: '3' },
                            ]}
                            //   datos={this.state.beneficiarios} 
                            />
                        </View>
                           </View>  

                           <View>
                       <Text style={{marginLeft:30, marginTop:10}}>Puerto de Carga</Text> 
                       <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >
                            <Select  
                            ref={this.recibidor}
                            label={this.state.recibidorInicio.label}
                            value={this.state.recibidorInicio.value}
                            datos={[
                            { label: 'Agro World', value: '1' },
                            { label: 'Avrora', value: '2' },
                            { label: 'Berry Fresh LLC', value: '3' },
                            ]}
                            //   datos={this.state.beneficiarios} 
                            />
                        </View>
                           </View>  

                           <View>
                       <Text style={{marginLeft:30, marginTop:10}}>Puerdo de Destino</Text> 
                       <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >
                            <Select  
                            ref={this.recibidor}
                            label={this.state.recibidorInicio.label}
                            value={this.state.recibidorInicio.value}
                            datos={[
                            { label: 'Agro World', value: '1' },
                            { label: 'Avrora', value: '2' },
                            { label: 'Berry Fresh LLC', value: '3' },
                            ]}
                            //   datos={this.state.beneficiarios} 
                            />
                        </View>
                           </View>  
                       
                           <View>
                       <Text style={{marginLeft:30, marginTop:10}}>N° de booking</Text> 
                            <TextInput
                                    style={styles.input}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value={this.state.clave}
                                    />
                           </View>  

                           <View style={{flexDirection:'row'}}>
                               <View style={{flex:1}}>
                               <Text style={{marginLeft:30, marginTop:10}}>Especie</Text> 
                               <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >
                            <Select  
                            ref={this.recibidor}
                            label={this.state.recibidorInicio.label}
                            value={this.state.recibidorInicio.value}
                            datos={[
                            { label: 'Agro World', value: '1' },
                            { label: 'Avrora', value: '2' },
                            { label: 'Berry Fresh LLC', value: '3' },
                            ]}
                            //   datos={this.state.beneficiarios} 
                            />
                        </View>
                               </View>
                               <View style={{flex:1}}>
                               <Text style={{marginLeft:30, marginTop:10}}>Cant. Pallet</Text> 
                            <TextInput
                                    style={{marginLeft:30,
                                        height: 40,
                                        width:'60%',
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        backgroundColor: '#efeeef',
                                        borderRadius: 5,
                                        borderColor: '#dadee3',}}
                                    // onChangeText={(clave) => this.setState({clave})}
                                    onChangeText={(text) => this.validate(text)} 
                                    value={this.state.clave}
                                    />
                               </View>
                      
                           </View>  
                        
                        <View style={{flexDirection:'row'}}>
                            <Icon2 style={{color:'#ef882d', marginLeft:30}} name="add-circle" size={25}  />
                            <Text style={{ color:'#ef882d', fontWeight:'bold', paddingTop:5}}>  Agregar una nueva especie</Text>
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
      width:'80%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
      
    },
  });