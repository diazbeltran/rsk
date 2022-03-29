import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, Image, Dimensions, SafeAreaView, ScrollView, StyleSheet, Pressable, Platform, StatusBar, ToastAndroid } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { DefaultTheme, NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from '../styles/theme.style';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from '../styles/scaling.js';
import {  CheckConnectivity } from '../helpers';
//import WSRestApi from '../services/wsRestApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');
const size = (width >= 768) ? scale(10) : scale(20);
const isIphoneX = DeviceInfo.hasNotch();

const StatusBarHeight = Platform.select({
    ios: isIphoneX == true ? 30 : 15,
    android: 0,//StatusBar.currentHeight,
    default: 0
})

const BarHeight = Platform.select({
    ios: isIphoneX == true ? 130 : 70,
    android: 60,
    default: 0
})

const BarHeightAuth = Platform.select({
    ios: isIphoneX == true ? 90 : 60,
    android: 60,
    default: 0
})

const TabBarHeight = Platform.select({
    ios: isIphoneX == true ? 80 : 50,
    android: 50,
    default: 0
})

const TabBarPaddingBottom = Platform.select({
    ios: isIphoneX == true ? 20 : 0,
    android: 0,
    default: 0
})

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';

//----   HEADER   ----
//import LogoTitle from '../components/Header/LogoTitle.component';
//mport MenuTitle from '../components/Header/MenuTitle.component';
//import HeaderRight from '../components/Header/HeaderRight.component';
//import HeaderLeft from '../components/Header/HeaderLeft.component';
//import HeaderLeft4 from '../components/Header/HeaderLeft4.component';
//import HeaderLeft5 from '../components/Header/HeaderLeft5.component';
function HeaderLeft({ navigation, color }) {
    return (
        <View style={{ marginLeft: 20, marginTop: StatusBarHeight, }}>
            <TouchableOpacity onPress={() => {
                //console.log("<--- HeaderLeft ", navigation);
                //navigation.navigate("Login");
                navigation.goBack();
            }} >
                <Feather name="arrow-left" size={size} style={{ color: color }} />
            </TouchableOpacity>
        </View>
    );
}
function HeaderAuthLeft({ navigation, color }) {
    return (
        <View style={{ marginLeft: 20, marginTop: isIphoneX == true ? -10 : 0, }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }} >
                <Feather name="arrow-left" size={size} style={{ color: color }} />
            </TouchableOpacity>
        </View>
    );
}
function LogoTitle({ navigation }) {

    handleClick = async () => {

        try {
          let hayConexion = await CheckConnectivity.fnCheckConnectivity();
          if (hayConexion) {
            navigation.navigate('Home')
          } else {
            this.setState({ titleHint: 'Error de conexión' });
            navigation.navigate('Home');
            //this.Hint.current.mostrarConParametros("No está conectado a internet, por favor encienda WiFi o 3G.");
          }      
        } catch (error) {
          //console.log(error);
        }
    
      }

    return (
        <View
            style={{
                backgroundColor: 'transparent',
                marginTop: StatusBarHeight,
            }}>

<TouchableOpacity onPress={this.handleClick} >
                

            <Image
                source={require('../assets/img/logo_1.png')}
                style={{
                    width: Platform.OS === 'ios' ? 181 / 1.3 : 181 / 1.2,
                    height: Platform.OS === 'ios' ? 45 / 1.3 : 45 / 1.2,
                    borderColor:'#000'
                }}
            />

</TouchableOpacity>

        </View>
    );
}
function LogoAuthTitle({ navigation }) {
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                marginTop: isIphoneX == true ? -10 : 0,
            }}>
            <Image
                source={require('../assets/img/logo_1.png')}
                style={{
                    width: Platform.OS === 'ios' ? 181 / 1.3 : 181 / 1.2,
                    height: Platform.OS === 'ios' ? 45 / 1.3 : 45 / 1.2,
                    borderColor:'#000'
                }}
            />
        </View>
    );
}
function MenuTitle({ navigation }) {
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                marginTop: StatusBarHeight,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Config')} style={{ marginLeft: 20, }}  >
                <Image
                    source={require('../assets/img/logo_1.png')}
                    style={{ width: 24, height: 24, }}
                />
            </TouchableOpacity>


        </View>
    );
}


