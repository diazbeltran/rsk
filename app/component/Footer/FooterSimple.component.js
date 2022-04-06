import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import Styles from './Footer.style';

class FooterSimple  extends Component {

  constructor(props) {
    super(props);

    this.state = {

      color1: '',
      color2: '',
      color3: '',
     
    }
    
  }

 
  render() {
    
   // console.log("el valor de ver imagen-->"+this.verImagen);
    
    return (

      
      
      
       
        

      <View style={{ flex: 1, backgroundColor: 'steelblue' , flexDirection: 'row'}}>
                    <View style={{ flex: 1, backgroundColor: '#d99133' }}>                    
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#679527' }}>
                    
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#9e7e9e' }}>
                   
                    </View>
        
      </View>
      
    );
  
}
}



export default FooterSimple;