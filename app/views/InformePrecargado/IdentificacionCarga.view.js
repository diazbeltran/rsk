import React, { Component } from 'react';
import { View, Text, TextInput , StyleSheet,Image,Button , ScrollView, 
    TouchableWithoutFeedback, SafeAreaView, FlatList,Item, TouchableOpacity,Modal} from 'react-native';
//import logimStyle from './login.style.js';
import Footer from '../../component/Footer/FooterSimple.component';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon33 from 'react-native-vector-icons/AntDesign';
import Select from '../../component/Select/Select.component.js';

import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome5';

import SelectorMultimedia from '../../components/SelectorMultimedia/SelectorMultimediaMultiple.component.js';
import SelectorMultimediaCargo from '../../components/SelectorMultimedia/SelectorCargoDetails.component.js';

import SelectorEspecies from '../../components/SelectorMultimedia/SelectorEspeciesDinamico.component.js';
import HintImagenAmpliada from '../../components/Hint/Hint.component';


import HintAlertas from '../../components/Hint/Hint.component'


import BuscaModal from '../../components/Busqueda/BusquedaModal.component';


import WSRestApi from '../../services/wsRestApi';



export default class InfoGeneralEmbarque extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            Imagen:false,

            recibidorInicio: {
                label: " ",
                value: "0"
            },

            embarque_id:'',
            embarque_planta_id:'',

            orden_embarque:'',
            numero_contenedor:'',
            motonave:'',

            recibidor_data: {},
            especie_data: {},
            recibidor_seleccionado:'',
            especie_seleccionada:false,
            data_especies:{},
            arregloEspecies: [],
            indexInicial:0,
            especie_seleccionada_Arreglo:[],
            recibidor_id:'',
            recibidor_nombre:'',
            puerto_carga:'',
            puerto_destino:'',
            numero_booking:'',
            suma_pallet:0,
            suma_box:0,

            texto_paso_box:'',
            texto_paso_producto_id:'',
            texto_paso_pallet:'',
            seteo:0,
            pallet_base:0,
            caja_base:30,
            foto_cargo:"1",
            listado_especies:{},

            precarga:false,
            creado_web:'',
            foto_numero_contenedor:'',
            muestraMoto:true,
            cantidad_productos:0,
            presentar_datos:true,
            modalVisible:false,

        };
        this.recibidor = React.createRef();
        this.especie = React.createRef();
        this.seteo = React.createRef();
        this.box = React.createRef();
        this.pallet_base = React.createRef();

        this.textInput_box = React.createRef();


        this.TextInputOrdenEmbarque = React.createRef();
        this.TextInputNumeroContenedor = React.createRef();
        this.Selector1 = React.createRef();
        this.SelectorEspecies_data = React.createRef();

        this.BuscaModal = React.createRef();
        this.BuscaModal1 = React.createRef();
        this.BuscaModal2 = React.createRef();




        this.Hint = React.createRef();
        this.Hint2 = React.createRef();
        this.HintImagenAmpliada1 = React.createRef();

        this.HintAlertas = React.createRef();
        this.HintPDF1 = React.createRef();




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
        this.carga_recibidor();
        this.carga_especies();
       // this.carga_objetosEspecie();

       
       

    }

    setModalVisible = async (visible, texto) => {
        this.setState({ modalVisible: visible, texto_busqueda:texto });
    }  



    mostrarEspecies = ({item}  ) => {
        //console.log("item  item.key["+JSON.stringify(item.key)+"]   ->"+ JSON.stringify(this.state.arregloEspecies[item.key]))
        console.log("item  item.key["+JSON.stringify(item)+"]  ");
        let a = (this.state.arregloEspecies[item.key].producto_id)?(this.state.arregloEspecies[item.key].producto_id):(0);// this.state.texto_paso_producto_id,
        let b = (this.state.arregloEspecies[item.key].cantidad_pallet)?(this.state.arregloEspecies[item.key].cantidad_pallet):(0); //this.state.texto_paso_pallet,
        const c = (this.state.arregloEspecies[item.key].cantidad_cajas!='')?this.state.arregloEspecies[item.key].cantidad_cajas:0 ; //this.state.texto_paso_box;




        if (!item){
            console.log("por aqui pase");
        }
        else{
        return (
            <View>                
            <View style={{flexDirection:'row'}}>
                               <View style={{flex:1.5}}>

                               <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >

                            <Select
                                disabled={true}

                                value={a}
                                key={item.id}
                               //ref={this.especie}
                                datos={this.state.especie_data}
                                // xfuncion={async (x) => {
                                //     //this.setState({ keyC: 0, comunaDeChile: [] })
                                //     //await this.guardarSoloRegion(x);
                                //     console.log("usuariox => ", x);
                                //     //this.setState({especie_seleccionada:x});
                                //    // this.setState({especie_seleccionada_Arreglo:[x]});
                                //    // especie_seleccionada_Arreglo
                                //     //this.mostrarMontoMax(x);

                                // }}
                                />
                                    {/* <Text style={{marginLeft:'10%',
                                        height: 40,
                                        width:'60%',
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        backgroundColor: '#efeeef',
                                        borderRadius: 5,
                                        borderColor: '#dadee3',}}>{c}</Text> */}
                        </View>
                               </View>
                               <View style={{flex:1}}>
                                <Text style={{marginLeft:30,
                                        height: 40,
                                        width:'60%',
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        backgroundColor: '#efeeef',
                                        borderRadius: 5,
                                        borderColor: '#dadee3',}}>{b}</Text>
                            {/* <TextInput
                            
                                    style={{marginLeft:30,
                                        height: 40,
                                        width:'60%',
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        backgroundColor: '#efeeef',
                                        borderRadius: 5,
                                        borderColor: '#dadee3',}}
                                        //keyboardType="numeric"
                                    // onChangeText={(clave) => this.setState({clave})}
                                        //value={c}
                                        defaultValue={c}
                                        //editable={false}
                                    
                                    /> */}
                               </View>
                               <View style={{flex:1}}>
                               <Text style={{marginLeft:'10%',
                                        height: 40,
                                        width:'60%',
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        backgroundColor: '#efeeef',
                                        borderRadius: 5,
                                        borderColor: '#dadee3',}}>{c}</Text>
                            {/* <TextInput
                            key={item.id}
                                    style={{marginLeft:10,
                                        height: 40,
                                        width:'60%',
                                        margin: 12,
                                        borderWidth: 1,
                                        padding: 10,
                                        backgroundColor: '#efeeef',
                                        borderRadius: 5,
                                        borderColor: '#dadee3',}}
                                        keyboardType="numeric"
                                    // onChangeText={(clave) => this.setState({clave})}
                                   // onChangeText={(text) => this.validate(text)}
                                    value={c}
                                    editable={false}
                                    /> */}

                               </View>
                               {this.state.presentar_datos==true?(<View style={{flex:0.5}}>
                               <TouchableOpacity
                               style={{marginTop:'0%'}}
                                        onPress={() => 
                                            //console.log("hay que eliminar"+ item.key)
                                        this.elimina_dato_especie(item.key)
                                      //  this.removeItem(item.key)
                                    }
                                >
                                    
                                    <Icon2 style={{color:'#ef882d', paddingTop:'50%', marginRight:0}} name="trash-sharp" size={25}  />
                                    
                                    
                                    

                                </TouchableOpacity>
                                   
                               </View>):(<View></View>)}
                               



                </View>
        </View>

            // key: "" + this.state.indexInicial,
            // value: "Especie 1",
            // cantidad_paller: 1,
            // cantidad_cajas: 3

        )
             }
            // this.especie.current.
    }

    elimina_dato_especie = async (id) => {

            console.log("eliminar dato "+id);
            console.info(this.state.arregloEspecies);
            //var a = this.eliminaItem(this.state.arregloEspecies, id);
            this.setState({suma_pallet: this.state.suma_pallet - this.state.arregloEspecies[id].cantidad_pallet});
            this.setState({suma_box: this.state.suma_box - this.state.arregloEspecies[id].cantidad_cajas});
            var arraypaso = this.state.arregloEspecies;
            arraypaso.splice(id, 1);

            console.log(arraypaso);
            this.setState({arregloEspecies:arraypaso});
            // console.info(a);
        }

        eliminaItem = (array, item) =>{
        return array.filter((e) => {
            return e !== item;
        });

        }

     removeItem(index) {
          this.setState((arregloEspecies) => ({
            arregloEspecies: [...arregloEspecies.slice(0,index), ...arregloEspecies.slice(index+1)] })) }

    carga_objetosEspecie = async () =>{

        console.log("texto_paso_producto_id "+this.state.texto_paso_producto_id);
        if(this.state.texto_paso_producto_id==null && this.state.arregloEspecies.length==0){

          this.HintAlertas.current.mostrarConParametros("Debe seleccionar un Producto");
          return;
        }

        console.log("texto_paso_pallet "+this.state.texto_paso_pallet);
        if((this.state.texto_paso_pallet==null || this.state.texto_paso_pallet=='')){

          this.HintAlertas.current.mostrarConParametros("Debe Ingresar una cantidad de pallet > 0");
          return;
        }


        console.log("texto_paso_box ["+this.state.texto_paso_box+"]");
        if(this.state.texto_paso_box==null || this.state.texto_paso_box==''){

          this.HintAlertas.current.mostrarConParametros("Debe Ingresar una cantidad de cajas > 0");
          return;
        }



        let objetoEspecie = {
            key: "" + this.state.indexInicial,
            //value: "Especie 1",
           // value: item.id,
            producto_id : this.state.texto_paso_producto_id,
            cantidad_pallet: this.state.texto_paso_pallet,
            cantidad_cajas: this.state.texto_paso_box
        }

        this.setState({ suma_pallet: this.state.suma_pallet + parseInt(this.state.texto_paso_pallet )});
        this.setState({ suma_box: this.state.suma_box + parseInt(this.state.texto_paso_box )});

        //console.log(objetoFinal.key);
        //console.log(objetoFinal.NombreArchivo);
        //console.log(objetoFinal.Extension);
       // console.log(objetoFinal.Archivo);

       // this.especie.current.clear();
        this.setState({ arregloEspecies: [...this.state.arregloEspecies, objetoEspecie] });
        this.setState({ indexInicial: this.state.indexInicial + 1 });
        this.setState({caja_base:0,especie:null, seteo:'0', cantidad_productos:this.state.cantidad_productos+1, especie_seleccionada:false,
        texto_paso_producto_id:null,texto_paso_pallet:0, texto_paso_box:0 });

        this.box.current.clear();
        this.especie.current.recarga();
        this.pallet_base.current.clear();

      }

    ocultarTeclado = () => {

        if (this.state.tecladoMostrado) {
            console.log("se ha llamado a ocultar teclado");
            Keyboard.dismiss();
            this.setState({ tecladoMostrado: false });
        }

    }

    eliminarFotoSelector1 = (key) => {
        //console.log("KEEEEEY", key)
        this.Selector1.current.setState({ imagenKeyEliminar: key });
        this.Selector1.current.eliminarImagen2(key);
    }

    mostrarImagenAmpliada1 = (imagen, key, extension) => {

        this.setState({ imagenAmpliada1: imagen });

        if(extension == 'pdf'){
            let MyArray = this.Selector1.current.obtenerArregloImagenes();
            let pdfBase64 = "";
            MyArray.forEach(e => {
                if (e.key == key) {
                    pdfBase64 = e.Archivo;
                }
            });
            this.HintPDF1.current.mostrarConParametros5(pdfBase64, key);
        }else{
            this.HintImagenAmpliada1.current.mostrarConParametros2(imagen, key);
        }

    }

    recibidor_detalle = async () => {
        try {
          let resultado = await WSRestApi.fnWSRecibidor();
          //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
          return resultado;
        } catch (error) {
          let resultado = JSON.stringify(error);
          //let resultado = "errorx";
          console.log("ERROR exportador ??? : " + error);
          return resultado;
         // return false
        }
      }

    especies_detalle = async () => {
        try {
          let resultado = await WSRestApi.fnWSEspecie();
          //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
          return resultado;
        } catch (error) {
          let resultado = JSON.stringify(error);
          //let resultado = "errorx";
          console.log("ERROR exportador ??? : " + error);
          return resultado;
         // return false
        }
      }

    carga_recibidor = async () =>{

       // let plantax = await AsyncStorage.getItem('PLANTA_ID');
        //console.log("xxxxxx xxx xxx "+listado_especies);

        let recibidor_datos;
        await this.recibidor_detalle().then(function (data) {
            recibidor_datos = data;
         });

         if (recibidor_datos.state == true) {

            console.log("IdentificacionCarga recibidor_detalle resultado:-> "+JSON.stringify(recibidor_datos.data));
            //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;

            let MyArray = [];
            let MyArray2 = [];
            let datos = recibidor_datos.data;
            datos.forEach((elem) => {

                    let data = {
                        value: elem.id,
                        label: elem.name ,
                        selected: '',
                        //isSelect: elem.isSelect,
                        //selectedClass: elem.selectedClass
                    }



                    let data2 ={
                         key :elem.id,
                     label: elem.nombre ,
                     value: elem.id,
                     }



                    MyArray.push(data);
                 //  MyArray2.push(elem.name +" "+ elem.last_name);
                   MyArray2.push(data2);


            });

            console.log("matriz recibidor_data "+JSON.stringify(MyArray2));

            this.setState({recibidor_data:MyArray2 });
              console.log("data recibidor:"+this.state.recibidor_data);



       }else{
          // this.setState({modalVisible:true})
          console.log("2");
       }


    }

    carga_especies = async () =>{

       
       
       

       
         let especies_datos;
         await this.especies_detalle().then(function (data) {
            especies_datos = data;
          });

          if (especies_datos.state == true) {

             console.log("IdentificacionCarga especies_detalle resultado:-> "+JSON.stringify(especies_datos.data));
             //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;

             let MyArray = [];
             let MyArray2 = [];
             let datos = especies_datos.data;
             datos.forEach((elem) => {

                     let data = {
                         value: elem.id,
                         label: elem.name ,
                         selected: '',
                         //isSelect: elem.isSelect,
                         //selectedClass: elem.selectedClass
                     }



                     let data2 ={
                          key :elem.id,
                      label: elem.nombre ,
                      value: elem.id,
                      }



                     MyArray.push(data);
                  //  MyArray2.push(elem.name +" "+ elem.last_name);
                    MyArray2.push(data2);


             });

             console.log("matriz especie_data "+JSON.stringify(MyArray2));

             this.setState({especie_data:MyArray2 });
               console.log("data especie:"+this.state.especie_data);



        }else{
           // this.setState({modalVisible:true})
           console.log("2");
        }


     }



    carga_datos_embarque = async (usuario, planta, embarque, embarque_planta) =>{

     //   console.log("carga_datos_embarque -->"+PLANTA_NOMBRE);
            let result;
         await this.embarque_detalle(usuario, planta, embarque, embarque_planta).then(function (data) {
            result = data;
          });

          if (result.state == true) {

            console.log("InfoGeneralEmbarque embarque_detalle resultado:-> "+JSON.stringify(result.data));

            console.log("array especies -->" + JSON.stringify(result.data.especies));
            let paso_especie = JSON.stringify(result.data.especies);

            console.log("array especies --> paso_especie  "+paso_especie);
            console.log("array especies --> paso_especie  "+result.data.especies.length);
            


             let MyArray = [];
             let MyArray2 = [];
            


            result.data.especies.forEach((a) =>{
                console.log("el datox es"+ JSON.stringify(a))

                let objetoEspecie = {
                    key: "" + this.state.indexInicial,
                    //value: "Especie 1",
                   // value: item.id,
                    producto_id : a.especie_id,
                    cantidad_pallet: a.especie_cantidad_pallets,
                    cantidad_cajas: a.especie_cantidad_cajas
                }

               //MyArray2.push(objetoEspecie);
                this.setState({ arregloEspecies: [...this.state.arregloEspecies, objetoEspecie] });
                this.setState({ indexInicial: this.state.indexInicial + 1 });

                this.setState({ suma_pallet: this.state.suma_pallet + a.especie_cantidad_pallets });
                this.setState({ suma_box: this.state.suma_box + a.especie_cantidad_cajas });

                this.setState({ precarga:true, creado_web:result.data.creado_web, presentar_datos:false});


                

             } );

             

            //this.setState({data_contenedor:result.data, usuario_id:USUARIO_ID, planta_id:PLANTA_ID}) ;
            this.setState({ orden_embarque:result.data.orden_embarque,
            numero_contenedor:result.data.numero_contenedor,
            motonave: result.data.motonave,
            recibidor_id: result.data.recibidor_id,
            recibidor_nombre:result.data.recibidor_nombre,
            puerto_carga:result.data.puerto_carga ,
            puerto_destino:result.data.puerto_destino,
            numero_booking:result.data.numero_booking,
            foto_general_contenedor:result.data.foto_general_contenedor,
            foto_pared_izquierda:result.data.foto_pared_izquierda,
            foto_pared_derecha:result.data.foto_pared_derecha,
            exportador_id:result.data.exportador_id,
            exportador_nombre:result.data.exportador_nombre,
           // planta_nombre:PLANTA_NOMBRE,
            fecha_creacion:result.data.pti,
            listado_especies:paso_especie,
            foto_numero_contenedor:result.data.foto_numero_contenedor,
            //recibidor_data:[...this.state.recibidor_data,[MyArray2]]
            });


            
           

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





    pinta_select_producto = (valor) =>{



       a = <Select

                                        value={0}
                                        ref={this.especie}
                                       key='0'
                                        datos={this.state.especie_data}
                                        xfuncion={async (x) => {
                                            //this.setState({ keyC: 0, comunaDeChile: [] })
                                            //await this.guardarSoloRegion(x);
                                            console.log("usuariox => ", x);
                                            this.setState({especie_seleccionada:true,texto_paso_producto_id:x});
                                            //this.mostrarMontoMax(x);

                                        }}
                                        />;
        return a;


    }

    pinta_input_pallet = (valor) => {
    let d =    <TextInput
        style={{marginLeft:30,
            height: 40,
            width:'60%',
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: '#efeeef',
            borderRadius: 5,
            borderColor: '#dadee3',}}
            blurOnSubmit={true}
            keyboardType="numeric"
            //defaultValue={valor}
            defaultValue={valor}
            selectTextOnFocus={true}
            onChangeText={text => this.setState({texto_paso_pallet: text})}
            ref={this.pallet_base}


        />;
    return d;
    }

    carga_imagenes = async () =>{

        if(this.state.creado_web==1){
            this.setState({foto_cargo:'0'});
        }
        else{ 
               if(this.state.foto_numero_contenedor!=1){
        let arregloImagenes1 = this.Selector1.current.obtenerArregloImagenes();
           // let arregloImagenes2 = this.Selector2.current.obtenerArregloImagenes();
           // let arregloImagenes3 = this.Selector3.current.obtenerArregloImagenes();
    
           // console.log("arreglox1 -->"+ JSON.stringify(arregloImagenes1));
            let jsonImagenes1 = "";
    
            console.log("cantidad de imagenes .----> "+arregloImagenes1.length);
    
            if(arregloImagenes1.length ==0 ){
    
                this.HintAlertas.current.mostrarConParametros("Ingresar imagenes");
                return 1;
            }
    
    
            for (let i = 0; i < arregloImagenes1.length; i++) {
                let elemento = arregloImagenes1[i];
                //let nombre = arregloImagenes[i].NombreArchivo;
                let nombre = "rem_";
                let numero = i + 1;
                if (i < 10) {
                    nombre = nombre + "0" + numero.toString();
                } else {
                    nombre = nombre + numero.toString();
                }
    
                let extension = arregloImagenes1[i].Extension;
                let archivo = arregloImagenes1[i].Archivo;
    
                //let hash = await this.setJsStringHash(archivo);
    
                // con parametro hash
                //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Hash":"' + hash + '","Archivo":"' + archivo + '"}';
                jsonImagenes1 += '' + archivo + '';
    
                // sin parametro hash
                //jsonImagenes += '{"NombreArchivo":"' + nombre + "." + extension + '","Extension":"' + extension + '","Archivo":"' + archivo + '"}';
    
    
                if (i != arregloImagenes1.length - 1) {
                    jsonImagenes1 += ',';
                }
            }
    
            console.log(jsonImagenes1);
    
    
            this.setState({ foto_cargo: jsonImagenes1 });
        }else{
            this.setState({ foto_cargo: 1 });
        }
        }

    }

    envio_menu = async () => {


        // this.carga_objetosEspecie();
        //this.Loading.current.mostrar();
        // if(this.state.arregloEspecies.length==0){
        //     this.HintAlertas.current.mostrarConParametros("Debe ingresar almenos una Producto");
        //     return;
        //     }
            console.log("el recividor {"+this.state.recibidor_id+"}");
            
            if(this.state.recibidor_id==" " || this.state.recibidor_id==null){
                this.HintAlertas.current.mostrarConParametros("Debe ingresar ingresar un 'reciver'");
                return;
                } 

        var a =  await this.carga_imagenes();

        if (a==1){
            this.HintAlertas.current.mostrarConParametros("Debe ingresar una imagen ");
            return
        }
        if(this.state.presentar_datos==true){           
        


         console.log("la cantidad de productos ["+this.state.cantidad_productos+"]");

         if(this.state.cantidad_productos==0 || this.state.especie_seleccionada==true){
            await this.carga_objetosEspecie();
         }

         
        }
        

       


        
        console.log("aqui");
                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "1");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");

                console.log("arregloEspeciesx "+ JSON.stringify(this.state.arregloEspecies) );
                console.info(this.state.arregloEspecies);


        try {

            let motonavex ="";
            let puerto_origen="";
            let puerto_destino="";

            console.log("el valor essss:["+this.state.arregloEspecies.length+"]");
            if(this.state.creado_web!=1 && this.state.presentar_datos==true ){

                
                
                    console.log("los datos son: ["+this.state.creado_web+"] y ["+this.state.arregloEspecies.length+"]");

                    motonavex = this.BuscaModal.current.devolverSeleccionadosTexto();
                    console.log("datox_motonavex ->",motonavex);

                    if(motonavex==""){
                        this.HintAlertas.current.mostrarConParametros("Debe ingresar una 'Vessel'");
                        return
                    }

                    puerto_origen = this.BuscaModal1.current.devolverSeleccionadosTexto();
                    console.log("puerto_origen ->",puerto_origen);

                    if(puerto_origen==""){
                        this.HintAlertas.current.mostrarConParametros("Debe ingresar 'Port of loading'");
                        return
                    }

                    puerto_destino = this.BuscaModal2.current.devolverSeleccionadosTexto();
                    console.log("puerto_destino ->",puerto_destino);


                    if(puerto_destino==""){
                        this.HintAlertas.current.mostrarConParametros("Debe ingresar una 'Port of destination'");
                        return
                    }

                        if (puerto_origen==puerto_destino) {
                            if(puerto_origen !='' && puerto_destino !=''){
                                this.HintAlertas.current.mostrarConParametros("Error en los puertos");
                                return;
                            }
                            
                        }
                
            }


            

            let USUARIO_ID = await AsyncStorage.getItem('USUARIO_ID');
            let PLANTA_ID = await AsyncStorage.getItem('PLANTA_ID');

        //let usuario = this.props.route.params.usuario,
        //planta = this.props.route.params.planta,
        let embarque = this.props.route.params.embarque;
        let embarque_planta = this.props.route.params.embarque_planta;
        
        let var_paso = this.state.arregloEspecies;

       // console.info(var_paso);
        var paso = [];
        var_paso.forEach((e) =>
        {
            let objeto_especie = {
                especie_id : e.producto_id,
                especie_cantidad_pallets: e.cantidad_pallet,
                especie_cantidad_cajas: e.cantidad_cajas

            }
            paso.push(objeto_especie);
        //    console.info(e);
        });

        if(motonavex==""){motonavex=this.state.motonave}
        if(puerto_origen==""){puerto_origen=this.state.puerto_carga}
        if(puerto_destino==""){puerto_destino=this.state.puerto_destino}

            //(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) 
            let resultado = await WSRestApi.fnWSGuardaCargoDetail(USUARIO_ID,PLANTA_ID,embarque, embarque_planta, 
                ( this.state.creado_web==1  ? (this.state.motonave):(motonavex)),
                this.state.recibidor_id, 
                ( this.state.creado_web==1 ?(this.state.puerto_carga):(puerto_origen)), 
                (this.state.creado_web==1 ?(this.state.puerto_destino):(puerto_destino)), 
                this.state.numero_booking,
                paso,this.state.foto_cargo);
            //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
            console.log("resultadox ->"+JSON.stringify(resultado)) ;

            if(resultado.state==true)
            {   
                //console.log("okkkkkk");
               // let embarque_paso ='"'+ resultado.data.embarque_id + '"'

                //await AsyncStorage.setItem("embarque_id",'"'+ resultado.data.embarque_id+'"');
                //await AsyncStorage.setItem("embarque_planta_id",'"'+ resultado.data.embarque_planta_id+'"');


                await AsyncStorage.setItem("informeGeneral", "2");
                await AsyncStorage.setItem("identificacionCarga", "2");
                await AsyncStorage.setItem("EspecificacionContenedor", "1");
                await AsyncStorage.setItem("FotosContenedor", "0");
                await AsyncStorage.setItem("EstibaPallet", "0");
                await AsyncStorage.setItem("FotosConsolidacionCarga", "0");
                await AsyncStorage.setItem("Observaciones", "0");


                this.props.navigation.navigate('ConsolidacionCarga', {
                    embarque : resultado.data.embarque_id, 
                    embarque_planta : resultado.data.embarque_planta_id,
                    informeGeneral : "2",
                    identificacionCarga:"2",})


            }else{
                console.log("sin resultadox");
                this.HintAlertas.current.mostrarConParametros("Error al cargar los datos, Favor validar información");
            }   




        }catch(e){
            console.warn(e);
        }

        
       // this.props.navigation.navigate('ConsolidacionCarga', {a:'a'})
    };


    render() {

       // console.log("la pregarga es1 :"+ this.state.precarga)
            
        //if(this.state.precarga==true){
    if(this.state.creado_web==1 || this.state.presentar_datos==false){
    return (
        <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
            <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ConsolidacionCarga')}>
                <View style={{}}>
                <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />

                </View>
                </TouchableWithoutFeedback>


                <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Cargo details</Text>
                <TouchableWithoutFeedback onPress={() => this.setModalVisible(true)}>
                    <View style={{}}>
                    <Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />
                                        
                    </View> 
  </TouchableWithoutFeedback>

            </View>

            <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
            <Modal 
                     style={{height:90, width:90}}
                    animationType="fade"
                   // presentationStyle="formSheet"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                        //Alert.alert('Modal has been closed.');
                    }}>
                        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:'80%',height:'20%' ,backgroundColor:'white'}}>
                                    <View style={{ flex: 1 ,alignItems:'center', flexDirection: 'column'}} >
                                   <View style={{flex:1}}>
                                   <Text style={{fontSize:30}}>¿Sign off?</Text>
                                   </View>

                                    <View style={{flex:2, flexDirection:'row'}}>
                                        <View style={{flex:1, alignItems:'center'}}>
                                    <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
                                    <View style={{}}>
                                    <Icon4 style={{marginRight:20}} name="times" size={30} color="red" />

                                    </View> 
                                    </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{flex:1, alignItems:'center'}}>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')}>
                                    <View style={{}}>
                                    <Icon4 style={{marginRight:20}} name="check" size={30} color="green" />

                                    </View> 
                                    </TouchableWithoutFeedback>
                                    </View>
                                    </View>
                                    </View>

                            </View>
                        
                        </View>
                        
                </Modal>
            <FlatList nestedScrollEnabled={true}
           
                        ListHeaderComponent={
                        <View>
                        <Text style={{marginLeft:'10%', marginTop:10}}>Container N°</Text>
                        <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>{this.state.numero_contenedor}</Text>


                        <View  >

                        {this.state.foto_numero_contenedor == 1 ? (
                        <View style={{marginLeft:'10%',  marginBottom:20, marginTop:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                        <View style={{flex:0.5}}>
                        <Icon2 style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                        </View>
                        <View style={{flex:2, marginLeft:10}}>
                        <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Container number photo</Text> 
                        </View>                        
                        <View style={{flex:.5}}>
                        <TouchableHighlight style={{with:10}}
                        title="Press me"
                        onPress={() => this.setState({foto_numero_contenedor:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                        >



                        <Icon2 style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                        </TouchableHighlight>

                        </View>   

                        </View>
                        ):(<SelectorMultimediaCargo style={{marginLeft:'50%'}}
                        ref={this.Selector1}
                        mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                        ocultarTeclado={() => this.ocultarTeclado()}
                        />)}


                        </View>



                        <HintImagenAmpliada
                        ref={this.HintImagenAmpliada1}
                        title={""}
                        componente={<Image style={{ height: 200, width: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.imagenAmpliada1}` }} />}
                        eliminarFotoSelector={(key) => this.eliminarFotoSelector1(key)}
                        >
                        </HintImagenAmpliada>


                        <View>
                        <Text style={{marginLeft:30, marginTop:10}}>Vessel</Text>
                        <TextInput
                        style={styles.input}
                        editable={false}

                        value={this.state.motonave}
                        />
                        </View>


                        <View>
                        <Text style={{marginLeft:30, marginTop:10}}>Reciver/consignee</Text>
                        <View   >
                        <TextInput
                        style={styles.input}
                        editable={false}
                        // onChangeText={(clave) => this.setState({clave})}
                        // onChangeText={(text) => this.validate(text)}
                        //    recibidor_id:'',
                        //    recibidor_nombre:'',
                        //    puerto_carga:'',
                        //    puerto_destino:'',
                        value={this.state.recibidor_nombre}
                        />

                        </View>
                        </View>

                        <View>
                        <Text style={{marginLeft:30, marginTop:10}}>Port of loading</Text>
                        <View   >


                        <TextInput
                        style={styles.input}
                        editable={false}
                        // onChangeText={(clave) => this.setState({clave})}
                        // onChangeText={(text) => this.validate(text)}
                        value={this.state.puerto_carga}
                        />


                        </View>
                        </View>

                        <View>
                        <Text style={{marginLeft:30, marginTop:10}}>Port of destination</Text>
                        <View  >

                        <TextInput
                        style={styles.input}
                        editable={false}
                        // onChangeText={(clave) => this.setState({clave})}
                        // onChangeText={(text) => this.validate(text)}
                        value={this.state.puerto_destino}
                        />
                        </View>
                        </View>

                        <View>
                        <Text style={{marginLeft:30, marginTop:10}}>Booking N°</Text>
                        <TextInput
                        style={styles.input}
                        editable={false}
                        // onChangeText={(clave) => this.setState({clave})}
                        // onChangeText={(text) => this.validate(text)}
                        value={this.state.numero_booking}
                        />
                        </View> 

                        <View style={{flexDirection:'row'}}>
                <View style={{flex:1.5}}>
                <Text style={{marginLeft:30, marginTop:10}}>Product</Text>
                <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >
                
               
                
                
                
                </View>
                </View>
                <View style={{flex:1}}>
                <Text style={{marginLeft:30, marginTop:10}}>Pallets</Text>
               
                
                
                </View>
                <View style={{flex:1}}>
                <Text style={{marginLeft:10, marginTop:10}}>Boxes</Text>
                 
                
                
                </View>
                </View>  




                        </View>
                                }
                    ListFooterComponent={ (item) =>
                        <View >
                           <View style={{flexDirection:'row'}}>
                           <View style={{flex:3}}>
                            <Text style={{marginLeft:'60%'}} >Total:</Text>
                            </View>
                           <View style={{flex:0.8}}>
                            <Text style={{marginLeft:'0%'}} >{this.state.suma_pallet} </Text>
                            </View>
                            <View style={{flex:0.8}}>
                            <Text style={{marginLeft:'0%'}} > {this.state.suma_box}</Text>
                            </View>

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
                            }
                    //ListEmptyComponent={}
                    data={this.state.arregloEspecies}
                    renderItem={this.mostrarEspecies}
                    horizontal={false}
                    keyExtractor={(item)=> item.id}

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
 }else{
    

    return (
        <View style={{ flex: 1 , backgroundColor: '#6c649c'}}>
            <View style={{ flex: 0.2 ,alignItems:'center', flexDirection: 'row'}} >
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ConsolidacionCarga')}>
                <View style={{}}>
                <Icon2 style={{marginLeft:10}} name="chevron-back" size={30} color="#FFFF" />

                </View>
                </TouchableWithoutFeedback>


                <Text style={{flex:1,marginLeft:50, color:'white',marginTop:0, fontSize:18}}>Cargo details </Text>
                <TouchableWithoutFeedback onPress={() => this.setModalVisible(true)}>
                    <View style={{}}>
                    <Icon4 style={{marginRight:20}} name="sign-out-alt" size={30} color="#FFFF" />
                                        
                    </View> 
  </TouchableWithoutFeedback>

            </View>

            <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20,  flex: 1, backgroundColor: 'white', flexDirection: 'column'}} >
        
            <Modal 
                     style={{height:90, width:90}}
                    animationType="fade"
                   // presentationStyle="formSheet"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                        //Alert.alert('Modal has been closed.');
                    }}>
                        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center', alignItems:'center'}}>
                            <View style={{width:'80%',height:'20%' ,backgroundColor:'white'}}>
                                    <View style={{ flex: 1 ,alignItems:'center', flexDirection: 'column'}} >
                                   <View style={{flex:1}}>
                                   <Text style={{fontSize:30}}>¿Sign off?</Text>
                                   </View>

                                    <View style={{flex:2, flexDirection:'row'}}>
                                        <View style={{flex:1, alignItems:'center'}}>
                                    <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
                                    <View style={{}}>
                                    <Icon4 style={{marginRight:20}} name="times" size={30} color="red" />

                                    </View> 
                                    </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{flex:1, alignItems:'center'}}>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')}>
                                    <View style={{}}>
                                    <Icon4 style={{marginRight:20}} name="check" size={30} color="green" />

                                    </View> 
                                    </TouchableWithoutFeedback>
                                    </View>
                                    </View>
                                    </View>

                            </View>
                        
                        </View>
                        
                </Modal>

            <FlatList nestedScrollEnabled={true}
            //inverted={true}
            ListHeaderComponent={
                <View>
                <Text style={{marginLeft:'10%', marginTop:10}}>Container N°</Text>
                 <Text style={{marginLeft:'10%', marginTop:10, fontWeight:'bold'}}>{this.state.numero_contenedor}</Text>
                
                
                
                
                {this.state.foto_numero_contenedor==1 ?(
                    <View style={{marginTop:20, marginLeft:'10%',  marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                    <View style={{flex:0.5}}>
                    <Icon2 style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                    </View>
                    <View style={{flex:2, marginLeft:10}}>
                    <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>Container number photo</Text> 
                    </View>                        
                    <View style={{flex:.5}}>
                    <TouchableHighlight style={{with:10}}
                          title="Press me"
                          onPress={() => this.setState({foto_numero_contenedor:0, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                              >



                          <Icon2 style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                </TouchableHighlight>
                             
                    </View>   
                        
                    </View>
                ):(
                    <View >
                    <SelectorMultimediaCargo style={{marginLeft:'50%'}}
                    ref={this.Selector1}
                    mostrarImagenAmpliada={(imagen, key, extension) => this.mostrarImagenAmpliada1(imagen, key, extension)}
                    ocultarTeclado={() => this.ocultarTeclado()}
                    />
                    </View>
                )}
                
                



                 
                 <HintImagenAmpliada
                 ref={this.HintImagenAmpliada1}
                 title={""}
                 componente={<Image style={{ height: 200, width: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.imagenAmpliada1}` }} />}
                 eliminarFotoSelector={(key) => this.eliminarFotoSelector1(key)}
                 >
                 </HintImagenAmpliada>
                
                 <Text style={{marginLeft:30, marginTop:10}}>Vessel</Text>
                 <View style={{flexDirection:'row'}}>
                 
                 {/* <TextInput
                 style={styles.inputBusqueda}
                 selectTextOnFocus={true}
                      onChangeText={(valor) => this.setState({motonave:valor})}
                      inlineImageLeft=''
                 value={this.state.motonave}
                 /> */}
                 <View style={{flex:1}} >
                  <BuscaModal                        
                        ref={this.BuscaModal} 
                        datox={this.state.motonave}
                        >
                </BuscaModal>
                </View>
                <View style={{flex:0.2}} >
                 <TouchableHighlight style={{width:20}}
                          title="Press me"
                          onPress={() => {

                              console.log("texto a buscar:",this.state.muestraMoto);
                              //this.BuscaModal.current.setModalVisible(true, this.state.motonave);
                              this.BuscaModal.current.carga_dato_busqueda(true, this.state.motonave, "vesselsearch");
                             // this.setState({motonave:this.BuscaModal.current.devolverSeleccionadosTexto()})  
                                                          
                            }}
                              >
                          <Icon2 style={{ marginTop:5, flex: 1, paddingTop:10}} name="search" size={20} color="#F4891F" />  
                </TouchableHighlight>
                </View>
                 </View>
                
                
                 <View>
                 <Text style={{marginLeft:30, marginTop:10}}>Reciver/consignee</Text>
                 <View style={{width:'80%', marginLeft:'10%'}}   >
                 

                        <Select
                        value={this.state.recibidor_id}
                        
                        //ref={this.especie}
                        datos={this.state.recibidor_data}
                        xfuncion={async (x) => {
                            //this.setState({ keyC: 0, comunaDeChile: [] })
                            //await this.guardarSoloRegion(x);
                            console.log("usuariox => ", x);
                            this.setState({recibidor_id:x});
                           // this.setState({especie_seleccionada_Arreglo:[x]});
                           // especie_seleccionada_Arreglo
                            //this.mostrarMontoMax(x);

                         }}
                        />
                 
                 </View>
                 </View>
                
                 <View>
                 <Text style={{marginLeft:30, marginTop:10}}>Port of loading</Text>
                 {/* <View   >
                 
                
                 <TextInput
                 style={styles.input}
                 selectTextOnFocus={true}
                      onChangeText={(valor) => this.setState({puerto_carga:valor})}
                 value={this.state.puerto_carga}
                 />
                
                
                 </View> */}
                 <View style={{flexDirection:'row'}}>
                 <View style={{flex:1}} >
                <BuscaModal                        
                        ref={this.BuscaModal1} 
                        datox={this.state.puerto_carga}
                        >
                </BuscaModal> 
                </View>
                 {/* <TextInput
                 style={styles.inputBusqueda}
                 selectTextOnFocus={true}
                      onChangeText={(valor) => this.setState({puerto_carga:valor})}
                      inlineImageLeft=''
                 value={this.state.puerto_carga}
                 /> */}
                 <View style={{flex:0.2}} >
                 <TouchableHighlight style={{width:20}}
                          title="Press me"
                          onPress={() => {

                              console.log("texto a buscar:",this.state.muestraMoto);
                              //this.BuscaModal.current.setModalVisible(true, this.state.motonave);
                              this.BuscaModal1.current.carga_dato_busqueda(true, this.state.puerto_carga, "portsearch");

                              //this.BuscaModal.current.carga_dato_busqueda();

                            }}
                              >
                          <Icon2 style={{ marginTop:5, flex: 1, paddingTop:10}} name="search" size={20} color="#F4891F" />  
                </TouchableHighlight>
                </View>

                 </View>
                 
                 </View>
                
                 <View>
                 <Text style={{marginLeft:30, marginTop:10}}>Port of destination</Text>
                     {/* <View  >
                     
                     <TextInput
                     style={styles.input}
                     selectTextOnFocus={true}
                      onChangeText={(valor) => this.setState({puerto_destino:valor})}
                     value={this.state.puerto_destino}
                     />
                     </View> */}

                <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                <BuscaModal                        
                        ref={this.BuscaModal2} 
                        datox={this.state.puerto_destino}
                        >
                </BuscaModal>
                </View>
                <View style={{flex:0.2}} >
                 {/* <TextInput
                 style={styles.inputBusqueda}
                 selectTextOnFocus={true}
                      onChangeText={(valor) => this.setState({puerto_destino:valor})}
                      inlineImageLeft=''
                 value={this.state.puerto_destino}
                 /> */}
                 <TouchableHighlight style={{width:20}}
                          title="Press me"
                          onPress={() => {

                              console.log("texto a buscar:",this.state.muestraMoto);
                              //this.BuscaModal.current.setModalVisible(true, this.state.motonave);
                              this.BuscaModal2.current.carga_dato_busqueda(true, this.state.puerto_destino, "portsearch");

                              //this.BuscaModal.current.carga_dato_busqueda();

                            }}
                              >
                             <Icon2 style={{ marginTop:5, flex: 1, paddingTop:10}} name="search" size={20} color="#F4891F" />  
                </TouchableHighlight>
                 </View>
                 </View>


                 </View>
                
                 <View>
                     <Text style={{marginLeft:30, marginTop:10}}>Booking N°</Text>
                     <TextInput
                     style={styles.input}
                     selectTextOnFocus={true}
                      onChangeText={(valor) => this.setState({numero_booking:valor})}
                     // onChangeText={(text) => this.validate(text)}
                     //value={this.state.numero_booking}
                     />
                 </View> 
                
                
                <TouchableOpacity
                     onPress={() => this.carga_objetosEspecie()}
                 >
                 <View style={{flexDirection:'row'}}>
                 <Icon2 style={{color:'#ef882d', marginLeft:'10%'}} name="add-circle" size={25}  />
                 <Text style={{ color:'#ef882d', fontWeight:'bold', paddingTop:5}}>  Agregar una nueva especie</Text>
                 </View>
                
                </TouchableOpacity>
                
                 
                <View style={{flexDirection:'row'}}>
                <View style={{flex:1.5}}>
                <Text style={{marginLeft:30, marginTop:10}}>Product</Text>
                <View  style={{backgroundColor:'#efeeef', width:'80%', marginLeft:30}} >
                
                {this.pinta_select_producto(this.state.seteo)}
                
                
                
                </View>
                </View>
                <View style={{flex:1}}>
                <Text style={{marginLeft:30, marginTop:10}}>Pallets</Text>
                {/* {this.pinta_input_pallet(this.state.seteo)} */}
                <TextInput
                ref={this.pallet_base}
                style={{marginLeft:30,
                height: 40,
                width:'60%',
                margin: 12,
                borderWidth: 1,
                padding: 10,
                backgroundColor: '#efeeef',
                borderRadius: 5,
                borderColor: '#dadee3',}}
                blurOnSubmit={true}
                keyboardType="numeric"
                //defaultValue={valor}
                // defaultValue={valor}
                selectTextOnFocus={true}
                onChangeText={text => this.setState({texto_paso_pallet: text})}
                
                
                
                
                />
                
                </View>
                <View style={{flex:1}}>
                <Text style={{marginLeft:10, marginTop:10}}>Boxes</Text>
                 
                
                <TextInput
                ref={this.box}
                style={{marginLeft:10,
                 height: 40,
                 width:'60%',
                 margin: 12,
                 borderWidth: 1,
                 padding: 10,
                 backgroundColor: '#efeeef',
                 borderRadius: 5,
                 borderColor: '#dadee3',}}
                 keyboardType="numeric"
                // defaultValue='0'
                 selectTextOnFocus={true}
                 onChangeText={text => this.setState({texto_paso_box: text})}
                // onChangeText={(text) => this.validate(text)}
                //value={this.state.clave}
                 value={this.state.caja_base}
                />
                
                </View>
                <View style={{flex:0.2}}></View>
                </View>
                
                 </View>
                                }
                    ListFooterComponent={ (item) =>
                        <View >
                           <View style={{flexDirection:'row'}}>
                           <View style={{flex:3}}>
                            <Text style={{marginLeft:'60%'}} >Total:</Text>
                            </View>
                           <View style={{flex:0.8}}>
                            <Text style={{marginLeft:'0%'}} >{this.state.suma_pallet} </Text>
                            </View>
                            <View style={{flex:0.8}}>
                            <Text style={{marginLeft:'0%'}} > {this.state.suma_box}</Text>
                            </View>

                            </View>
                        <View style={{alignItems:'center', backgroundColor:'white', flex:0.2, paddingTop:20, paddingBottom:20}}>

                            
                            
                            <TouchableHighlight style={{with:10}}
                            title="Press me"
                            onPress={() => this.envio_menu()}
                            >
                            <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:35,paddingRight:35, backgroundColor:'#ef882d', color:'white', }}>Enter</Text>
                            </TouchableHighlight>
                        </View>
                        </View>
                            }
                    //ListEmptyComponent={}
                    data={this.state.arregloEspecies}
                    renderItem={this.mostrarEspecies}
                    horizontal={false}
                    keyExtractor={(item)=> item.id}

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



}

class InputTextDinamico extends Component {

    constructor(props) {
      super(props);

      this.state = {
        carga: false,

      };

     // let hora = Redirect.getTimeNow();
     console.log("carga input");
    }

    render() {


        return (
          <Text>
              hola mundox
          </Text>
        )


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
    inputBusqueda: {
        marginLeft:30,
        height: 40,
        width:'70%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#efeeef',
        borderRadius: 5,
        borderColor: '#dadee3',
  
      },
  });