// async function getItem(item) {
//     try {
//         const value = await AsyncStorage.getItem(item);
//         //console.log(value);
//         return value;
//     } catch (error) {
//         // Handle errors here
//         console.log(error);
//         return false;
//     }
// }

let NroMsj = 0; //await getItem("MENSAJES_NO_LEIDOS");

// function HeaderRight({ navigation }) {
//     let valor = NroMsj;

//     if(valor == 0){
//         return (
//             <View
//                 style={{
//                     backgroundColor: 'transparent',
//                     marginTop: StatusBarHeight,
//                 }}>
//                 <TouchableOpacity onPress={ async () => {  
//                     let resultado = Platform.OS === "ios" ? await _HandleValidate2(32) : await _HandleValidate(20);
//                     if (resultado == true) {
//                         navigation.navigate('Buzon');
//                     }                            
//                 }} >
//                     <Image
//                         source={require('../assets/img/logo_1.png')}
//                         style={{ width: 60, height: 60, opacity: 1, }}
//                     />
//                 </TouchableOpacity>
//             </View>
//         );  
//     }

//     if (valor <= 9) {
//         return (
//             <View
//                 style={{
//                     backgroundColor: 'transparent',
//                     marginTop: StatusBarHeight,
//                 }}>
//                 <TouchableOpacity onPress={ async () => {  
//                     let resultado = Platform.OS === "ios" ? await _HandleValidate2(32) : await _HandleValidate(20);
//                     if (resultado == true) {
//                         navigation.navigate('Buzon');
//                     }                            
//                 }} >
//                     <Image
//                         source={require('../assets/img/logo_1.png')}
//                         style={{ width: 60, height: 60, opacity: 1, }}
//                     />
//                 </TouchableOpacity>
//                 <View
//                     style={{
//                         position: 'absolute',
//                         right: 10,
//                         top: 10,
//                         backgroundColor: 'red',
//                         borderRadius: 20 / 2,
//                         width: 20,
//                         height: 20,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
//                         {valor}
//                     </Text>
//                 </View>
//             </View>
//         );        
//     }

//     if (valor >= 9) {
//         valor = '9+'
//         return (
//             <View
//                 style={{
//                     backgroundColor: 'transparent',
//                     marginTop: StatusBarHeight,
//                 }}>
//                 <TouchableOpacity onPress={ async () => {  
//                     let resultado = Platform.OS === "ios" ? await _HandleValidate2(32) : await _HandleValidate(20);
//                     if (resultado == true) {
//                         navigation.navigate('Buzon');
//                     }                            
//                 }} >
//                     <Image
//                         source={require('../assets/img/logo_1.png')}
//                         style={{ width: 60, height: 60, opacity: 1, }}
//                     />
//                 </TouchableOpacity>
//                 <View
//                     style={{
//                         position: 'absolute',
//                         right: 10,
//                         top: 10,
//                         backgroundColor: 'red',
//                         borderRadius: 20 / 2,
//                         width: 20,
//                         height: 20,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
//                         {valor}
//                     </Text>
//                 </View>
//             </View>
//         );        
//     }


// }

//---- FIN HEADER ----

//---- AuthLoadingStack ----
import SplashScreen from '../views/SplashScreen.js';
//import initializingScreen from '../views/initializing';
//---- FIN AuthLoadingStack ----

//---- AuthStack ----
import LoginScreen from '../views/Login/Login.view.js';
import InformeScreen from '../views/InformePrecargado/InformePre.view.js';
import ConsultaContenedorScreen from '../views/InformePrecargado/ConsultaContenedor.view.js';
import RecuperaScreen from '../views/Login/Recupera.view.js';


// import ActualizarApp from '../views/ActualizarApp/ActualizarApp.view';
// import ActivarHuellaScreen from '../views/ActivarHuella/ActivarHuella.view';
// import RecuperarScreen from '../views/RecuperarPassword/RecuperarPassword.view';
// import RecuperarScreen2 from '../views/RecuperarPassword/RecuperarPassword2.view';
// import IngresarPinScreen from '../views/RecuperarPassword/IngresarPin.view';
// import IngresarPasswordScreen from '../views/RecuperarPassword/IngresarPassword.view';
// import RegistroUsuarioScreen from '../views/RegistroUsuario/RegistroUsuario.view';
// import RegistroUsuario2Screen from '../views/RegistroUsuario/RegistroUsuario2.view';

