import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button } from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/Footer.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class InformePrecargado extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            email :'',
        };

        
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' ,alignItems:'center'}} >
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={{  width: 250, height:250, marginTop:10,resizeMode: 'center'}} source={require('../../assets/img/logo_1.png')} />
                </View>

                </View>
                
                
                <View style={{ flex: 1, backgroundColor: 'white' }} >
                    
                    <View>
                       <Text style={{marginLeft:30}}>Ingresar correo electrónico registrado</Text> 
                       <TextInput
                        style={styles.input}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('App')}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Ingresar</Text>
                            </TouchableHighlight>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableHighlight style={{with:10,height:20, marginTop:20}}
                        title="Press me"
                        onPress={() => this.props.navigation.navigate('Login')}
                            >
                                <Text style={{color:'#ef882d'}}>atras</Text>
                            </TouchableHighlight>
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