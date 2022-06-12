import React, { Component } from 'react'
import { Text, View, Alert, TouchableOpacity, FlatList, Image, Platform ,TouchableHighlight} from 'react-native'
//import * as ImagePicker from 'expo-image-picker';
import ImagePicker from 'react-native-image-picker';
import ImageMultiplePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { ActionSheetCustom as ActionSheet2 } from 'react-native-actionsheet';
import Icon from 'react-native-vector-icons/AntDesign';

import Icon2 from 'react-native-vector-icons/Ionicons';


import styles from './SelectorMultimedia.style';

import Hint from '../../components/Hint/Hint.component';
import HintAlert from '../../components/Hint/HintAlert.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSIONS, check, request, RESULTS, openSettings } from 'react-native-permissions';

// import {
//     Asset,
//     Constants,
//     FileSystem,
//     Permissions,

// } from 'react-native-unimodules';

export class SelectorMultimediaMultiple extends Component {

    //PESO_MAX = 5000; //MEGAS

    constructor(props) {
        super(props);

        this.Hint = React.createRef();
        this.HintAlert = React.createRef();

        this.state = {
            tituloHintAlerta: "",
            imagenAmpliadaVisible: false,
            fontLoaded: false,

            estacargado:false,

            imagenCargada: "",
            contadorFotos: 0,
            ArregloImagenes: [], //puede tener solo 2 imagenes
            arregloCuadrados: [],
            imagenSeleccionada: {},
            pesoImagen: 0,
            nombreImagen: "",
            indexInicial: 0,
            pesoTotalAcumulado: 0,
            hasCameraPermission: null, //Permission value,
            imagenKeyEliminar: "",
            PESO_MAX: 0,
            texto: "",
            intento: 0,
            intentoCamara: 0,
        }

    }



    //no esta convertido en formato json
    obtenerArregloImagenes = () => {
        return this.state.ArregloImagenes;
    }

    //--------------------------------------------------------------

    mostrarActionSheetEliminar = (key) => {
        this.setState({ imagenKeyEliminar: key });
        this.ActionSheet2.show();
    }

    mostrarOpcionesMultimedia = () => {

        this.props.ocultarTeclado();

        //si el peso de las fotos en menor a 5 megas
        if (this.state.pesoTotalAcumulado <= this.state.PESO_MAX) {
            this.ActionSheet.show();
        } else {
            Alert.alert("", "Peso maximo superado");
        }
    }

    //nos indica si debemos ejecutar el metodo para entrar a la galeria o a la camara
    rutasMultimedia = async (id) => {


        setTimeout(() => {

            if (id == 1) {
                console.log("se ha llamado a camara");
                //this.abrirCamara();
                this.abrirCamara2();
            } else if (id == 2) {
                console.log("se ha llamado a galeria");
                //this.abrirGaleria();
                this.abrirGaleriaMultiple();
            } else if (id == 3){
                console.log("se ha llamado a galeria pdf");
                this.abrirGaleriaMultiple2();
            }

        }, 500);

    }

    //-------------------------------------

    abrirCamara = async () => {


        try {

            let respuesta = await this.getPermissionAsync();
            if(respuesta == true){
                console.log("RESPUESTA => ", respuesta);

                let options = {
                    mediaType: 'photo',
                    includeBase64: false,
                    quality: 0.3
                }
                // Launch Camera:
                ImagePicker.launchCamera(options, (images) => {
                    if (images.didCancel) {
                        console.log('User cancelled photo picker');
                    } else if (images.error) {
                        console.log('ImagePicker Error: ', images.error);
                    } else if (images.customButton) {
                        console.log('User tapped custom button: ', images.customButton);
                    } else {
                        let imgBase64 = images.data;//images[i].data;
                        let objetoImagen = this.crearObjetoImagen(images.uri);
                        this.agregarNuevaImagen(imgBase64, objetoImagen);
                    }
                  
                });

            }else{
                console.log("RESPUESTA => ", respuesta);
            }

        } catch (error) {
            console.log("Error abrirCamara => ", error);
        }
    }

    abrirCamara2 = async () => {

        try {

            let respuesta = await this.getPermissionAsync();
            if(respuesta == true){
                console.log("RESPUESTA => ", respuesta);

                ImageMultiplePicker.openCamera({
                    compressImageQuality: 0.3,
                    includeBase64: true
                  }).then(image => {
                    //console.log(image);
                    let imgBase64 = image.data;//images[i].data;
                    let objetoImagen = this.crearObjetoImagen(image.path);
                    this.agregarNuevaImagen(imgBase64, objetoImagen);
                  });


            }else{
                console.log("RESPUESTA => ", respuesta);
            }

        } catch (error) {
            console.log("Error abrirGaleriaMultiple => ", error);
        }

    }

