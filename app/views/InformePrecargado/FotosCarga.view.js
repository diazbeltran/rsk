import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import SelectDropdown from 'react-native-select-dropdown'


import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
export default class FotosCarga extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false
        };

        
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

               
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Fotos de consolidación </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            
                                
                            
                                    
                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto general del contenedor

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>
                                    
                                 <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto contenedor pared izquierda

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto contenedor pared derecha

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto número del contenedor

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto año de fabricación contenedor

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto PTI

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto seteo contenedor

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto general estado motor (condensador)
                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto ventilación (CBM)

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto buffer plate

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto dondo del contenedor

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto cortina de atmósfera

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>

                                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                                >
                                <View style={{backgroundColor:'#e4e4e4', flexDirection:'row',borderWidth:0.5,borderRadius:5, height:50, width:300, borderColor:'#e4e4e4'}}>
                                <View style={{flex:4}}>
                                <Text 
                                style={{ 
                                paddingTop:15, 
                                paddingLeft:    5,paddingRight:5, 

                                paddingLeft:20,
                                 color:'black', 
                                 fontWeight:'bold' ,
                                color:"#ef882d"}}>
                                Foto cierre de contenedor

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                </View>


                        

                           
                            <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, marginBottom:20}}>
                            <TouchableHighlight style={{with:10}}
                            title="Press me"
                            onPress={() => this.props.navigation.navigate('InfoFinalEmbarque')}
                            >
                            <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Siguiente</Text>
                            </TouchableHighlight>
                            </View>

                        
                                
                            
                                </ScrollView>
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