//---- FIN AuthStack ----

//---- AppStack ----
// import HomeScreen from '../views/Home';
// import AsistenciaScreen from '../views/AsistenciaEnRuta/AsistenciaEnRuta.view';
// import AsistenciaDetalleScreen from '../views/AsistenciaEnRuta/AsistenciaEnRutaDetalle.view';
// import ConfigScreen from '../views/Configuracion/Configuracion.view';
// import PasswordScreen from '../views/Configuracion/CambiarContrasena.view';
// import DepositoScreen from '../views/Configuracion/DatosDeDeposito/DatosDeposito.view';
// import EditarDepositoScreen from '../views/Configuracion/DatosDeDeposito/EditarDatosDeposito.view';
// import ConfirmarDepositoScreen from '../views/Configuracion/DatosDeDeposito/ConfirmarDatosDeposito.view'
// import ConfirmarCorreoScreen from '../views/Configuracion/DatosDeDeposito/ConfirmarCorreo.view'
// import ConfirmarCodigoScreen from '../views/Configuracion/DatosDeDeposito/ConfirmarCodigo.view'
// import DatosActualizadosScreen from '../views/Configuracion/DatosDeDeposito/DatosActualizados.view'
// import InfoScreen from '../views/Configuracion/InformacionContacto.view';
// import BuzonScreen from '../views/Buzon/Buzon.view';
// import BuzonDetalleScreen from '../views/Buzon/BuzonDetalle.view';
// import ReembolsoScreen from '../views/ReembolsoDeSalud/Reembolso.view';
// import SiniestroVehiculoScreen from '../views/SiniestroVehiculo/SiniestroVehiculo.view';
// import ListadoReembolsoScreen from '../views/Seguimiento/SeguimientoReembolsoSalud/ListadoReembolsos.view';
// import ReembolsosHistoricosScreen from '../views/Seguimiento/SeguimientoReembolsoSalud/Reembolsos.Historicos.view';
// import BuscarReembolsosScreen from '../views/Seguimiento/SeguimientoReembolsoSalud/BuscarReembolsos.view';
// import DetalleReembolsoSaludScreen from '../views/Seguimiento/SeguimientoReembolsoSalud/DetalleReembolsoSalud.view';
// //estos import corresponden a la Fase 2, es decir, al denuncio del siniestro
// import DenuincioSeguroScreen from '../views/DenuncioSiniestro/DenunciaSeguro/DenunciaSeguro.view';
// import ConfirmacionDenunciaSeguroScreen from '../views/DenuncioSiniestro/ConfirmacionDenunciaSeguro/ConfirmacionDenunciaSeguro.view';
// import DatosDelSiniestroScreen from '../views/DenuncioSiniestro/DatosDelSiniestro/DatosDelSiniestro.view';
// import DenunciaSiniestroScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/DenunciaSiniestro.view';
// import DatosConstanciaScreen from '../views/DenuncioSiniestro/DatosDelSiniestro/DatosConstancia.view';
// import DatosOtroConductorScreen from '../views/DenuncioSiniestro/DatosDelSiniestro/DatosOtroConductor.view';

// import Accidente2Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/Accidente/Accidente2.view';
// import DatosTerceroAccScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/Accidente/DatosTercero.view';
// import Accidente31Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/Accidente/Accidente31.view';
// import Accidente32Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/Accidente/Accidente32.view';
// import Accidente4Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/Accidente/Accidente4.view';
// import PantallaFinalAccidenteScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/Accidente/PantallaFinalAccidente.view';

// import RoboScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/Robo/Robo.view';
// import Robo21Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/Robo/Robo21.view';
// import Robo22Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/Robo/Robo22.view';
// import Robo3Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/Robo/Robo3.view';
// import DatosTerceroScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/Robo/DatosTercero.view';

// import ActoMaliciosoScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/ActoMalicioso/ActoMalicioso.view';
// import ActoMalicios21Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/ActoMalicioso/ActoMalicioso21.view';
// import ActoMalicios22Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/ActoMalicioso/ActoMalicioso22.view';
// import ActoMalicios3Screen from '../views/DenuncioSiniestro/DenunciarSiniestro/ActoMalicioso/ActoMalicioso3.view';
// import FinalActoMaliciosoScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/ActoMalicioso/PantallaFinalActoMalicioso.view';

