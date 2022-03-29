import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import Styles from './FormLogin.style';

class FormLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {

      color1: '',
      color2: '',
      color3: '',

    };
  }

 
  render() {
    
    return (

        <View style={{ flex: 1, backgroundColor: 'steelblue' , flexDirection: 'column'}}>
        <View>
                       <Text>Usuario</Text> 
                       <TextInput
                        style={styles.input}
                        //onChangeText={onChangeText}
                        value={"text"}
                        />
                    </View>
                    <View>
                       <Text>Usuario</Text> 
                       <TextInput
                        style={styles.input}
                        //onChangeText={onChangeText}
                        value={"text"}
                        />
                    </View>
      </View>
    );
  }
}



export default FormLogin;