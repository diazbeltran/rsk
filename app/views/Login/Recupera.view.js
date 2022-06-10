import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button, Modal } from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/Footer.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import { TouchableHighlight } from 'react-native-gesture-handler';
import WSRestApi from '../../services/wsRestApi.js';

export default class InformePrecargado extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            email :'',
            modalVisible:false,
            modalVisibleok:false,
            
        };

        
    }


    ingresa_recuperar = async (correo) => {

        console.log("holiwisiwi -->"+correo);
        
        //this.props.navigation.navigate('App')

        // console.log("URL BCI : " + url);
        await this.recupera_pass(correo).then(function (data) {
            result = data;
          });
  
          
          if (result.state == true) {
          
              console.log("hola raton con cola 11");
              this.setState({modalVisibleok:true})
          }
          else{
            this.setState({modalVisible:true})
          }
  



    }

    recupera_pass = async (correo) => {
        try {
          let resultado = await WSRestApi.fnWSRecuperaPass(correo);
          //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
          return resultado;
        } catch (error) {
          console.log("ERROR??? : " + error);
          return false
        }
      }



    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' ,alignItems:'center'}} >
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={{  width: 250, height:250, marginTop:10,resizeMode: 'center'}} source={require('../../assets/img/logo_1.png')} />
                </View>

                </View>
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
                      <Text style={{marginTop:'30%'}}>Error</Text>
                    
                        </View>
                        <View style={{flex:0.3,alignItems:'center'}}>
                        <Button 
                        color="#ef882d"
                        title="Cerrar"
                        onPress={() => {this.setState({modalVisible:false})} }
                      />
                    
                        </View>
                        
                  
                  </View>
                    
                </Modal>

                <Modal animationType="fade"
                   
                    transparent={true}
                    visible={this.state.modalVisibleok}
                    onRequestClose={() => {
                        console.log("wololo"), this.setState({modalVisible:false})
                        //Alert.alert('Modal has been closed.');
                    }}
                    >
                  <View style={{flex:0.7,marginLeft:'10%',marginTop:'25%', backgroundColor:"#efeeef",  width:'80%', flexDirection:'column', borderRadius:20}}>
                    <View style={{flex:1,alignItems:'center'}}>
                      <Text style={{marginTop:'30%'}}>Se envio la contraseña a su correo</Text>
                    
                        </View>
                        <View style={{flex:0.3,alignItems:'center'}}>
                        <Button 
                        color="#ef882d"
                        title="Cerrar"
                        onPress={() => { this.props.navigation.navigate('Login')} }
                      />
                    
                        </View>
                        
                  
                  </View>
                    
                </Modal>


                
                <View style={{ flex: 1, backgroundColor: 'white' }} >
                <View style={{flex:0.5}}>
                       <Text style={{marginLeft:'30%', fontWeight:'bold'}}>Password recovery</Text> 
                       
                    </View>
                    <View>
                       <Text style={{marginLeft:30}}>Enter registerred email</Text> 
                       <TextInput
                        style={styles.input}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={{with:10}}
                        title="recupera_pass"
                        onPress={() => this.ingresa_recuperar(this.state.email)}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Send</Text>
                            </TouchableHighlight>
                    </View>
                    <View style={{alignItems:'center'}}>
                        {/* <TouchableHighlight style={{with:10,height:20, marginTop:20}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('Login')}
                            >
                                <Text style={{color:'#ef882d'}}>atras</Text>
                            </TouchableHighlight> */}
                    </View>

                </View>
                <View style={{ flex: .5, backgroundColor: 'steelblue' }} >
                    
                    <Footer></Footer>
                </View>

          </View>
        );
    }



}
const styles = StyleSheet.create({
    input: {
      marginLeft:30,
      height: 35,
      width:'80%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
    },
  });