    obtenerPesoImagen = (longitud) => {
        let resultado = 4 * Math.ceil(longitud / 3);
        console.log("obtenerPesoIMagen() ", Math.round(resultado / 1000));
        let resultadoFinal = Math.round(resultado / 1000);
        return resultadoFinal;

    }

    abrirGaleria2 = () => {

        ImagePicke2.rshowImagePicker(null, (response) => {
            console.log('respuesta al abrir la galeria = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }


    //Abrir galeria para seleccionar una imagen
    abrirGaleria = async () => {

        //let { permisos } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        //opciones para abrir la galeria de imagenes
        options = {
            mediaTypes: "Images",
            base64: true,
            exif: true,
            quality: 0.3
        }

        let resultado = await ImagePicker.launchImageLibraryAsync(options)
            .then(imagen => {
                imagen.exif.Orientation = 1;
                let objetoImagen = this.crearObjetoImagen(imagen.uri);
                this.agregarNuevaImagen(imagen.base64, objetoImagen);

            }).catch(error => console.log("No ha seleccionado ninguna foto", error));


        console.log("resultado de abrir la galeria ", resultado);
    }

    


    abrirGaleriaMultiple = async () => {
        try {


            console.log("weewew");
            let respuesta = await this.getPermissionGalleryAsync();
            if(respuesta == true){
                console.log("RESPUESTA => ", respuesta);

                await ImageMultiplePicker.openPicker({
                    multiple: true,
                    includeBase64: true,
                    compressImageQuality: 0.3,
                }).then(images => {
                    
                    if (images.length > 0) {
                        for (let i = 0; i < images.length; i++) {
    
                            let imgBase64 = images[i].data;
                            let size = images[i].size;
    
                            let pesoImagen = size;//this.obtenerPesoImagen(imgBase64.length);
                            console.log("el peso de la imagen es aprox111", pesoImagen);
                            console.log("Image size => ", size);
    
                            let filePath = images[i].path;
                            let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
                            if(!allowedExtensions.exec(filePath)){
                                this.setState({ tituloHintAlerta: "Atención" });
                                this.Hint.current.mostrarConParametros("Suba un archivo que tenga las extensiones .jpeg / .jpg / .png / .gif solamente");
                                break;
                            }
    
    
                            if (pesoImagen < this.state.PESO_MAX - this.state.pesoTotalAcumulado) {
                                let MyArray = images[i].path;
                                MyArray = MyArray.split("/");
                                let n = MyArray.length - 1;
                                let MyArray2 = MyArray[n];
                                MyArray2 = MyArray2.split(".");
                                let filename = MyArray2[0];
                                //let extension = MyArray2[1];
                                let extension = this.getExt(filePath);
    
                                let objetoCuadrado = {
                                    key: "" + this.state.indexInicial,
                                    value: imgBase64,
                                    extension: extension
                                }
    
                                let objetoFinal = {
                                    key: "" + this.state.indexInicial,
                                    NombreArchivo: filename,
                                    Extension: extension,
                                    Archivo: imgBase64
                                }
    
                                console.log(objetoFinal.key);
                                console.log(objetoFinal.NombreArchivo);
                                console.log(objetoFinal.Extension);
                               // console.log(objetoFinal.Archivo);

    
                                this.setState({ arregloCuadrados: [...this.state.arregloCuadrados, objetoCuadrado] })
    
                                this.setState({ indexInicial: this.state.indexInicial + 1 })
    
                                //---
                                this.setState({
                                    ArregloImagenes: [...this.state.ArregloImagenes, objetoFinal],
                                })
    
                                this.setState({
                                    pesoTotalAcumulado: this.state.pesoTotalAcumulado + pesoImagen
                                })
                                
                                this.setState({estacargado:true})

    
                                console.log("peso total acumuladoxxxx : ", this.state.pesoTotalAcumulado);
                            } else {
                                this.setState({ tituloHintAlerta: "Tamaño máximo excedido" });
                                this.Hint.current.mostrarConParametros("No es posible agregar más imágenes a esta solicitud. Para continuar elimina al menos una imagen seleccionada");
                                break;
                            }
    
                        }
                    }
    
    
                });

            }else{
                console.log("RESPUESTA => ", respuesta);
            }

        } catch (error) {
            console.log("Error abrirGaleriaMultiple => ", error);
        }
    }

    getExt(filename)
    {
    try{
    var parts = filename.split('.');
    return parts[parts.length-1];
    }catch(ex){
    return "";
    }
    }

    getName(filename)
    {
    try{
   
    let lastIndex = filename.lastIndexOf(".");
    let final = filename.substring(0,lastIndex);   

    return final;
    
    }catch(ex){
    return "";
    }
    }

    abrirGaleriaMultiple2 = async () => {
        try {

            const res = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.pdf],
                readContent:true,
                });
    
                if (res.length > 0) {
                    console.log(res);
                    for (let i = 0; i < res.length; i++) {
                        let imgBase64 = "";
                        let pesoImagen = res[i].size;
                        console.log(`el peso de la imagen ${i} es aprox ${pesoImagen}`);

                        let file = res[i].name;

                        let filename = this.getName(file);
                            let extension = this.getExt(file);
                            //let MyArray2 = file;
                            console.log("nombre archivox1x->"+ filename);
                            console.log("nombre archivox1x->"+ extension);


                        let allowedExtensions = /(.pdf|.PDF|)$/i;
                        if(!allowedExtensions.exec(file)){
                            this.setState({ tituloHintAlerta: "Atención" });
                            this.Hint.current.mostrarConParametros("Suba un archivo que tenga las extensiones .pdf solamente");
                            break;
                        }

                        if (pesoImagen < this.state.PESO_MAX - this.state.pesoTotalAcumulado) {
                            let MyArray = file;
                            MyArray = MyArray.split(".");
                            //let filename = MyArray[0];
                            
                            // getName
                            //let extension = MyArray[1];
                            let filename = this.getName(file);
                            let extension = this.getExt(file);
                            //let MyArray2 = file;
                            console.log("nombre archivox2x->"+ filename);
                            console.log("nombre archivox2x->"+ extension);
                            let realPath = "";
                            if (Platform.OS == 'ios') {
                                const split = res[i].fileCopyUri.split('/');
                                const name = split.pop();
                                const inbox = split.pop();
                                realPath = `file://${
                                  RNFS.TemporaryDirectoryPath
                                  }/${inbox}/${decodeURI(name)}`;
                                console.log(realPath);
                            }else{
                                realPath = res[i].uri;
                            }

                            console.log("realPath => ", realPath); 
                            let docBase64 = await RNFS.readFile(realPath, "base64").then(result =>
                            {
                                return result
                            })

                            
                            let imgCuadrado64 = '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';

                            let objetoCuadrado = {
                                key: "" + this.state.indexInicial,
                                value: imgCuadrado64,
                                extension: extension
                            }

                            // let objetoCuadrado = {
                            //     key: "" + this.state.indexInicial,
                            //     value: docBase64
                            // }

                            let objetoFinal = {
                                key: "" + this.state.indexInicial,
                                NombreArchivo: filename,
                                Extension: extension,
                                Archivo: docBase64
                            }

                            this.setState({ arregloCuadrados: [...this.state.arregloCuadrados, objetoCuadrado] })

                            this.setState({ indexInicial: this.state.indexInicial + 1 })
                            
                            // console.log("el estado es : xxx"+true);
                            // this.setState({ estacargado: true })
                            

                            //---
                            this.setState({
                                ArregloImagenes: [...this.state.ArregloImagenes, objetoFinal],
                            })

                            this.setState({
                                pesoTotalAcumulado: this.state.pesoTotalAcumulado + pesoImagen
                            })

                            this.setState({estacargado:true})

                            console.log("peso total acumuladoxxx : ", this.state.pesoTotalAcumulado);

                        }else{
                            this.setState({ tituloHintAlerta: "Tamaño máximo excedido" });
                            this.Hint.current.mostrarConParametros("No es posible agregar más imágenes a esta solicitud. Para continuar elimina al menos una imagen seleccionada");
                            break; 
                        }

                    }
                }

        } catch (error) {
            console.log("Error abrirGaleriaMultiple2 => ", error);
        }
    }

    crearObjetoImagen = (uri) => {

        let uri2 = "";
        //guardamos todos las palabras separadas en un arreglo
        let arregloDePalabras = uri.split("/");

        for (let i = 1; i <= arregloDePalabras.length; i++) {
            if (i == arregloDePalabras.length - 1) {
                this.setState({ nombreImagen: arregloDePalabras[i] })
                uri2 = arregloDePalabras[i];
            }
        }

        //2° parte del algoritmo

        //volvemos a separar uri2 esta vez por el punto
        let nombreExtension = uri2.split(".");

        let nombre = nombreExtension[0];
        let extension = nombreExtension[1];

        //creamos un objeto con 2 propiedades y lo retornamos
        let propiedadesImagen = {
            nombre: nombre,
            extension: extension
        }

        console.log(propiedadesImagen);


        return propiedadesImagen;
    }



    //metodo para agregar una imagen o archivo ya sea de foto o de la galeria
    agregarNuevaImagen = (imagenBase64, propiedadesImagen) => {

        let pesoImagen = this.obtenerPesoImagen(imagenBase64.length);
        console.log("el pase de la imagen es ", pesoImagen);


        if (pesoImagen < this.state.PESO_MAX - this.state.pesoTotalAcumulado) {
            let objetoFinal = {
                key: "" + this.state.indexInicial,
                NombreArchivo: propiedadesImagen.nombre,
                Extension: propiedadesImagen.extension,
                Archivo: imagenBase64
            }
            //------------------------------------
            //agregamos un objeto al arreglo de cuadrados

            console.log(objetoFinal.key);
            console.log(objetoFinal.NombreArchivo);
            console.log(objetoFinal.Extension);



            let objetoCuadrado = {
                key: "" + this.state.indexInicial,
                value: imagenBase64,
                extension: propiedadesImagen.extension
            }

            this.setState({ indexInicial: this.state.indexInicial + 1 })
            //------------------------------------

            this.setState({ arregloCuadrados: [...this.state.arregloCuadrados, objetoCuadrado] })

            this.setState({
                ArregloImagenes: [...this.state.ArregloImagenes, objetoFinal],
            })


            this.setState({
                pesoTotalAcumulado: this.state.pesoTotalAcumulado + pesoImagen
            })
            this.setState({estacargado:true})

            console.log("peso total acumuladoxx : ", this.state.pesoTotalAcumulado);



        } else {
            this.setState({ tituloHintAlerta: "Tamaño máximo excedido" });
            this.Hint.current.mostrarConParametros("No es posible agregar más imágenes a esta solicitud. Para continuar elimina al menos una imagen seleccionada");
            //Alert.alert("No es posible agregar más imágenes a esta solicitud. Para continuar elimina al menos una imagen seleccionada.")
        }


    }


    eliminarImagen = (index) => {
        console.log("eliminarImagen...")

        let i = this.state.imagenKeyEliminar;

        if (index == 1) {
            let arregloTemp = [];

            console.log("se ha mandado a eliminar el elemento ", i);

            //eliminamos correctamente cada imagen
            this.state.arregloCuadrados.forEach(e => {
                if (e.key != i) {
                    arregloTemp.push(e);
                }
            });

            this.setState({ arregloCuadrados: arregloTemp });

            this.setState({ contadorFotos: this.state.ArregloImagenes.length })

            this.state.arregloCuadrados.forEach(e => {
                console.log("ahora quedan los cuadros ", e.key);
            })


            let arregloTemp2 = [];

            this.state.ArregloImagenes.forEach(e => {
                if (e.key != i) {
                    arregloTemp2.push(e);
                } else {
                    let datosLiberados = this.obtenerPesoImagen(e.Archivo.length);
                    console.log("vamos a liberar ", datosLiberados);
                    //para este caso en particular cuando eliminemos volveremos a quedar en cero 
                    this.setState({
                        pesoTotalAcumulado: 0
                    })
                    console.log("ahora disponemos de ", this.state.PESO_MAX - this.state.pesoTotalAcumulado, " para subir imagenes");

                }
            })

            this.setState({ ArregloImagenes: arregloTemp2 });

            this.state.ArregloImagenes.forEach(e => {
                console.log("ahora quedan las imagenes ", e.key);

            })

        }

    }


    eliminarImagen2 = (index) => {
        console.log("eliminarImagen...")

        let i = index;

        if (index) {
            let arregloTemp = [];

            console.log("se ha mandado a eliminar el elemento ", i);

            //eliminamos correctamente cada imagen
            this.state.arregloCuadrados.forEach(e => {
                if (e.key != i) {
                    arregloTemp.push(e);
                }
            });

            this.setState({ arregloCuadrados: arregloTemp });

            this.setState({ contadorFotos: this.state.ArregloImagenes.length })

            this.state.arregloCuadrados.forEach(e => {
                console.log("ahora quedan los cuadros ", e.key);
            })


            let arregloTemp2 = [];

            this.state.ArregloImagenes.forEach(e => {
                if (e.key != i) {
                    arregloTemp2.push(e);
                } else {
                    let datosLiberados = this.obtenerPesoImagen(e.Archivo.length);
                    console.log("vamos a liberar ", datosLiberados);
                    //para este caso en particular cuando eliminemos volveremos a quedar en cero 
                    this.setState({
                        pesoTotalAcumulado: 0
                    })
                    console.log("ahora disponemos de ", this.state.PESO_MAX - this.state.pesoTotalAcumulado, " para subir imagenes");

                }
            })

            this.setState({ ArregloImagenes: arregloTemp2 });

            this.state.ArregloImagenes.forEach(e => {
                console.log("ahora quedan las imagenes ", e.key);

            })

        }

    }

    desactivarImagenAmpliada = () => {
        this.setState({ imagenAmpliadaVisible: false })
    }

    //este es el metodo que utiliza el flat list para mostrar las imagenes 
    mostrarCuadrosImagen = ({ item }) => {
        return (
            <TouchableOpacity
                onLongPress={() => this.mostrarActionSheetEliminar(item.key)}
                onPress={() => this.props.mostrarImagenAmpliada(item.value, item.key, item.extension)}
            >
                <View style={{ ...styles.circuloAdjuntarImagen, marginRight: 10 }}>
                    <Image style={styles.foto} source={{ uri: "data:image/jpeg;base64,".concat(item.value) }} />
                </View>
            </TouchableOpacity>
        )
    }

    //-----------------------------------------------------------------

    //LLAMADO OBLIGATORIO PARA CARGA DE FUENTES
    async componentDidMount() {

        //this.getPermissionAsync();

        console.log("la fuente esta en estado5", this.state.fontLoaded);
        this.setState({ fontLoaded: true })

        // const { status } = await Permissions.askAsync(Permissions.CAMERA);
        //this.setState({ hasCameraPermission: status === 'granted' });
        
        let REEMBOLSO_TAMANO = 30000000; //bytes  //await AsyncStorage.getItem("REEMBOLSO_TAMAÑO"); 
        this.setState({ PESO_MAX: REEMBOLSO_TAMANO });
        console.log("REEMBOLSO_TAMAÑO => ", this.state.PESO_MAX);


        let texto = ` ${REEMBOLSO_TAMANO / 1000000} MB max`;
        this.setState({ texto: texto });
    }

    getPermissionAsync = async () => {

        console.log("se ha llamado a perdir permisos");
        let respuesta = false;  
        if(Platform.OS == 'ios'){
            const res2 = await request(PERMISSIONS.IOS.CAMERA);
            console.log("Permiso2 => ", res2);
            if (res2 === RESULTS.GRANTED) {
                respuesta = true;
            }else{
                let nro = this.state.intentoCamara;
                if(nro > 0){
                    this.HintAlert.current.mostrar();
                }else{
                    this.setState({intentoCamara: 1});
                }
            }                   
            // }else if(res2 === RESULTS.BLOCKED){
            //     let nro = this.state.intentoCamara;
            //     if(nro > 0){
            //         this.HintAlert.current.mostrar();
            //     }else{
            //         this.setState({intentoCamara: 1});
            //     }
                
            // }
        }else{
            respuesta = true; 
        }

        return respuesta
    }
    getPermissionGalleryAsync = async () => {

        console.log("se ha llamado a perdir permisos");
        let respuesta = false; 
        
        if(Platform.OS == 'ios'){
            const res2 = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            console.log("Permiso2 => ", res2);
            if (res2 === RESULTS.GRANTED) {
                respuesta = true;
            }else{
                let nro = this.state.intento;
                if(nro > 0){
                    this.HintAlert.current.mostrar();
                }else{
                    this.setState({intento: 1});
                }
            }                   
            // }else if(res2 === RESULTS.BLOCKED){
            //     let nro = this.state.intento;
            //     if(nro > 0){
            //         this.HintAlert.current.mostrar();
            //     }else{
            //         this.setState({intento: 1});
            //     }
                
            // }

        }else{
            respuesta = true; 
        }


        return respuesta
    }

    //-----------------------------------------------------------------

    ejecutarAceptar = async () => {
        console.log("se ha presionado aceptar");
        openSettings().catch(() => console.warn('cannot open settings'));
        this.HintAlert.current.cerrar();
    
    }
    ejecutarCancelar = () => {
        console.log("se ha presionado cancelar");
        this.HintAlert.current.cerrar();
    }

    render() {

        //console.log("el estado es :"+this.state.estacargado);

        return (
            <View>
                {this.state.fontLoaded == true ? (<Text style={styles.textoAdjuntarImagen}></Text>) : (<Text>Loading ... </Text>)}
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", marginTop: 5 ,width:'90%' }}>


                    {/* <TouchableOpacity 
                     

                    // onPress={

                    //      this.props.ocultarTeclado(),
                    //      this.mostrarOpcionesMultimedia()

                    // }
                    >
                        <View style={{ ...styles.circuloAdjuntarImagen, marginRight: 10 }}>
                            <Icon name="pluscircleo" size={30} color='#939896'></Icon>
                        </View>
                    </TouchableOpacity> */}
                    {this.state.estacargado == true ? (
                        
                        
                        <View style={{marginBottom:20, flex: 1, backgroundColor: '#efeeef', flexDirection: 'row', width:'80%', alignContent:'center'}}>
                        <View style={{flex:0.5}}>
                        <Icon2 style={{marginLeft:20, flex: 1}} name="image" size={30} color="#ef882d" />    
                        </View>
                        <View style={{flex:2, marginLeft:10}}>
                        <Text style={{ color:'#ef882d', fontWeight:'bold', marginTop:5}}>External left side walls</Text> 
                        </View>                        
                        <View style={{flex:.5}}>
                        <TouchableHighlight style={{with:10}}
                              title="Press me"
                              onPress={() => this.setState({estacargado:false, arregloCuadrados:[],indexInicial:0,ArregloImagenes:[], pesoTotalAcumulado:0  })}
                                  >



                              <Icon2 style={{ marginTop:5, flex: 1}} name="trash-bin" size={20} color="red" />  
                    </TouchableHighlight>
                                 
                        </View>   
                            
                        </View>
                        
                   
                    ) : (
                    <TouchableHighlight style={{with:10}}
                              title="Press me"
                              onPress={() => this.mostrarOpcionesMultimedia()}
                                  >
                    <Text style={{borderRadius:5, paddingTop:5,paddingBottom:5, paddingLeft:70,paddingRight:80, backgroundColor:'#ef882d', color:'white', }}
                              >External left side wall</Text>
                    </TouchableHighlight>
                    )}
                    



                    {/* <FlatList
                        data={this.state.arregloCuadrados}
                        renderItem={this.mostrarCuadrosImagen}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                    </FlatList> */}

                </View>

                {this.state.fontLoaded == true ? (<Text style={{ ...styles.datosImagen, marginBottom: 15 }}>{this.state.texto}</Text>) : (<Text>Loading ... </Text>)}



                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{ color: '#000', fontSize: 18 }}>¿Qué te gustaria hacer?</Text>}
                    options={optionsActionSheet}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={4}
                    onPress={(index) => this.rutasMultimedia(index)}
                    
                    
                />

                <ActionSheet2
                    ref={u => this.ActionSheet2 = u}
                    title={<Text style={{ color: '#000', fontSize: 18 }}>¿Seguro que desea eliminar la imagen seleccionada?</Text>}
                    options={optionsActionSheetEliminar}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={4}
                    onPress={(index) => this.eliminarImagen(index)}
                />
                <Hint
                    title={this.state.tituloHintAlerta}
                    ref={this.Hint}
                ></Hint>
              <HintAlert
                ref={this.HintAlert}
                title="Atención"
                info={[
                  { key: 1, texto: "El acceso a galería o cámara está deshabilitado, para habilitarlo debe acceder a las opciones de configuración." }
                ]}
                ejecutarAceptar={() => this.ejecutarAceptar()}
                ejecutarCancelar={() => this.ejecutarCancelar()}
              >
              </HintAlert>  

            </View>
        )
    }
}

export default SelectorMultimediaMultiple


const optionsActionSheet = [
    <Text style={{ color: "red" }}>Cancelar</Text>,
    'Cámara',
    'Galería',
    'Archivo'
];

const optionsActionSheetEliminar = [
    <Text style={{ color: "red" }}>Cancelar</Text>,
    'Eliminar',
];


