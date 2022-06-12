import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button, TouchableWithoutFeedback, FlatList, TouchableHighlight } from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
import InformePallet from '../../component/InformePallet/InformePallet.component.js'

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon22 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';


import WSRestApi from '../../services/wsRestApi';

import CheckBox from '@react-native-community/checkbox';

import HintAlertas from '../../components/Hint/Hint.component';


export default class EstibaPalletLista extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,

            total_pallet:0,
            total_pallet_ok:0,
            total_pallet_faltantes:0,

        informeGeneral:'',
        embarque_id:'',
        embarque_planta_id:'',
        id_proximo_pallet:'',
        id_proximo_especie:'',
        data_pallet_cargados:[],
        confirmacion:false,
        actualiza: true,
            
    };
    this.HintAlertas = React.createRef();
        
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

        this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
       // this.carga_recibidor();
       // this.carga_especies();
       // this.carga_objetosEspecie();

       
       

    }


    recarga = async() =>{
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
        this.setState({informeGeneral:informeGeneral, embarque_id:embarque, embarque_planta_id:embarque_planta, actualiza:false});

        this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);

    }

    UNSAFE_shouldComponentUpdate(nextProps, nextState) {
        console.log('UNSAFE_shouldComponentUpdate estribapalletlista  nextProps ', nextProps)
        console.log('UNSAFE_shouldComponentUpdate estribapalletlista nextState', nextState)
       // this.recibirDatos()

       try {
        const { route } = this.props;

       
        
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        //  const responseJson = navigation.getParam("EstadoProceso");
         const responseJson2 = route.params["EstadoProceso"];

         
        // console.log("data -->"+JSON.stringify(datacarga));

            // var jsonString = JSON.stringify(this.state.EstadoProceso);
            // console.log("estados -..>"+jsonString);
            // console.log("estados -..>"+JSON.stringify(responseJson2));
            // this.setState({informeGeneral :responseJson2.informeGeneral, 
            // identificacionCarga:responseJson2.identificacionCarga,
            // EspecificacionContenedor:responseJson2.EspecificacionContenedor,
            // FotosContenedor:responseJson2.FotosContenedor,
            // EstibaPallet:responseJson2.EstibaPallet,
            // FotosConsolidacionCarga:responseJson2.FotosConsolidacionCarga,
            // Observaciones:responseJson2.Observaciones,
            // })
        return nextState.count != this.state.count;
        // this.recibirDatos()

    }
    catch(error){
        console.log(error);
    }


      }


      envia_nuevo_pallet = async () => {

            console.log("holaxxxx " + this.state.id_proximo_pallet);

            this.props.navigation.navigate('EstibaPalletAgregar', {embarque:this.state.embarque_id, embarque_planta: this.state.embarque_planta_id,
            id_pallet_siguiente:this.state.id_proximo_pallet,
            id_especie_siguiente:this.state.id_proximo_especie,
            actualiza:true,nuevo:true })


        // this.props.navigation.navigate('EstibaPalletAgregar',{
        //     embarque : this.state.embarque_id, 
        // embarque_planta : this.state.embarque_planta_id,
        // id_pallet : this.state.id_proximo_pallet,
        // id_especie : this.state.id_proximo_especie,
        // })


      }

    carga_datos_embarque = async (usuario, planta, embarque, embarque_planta) =>{

        //   console.log("carga_datos_embarque -->"+PLANTA_NOMBRE);
               let result;
            await this.embarque_detalle(usuario, planta, embarque, embarque_planta).then(function (data) {
               result = data;
             });
   
             if (result.state == true) {
   
               console.log("Estiba Pallet embarque_detalle resultado:-> "+JSON.stringify(result.data));
   
               console.log("array especies -->" + JSON.stringify(result.data.especies));
               let paso_pallet = JSON.stringify(result.data.pallets);
   
               console.log("array pallets --> paso_pallet  "+paso_pallet);
               console.log("array pallets --> paso_especie  "+result.data.pallets.length);
   
               this.setState({total_pallet:result.data.pallets.length})
   
   
                let MyArray = [];
                let MyArray2 = [];
               
               let contador_pallet_vacios = 0;
               let contador_pallet_ok = 0;
               let id_pallet_siguiente = 0;
               let id_especie_siguiente = 0;
   
               result.data.pallets.forEach((a) =>{
                //   console.log("el datox es"+ JSON.stringify(a))
   
                   if (a.pallet_numero_pallet==null){
                       contador_pallet_vacios = contador_pallet_vacios + 1;
                       id_pallet_siguiente = a.pallet_id;
                       id_especie_siguiente = a.pallet_especie.especie_id;
                      
   
                   }else{
                       contador_pallet_ok = contador_pallet_ok +1;

                       let objetoPallet = {
                        key: a.pallet_id,
                        //value: "Especie 1",
                       // value: item.id,
                       pallet_numero_pallet : a.pallet_numero_pallet,
                       pallet_ubicacion: a.pallet_ubicacion,
                       pallet_posicion: a.pallet_posicion,
                       pallet_temperatura: a.pallet_temperatura,
                       pallet_termografo_tipo_id: a.pallet_termografo_tipo_id,
                       pallet_ubicacion: a.pallet_ubicacion,
                       pallet_codigo_termografo: a.pallet_codigo_termografo,
                    }
    
                   MyArray2.push(objetoPallet);


                   }
   
                    
                   
   
                } );
                console.info(MyArray2);
                this.setState({data_pallet_cargados:MyArray2})
   
                   console.log("cantidad de pallet "+result.data.pallets.length);
                   console.log("cantidad de pallet ok "+contador_pallet_ok);
                   console.log("cantidad de pallet vacios "+contador_pallet_vacios);
                   console.log("ID siguiente pallet "+id_pallet_siguiente);
                   console.log("ID siguiente especie "+id_especie_siguiente);
                   //console.log("ID siguiente especie "+);
                

                    this.setState({id_proximo_pallet:id_pallet_siguiente,
                    id_proximo_especie:id_especie_siguiente,
                    tipo_nombre:result.data.tipo_nombre,
                    total_pallet:result.data.pallets.length,
                    total_pallet_ok:contador_pallet_ok,
                    total_pallet_faltantes:contador_pallet_vacios})

          
              
   
            //   this.props.navigation.navigate('App')
           }else{
              // this.setState({modalVisible:true})
              console.log("2");
           }
   
   
       }


       shouldComponentUpdate = async(nextProps, nextState) =>{
        console.log('Ejecutando lista shouldComponentUpdate 1: ', nextProps )
       console.log('Ejecutando lista shouldComponentUpdate 2: ', nextState )

      console.log("nextState.pallet_id ",nextState.pallet_id);
      console.log("nextProps.route.params.id_pallet_siguiente ",nextProps.route.params.id_pallet_siguiente);
      console.log("nextState.especie_id ",nextState.especie_id);
      console.log("nextProps.route.params.id_especie_siguiente ",nextProps.route.params.id_especie_siguiente);
      console.log("nextProps.route.params.actualiza 1",nextProps.route.params.actualiza);
      console.log("nextProps.route.params.actualiza 2",nextState.actualiza);
      

      

       try{
        if(  nextProps.route.params.actualiza==true && nextState.actualiza!=false ){
            console.log("se tiene que actualizarrrrr");

            this.recarga()
           

        //return true
        
        
           
        }
       }catch(e){
        console.log("error accidente  "+e);
       };
        
        return false
      }



       embarque_detalle = async (usuario, planta,embarque, embarque_planta) => {
        try {
          let resultado = await WSRestApi.fnWSDetalleembarque(usuario, planta,embarque, embarque_planta);
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



    envio_menu = async () => {

        if (this.state.confirmacion==false){
            this.HintAlertas.current.mostrarConParametros("Debe confirmar los datos");
             return 1;
        }
        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "2");
                await AsyncStorage.setItem("EstibaPallet", "2");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "1");
                await AsyncStorage.setItem("Observaciones", "0");


        this.props.navigation.navigate('EstibaPalletConfirma', {
            embarque : this.state.embarque_id, 
            embarque_planta : this.state.embarque_planta_id})
    };

    mostrarInforme = ({ item }) => {
        

        let pallet = <View style={{marginLeft:'5%', marginBottom:10,borderWidth:1,borderColor:'#9f9f9f', borderRadius:5, flex:0.3, flexDirection:'row', width:'90%', justifyContent:'space-around'}}>
        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
        <Text style={{marginLeft:10}}>Location</Text>
        <Text style={{marginLeft:10, fontWeight:'bold' }}>{item.pallet_ubicacion}</Text>  
        <Text style={{marginLeft:10}}>Temp °C</Text>
        <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.pallet_temperatura}</Text>                       
        </View>  
        <View style={{ flex: 1, backgroundColor: 'white', marginTop:10 }}>   
        <Text style={{marginLeft:10}}>Pallet N°</Text>
        <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.pallet_numero_pallet}</Text>  
        <Text style={{marginLeft:10}}>Temp device</Text>
        <Text style={{marginLeft:10, fontWeight:'bold'}}>{item.pallet_codigo_termografo}</Text>                         
        </View> 
        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:10, marginBottom:10}}>   
        <Text style={{marginLeft:10}}>Position</Text>
        <Text style={{marginLeft:10, fontWeight:'bold' }}>{item.pallet_posicion == "true" ? 'Front':'Side'}</Text>  
                              
        </View>  
        <View style={{ flex: .5, backgroundColor: 'white' }}>   
        {/* <View style={{flex:1,backgroundColor:'#bb4d4b', paddingTop:15, paddingLeft:10}}>
        <Icon22 style={{}} name="trash-can-outline" size={20} color="white" />
        </View> */}

        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPalletConfirmaElimina',{
                            embarque : this.state.embarque_id, 
                        embarque_planta : this.state.embarque_planta_id,
                        id_pallet : this.state.id_proximo_pallet,
                        id_especie : this.state.id_proximo_especie,
                        id_eliminar: item.key })}>
        <View style={{flex:1,backgroundColor:'#bb4d4b', paddingTop:5, paddingLeft:10}}>
        <Icon22 style={{paddingTop:5}} name="trash-can-outline" size={20} color="white" />                      
        </View>   
        </TouchableWithoutFeedback> 


        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EstibaPalletModificar',{
                            embarque : this.state.embarque_id, 
                        embarque_planta : this.state.embarque_planta_id,
                        id_pallet : this.state.id_proximo_pallet,
                        id_especie : this.state.id_proximo_especie,
                        id_modificar: item.key

                        })}>
        <View style={{flex:1,backgroundColor:'#9cc45c', paddingTop:5, paddingLeft:10}}>
        <Icon style={{paddingTop:5}} name="edit" size={20} color="white" />                      
        </View>   
        </TouchableWithoutFeedback>                    
            </View>
             </View> 



       return pallet;

        }


    
    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                    <View style={{}}>
                    <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Pallet's stowage {this.state.total_pallet_ok}/{this.state.total_pallet} </Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
                
                
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                
               {/* <InformePallet navigation={this.props.navigation}></InformePallet> */}

                {/* {this.state.data_pallet_cargados} */}
               <FlatList
                        ListHeaderComponent={(
                            <View style={{flexDirection:'row'}} >
                               

                            
                           
                        <TouchableHighlight style={{with:100, flex:1, paddingBottom:20}}
                            title=""
                            onPress={() =>{
                                if (this.state.total_pallet_ok!=this.state.total_pallet) {
                                    this.envia_nuevo_pallet()
                                } else {
                                    console.log("no se pueden mas");
                                }
                                } }
                            >
                            <Text style={{marginTop:20, marginLeft:'25%', 
                                width:200, borderRadius:5, 
                                paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, 
                                backgroundColor:'#ef882d', color:'white', }}
                                >Add pallet {(this.state.total_pallet_ok!=this.state.total_pallet?(this.state.total_pallet_ok+1):(this.state.total_pallet_ok))} of {this.state.total_pallet}</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{with:0, flex:0.2, paddingBottom:20, paddingTop:20}}
                            title=""
                            onPress={() =>{
                                
                                    this.recarga()
                                
                                } }
                            >
                            <Icon2 style={{marginLeft:10}} name="reload" size={30} color="#ef882d" />
                            </TouchableHighlight>
                            </View>)}
                        //horizontal={false}
                        //showsHorizontalScrollIndicator={false}
                        data={this.state.data_pallet_cargados}
                        renderItem={item => this.mostrarInforme(item)}
                         ListFooterComponent={(
                            <View>
                                <View style={{ flexDirection: 'row', marginLeft:'10%', marginTop:20, width:'60%'}} >
                                            
                                        {(this.state.total_pallet_ok==this.state.total_pallet)?(
                                            <View style={{flexDirection:'column'}}>
                                                <View style={{flexDirection:'row'}}>
                                                <CheckBox
                                            value={this.state.confirmacion}
                                            boxType={'square'}
                                            animationDuration={0.1}
                                            tintColors={{ true: '#F4891F', false: '#F4891F' }}
                                            onValueChange={(value) =>
                                            {console.log("el valorx es "+value);
                                            let opcion = value==true ? 1:0;
                                            console.log("el opcion es "+opcion);
                                            this.setState({
                                                confirmacion: value
                                                
                                            })}
                                            }
                                            />
                                             <Text style={{marginTop:5, color:'#F4891F', fontWeight:'bold'}}>I confirm that all pallets' details are correct</Text>
                                             </View>
                                             <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, paddingBottom:20}}>
                <TouchableHighlight style={{with:10}}
                        title="Press me"
                         onPress={() => this.envio_menu()}
                            >
                                <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Next</Text>
                            </TouchableHighlight>
                    </View>
                                            </View>
                                           
                                        ):(
                                            <View></View>
                                        )}
                                            
                            </View>

                            
                            </View>
                         )}


                        //renderItem={this.mostrarInforme} //AUTOS
                        //keyExtractor={item => item.key}
                        
                        >

                </FlatList>
                                <HintAlertas
                                    title={this.state.tituloHintAlerta}
                                    ref={this.HintAlertas}
                                ></HintAlertas>
                
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