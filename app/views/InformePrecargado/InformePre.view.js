import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , FlatList, TouchableOpacity, TouchableWithoutFeedback,ScrollView, RefreshControl} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';

import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import WSRestApi from '../../services/wsRestApi.js';

import Loading from '../../components/Loading/Loading.component.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
//import ConsultaContenedor from '../Contenedor/ConsultaContenedor.view';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon22 from 'react-native-vector-icons/MaterialIcons';


export default class InformePrecargado extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false, 
            data_contenedor:[],
            refreshing: false,
            usuario_id:'',
            planta_id:''
        };
        this.Loading = React.createRef();
        
    }
    async componentDidMount(){
        this.setState({data_contenedor:[]});
        let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');
        let USUARIO_DATA = await AsyncStorage.getItem('USUARIO_DATA');
        

        console.log("el resultadoxxx  -->"+USUARIO_ID);
        console.log("el USUARIO_DATA  -->"+USUARIO_DATA);
        
     //   this.carga_lista();
         //let contenedor_datos =   this.consulta_contenedores(3,1);
        let result;
         await this.consulta_contenedores(USUARIO_ID, PLANTA_ID).then(function (data) {
            result = data;
          });

          if (result.state == true) {
        
            console.log("hola raton con cola "+JSON.stringify(result.data));
            this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;


         //   this.props.navigation.navigate('App')
        }else{
           // this.setState({modalVisible:true})
           console.log("2");
        }

         //console.log("contenedor_datos -->"+ JSON.stringify(contenedor_datos));
      
     }

     refrescar = async () => {

      this.Loading.current.mostrar();

      console.log('I am triggeredxxx');
      this.setState({ refreshing: true });

      this.setState({ refreshing: false });


      

      

      this.Loading.current.ocultar();
  }



    consulta_contenedores = async (username, password) => {
        try {
            console.log("xx");
          let resultado = await WSRestApi.lista_documentos(username, password);
          //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
          return resultado;
        } catch (error) {
          console.log("ERROR consulta_contenedor: " + error);
          return false
        }
      }

   

    envio_menu = async () => {

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "1");
                await AsyncStorage.setItem("identificacionCarga", "0");
                await AsyncStorage.setItem("EspecificacionContenedor", "0");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
    };

    mostrarInforme = ({ item }) => {
      //  console.log("Datos del estado del vehiculo ", item.estado);
    let var_tipo ;
    //console.log("eesesese"+item.tipo_id);
        //debemos enviar la patente como un string separado cada 2 caracteres
   switch (item.tipo_id) {
     
     case 1:
       var_tipo=<TouchableWithoutFeedback 
          
       onPress={() => this.props.navigation.navigate('InfoGeneralEmbarque',{
         usuario: this.state.usuario_id,
         planta: this.state.planta_id,
         embarque: item.embarque_id,
         embarque_planta: item.embarque_planta_id
     })}>

       <View style={{marginLeft:'4%',marginTop:'5%', borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
           <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
           <Text style={{marginLeft:10}}>Stuffing intructions</Text>
           <Text style={{marginLeft:10, fontWeight:'bold' }}>{item.orden_embarque}</Text>  
           <Text style={{marginLeft:10}}>Container N°</Text>
           <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.numero_contenedor}</Text>                       
           </View>  
           <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
           <Text style={{marginLeft:10}}>Exporter</Text>
           <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.exportador_nombre}</Text>  
           <Text style={{marginLeft:10}}>Type of loading</Text>
           <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.tipo_nombre}</Text>                         
           </View> 
           <View style={{ flex: .3, backgroundColor: 'white' }}>   
           <Icon22 style={{marginTop:'90%'}} name="arrow-forward-ios" size={20} color="#F4891F" />
           
           </View>    

           
                  {/* <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />  */}
                     
         </View> 
     </TouchableWithoutFeedback>;
       break;


       case 2:
      
       var_tipo=<TouchableWithoutFeedback 
          
       onPress={() => this.props.navigation.navigate('ConsultaContenedor',{
        usuario: this.state.usuario_id,
        planta: this.state.planta_id,
        embarque: item.embarque_id,
        embarque_planta: item.embarque_planta_id
    })}>

       <View style={{marginLeft:'4%',marginTop:'5%', borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
           <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
           <Text style={{marginLeft:10}}>Stuffing intructions</Text>
           <Text style={{marginLeft:10, fontWeight:'bold' }}>{item.orden_embarque}</Text>  
           <Text style={{marginLeft:10}}>Container N°</Text>
           <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.numero_contenedor}</Text>                       
           </View>  
           <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
           <Text style={{marginLeft:10}}>Exporter</Text>
           <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.exportador_nombre}</Text>  
           <Text style={{marginLeft:10}}>type of loading</Text>
           <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.tipo_nombre}</Text>                         
           </View> 
           <View style={{ flex: .3, backgroundColor: 'white' }}>   
           <Icon22 style={{marginTop:'90%'}} name="arrow-forward-ios" size={20} color="#F4891F" />
           
           </View>    

           
                  {/* <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />  */}
                     
         </View> 
     </TouchableWithoutFeedback>;
       break;
   
     default:
       break;
   }
  // console.log("wewewewe"+var_tipo);
    //console.log("<<"+item.tipo_id);
        return (
        //   <TouchableWithoutFeedback 
          
        //   onPress={() => this.props.navigation.navigate('ConsultaContenedor',{
        //     tipo: item.tipo_id
        // })}>

        //   <View style={{marginLeft:'4%',marginTop:'5%', borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
        //       <View style={{ flex: 1.4, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
        //       <Text style={{marginLeft:10}}>Orden de embarque</Text>
        //       <Text style={{marginLeft:10, fontWeight:'bold' }}>{item.orden_embarque}</Text>  
        //       <Text style={{marginLeft:10}}>Numero de Contenedor</Text>
        //       <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.numero_contenedor}</Text>                       
        //       </View>  
        //       <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
        //       <Text style={{marginLeft:10}}>Exportador</Text>
        //       <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.exportador_nombre}</Text>  
        //       <Text style={{marginLeft:10}}>Tipo</Text>
        //       <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.tipo_nombre}</Text>                         
        //       </View> 
        //       <View style={{ flex: .3, backgroundColor: 'white' }}>   
        //       <Icon22 style={{marginTop:'90%'}} name="arrow-forward-ios" size={20} color="#F4891F" />
              
        //       </View>    

              
        //              {/* <Icon style={{marginTop:'100%', }} name="navigate-next" size={30} color="#ef882d" />  */}
                        
        //     </View> 
        // </TouchableWithoutFeedback>
        var_tipo
        
       
        );
      };



    render() {

        return (
          <View style={{ flex: 1 , backgroundColor: '#6d65a5'}}>
          <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
          <Icon22 style={{marginLeft:20}} name="autorenew" size={30} color="#FFFF" />
            <Text style={{flex:1,marginLeft:'12%', color:'white',marginTop:0, fontSize:18, fontFamily:'Nunito'}}>Working instructions </Text><Icon style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />

          </View>
          
          
          <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
          
         {/* <InformeCaja navigation={this.props.navigation}></InformeCaja> */}
         
         <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FlatList
                      horizontal={false}
                      showsHorizontalScrollIndicator={false}
                      data={this.state.data_contenedor}
                      renderItem={item => this.mostrarInforme(item)}
                      //renderItem={this.mostrarInforme} //AUTOS
                     // keyExtractor={item => item.key}
                      ListFooterComponent={
                        <View style={{alignItems:'center', backgroundColor:'white', flex:1, paddingTop:20, paddingBottom:20}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.envio_menu()}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, 
                                    paddingLeft:35,paddingRight:35, backgroundColor:'#F4891F', color:'white', }}>
                                        New report</Text>
                            </TouchableHighlight>
                    </View>}
                    >
                      
                    </FlatList>
                                </View>

                               

           
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