// import PantallaFinalTerminoScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/PantallaFinalTermino.view';
// import PantallaFinalErrorScreen from '../views/DenuncioSiniestro/DenunciarSiniestro/PantallaFinalError.view';

// //---- FIN AppStack ----


// import MisPolizasScreen from '../views/MisPolizas/MisPolizas.view';
// import VistaWebScreen from '../views/VistaWeb/VistaWeb.view'; //=======> problema con package rn-pdf-reader-js
// import VistaWebPagoScreen from '../views/VistaWeb/VistaWebPago.view';
// import tabCinco from '../views/tabs/tab5/tab5.view'; //Contacto
// import SeguimientoScreen from '../views/Seguimiento/Seguimiento.view';
// import VisorPDFScreen from '../views/VisorPDF/VisorPDF.view';

// _HandleValidate = async (opcion) => {
//     console.log("_HandleValidate");

//     //Alert.alert('jfhsdjkfh','kjsdfksdhfkjh')
//     //ToastAndroid.show('No Habilitado', ToastAndroid.SHORT);
//     let estado = false;
//     let hayConexion = await CheckConnectivity.fnCheckConnectivity();

//     if (hayConexion) {

//         let result = await WSRestApi.EstadoBotones_Lista().then(function (data) {
//             //console.log("DATOS ESTADO : ", data);
//             let vJson = JSON.parse(data)
//             return vJson;
//         }.bind(this));

//         Object.keys(result).forEach(key => {
//             if (result[key].EBO_ID == opcion) {
//                 if (result[key].EBO_FUERRA_LINEA == 0) {
//                     switch (opcion) {
//                         case 19:
//                             //ex case 4:
//                             //firebase.analytics().setCurrentScreen('mis_polizas');
//                             Exponea.BCI_Events("mis_polizas");
//                             estado = true;
//                             break;
//                         case 20:
//                             //ex case 2:
//                             //firebase.analytics().setCurrentScreen('mis_mensajes');
//                             Exponea.BCI_Events("mis_mensajes");
//                             estado = true;
//                             break;

//                         case 22:
//                             //ex case 2:
//                             //firebase.analytics().setCurrentScreen('contactenos');
//                             Exponea.BCI_Events("contactenos");
//                             estado = true;
//                             break;

//                         default:
//                             console.log("Opcion: " + opcion + " Mensaje : ", result[key].EBO_MENSAJE)
//                             //ToastAndroid.show(result[key].EBO_MENSAJE, ToastAndroid.SHORT);
//                             //this.refs.toast.show('result[key].EBO_MENSAJE', 500);
//                             if (Platform.OS == "ios") {
//                                 Alert.alert(result[key].EBO_MENSAJE);
//                             } else {
//                                 ToastAndroid.show(result[key].EBO_MENSAJE, ToastAndroid.SHORT);
//                             }

//                             estado = false;
//                             break;
//                     }
//                 } else {
//                     console.log("RESULTADO : ", result[key].EBO_MENSAJE);
//                     //ToastAndroid.show(result[key].EBO_MENSAJE, ToastAndroid.SHORT);
//                     //this.refs.toast.show('result[key].EBO_MENSAJE', 500);
//                     if (Platform.OS == "ios") {
//                         Alert.alert(result[key].EBO_MENSAJE);
//                     } else {
//                         ToastAndroid.show(result[key].EBO_MENSAJE, ToastAndroid.SHORT);
//                     }
//                     estado = false;
//                 }
//             }
//         })

//     }

//     console.log("estado : ", estado);
//     return estado;
// }


// _HandleValidate2 = async (opcion) => {
//     console.log("_HandleValidate2");

//     //Alert.alert('jfhsdjkfh','kjsdfksdhfkjh')
//     //ToastAndroid.show('No Habilitado', ToastAndroid.SHORT);
//     let estado = false;
//     let hayConexion = await CheckConnectivity.fnCheckConnectivity();

//     if (hayConexion) {

//         let result = await WSRestApi.EstadoBotones_Lista().then(function (data) {
//             //console.log("DATOS ESTADO : ", data);
//             let vJson = JSON.parse(data)
//             return vJson;
//         }.bind(this));

