import React, { Component } from 'react'
import { Text, View, ActivityIndicator, Modal, Dimensions, Platform, StyleSheet } from 'react-native'

import styles from './Loading.style.js';
import { scale } from '../../styles/scaling';
const { width, height } = Dimensions.get('window');

export default class Loading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    //LLAMADO OBLIGATORIO PARA CARGA DE FUENTES
    async componentDidMount() {

        this.setState({ fontLoaded: true })


    }

    mostrar = () => {
        this.setState({ visible: true })
    }

    ocultar = () => {
        this.setState({ visible: false })
    }

    render() {
        if (this.state.visible) {
            return (
                <View style={styles.contenedor}>

                    <Modal
                        visible={this.state.modalVisible}
                        onRequestClose={this.desactivarModal}
                        animationType="fade"
                        presentationStyle="overFullScreen"
                        transparent={true}
                    >

                        <View style={{ backgroundColor: "rgba(88,88,88,0)", width: width, height: height + 25, justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.container}>
                                <ActivityIndicator
                                    color='#006fb9'
                                    size="large"
                                    style={styles.activityIndicator}
                                />
                                <Text style={styles.textoLoading}>Cargando...</Text>
                            </View>
                        </View>


                    </Modal>
                </View >
            )
        } else {
            return null
        }

    }
}

