import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity,TouchableHighlight, ImageBackground,TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import firebase from 'react-native-firebase';
// import Boton from '../components/Button/Button.component';

const { width, height } = Dimensions.get('window');
//-----------------------------------------------------------------
// import { normalize } from '../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../styles/scaling.js';
import themes from '../styles/theme.style';

var box_count = 3;
var box_height = height / box_count;



//-----------------------------------------------------------------

//import NetInfo from '@react-native-community/netinfo'
//import FingerprintScanner from 'react-native-fingerprint-scanner';
//import Hint from '../components/Hint/Hint.component';


export default class SplashScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            porcentaje: 0,
            texto: '',
            barColor: '#0873ba',
            color: '#bbbbbb',
            compatible: false,
            tituloHint: '',
            isConnected: '',
            isType: '',
        };

        this.Hint = React.createRef();
        //this._bootstrapAsync();
    }


 setTimePassed = async () => {
    let porc = this.state.porcentaje;
    //let result = porc + (width * 0.001); // ralentiza el inicio
    let result = porc + (width * 0.1);

    let x = result;
    switch (true) {
        case (x < 25):
            //this.setState({ texto: 'Activando servicios' });
            break;
        case (x >= 25 && x < 50):
            //this.setState({ texto: 'Iniciando componentes de la APP' });
            break;
        case (x >= 50 && x < 75):
            //this.setState({ texto: 'Revisando tus notificaciones' });
            break;
        case (x >= 100):
            this.setState({ texto: '¡Estamos listos!' });
            this.setState({ barColor: '#06973e' });
            this.setState({ color: '#5cbb81' });
            this.setState({ status: true });
            break;
    }

    if (result < 100) {
        this.setState({ porcentaje: result });
    } else {
        result = width - (width * 0.40);
        this.setState({ porcentaje: result });
    }

    if (result >= 100) {
        clearInterval(this._interval);
      
                console.log("==> Auth");
                this.props.navigation.navigate('Auth');
      
        
    }

}


    //-----------------------------------------------------------------

    async componentDidMount() {

        try {

           
                   
                   
                   
            this._interval = setInterval(async () => {
                this.setTimePassed();
            }, 1000);
                        
                  


           
            
        } catch (error) {
            console.log(error)
        }

    }
    //-----------------------------------------------------------------

    componentWillUnmount() {

        if (Platform.OS === "android") {

        clearInterval(this._interval);
        console.log('componentWillUnmount...');
        }

    }








    render() {

        return (
            <View style={styles.wrapper} >


<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Auth')}>
<View >
            <View style={{ backgroundColor: 'transparent' }}>
                
                    <Image source={require('../assets/img/logo_1.png')} style={styles.logo} />
                </View>

                <View style={{ backgroundColor: 'transparent' ,flex: .5,}}>
                    <Image source={require('../assets/img/logo_3.png')} style={styles.logo2} />
                </View>

                </View>
               
                
                </TouchableWithoutFeedback>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    box: {
        height: box_height
      },
    wrapper: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems:'center',
        //backgroundColor:'#f4f4f4',
       // backgroundColor: '#fafafa',
        flexDirection: 'column',
    },
    content: {
        //height: verticalScale(height/4), 
        width: width,
        //backgroundColor:'red', 
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoView: {
        paddingTop: height / 3, //scale(height / 3), 
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: moderateScale(70),
        marginLeft:moderateScale(70),
        width: moderateScale(250),
        height: verticalScale(350),
        resizeMode: 'center'
    },
    logo2: {
        width: moderateScale(355),
        height: verticalScale(230),
        resizeMode: 'contain'
    },
    titulo: {
        fontSize: moderateScale(themes.FONT_SIZE_SMALL),
       // fontFamily: "Overpass-Bold",
        marginBottom: verticalScale(10)
    },
    icono: {
        width: moderateScale(40),
        height: verticalScale(40),
    },
    barColor: {
        height: 10,
        borderRadius: 4,
    }



});	  