//         Object.keys(result).forEach(key => {
//             if (result[key].EBO_ID == opcion) {
//                 if (result[key].EBO_FUERRA_LINEA == 0) {
//                     switch (opcion) {
//                         case 31:
//                             //ex case 4:
//                             //firebase.analytics().setCurrentScreen('mis_polizas');
//                         
//                             estado = true;
//                             break;
//                         case 32:
//                             //ex case 2:
//                             //firebase.analytics().setCurrentScreen('mis_mensajes');
//                             .BCI_Events("mis_mensajesExponea");
//                             estado = true;
//                             break;

//                         case 34:
//                             //ex case 2:
//                             //firebase.analytics().setCurrentScreen('contactenos');

//                             estado = true;
//                             break;

//                         default:
//                             console.log("Opcion: " + opcion + " Mensaje : ", result[key].EBO_MENSAJE)

//                             if (Platform.OS == "ios") {
//                                 Alert.alert(result[key].EBO_MENSAJE);
//                             } else {
//                                 ToastAndroid.show(result[key].EBO_MENSAJE, ToastAndroid.SHORT);
//                             }

//                             estado = false;
//                             break;
//                     }
//                 } else {
//                     console.log("RESULTADO : ", result[key].EBO_MENSAJE);
//                     if (Platform.OS == "ios") {
//                         Alert.alert(result[key].EBO_MENSAJE);
//                     } else {
//                         ToastAndroid.show(result[key].EBO_MENSAJE, ToastAndroid.SHORT);
//                     }
//                     estado = false;
//                 }
//             }
//         })

//     }

//     console.log("estado : ", estado);
//     return estado;
// }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function InitialNavigator() {
    return (
        <Stack.Navigator 
            options={{
                gestureEnabled: false,
                headerShown:false,
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
            
        </Stack.Navigator>
    );
}

function AuthNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                gestureEnabled: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    height: BarHeightAuth
                },
            }}
            options={{
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="Login" 
                options={{ headerShown: false }} 
                component={LoginScreen} />
                
                <Stack.Screen name="App" 
                options={{ headerShown: false }} 
                component={InformeScreen} />


                <Stack.Screen name="ConsultaContenedor" 
                options={{ headerShown: false }} 
                component={ConsultaContenedorScreen} />

                <Stack.Screen name="Recupera" 
                options={{ headerShown: false }} 
                component={RecuperaScreen} />
             
        </Stack.Navigator>
    );
}

// function AppStack() {
//     return (

//         <Stack.Navigator
//             initialRouteName="Home"
//             screenOptions={{
//                 headerTitleAlign: 'center',
//                 headerStyle: {                    
//                     backgroundColor: '#fff',
//                     height: BarHeight
//                 },
//             }}
//             options={{
//                 gestureEnabled: false,
//             }}
//         >
//             <Stack.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <MenuTitle {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <HeaderRight navigation={navigation} />
//                 })}
//             />
//             <Stack.Screen
//                 name="Buzon"
//                 component={BuzonScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="BuzonDetalle"
//                 component={BuzonDetalleScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} />,
//                     headerRight: props => <View></View>
//                 })}
//             />

//             <Stack.Screen
//                 name="Asistencia"
//                 component={AsistenciaScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="AsistenciaDetalle"
//                 component={AsistenciaDetalleScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="Config"
//                 component={ConfigScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Configuración</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />
//             <Stack.Screen
//                 name="Info"
//                 component={InfoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Información de contacto</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />
//             <Stack.Screen
//                 name="Password"
//                 component={PasswordScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Cambiar contraseña</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />

//             <Stack.Screen
//                 name="Deposito"
//                 component={DepositoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Editar Datos de Depósito</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />

//             <Stack.Screen
//                 name="EditarDeposito"
//                 component={EditarDepositoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Editar Datos de Depósito</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />

//             <Stack.Screen
//                 name="ConfirmarCodigo"
//                 component={ConfirmarCodigoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Editar Datos de Depósito</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />

//             <Stack.Screen
//                 name="ConfirmarDeposito"
//                 component={ConfirmarDepositoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Editar Datos de Depósito</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />
            
//             <Stack.Screen
//                 name="ConfirmarCorreo"
//                 component={ConfirmarCorreoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Editar Datos de Depósito</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />

