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
                    <View style={{ flex: 1, backgroundColor: '#f38c1c' }}>                    
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#73bb4c' }}>
                    
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#7576b2' }}>
                   
                    </View>
        
      </View>
      
    );
  
}
}



export default FooterSimple;