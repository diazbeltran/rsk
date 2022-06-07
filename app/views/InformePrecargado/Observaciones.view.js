import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback,UselessTextInput} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';

import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';


import WSRestApi from '../../services/wsRestApi';


export default class FotosCarga extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,
            texto_observacion:'',
            embarque_id:'',
            embarque_planta_id:'',
            informeGeneral:'',

        };

        
    }

    componentDidMount = async () => {

        let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;
        let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');


        informeGeneral = this.props.route.params.informeGeneral


        console.log("datox del InfoGeneralEmbarque USUARIO_ID->"+USUARIO_ID);
        console.log("datox del InfoGeneralEmbarque PLANTA_ID->"+PLANTA_ID);
        console.log("datox del InfoGeneralEmbarque embarque->"+embarque);
        console.log("datox del InfoGeneralEmbarque embarque_planta->"+embarque_planta);
        //console.log("datox del InfoGeneralEmbarque informeGeneral->"+informeGeneral);
        this.setState({informeGeneral:informeGeneral, embarque_id:embarque, embarque_planta_id:embarque_planta});

        //his.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
       // this.carga_recibidor();
       // this.carga_especies();
       // this.carga_objetosEspecie();

       
       

    }


    envio_menu = async () => {



        //this.Loading.current.mostrar();

        console.log("aqui");

        let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;

        let img1 = this.state.foto_general_contenedor;
        let img2 = this.state.foto_pared_izquierda;
      

           

           // console.log("Orden -->"+orden);
           // console.log("numero -->"+numero);
            console.log("USUARIO_ID -->"+USUARIO_ID);
            console.log("PLANTA_ID -->"+PLANTA_ID);
            //console.log("fecha -->"+fecha);
           // console.log("expor -->"+expor);
            
           // console.log("img1 -->"+img1);
           // console.log("img2 -->"+img2);
           // console.log("img3 -->"+img3);

            try {
                //(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) 
                let resultado = await WSRestApi.fnWSGuardaObservacion(USUARIO_ID,PLANTA_ID,embarque,embarque_planta, this.state.texto_observacion);
                //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
                console.log("resultadox ->"+JSON.stringify(resultado)) ;

                //this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");

                if(resultado.state==true)
                {   
                    console.log("okkkkkk");
                    let embarque_paso ='"'+ resultado.data.embarque_id + '"'

                    await AsyncStorage.setItem("embarque_id",'"'+ resultado.data.embarque_id+'"');
                    await AsyncStorage.setItem("embarque_planta_id",'"'+ resultado.data.embarque_planta_id+'"');


                    console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "2");
                await AsyncStorage.setItem("EstibaPallet", "2");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "2");
                await AsyncStorage.setItem("Observaciones", "2");


                    this.props.navigation.navigate('ConsolidacionCarga', {
                        embarque : this.state.embarque_id, 
                        embarque_planta : this.state.embarque_planta_id,
                        informeGeneral : "2",
                        identificacionCarga:"2",
                        EspecificacionContenedor:"2",
                        FotosContenedor:"2",
                        EstibaPallet:"1" })


                    // this.props.navigation.navigate('ConsolidacionCarga', {
                    //     embarque : this.state.embarque_id, 
                    //     embarque_planta : this.state.embarque_planta_id,
                    //     informeGeneral : "2",
                    //     identificacionCarga:"2",
                    //     EspecificacionContenedor:"2",
                    //     FotosContenedor:"2",
                    //     EstibaPallet:"1" })


                }else{
                    console.log("sin resultadox");
                    this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");
                }

              } catch (error) {
                let resultado = JSON.stringify(error);
                //let resultado = "errorx";
                console.log("ERROR exportador ??? : " + error);
                return resultado;
               // return false
              }


        //this.Loading.current.mostrar();

        
    };
    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ConsolidacionCarga')}>
                    <View style={{}}>
                    <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:80, color:'white',marginTop:0, fontSize:18}}>Comments </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            
                                
                            
                                    
                               
                              <Text style={{marginLeft:20, marginTop:20}}>

                                  Comment
                              </Text>

                            <TextInput style={styles.input}
                            multiline={true}
                            numberOfLines={10}
                            selectTextOnFocus={true}
                            onChangeText={(valor) => this.setState({texto_observacion:valor})}>



                            </TextInput>

                           

                            {/* <UselessTextInput
                            multiline
                            numberOfLines={10}
                            onChangeText={()=>{console.log("holanda")}}
                            value={''}
                            style={{padding: 10}}
                            /> */}

                        

                           
                            <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, marginBottom:20}}>
                            <TouchableHighlight style={{with:10}}
                            title="Press me"
                            onPress={() => this.envio_menu()}
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
      //height: 230,
      width:'80%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#efeeef',
      borderRadius: 5,
      borderColor: '#dadee3',
      
    },
  });