//             <Stack.Screen
//                 name="DatosActualizados"
//                 component={DatosActualizadosScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} color={"#ffffff"} />,
//                     headerTitle: props => <View style={{ marginTop: StatusBarHeight }}><Text style={{ color: theme.HEADER_TEXT_COLOR, fontSize: moderateScale(theme.FONT_SIZE_MEDIUM), }}>Editar Datos de Depósito</Text></View>,
//                     headerRight: props => <View></View>,
//                     headerStyle: {
//                         backgroundColor: '#006FB9',
//                         height: 90,
//                     },
//                 })}
//             />

//             <Stack.Screen
//                 name="SiniestroVehiculo"
//                 component={SiniestroVehiculoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="Contactar2"
//                 component={tabCinco}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             {/* <Stack.Screen
//                 name="Poliza"
//                 component={MisPolizasScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} />,
//                     headerRight: props => <View></View>
//                 })}
//             /> */}
//             <Stack.Screen
//                 name="Prueba2"
//                 component={VistaWebScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             /> 
//             <Stack.Screen
//                 name="SeguimientoHome"
//                 component={SeguimientoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <MenuTitle {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="DetalleReembolsoSaludHome"
//                 component={DetalleReembolsoSaludScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="Reembolso"
//                 component={ReembolsoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="PagoEnLinea"
//                 component={VistaWebPagoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="Prueba"
//                 component={VistaWebScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
                                
//             {/* comienzo de las pantallas de la fase 2 "Denuncio siniestro" */}
//             <Stack.Screen
//                 name="DenuncioSeguro"
//                 component={DenuincioSeguroScreen}                
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>,   
                                    
//                 })}
//             />
//             <Stack.Screen
//                 name="ConfirmacionDenunciaSeguro"
//                 component={ConfirmacionDenunciaSeguroScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="DatosDelSiniestro"
//                 component={DatosDelSiniestroScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="DatosConstancia"
//                 component={DatosConstanciaScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="DatosOtroConductor"
//                 component={DatosOtroConductorScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />   
//             <Stack.Screen
//                 name="DenunciaSiniestro"
//                 component={DenunciaSiniestroScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />    
//             <Stack.Screen
//                 name="Accidente2"
//                 component={Accidente2Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />                        
//             <Stack.Screen
//                 name="DatosTerceroAcc"
//                 component={DatosTerceroAccScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />             
//             <Stack.Screen
//                 name="Accidente31"
//                 component={Accidente31Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             /> 
//             <Stack.Screen
//                 name="Accidente32"
//                 component={Accidente32Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="Accidente4"
//                 component={Accidente4Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />               
//             <Stack.Screen
//                 name="PantallaFinalAcc"
//                 component={PantallaFinalAccidenteScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             /> 
//             <Stack.Screen
//                 name="PantallaFinalError"
//                 component={PantallaFinalErrorScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             /> 
//             <Stack.Screen
//                 name="PantallaFinalTermino"
//                 component={PantallaFinalTerminoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />     

//             <Stack.Screen
//                 name="Robo"
//                 component={RoboScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />      
//             <Stack.Screen
//                 name="Robo21"
//                 component={Robo21Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="Robo22"
//                 component={Robo22Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />     
//             <Stack.Screen
//                 name="Robo3"
//                 component={Robo3Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />
//             <Stack.Screen
//                 name="DatosTercero"
//                 component={DatosTerceroScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />        
//             <Stack.Screen
//                 name="FinalActoMalicios"
//                 component={FinalActoMaliciosoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />  

//             <Stack.Screen
//                 name="ActoMalicioso"
//                 component={ActoMaliciosoScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />              
//             <Stack.Screen
//                 name="ActoMalicios21"
//                 component={ActoMalicios21Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />  
//             <Stack.Screen
//                 name="ActoMalicios22"
//                 component={ActoMalicios22Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />              
//             <Stack.Screen
//                 name="ActoMalicios3"
//                 component={ActoMalicios3Screen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <View></View>,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />  
//             <Stack.Screen
//                 name="VisorPDF"
//                 component={VisorPDFScreen}
//                 options={({ navigation, route }) => ({
//                     headerLeft: props => <HeaderLeft {...props} navigation={navigation} />,
//                     headerTitle: props => <LogoTitle {...props} navigation={navigation} />,
//                     headerRight: props => <View></View>
//                 })}
//             />  

