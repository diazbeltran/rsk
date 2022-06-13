import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginStyle from './login.style.js';
import Footer from '../../component/Footer/Footer.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

import WSRestApi from '../../services/wsRestApi.js';


export default class Login extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
           // correo:'tecnico@aeurus.cl',
           correo:'',
            ///clave:'12345678',
            clave:'',
            email :'',
            modalVisible:false,
            modal_error:'',
            dato1:'',
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
          //this.setState({ email: text })correo
          this.setState({ email: correo })
          console.log("Email is Correct");
        }
      }

      ingresar_login= async (correo, pass) =>{
        let result = "";

        console.log("correo: "+correo);
        console.log("pass: "+pass);
        //this.props.navigation.navigate('App')
      try{
       // console.log("URL BCI : " + url);
        await this.consulta_login(correo, pass).then(function (data) {
          result = data;
        });

        console.log("seguimiento ws que no carga :"+result);

        if (result.state == true) {
        
            console.log("hola raton con cola "+JSON.stringify(result.data));
            let USUARIO_ID = JSON.stringify(result.data.id);
            let PLANTA_ID = JSON.stringify(result.data.planta_id);
            let DATA = JSON.stringify(result.data);
            let PLANTA_NOMBRE = JSON.stringify(result.data.planta_nombre);
            
            AsyncStorage.setItem('USUARIO_ID', USUARIO_ID);
            AsyncStorage.setItem('PLANTA_ID', PLANTA_ID);
            AsyncStorage.setItem('USUARIO_DATA', DATA);
            AsyncStorage.setItem('PLANTA_NOMBRE', PLANTA_NOMBRE);
            this.props.navigation.navigate('App')
        }else{
          let paso = JSON.stringify(result);
          console.log("errorxxxxxx"+ paso);
            this.setState({modalVisible:true, dato1:'23', modal_error:paso})
            
            
        }
      }catch(error){
        this.setState({modalVisible:true, dato1:'24', modal_error:error})
      }

      }

      consulta_login = async (username, password) => {
        try {
          let resultado = await WSRestApi.fnWSUsuarioApp(username, password);
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




    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: .5, backgroundColor: 'white' ,alignItems:'center'}} >
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={{  width: 100, height:100, marginTop:40,resizeMode: 'center'}} source={require('../../assets/img/logo_1.png')} />
                </View>

                </View>
               
                
                <View style={{ flex: 1, backgroundColor: 'white' }} >
                <Modal animationType="fade"
                   
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("wololo"), this.setState({modalVisible:false})
                        //Alert.alert('Modal has been closed.');
                    }}
                    >
                  <View style={{flex:0.7,marginLeft:'10%',marginTop:'25%', backgroundColor:"#efeeef",  width:'80%', flexDirection:'column', borderRadius:20}}>
                    <View style={{flex:1,alignItems:'center'}}>
                      <Text style={{marginTop:'30%'}}>Credentials error</Text>
                    
                        </View>
                        <View style={{flex:0.3,alignItems:'center'}}>
                        <Button 
                        color="#ef882d"
                        title="Close"
                        onPress={() => {this.setState({modalVisible:false})} }
                      />
                    
                        </View>
                      {/* <Text>{this.state.dato1} +{this.state.modal_error}</Text>   */}
                  
                  </View>
                    
                </Modal>
                    <View >
                       <Text style={{marginLeft:'10%', color:'#747474'}}>User</Text> 
                       <TextInput
                        style={styles.input}
                        onChangeText={(correo) => this.setState({correo})}
                        value={this.state.text}
                        />
                    </View>
                    <View>
                       <Text style={{marginLeft:'10%', color:'#747474'}}>Password</Text> 
                       <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(clave) => this.setState({clave})}
                      // onChangeText={(text) => this.validate(text)} 
                       value={this.state.clave}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={{with:10}}
                        title="Ingresar"
                        onPress={() => this.ingresar_login(this.state.correo, this.state.clave)}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }} underlayColor={'red'}>Enter</Text>
                            </TouchableHighlight>

                           
                                    
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={{with:10,height:20, marginTop:20}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('Recupera')}
                            >
                                <Text style={{color:'#ef882d',backgroundColor:'white'}}> <Icon name="key" size={15} color="#ef882d" />Recover Password</Text>
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