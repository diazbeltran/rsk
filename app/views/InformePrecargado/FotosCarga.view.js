import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, TouchableWithoutFeedback} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';
import FormLogin from '../../component/Login/FormLogin.component.js';
import InformeCaja from '../../component/InformeCaja/InformeCaja.component.js'
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

            img1:false,
            img2:false,
            img3:false,
            img4:false,
            img5:false,
            img6:false,
            img7:false,
            img8:false,
            img9:false,
            img10:false,
            img11:false,
            img12:false,
            img13:false,

            general_photo_container  : '',
            left_wall_container_photo   : '',
            right_wall_container_photo: '',
            photo_container_number: '',
            container_manufacturing_year_photo: '',
            pti_photo: '',
            container_photo_setup: '',
            general_photo_engine_condition: '',
            photo_fan: '',
            photo_buffer_plate: '',
            photo_background_container: '',
            photo_curtain_atmosphere: '',
            container_closure_photo: '',
            tipo_id:0,



        };

        
    }

    componentDidMount = async () => {

        let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
        let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;

        let id_pallet = this.props.route.params.id_pallet;
        let id_especie = this.props.route.params.id_especie;

        let PLANTA_NOMBRE = await AsyncStorage.getItem('PLANTA_NOMBRE');


        informeGeneral = this.props.route.params.informeGeneral


        console.log("datox del EstibaPalletAgregar USUARIO_ID->"+USUARIO_ID);
        console.log("datox del EstibaPalletAgregar PLANTA_ID->"+PLANTA_ID);
        console.log("datox del EstibaPalletAgregar embarque->"+embarque);
        console.log("datox del EstibaPalletAgregar embarque_planta->"+embarque_planta);
        //console.log("datox del InfoGeneralEmbarque informeGeneral->"+informeGeneral);
        this.setState({informeGeneral:informeGeneral, embarque_id:embarque, embarque_planta_id:embarque_planta,
        pallet_id:id_pallet, especie_id:id_especie});

        this.carga_fotos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
        this.carga_datos_embarque(USUARIO_ID, PLANTA_ID, embarque, embarque_planta);
       // this.carga_recibidor();
        //this.carga_especies();
       // this.carga_objetosEspecie();

             

    }


    carga_fotos_embarque = async (usuario, planta, embarque, embarque_planta) =>{

        //   console.log("carga_datos_embarque -->"+PLANTA_NOMBRE);
               let result;
            await this.embarque_fotos(usuario, planta, embarque, embarque_planta).then(function (data) {
               result = data;
             });
   
             if (result.state == true) {
   
               console.log("InfoGeneralEmbarque embarque_detalle resultado:-> "+JSON.stringify(result.data));

               this.setState({
                    general_photo_container  : result.data.general_photo_container,
                    left_wall_container_photo   : result.data.left_wall_container_photo,
                    right_wall_container_photo: result.data.right_wall_container_photo,
                    photo_container_number: result.data.photo_container_number,
                    container_manufacturing_year_photo: result.data.container_manufacturing_year_photo,
                    pti_photo: result.data.pti_photo,
                    container_photo_setup: result.data.container_photo_setup,
                    general_photo_engine_condition: result.data.general_photo_engine_condition,
                    photo_fan: result.data.photo_fan,
                    photo_buffer_plate: result.data.photo_buffer_plate,
                    photo_background_container: result.data.photo_background_container,
                    photo_curtain_atmosphere: result.data.photo_curtain_atmosphere,
                    container_closure_photo: result.data.container_closure_photo,
                     })
   
           
   
            //   this.props.navigation.navigate('App')
           }else{
              // this.setState({modalVisible:true})
              console.log("2");
           }
   
   
       }


       embarque_fotos = async (usuario, planta,embarque, embarque_planta) => {
        try {
          let resultado = await WSRestApi.fnWSFotosEmbarque(usuario, planta,embarque, embarque_planta);
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
                
               this.setState({  tipo_id: result.data.tipo_id})
   
   
                let MyArray = [];
                let MyArray2 = [];
               
               let contador_pallet_vacios = 0;
               let contador_pallet_ok = 0;
               let id_pallet_siguiente = 0;
               let id_especie_siguiente = 0;
   
              
   
                  // console.log("cantidad de pallet "+result.data.pallets.length);
                 //  console.log("cantidad de pallet ok "+contador_pallet_ok);
                 //  console.log("cantidad de pallet vacios "+contador_pallet_vacios);
                 //  console.log("ID siguiente pallet "+id_pallet_siguiente);
                  // console.log("ID siguiente especie "+id_especie_siguiente);
                   //console.log("ID siguiente especie "+);
                
                
            //        this.setState({id_proximo_pallet:id_pallet_siguiente,
            //            id_proximo_especie:id_especie_siguiente,
            //            tipo_nombre:result.data.tipo_nombre,
            //         total_pallet:result.data.pallets.length,
            //     total_pallet_ok:contador_pallet_ok,
            // total_pallet_faltantes:contador_pallet_vacios})
   
          
              
   
            //   this.props.navigation.navigate('App')
           }else{
              // this.setState({modalVisible:true})
              console.log("2");
           }
   
   
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

        //this.Loading.current.mostrar();

        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "2");
                await AsyncStorage.setItem("FotosContenedor", "2");
                await AsyncStorage.setItem("EstibaPallet", "2");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "2");
                await AsyncStorage.setItem("Observaciones", "1");

                switch (this.state.tipo_id) {
                    case 1:
                        this.props.navigation.navigate('ConsolidacionCarga', {
                            embarque : this.state.embarque_id, 
                            embarque_planta : this.state.embarque_planta_id,
                            informeGeneral : "2",
                            identificacionCarga:"2",
                            EspecificacionContenedor:"2",
                            FotosContenedor:"2",
                            EstibaPallet:"1" })
                        break;
                     case 2:
                            this.props.navigation.navigate('ConsolidacionCargaCorto', {
                                embarque : this.state.embarque_id, 
                                embarque_planta : this.state.embarque_planta_id,
                                informeGeneral : "2",
                                identificacionCarga:"2",
                                EspecificacionContenedor:"2",
                                FotosContenedor:"2",
                                EstibaPallet:"1" })
                            break;
                    default:
                        break;
                }
        
    };
    



    render() {

        return (
            <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
                <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
                <TouchableWithoutFeedback onPress={() => {
                (this.state.tipo_id==1)? 
                this.props.navigation.navigate('ConsolidacionCarga')
                :
                this.props.navigation.navigate('ConsolidacionCargaCorto')}}>
                    <View style={{}}>
                    <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />
                                        
                    </View> 
                    </TouchableWithoutFeedback>

               
                    <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Cargo's stuffing photos</Text><Icon2 style={{marginRight:20}} name="exit-outline" size={30} color="#FFFF" />

                </View>
               
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
                <ScrollView>
                            
                                
                            
                                    
                    <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img1 "+ this.state.img1);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img1: !this.state.img1,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Container general view

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img1==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.general_photo_container}}
                                    />

                                </View>):(
                                    <View></View>
                                )}

                            <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img2 "+ this.state.img2);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img2: !this.state.img2,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                External left side wall

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img2==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                     style={{ width: 300, height: 300}}
                                     source={{ uri: this.state.left_wall_container_photo}}
                                    />

                                </View>):(
                                    <View></View>
                                )}

                    <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img3 "+ this.state.img3);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img3: !this.state.img3,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                External right side wall

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img3==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.right_wall_container_photo}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                    <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img4 "+ this.state.img4);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img4: !this.state.img4,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Container N°

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img4==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.photo_container_number}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                        <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img5 "+ this.state.img5);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img5: !this.state.img5,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Fabrication year

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img5==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.container_manufacturing_year_photo}}
                                    />

                                </View>):(
                                    <View></View>
                                )}

                                
                    <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img6 "+ this.state.img6);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img6: !this.state.img6,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                PTI

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img6==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.pti_photo}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                            <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img7 "+ this.state.img7);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img7: !this.state.img7,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Reefere T° screen

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img7==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.container_photo_setup}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                                    
                            <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img8 "+ this.state.img8);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img8: !this.state.img8,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Motor condition (condenser)

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img8==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.general_photo_engine_condition}}
                                    />

                                </View>):(
                                    <View></View>
                                )}

                        <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img9 "+ this.state.img9);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img9: !this.state.img9,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Ventilation settings (CBM)

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img9==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.photo_fan}}
                                    />

                                </View>):(
                                    <View></View>
                                )}



                        <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img10 "+ this.state.img10);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img10: !this.state.img10,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Buffer plate

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img10==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.photo_buffer_plate}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                            <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img11 "+ this.state.img11);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img11: !this.state.img11,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Rear inside of container

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img11==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.photo_background_container}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                    <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img12 "+ this.state.img12);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img12: !this.state.img12,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Controlled atmosphere curtaine

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img12==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.photo_curtain_atmosphere}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                <View style={{height:70, marginLeft:30, alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, flexDirection:'row'}}>
                                <TouchableWithoutFeedback style={{}}
                                title=""
                                //onPress={() => this.props.navigation.navigate('TomarFoto')}
                                onPress={(value) => {
                                    console.log("el valorx es img13 "+ this.state.img13);
                                let x = !value;
                               // let opcion = value==true ? 1:0;
                                //console.log("el opcion es "+opcion);
                                this.setState({
                                    img13: !this.state.img13,
                                   // preenfriado:  opcion,
                                   // checked4:x
                                })}}
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
                                Closed doors

                                </Text>
                                </View>
                                <View>
                                <Icon2 style={{flex:1, paddingTop:10,marginLeft:0, paddingRight:20}} name="eye" size={30} color="#ef882d" />
                                </View>
                                </View>                                    
                                </TouchableWithoutFeedback>
                                
                                </View> 
                                    
                                {this.state.img13==true?(
                                <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
                                <Image
                                    style={{ width: 300, height: 300}}
                                    source={{ uri: this.state.container_closure_photo}}
                                    />

                                </View>):(
                                    <View></View>
                                )}


                             


                        

                           
                            <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, marginBottom:20}}>
                            <TouchableHighlight style={{with:10}}
                            title="Press me"
                            onPress={() => this.envio_menu()}
                            >
                            <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Next</Text>
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