import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import Styles from './Footer.style';

class Footer  extends Component {

  constructor(props) {
    super(props);

    this.state = {

      color1: '',
      color2: '',
      color3: '',
      verImagen:true,
    }
    
  }
  async componentDidMount() {
//console.log("gola"+ this.props.imagen);
this.setState({verImagen:this.props.imagen})
  }
 
  render() {
    
    //console.log("el valor de ver imagen-->"+this.verImagen);
    if (this.state.verImagen==false){
        return(
        <View style={{ flex: 1, backgroundColor: 'steelblue' , flexDirection: 'column'}}>
        
      
       

     <View style={{ flex: 0.1, backgroundColor: 'steelblue' , flexDirection: 'row'}}>
                   <View style={{ flex: 1, backgroundColor: '#d99133' }}>                    
                   </View>
                   <View style={{ flex: 1, backgroundColor: '#679527' }}>
                   
                   </View>
                   <View style={{ flex: 1, backgroundColor: '#9e7e9e' }}>
                  
                   </View>
       
     </View>
     </View>);
    }
    else{
    return (

        <View style={{ flex: 1, backgroundColor: 'steelblue' , flexDirection: 'column'}}>
      
      
         <View style={{ flex: 1, backgroundColor: 'steelblue' , flexDirection: 'row'}}>
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={Styles.logo2} source={require('../../assets/img/logo_footer_1.png')} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={Styles.logo2} source={require('../../assets/img/logo_footer_2.png')} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={Styles.logo2} source={require('../../assets/img/logo_footer_4.png')} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' , flexDirection: 'row'}}>
                        <Image style={Styles.logo2} source={require('../../assets/img/logo_footer_3.png')} />
                </View>
        </View>
        

      <View style={{ flex: 0.1, backgroundColor: 'steelblue' , flexDirection: 'row'}}>
                    <View style={{ flex: 1, backgroundColor: '#d99133' }}>                    
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#679527' }}>
                    
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#9e7e9e' }}>
                   
                    </View>
        
      </View>
      </View>
    );
  }
}
}



export default Footer;