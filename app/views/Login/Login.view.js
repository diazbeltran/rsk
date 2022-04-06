import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button } from 'react-native';
import loginStyle from './login.style.js';
import Footer from '../../component/Footer/Footer.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
export default class Login extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            correo:'',
            clave:'',
            email :'',
        };

        
    }
    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          this.setState({ email: text })
          return false;
        }
        else {
          this.setState({ email: text })
          console.log("Email is Correct");
        }
      }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: .5, backgroundColor: 'white' ,alignItems:'center'}} >
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={{  width: 100, height:100, marginTop:40,resizeMode: 'center'}} source={require('../../assets/img/logo_1.png')} />
                </View>

                </View>
                
                
                <View style={{ flex: 1, backgroundColor: 'white' }} >
                    <View >
                       <Text style={{marginLeft:20}}>Correo</Text> 
                       <TextInput
                        style={styles.input}
                        onChangeText={(correo) => this.setState({correo})}
                        value={this.state.text}
                        />
                    </View>
                    <View>
                       <Text style={{marginLeft:20}}>Contraseña</Text> 
                       <TextInput
                        style={styles.input}
                       // onChangeText={(clave) => this.setState({clave})}
                       onChangeText={(text) => this.validate(text)} 
                       value={this.state.clave}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('App')}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Ingresar</Text>
                            </TouchableHighlight>

                            {/* <TouchableOpacity onPress={async () => {
                                    if (await CheckConnectivity.fnCheckConnectivity() == true) {
                                        this.props.navigation.navigate('DatosConstancia', { fechaAccidente: this.state.fechaSeleccionada })
                                    } else {
                                        this.setState({ tituloHint: 'Error de conexión' });
                                        this.Hint.current.mostrarConParametros("No está conectado a internet, por favor encienda WiFi o 3G.");
                                    }

                                }}>
                                    <View style={{ backgroundColor: "#E6E6E6", width: "100%", height: this.state.alturaBotonIngreseDatosConstancia, borderRadius: 4, opacity: this.state.opacidadElementosConstancia, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, paddingTop: Platform.OS == "ios" ? 5 : 2 }}>
                                        {this.state.fontLoaded == true ? (<Text style={{ ...styles.textoChicoLigth, marginBottom: 3, opacity: this.state.opacidadElementosConstancia }}>Ingresa datos</Text>) : (<Text>Loading ... </Text>)}
                                        <Icon3 name="caretright" color="#848484" size={15} style={{ opacity: this.state.opacidadElementosConstancia }}></Icon3>
                                    </View>
                                </TouchableOpacity> */}

                                    
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={{with:10,height:20, marginTop:20}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('Recupera')}
                            >
                                <Text style={{color:'#ef882d',backgroundColor:'white'}}> <Icon name="key" size={15} color="#ef882d" />Recuperar Contraseña</Text>
                            </TouchableHighlight>
                    </View>

                </View>
                <View style={{ flex: .5, backgroundColor: 'steelblue' }} >
                    
                    <Footer
                    imagen={true}></Footer>
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