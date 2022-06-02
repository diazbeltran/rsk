import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, Dimensions, StyleSheet, Image, Linking } from 'react-native'
//import { NavigationActions, StackActions } from 'react-navigation';
import Pdf from 'react-native-pdf';
import Feather from 'react-native-vector-icons/Feather';
import { CommonActions } from '@react-navigation/native';


import styles from './Hint.styles.js';
//

export class Hint extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
            info: "",
            modalVisible: false,
            ancho: Dimensions.get('window').width,
            alto: Dimensions.get("window").height,
            botonDelete: false,
            key: '',
            arregloMensajes: [],
            scale: 1,
            horizontal: false,
            source: {},
        }
    }
    //LLAMADO OBLIGATORIO PARA CARGA DE FUENTES
    async componentDidMount() {
        console.log("la fuente esta en estado1 ", this.state.fontLoaded);


        this.setState({ fontLoaded: true })
        //--------------------------------------------------------------------

        let cuadroInfo;

        //si la propiedad INFO trae datos entonces procedemos
        if (this.props.info != undefined) {

            let infoEscaneada = this.escanearInfoTexto();
            //paddingHorizontal: 20, width: "100%", marginVertical: 10
            cuadroInfo =
                <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 10, justifyContent: "flex-start", alignItems: "flex-start" }}>
                    {infoEscaneada}
                </View>

            this.setState({ info: cuadroInfo })

        } else if (this.props.componente) { //en otra ocacion puede que traiga un componente para mostrar

            console.log("se ha cargado un componente a hint");

            let infoEscaneada = this.escanearInfoComponent();

            cuadroInfo = <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 10 }}>
                {infoEscaneada}
            </View>

            this.setState({ info: cuadroInfo })
        }

    }
    //-----------------------------------------------------------------

    mostrar = () => {
        this.setState({ modalVisible: true })
    }

    //recibimos un texto
    mostrarConParametros = (parametro) => {
        console.log("mostrarConParametros " + parametro)
        try {
            let texto = (<View></View>);
            let n = parametro.indexOf("*");
            console.log(n)
            if (n == -1) {
                console.log("No existe * ")
                texto = (
                    <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
                        <Text style={{ textAlign: "left" }}>{parametro}</Text>
                    </View>
                )
            } else {
                console.log("Existe * ");
                let res = parametro.split("*");
                texto1 = res[0];
                texto2 = res[1];
                console.log("txt1 : " + texto1);
                console.log("txt2 : " + texto2);
                texto = (
                    <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
                        <Text style={{ textAlign: "center" }}>
                            <Text style={{ fontWeight: "bold", color: '#F4891F' }}>{texto1} </Text>
                        </Text>
                        <Text style={{ textAlign: "left" }}>
                            <Text></Text>
                        </Text>
                        <Text style={{ textAlign: "left" }}>
                            <Text style={{ }}>Validar campo: </Text>
                            <Text style={{ fontWeight: "bold", color: '#F4891F' }}>{texto2}</Text>
                        </Text>
                    </View>
                )
            }
            // let texto = (<View></View>);
            // let texto1 = "";
            // let texto2 = "";
            // if(n > -1){
            //     let res = frase.split("*");
            //     texto1 = res[0];
            //     texto2 = res[1];  
            //     if(res.lenght > 0){
            //         texto = (
            //             <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
            //                 <Text style={{ textAlign: "left" }}>
            //                     <Text>{texto1} </Text>
            //                     <Text style={{ fontWeight: "bold" }}>N° Solicitud: </Text>
            //                     <Text>{texto2} </Text>
            //                 </Text>
            //             </View>
            //         )
            //     }                          
            // }

            // if(res.lenght > 0){
            //     texto = (
            //         <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
            //             <Text style={{ textAlign: "left" }}>
            //                 <Text>{texto1} </Text>
            //                 <Text style={{ fontWeight: "bold" }}>N° Solicitud: </Text>
            //                 <Text>{texto2} </Text>
            //             </Text>
            //         </View>
            //     )
            // }else{
            //     texto = (
            //         <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
            //             <Text style={{ textAlign: "left" }}>{parametro}</Text>
            //         </View>
            //     )
            // }



            this.setState({
                info: texto,
                modalVisible: true,
                botonDelete: false,
            })
        } catch (error) {
            console.log("ERROR HINT : ", error);


            texto = (
                <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
                    <Text style={{ textAlign: "left" }}>{parametro}</Text>
                </View>
            )

            this.setState({
                info: texto,
                modalVisible: true,
                botonDelete: false,
            })

        }



    }


    //recibimos una imagen base64
    mostrarConParametros2 = (parametro, key, tipo) => {

        let cuadroInfo = (<View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 10 }}>
            <Image style={{ height: 250, width: "100%" }} source={{ uri: `data:image/jpeg;base64,${parametro}` }} />
        </View>)
        console.log("key FOTO!!!! ", key);
        this.setState({ info: cuadroInfo, modalVisible: true, botonDelete: true, key: key })
        //this.setState({ info: cuadroInfo, modalVisible: true, botonDelete: false, key: key })

        //---> Denuncio Siniestro <---        
        let value = this.props.hideButton;
        if (value == true) {
            console.log(`Ocultar Boton =>  ${value}!`);            
            this.setState({ botonDelete: false });
        }
        console.log(`Hint => Tipo => ${tipo}!`);
        this.setState({ tipo: tipo });
        //----------------------------

    }


    mostrarConParametros3 = (parametro) => {

        let cuadroInfo = (<View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 10 }}>
            {parametro}
        </View>)

        this.setState({ info: cuadroInfo, modalVisible: true })
    }

    //Para Reembolso de Salud:
    mostrarConParametros4 = (parametro) => {
        console.log("mostrarConParametros " + parametro)
        try {
            let texto = (<View></View>);
            let n = parametro.indexOf("*");
            console.log(n)

            console.log("Existe * ");
            let res = parametro.split("*");
            texto1 = res[0];
            texto2 = res[1];
            texto3 = res[2];
            texto4 = res[3];
            console.log("txt1 : " + texto1);
            console.log("txt2 : " + texto2);
            console.log("txt3 : " + texto3);
            console.log("txt4 : " + texto4);
            texto = (
                <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
                    <Text style={{ textAlign: "left", opacity: 0.5 }}>
                        <Text>{texto1} <Text style={{ fontWeight: "bold", textDecorationLine: 'underline', color: '#0065A5', opacity: 1 }} onPress={this.cerrarSeguimiento} >{texto2}</Text> {texto3}</Text>
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                        <Text></Text>
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                        <Text style={{ color: '#0065A5' }}>N° Solicitud: </Text>
                        <Text style={{ fontWeight: "bold", color: '#0065A5' }}>{texto4}</Text>
                    </Text>
                </View>
            )

            this.setState({
                info: texto,
                modalVisible: true
            })
        } catch (error) {
            console.log("ERROR HINT : ", error);


            texto = (
                <View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 15 }}>
                    <Text style={{ textAlign: "left" }}>{parametro}</Text>
                </View>
            )

            this.setState({
                info: texto,
                modalVisible: true
            })

        }



    }
    //Fin Para Reembolso de Salud

    //recibimos un pdf
    mostrarConParametros5 = (parametro, key) => {
        console.log(parametro)
        let cuadroInfo = (<View style={{ paddingHorizontal: 20, width: "100%", marginVertical: 10 }}>
            <Pdf style={{ height: 500, width: "100%" }} source={{ uri: `data:application/pdf;base64,${parametro}` }} />
        </View>)
        console.log("key PDF!!!! ", key);
        this.setState({ info: cuadroInfo, modalVisible: true, botonDelete: true, key: key })
        //this.setState({ info: cuadroInfo, modalVisible: true, botonDelete: false, key: key })
    }

    cerrarNavegar = () => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate("Home");
    }

    cerrar = () => {
        this.setState({ modalVisible: false });

        if (this.props.redireccionar != undefined && this.props.redireccionar == true) {
            this.cerrarNavegar();
        }

        if (this.props.tienda != undefined && this.props.tienda != "") {
            let URL = this.props.tienda;
            Linking.canOpenURL(URL)
                .then(supported => {
                    if (!supported) {
                        Alert.alert('ERROR URL');
                    } else {
                        return Linking.openURL(URL);
                    }
                });

        }

    }

    //Para Reembolso de Salud:    
    cerrarSeguimiento = () => {
        this.setState({ modalVisible: false });
        //this.props.navigation.navigate("Home");

        /* ---------------------------- */
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'Home' })],
        // });

        // this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'Home',
                params: {},
            })
        );
        /* ---------------------------- */

        this.props.navigation.navigate("Seguimiento");
    }

    borrar = () => {
        let tipo = this.state.tipo;
        let key = this.state.key;
        console.log(`ELIMINAR FOTO HINT , key ${key} , tipo ${tipo} `); //console.log("ELIMINAR FOTO HINT !!!! ", key);
        this.props.eliminarFotoSelector(key,tipo);
        //this.props.eliminarImagen(key);
        this.setState({ modalVisible: false, })
    }

    //-------------------------------------------------------------

    //metodo que sirve para leer solo texto
    escanearInfoTexto = () => {

        let infoEscaneada = this.props.info.map(e => {

            console.log(e.title);

            return (
                <View key={e.key} style={{ marginVertical: 5 }}>
                    <Text style={styles.subtitulo}>{e.titulo}</Text>
                    <Text style={styles.textoChico}>{e.texto}</Text>
                </View>

            )
        })
        return infoEscaneada;
    }

    //este metodo nos permite obtener otro componente como parametro
    escanearInfoComponent = () => {
        console.log("se nos ha entregado una imagen de tipo ", typeof this.props.componente);

        let imagen = this.props.componente;
        return imagen;
    }
    //-------------------------------------------------------------

    render() {

        return (
            //modo hint
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={this.desactivarModal}
                    animationType="fade"
                    presentationStyle="overFullScreen"
                    transparent={true}
                >
                    <View style={{ backgroundColor: "rgba(88,88,88,0.6)", width: this.state.ancho, height: this.state.alto, justifyContent: "center", alignItems: "center" }}>

                        {/*Caja */}
                        <View style={{ backgroundColor: "#FAFAFA", width: "90%", borderRadius: 8 }}>

                            {/*Titulo de la caja */}
                            <View style={{ width: "100%", backgroundColor: "#ef882d", borderTopLeftRadius: 8, borderTopRightRadius: 8, justifyContent: "center", paddingHorizontal: 20, }}>
                                {/* <Text style={{ ...styles.titulo, marginVertical: 5 }}>{this.props.title}</Text> */}
                                {this.state.fontLoaded == true ? (<Text style={{ ...styles.titulo, marginVertical: 5 }}>{this.props.title}</Text>) : (<Text style={{ marginVertical: 5 }}>{this.props.title}</Text>)}
                            </View>

                            {/*Cuerpo de la caja */}
                            <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', }}>
                                {this.state.info}
                            </View>

                            {/*Boton final ok */}
                            {/* <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                                <TouchableOpacity onPress={this.cerrar}>
                                    <View style={{ height: 40, width: 140, borderRadius: 8, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center" }}>
                                        {this.state.fontLoaded == true ? ( <Text style={styles.subtitulo}>Aceptar</Text>  ) : ( <Text style={{}}>Aceptar</Text>  )}
                                    </View>
                                </TouchableOpacity>
                                {this.state.botonDelete === true ? (<TouchableOpacity>
                                    <View style={{ height: 40, width: 140, borderRadius: 8, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center" }}>                                        
                                        {this.state.fontLoaded == true ? ( <Text style={styles.subtitulo}>Eliminar</Text>  ) : ( <Text style={{}}>Eliminar</Text>  )}
                                    </View>
                                </TouchableOpacity>) : (<View></View>)}
                            </View> */}

                            {/*Botones finales*/}


                            {this.state.botonDelete == true ? (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingHorizontal: 20, }}>

                                    <View>
                                        <Feather.Button name="trash-2" backgroundColor="#fff" color='#EA1200' onPress={this.borrar} style={styles.boton} >
                                            <Text style={{ fontFamily: 'Arial', fontSize: 15, color: '#EA1200' }}>
                                                Eliminar
                                            </Text>
                                        </Feather.Button>
                                    </View>


                                    <Feather.Button name="x" backgroundColor="#fff" color='#6B6565' onPress={this.cerrar} style={styles.boton} >
                                        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: '#6B6565' }}>
                                            Cerrar
                                        </Text>
                                    </Feather.Button>

                                </View>
                            ) :
                                <View style={{ flexDirection: "row", marginBottom: 10, paddingHorizontal: "12%", height: 50, width: "100%" }}>
                                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", }}>

                                        <TouchableOpacity onPress={this.cerrar}>
                                            <View style={{ height: 40, width: "100%", borderRadius: 8, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center", }}>
                                                <Text style={styles.subtitulo}>Aceptar</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            }



                        </View>
                    </View>

                </Modal>
            </View >
        )
    }
}

export default Hint
