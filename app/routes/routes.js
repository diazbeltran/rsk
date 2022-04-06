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




//---- FIN HEADER ----

//---- AuthLoadingStack ----
import SplashScreen from '../views/SplashScreen.js';
//import initializingScreen from '../views/initializing';
//---- FIN AuthLoadingStack ----

//---- AuthStack ----
import LoginScreen from '../views/Login/Login.view.js';
import InformeScreen from '../views/InformePrecargado/InformePre.view.js';
import ConsultaContenedorScreen from '../views/InformePrecargado/ConsultaContenedor.view.js';
import InfoGeneralEmbarque from '../views/InformePrecargado/InformeGeneralEmbarque.view.js';
import InfoGeneralEmbarqueNuevo from '../views/InformePrecargado/InfoGeneralEmbarqueNuevo.view.js';          
import IdentificacionCarga from '../views/InformePrecargado/IdentificacionCarga.view.js';
import EspecificacionContenedor from '../views/InformePrecargado/EspecificacionContenedor.view.js';

import FotosContenedor from '../views/InformePrecargado/FotosContenedor.view.js';
import FotosCarga from '../views/InformePrecargado/FotosCarga.view.js';

import EstibaPallet from '../views/InformePrecargado/EstibaPallet.view.js';
import EstibaPalletAgregar from '../views/InformePrecargado/EstibaPalletAgregar.view.js';
import EstibaPalletLista from '../views/InformePrecargado/EstibaPalletLista.view.js';


 import Observacion from '../views/InformePrecargado/Observaciones.view.js';

  



import InfoFinalEmbarque from '../views/InformePrecargado/InformeFinalEmbarque.view.js';
import RecuperaScreen from '../views/Login/Recupera.view.js';



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

                <Stack.Screen name="InfoGeneralEmbarque" 
                options={{ headerShown: false }} 
                component={InfoGeneralEmbarque} />

                <Stack.Screen name="InfoGeneralEmbarqueNuevo" 
                options={{ headerShown: false }} 
                component={InfoGeneralEmbarqueNuevo} />



                <Stack.Screen name="InfoFinalEmbarque" 
                options={{ headerShown: false }} 
                component={InfoFinalEmbarque} />
                

                <Stack.Screen name="IdentificacionCarga" 
                options={{ headerShown: false }} 
                component={IdentificacionCarga} />


                <Stack.Screen name="EspecificacionContenedor" 
                options={{ headerShown: false }} 
                component={EspecificacionContenedor} />



                <Stack.Screen name="FotosContenedor" 
                options={{ headerShown: false }} 
                component={FotosContenedor} />





                <Stack.Screen name="EstibaPallet" 
                options={{ headerShown: false }} 
                component={EstibaPallet} />

                <Stack.Screen name="EstibaPalletAgregar" 
                options={{ headerShown: false }} 
                component={EstibaPalletAgregar} />

                <Stack.Screen name="EstibaPalletLista" 
                options={{ headerShown: false }} 
                component={EstibaPalletLista} />



                 <Stack.Screen name="FotosCarga" 
                options={{ headerShown: false }} 
                component={FotosCarga} />




                <Stack.Screen name="Observacion" 
                    options={{ headerShown: false }} 
                    component={Observacion} />



                <Stack.Screen name="Recupera" 
                options={{ headerShown: false }} 
                component={RecuperaScreen} />
             
        </Stack.Navigator>
    );
}





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