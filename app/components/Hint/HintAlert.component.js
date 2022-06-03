import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native'
import styles from './Hint.styles.js';


export default class HintAlert extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
            info: "",
            modalVisible: false,
            ancho: Dimensions.get('window').width,
            alto: Dimensions.get("window").height,

            arregloMensajes: []
        }
    }
    //LLAMADO OBLIGATORIO PARA CARGA DE FUENTES
    async componentDidMount() {
        console.log("la fuente esta en estado2 ", this.state.fontLoaded);
        this.setState({ fontLoaded: true })


        await this._cargarInfo();            

    }
    //-----------------------------------------------------------------

    mostrar = () => {
        this.setState({ modalVisible: true })
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
    }

    //-------------------------------------------------------------

    //metodo que sirve para leer solo texto
    escanearInfoTexto = () => {

        let infoEscaneada = this.props.info.map(e => {

            console.log(e.title);

            return (
                <View key={e.key} style={{ marginTop:-20, marginBottom:5,  }}>
                    <Text style={styles.subtitulo}>{e.titulo}</Text>
                    <Text style={styles.textoChico}>{e.texto}</Text>
                </View>

            )
        })
        return infoEscaneada;
    }

    //este metodo nos permite obtener otro componente como parametro
    escanearInfoComponent = () => {
        console.log("se nos ha entregado una imagen de tipo2 ", typeof this.props.componente);

        let imagen = this.props.componente;
        return imagen;
    }
    //-------------------------------------------------------------

    //aca vamos a revisar si el hint
    //_cargarInfo() {
    _cargarInfo = async () => {

        let cuadroInfo;

        //si la propiedad INFO trae datos entonces procedemos
        if (this.props.info != undefined) {

            let infoEscaneada = this.escanearInfoTexto();
            //backgroundColor:'blue', flex:1, justifyContent:"center", alignItems:"center" 
            cuadroInfo =
                <View style={{ paddingHorizontal: 10, width: "100%", marginVertical: 10, justifyContent:"flex-start", alignItems:"flex-start"  }}>
                    {infoEscaneada}
                </View>

            this.setState({ info: cuadroInfo })

        } else if (this.props.componente) { //en otra ocacion puede que traiga un componente para mostrar

            console.log("se ha cargado un componente a hint");

            let infoEscaneada = this.escanearInfoComponent();
            //
            cuadroInfo = <View style={{ paddingHorizontal: 20, width: "100%", marginVertical:10  }}>
                {infoEscaneada}
            </View>

            this.setState({ info: cuadroInfo });
        }
    }

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
                            <View style={{ width: "100%", backgroundColor: "#0065A5", borderTopLeftRadius: 8, borderTopRightRadius: 8, 
                                justifyContent: "center", paddingHorizontal: 10, }}>
                                <Text style={{ ...styles.titulo, marginVertical: 5 }}>{this.props.title}</Text>
                            </View>

                            {/*Cuerpo de la caja */}
                            <View style={{ flexDirection: "row", justifyContent:'flex-start' , alignItems:'flex-start',  }}>
                                {this.state.info}
                            </View>

                            {/*Botones finales*/}
                            <View style={{ flexDirection: "row", marginBottom: 10, paddingHorizontal: "12%",height: 50,width: "100%"  }}>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "flex-end",  }}>
                                    <TouchableOpacity onPress={this.props.ejecutarCancelar} style={{ marginRight:20 ,}}>
                                        <View style={{ height: 40, width: "100%", borderRadius: 8, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center", }}>
                                            <Text style={styles.subtitulo}>Cancelar</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.props.ejecutarAceptar}>
                                        <View style={{ height: 40, width: "100%", borderRadius: 8, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center", }}>
                                            <Text style={styles.subtitulo}>Aceptar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>

                </Modal>
            </View >
        )
    }
}