//             {/* fin de las pantallas de la fase 2 "Denuncio siniestro" */}                              

//         </Stack.Navigator>
        
//     );
// }



function getTabBarVisible(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    const hideOnScreens = [
        'Buzon', 'BuzonDetalle', 'Asistencia', 'AsistenciaDetalle', 'Config', 'Info', 'Password', 'SiniestroVehiculo', 
        'Prueba2', 'SeguimientoHome', 'DetalleReembolsoSaludHome' , 'Reembolso' ,'PagoEnLinea','VisorPDF',
        'Prueba', 'DenuncioSeguro', 'ConfirmacionDenunciaSeguro', 'DatosDelSiniestro' , 'DatosConstancia', 'DatosOtroConductor',
        'DenunciaSiniestro', 'Accidente2', 'DatosTerceroAcc', 'Accidente31', 'Accidente32', 'Accidente4', 'PantallaFinalAcc',
        'PantallaFinalError', 'PantallaFinalTermino', 'Robo', 'Robo21', 'Robo22', 'Robo3', 'DatosTercero', 'FinalActoMalicios',
        'ActoMalicioso', 'ActoMalicios21', 'ActoMalicios22', 'ActoMalicios3','Contactar2', 'Deposito', 'EditarDeposito' ,'ConfirmarCodigo' ,'ConfirmarDeposito' ,'ConfirmarCorreo','DatosActualizados'];     
    if(hideOnScreens.indexOf(routeName) > -1) return false;
    return true;    
  }

// function MainTabs() {
//     return (
//         <Tab.Navigator

//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;
//                     let anchoIcono = 60;
//                     let altoIcono = 60;
//                     switch (route.name) {
//                         case 'Inicio':
//                             if (focused) {
//                                 return <View style={{ flex: 1, width: '100%', }}>
//                                     <View style={{ top: 0, height: 2 , backgroundColor: '#006FB9', }} ></View>
//                                     <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
//                                         <Image source={require('../assets/img/logo_1.png')} style={{ width: anchoIcono, height: altoIcono, opacity: focused ? 1 : 0.5 }} />
//                                     </View>
//                                 </View>
//                             } else {
//                                 return <View style={{ flex: 1, width: '100%', }}>
//                                     <View style={{ top: 0, height: 2, backgroundColor: 'transparent', }} ></View>
//                                     <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
//                                         <Image source={require('../assets/img/logo_1.png')} style={{ width: anchoIcono, height: altoIcono, opacity: focused ? 1 : 0.5 }} />
//                                     </View>
//                                 </View>
//                             }
//                             break;
                        
                        
                       
//                     }
//                 },        
                
//                     activeTintColor: '#595B5A',
//                     inactiveTintColor: '#8F8F8F',
//                     labelStyle: {                    
//                         marginBottom: 5,
//                         fontSize: 11
//                     },                
//                     style: {
//                         backgroundColor: '#f5f5f5',
//                         paddingBottom: TabBarPaddingBottom,
//                         height: TabBarHeight, 
//                         //marginBottom: isIphoneX == true ? 0 : 5,                   
//                     },
                         
//             })}

//         >
//             <Tab.Screen name="Inicio" 
//                 component={AppStack} 
//                 options={({ route }) => ({
//                     headerShown:false,
//                     gestureEnabled:false,
//                     tabBarVisible: getTabBarVisible(route) })
//                 }             
//             />
            
           
            
//         </Tab.Navigator>
//     );
// }


// function MainNavigator() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen 
//             name="Main" 
//             component={MainTabs}  
//             options={{
//                     tabBarLabel: 'Seguimientos',
//                     headerShown:false,
//                     gestureEnabled:false,
//                 }}
//                 />
//         </Stack.Navigator>
//     );
// }



class routes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userToken: null,
        }
    }

    render() {
        return (
            <NavigationContainer
                theme={navTheme}
            >
                {/* {this.state.userToken == null ? <AuthNavigator/> : <MainNavigator/> } */}
                <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Initial" component={InitialNavigator} />
                    <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Auth" component={AuthNavigator} /> 
                    {/* <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="App" component={MainNavigator} /> */}
                </Stack.Navigator>

            </NavigationContainer>
        );
    }

}

export default routes;