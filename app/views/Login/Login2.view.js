import React, { Component } from 'react';
import {
  SafeAreaView, View, Text, Image, ImageBackground, TouchableOpacity,
  Platform, Dimensions, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, Linking, BackHandler,
  Animated, Easing
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
//import firebase from 'react-native-firebase';

import Boton from '../../components/Button/Button.component';
import TextInput22 from '../../components/TextInput/TextInputLoginRut.component';
import TextInput2 from '../../components/TextInput/TextInput.component';
import TextInput3 from '../../components/TextInput/TextPassInput.component';

import Authentication from '../../components/Authentication/Authentication.component';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import Loading from '../../components/Loading/Loading.component';
//-----------------------------------------------------------------
import { normalize } from '../../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';
import themes from '../../styles/theme.style';
//-----------------------------------------------------------------

import styles from './Login.view.style';

import WSRestApi from '../../services/wsRestApi';
import WSRestApiRegistroUsuario from '../../services/wsRestApiRegistroUsuario';
import wsRestApiSeguimiento from "../../services/wsRestApiSeguimiento";

import Hint from '../../components/Hint/Hint.component';
import Hint2 from '../../components/Hint/Hint.component';
import WSRestApiBuzon from '../../services/wsRestApiBuzon';
import config from '../../config/dev.config';


const { width, height } = Dimensions.get('window');

const offset = (Platform.OS === 'android') ? -250 : 0;

class MyImagen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actualizarVersion: false,

    };

  }

  render() {

    if (width >= 768) {
      return (
        <View style={{ backgroundColor: 'transparent' }}>
          <Image source={require('../../assets/img/logo_1.png')} style={styles.logo} />
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: 'transparent' }}>
          <Image source={require('../../assets/img/logo_1.png')} style={styles.logo} />
        </View>
      )
    }
    // return (
    //     <Image source={require('../assets/img/logo.png')} style={styles.logo} />
    // )
  }
}


export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };


  constructor(props) {

    super(props);
    this.inputRefs = {};
    this.Loading = React.createRef();

    this.state = {
      fontLoaded: false,
      username: '',
      password: '',
      imagen: require('../../assets/img/bg-login.jpg'),
      isConnected: null,
      isLoading: false,
      compatible: false,
      fingerprints: false,
      auth_status: 'none', // none, pending, success, failed
      mostrarModal: false,
      tituloHint: "",
      tienda: "",
      inicioPrimeraVez: 1,
      nombreCorto: null,
      actualizarVersion: false,
      dataSourceAutos: [],

      verAnimacion: false,
      animationValue: new Animated.Value(0),
      scale: new Animated.Value(0),
      textoAnimacion: "",

    }

    this.TextInput2 = React.createRef();
    this.TextInput3 = React.createRef();
    this.Authentication = React.createRef();
    this.HintAlerta = React.createRef();
    this.HintAlertaWhatsApp = React.createRef();
  }

  //-----------------------------------------------------------------

  limpiarTextInputs = () => {

    try {
      if (this.state.inicioPrimeraVez >= 1) {

        this.TextInput2.current.setState({ texto2: "" });
        this.TextInput3.current.setState({ texto2: "" });

        this.TextInput2.current.msjAlert('');
        this.TextInput3.current.msjAlert('');
      }
    } catch (error) {
      console.log("limpiarTextInputs ", error);
    }

  }

  _mostrarHuella = async () => {

    let compatible = await this._checkDeviceForHardware();
    console.log("ES COMPATIBLE : " + compatible);
    let huella = 0;
    //let compatible = this.state.compatible;

    await Utils.getItem('huella').then(function (data) {
      huella = parseInt(data);
    });
    console.log("huella LOGIN : " + huella);


    if (huella == 1 && compatible == true) {
      console.log("se abre popup huella");
      try {
        this.setState({ mostrarModal: true })
      } catch (error) {
        console.log(error)
      }

    } else {
      console.log("no se abre popup huella");
      this.setState({ mostrarModal: false })
    }

  }


  validarBiometric = async () => {

    let compatible = await this._checkDeviceForHardware();
    let huella = await AsyncStorage.getItem("huella");
    console.log("validarBiometric : " + compatible);
    console.log("huella LOGIN : " + huella);

    if (huella == 1 && compatible == true) {
      this.setState({ compatible: compatible });
    } else {
      console.log("no se muestra huella");
      this.setState({ compatible: false });
    }



  }

  setValue = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (e) {
      // save error
      console.log(e);
    }

  }

  refrescarVersion = async () => {

    //----    
    await WSRestApi.Parametros_Lista(23).then(function (data) {
      JSON.parse(data).map(item => {
        //console.log('VERSION_ANDROID => ' + JSON.stringify(item) );
        setValue('VERSION_ANDROID', item.PAR_TEXTO);
      })
    }.bind(this));

    await WSRestApi.Parametros_Lista(24).then(function (data) {
      JSON.parse(data).map(item => {
        //console.log('VERSION_IOS => ' + JSON.stringify(item) );
        setValue('VERSION_IOS', item.PAR_TEXTO);
      })
    }.bind(this));
    //----

  }

  consultarVersion = async () => {

    await this.refrescarVersion();

    //codigo que nos indica si nuestro telefono debe actualizarse
    let validarVersion = await this.validarVersion();

    console.log("validarVersion : ", validarVersion);

    if (validarVersion == true) {
      this.setState({ actualizarVersion: validarVersion });
      await AsyncStorage.setItem("MOSTRAR_ACTUALIZAR_APP", "true");  //<----TENGO DUDA SI VOLVER A MOSTRAR SI EL USUARIO OMITIO ACTUALIZAR.
    }


    let mensaje46 = await AsyncStorage.getItem("MENSAJE_46");
    this.setState({textoAnimacion: mensaje46 })

  }

  //LLAMADO OBLIGATORIO PARA CARGA DE FUENTES
  async componentDidMount() {

    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      /*-----------------------------------------------------------*/
      let momentoActual = new Date()
      let hora = momentoActual.getHours()
      let minuto = momentoActual.getMinutes()
      let segundo = momentoActual.getSeconds()

      let horaImprimible = hora + " : " + minuto + " : " + segundo
      console.log(`Login ==> ${horaImprimible}!`);
      /*-----------------------------------------------------------*/

      this.validarBiometric();

      /*-----------------------------------------------------------*/

      this.consultarVersion();

      /*-----------------------------------------------------------*/

      this.setState({ verAnimacion: false });
      //this._Animacion(true);
    });


    this.setState({ fontLoaded: true })

    let nombreCortoLogin = await AsyncStorage.getItem("NOMBRE_CORTO_LOGIN");
    let huella = await AsyncStorage.getItem("huella");

    //console.log("el resultado de huella es  => ", huella);
    console.log("nombreCortoLogin => ", nombreCortoLogin);
    if (nombreCortoLogin != null && nombreCortoLogin != undefined && huella == 1) {
      //console.log("el nombre corto traido desde el asyc es => ", nombreCortoLogin);
      this.setState({ nombreCorto: nombreCortoLogin });
    }

    //--------
    this.cargarImagen();

    //---Authentication
    //await this._mostrarHuella();

    //codigo que nos indica si nuestro telefono debe actualizarse

    let validarVersion = await this.validarVersion();

    console.log("el resultado que nos ha llegado de validar la version del telefono es : ", validarVersion);


    if (validarVersion == true) {
      this.setState({ actualizarVersion: validarVersion })
    }

    let alto = Dimensions.get("window").height;
    let ancho = Dimensions.get("window").width;

    // console.log("en alto del celular es  ---->>>> ", alto);
    // console.log("en ancho del celular es  ---->>>> ", ancho);

  }

  async UNSAFE_componentWillMount() {

    try {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      //this.handleButtonClick();
      const { navigation } = this.props;

      console.log("componentWillMount...Login.view.js");

      this.focusListener = navigation.addListener('willFocus', () => {
        this.limpiarTextInputs();
        this.setState({ inicioPrimeraVez: this.state.inicioPrimeraVez + 1 });
        console.log("se ha hecho foto en la pantalla de inicio");
      });

      //-------------------------------------------------------

      let huella = await AsyncStorage.getItem('huella');
      if (huella == null || huella == 0) {
        console.log('si variable huella es null...');
        this.setState({ compatible: false });
      } else {
        let validar = await this._checkDeviceForHardware();
        console.log("validar => ", validar);
        if (validar === true) {
          console.log("MOSTRAR HUELLA!!!!!!");
          this.setState({ compatible: true });
        } else {
          console.log("NO MOSTRAR HUELLA!!!!!!");
          this.setState({ compatible: false });
        }
      }


    } catch (error) {
      console.log(error);
    }

  }

  componentDidUpdate() {
    //console.log("componentDidUpdate...Login.view.js");
  }

  handleChildClick() {
    console.log("handleChildClick");
    //this.Authentication.current.handleButton.bind();
  }

  _checkDeviceForHardware = async () => {

    try {
      let compatible = await FingerprintScanner.isSensorAvailable().then((biometryType) => {
        console.log(biometryType);
        return true
      }).catch(error => { return false });

      return compatible
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error);
      return false
    }


  }


  //about online/offline status
  componentWillUnmount() {
    try {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

      FingerprintScanner.release();
      this.setState({ isConnected: false });
      clearInterval(this._interval); // -->  se activa en la funcion this._Animacion

    } catch (error) {
      console.log("ERROR => ", error);
    }

  }

  handleBackButtonClick = async () => {
    console.log('handleBackButtonClick Login...');
    return false;
  }

  // _handleConnectivityChange = (isConnected) => {
  //   this.setState({
  //     isConnected,
  //   });
  // };
  //----------
  CheckConnectivity = async () => {
    // For Android devices
    if (Platform.OS === "android") {
      // NetInfo.isConnected.fetch().then(isConnected => {
      //   if (isConnected) {
      //     //Alert.alert("You are online!");
      //     this.setState({ isConnected });
      //   } else {
      //     //Alert.alert("You are offline!");
      //     this.setState({ isConnected });
      //   }
      // });
      this.setState({ isConnected: true, });
    } else {
      // For iOS devices
      // NetInfo.isConnected.addEventListener(
      //   "connectionChange",
      //   this.handleFirstConnectivityChange
      // );
      this.setState({ isConnected: true, });
    }
  };
  // handleFirstConnectivityChange = isConnected => {
  //   NetInfo.isConnected.removeEventListener(
  //     "connectionChange",
  //     this.handleFirstConnectivityChange
  //   );

  //   if (isConnected === false) {
  //     //Alert.alert("You are offline!");
  //     this.setState({ isConnected });
  //   } else {
  //     //Alert.alert("You are online!");
  //     this.setState({ isConnected });
  //   }
  // };


  //-----------------------------------------------------------------

  _handleConsumoBCIWS = async (username, password, url, passwd) => {
    try {
      let resultado = await WSRestApi.handleConsumoBCIWS(username, password, url, passwd);
      //console.log(`Obtenido el resultado : ${resultado}`);
      return resultado;
    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }
  }

  _fnWSLoginBCI = async (data, username, password, url, passwd) => {
    try {
      let resultado = await WSRestApi.fnWSLoginBCI(data, username, password, url, passwd);
      //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
      return resultado;
    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }
  }

  _handleConsumoWS = async (username, password) => {
    try {
      let resultado = await WSRestApi.handleConsumoWS(username, password);
      console.log(`Obtenido el resultado : ${resultado}`);
      return resultado;
    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }
  }

  _fnWSLogin = async (data, username, time_out) => {
    try {
      let resultado = await WSRestApi.fnWSLogin(data, username, time_out);
      console.log(`Obtenido el resultado : ${resultado}`);
      return resultado;
    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }
  }

  _fnWSUsuarioApp = async (data, username, password, url, passwd) => {
    try {
      let resultado = await WSRestApi.fnWSUsuarioApp(data, username, password, url, passwd);
      //console.log(`Obtenido el resultado ConsultaUsuario : ${resultado.Error.OCodError}`);
      return resultado;
    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }
  }

  _Lista_Mensajes = async (idUsu, url, token) => {
    try {
      let resultado = await WSRestApiBuzon.Lista_Mensajes(idUsu, url, token);
      return resultado;
    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }
  }

  _Carga_Mensajes_No_Leidos = async () => {

    try {

      let idUsuario = 0;
      let token = '';
      let url = config.BCI_SERVICIOS_WSP;

      await AsyncStorage.getItem('USU_ID')
        .then(storage => idUsuario = storage)
        .catch(err => console.log('catch', err));

      await AsyncStorage.getItem('TOKEN_JWT')
        .then(storage => token = storage)
        .catch(err => console.log('catch', err));

      if (!idUsuario == '' || !idUsuario == 'undefined') {
        console.log('idUsuario : ' + idUsuario);
        let mensajes_no_leidos = 0;
        let numero_msj = 0;
        let result = await this._Lista_Mensajes(idUsuario, url, token);
        //console.log(result);
        if (result[0].success) {

          let obj = JSON.parse(result[0].mensajes);

          obj.forEach(val => {
            numero_msj++;
            if (val.MEN_ESTADO_LECTURA == 'N') {
              mensajes_no_leidos++;
            }

          });
          if (mensajes_no_leidos > 9) {
            //mensajes_no_leidos = '9+'
            this.setState({ userCount: mensajes_no_leidos })
            AsyncStorage.setItem('MENSAJES_NO_LEIDOS', (mensajes_no_leidos).toString());
          } else {
            this.setState({ userCount: mensajes_no_leidos })
            AsyncStorage.setItem('MENSAJES_NO_LEIDOS', (mensajes_no_leidos).toString());
          }

        } else {
          mensajes_no_leidos = 0;
        }

        return mensajes_no_leidos;

      } else {
        //console.log('idUsuario vacio or undefined');
        return idUsuario
      }

    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }

  }

  _Registrar_Usuario = async (params, RootUrl, TOKEN_JWT) => {
    try {
      let resultado = await WSRestApiRegistroUsuario.Registrar_Usuario(params, RootUrl, TOKEN_JWT);
      console.log(`Obtenido el resultado _Registrar_Usuario : ${resultado}`);
      return resultado;
    } catch (error) {
      console.log("ERROR??? : " + error);
      return false
    }
  }

  _Aceptar = async (desdeHuella) => {

    Keyboard.dismiss();

     /*-----------------------------------------------------------*/
     let currentTime = Redirect.getTimeNow();
     console.log(`Inicio consultarVersion ==> ${currentTime} !!!`);
     /*-----------------------------------------------------------*/
    this.consultarVersion();

    //app.firebaseAnalytics("login");
    //firebase.analytics().setCurrentScreen('login');
    

    if (desdeHuella == 1) {

      console.log("desde huella 1 --------------------------");

    } else {
     // this._Validar(1);
     // this._Validar(2);

      //SI ES DIFERENTES DE "1"
      let username = this.TextInput2.current.devolverTexto();
      let respuesta = await Validar.fnValidarRut(username);

      console.log("username : ", username)

      if (respuesta != "1") {
        console.log("respuesta distinta a 1 -------->>>>>" + respuesta);
        return false;
      }

      //----------------------------------
      let textoPass = this.TextInput3.current.devolverTexto();
      textoPass = textoPass.trim().replace(" ", "");
      if (textoPass.length == 0) {
        //this.Loading.current.ocultar();
        console.log("Debes ingresar tu contraseña.");
        return false;
      }
      console.log("ya se valido pass...")
      //----------------------------------

    }

    await AsyncStorage.removeItem('dataSourceAutos'); // limpiar tarjetas de vehiculos

    let url = '';
    let time_out = 0;
    //const resultado1 = await Utils.removeItemValue('TOKEN_JWT'); // <--------ELIMINAR CADA VEZ QUE SE INGRESAR
    //const resultado2 = await Utils.removeItemValue('TOKEN_BCI_JWT'); // <--------ELIMINAR CADA VEZ QUE SE INGRESAR
    const resultado1 = true;
    const resultado2 = true;
    let checkConn = null;
    setValue('TOKEN_BCI_JWT', '');
    setValue('TOKEN_JWT', '');

    //let huella = 0;

    if (resultado1 == true && resultado2 == true) {
      console.log('Eliminado item con exito!!!');
      //await this.CheckConnectivity();
      await CheckConnectivity.fnCheckConnectivity().then(function (data) {
        checkConn = data;
      });
      console.log("checkConn =>", checkConn);
      if (checkConn == false) {

        setTimeout(() => {
          this.setState({ tituloHint: "Error de conexíon" });
          this.HintAlerta.current.mostrarConParametros("No está conectado a internet, por favor encienda WiFi o 3G.");
        }, 100);


        //Alert.alert("", "No está conectado a internet, por favor encienda WiFi o 3G.");
      } else {

        this._Animacion(true); // this.Loading.current.mostrar(); //        

        
        //const valor = await Utils.parametros();
        const valor = await Utils.parametros_Todos();
        let passwd = '';
        let url = '';
        let time_out = 0;

        if (valor == true) {
          console.log("se cargaron parametros...");
          //Utils.getAllValue();
        }

        await Utils.getItem('WS_TIMEOUT').then(function (data) {
          time_out = parseInt(data);
        });

        await Utils.getItem('WebAPIRest_BCI').then(function (data) {
          console.log("NULL ? => ", data)
          url = data.trim();
        });

        await Utils.getItem('PasswordWs').then(function (data) {
          passwd = data;
        });

        console.log('TIMEOUT afuera: ' + time_out);

        let username = '';
        let password = '';
        if (desdeHuella == 1) {
          console.log("Huella activada...");
          await Utils.getItem('USU_RUT').then(function (data) {
            username = data;
          });

          await Utils.getItem('USER_PASS').then(function (data) {
            password = data;
          });


        } else {
          username = this.TextInput2.current.devolverTexto();

          username = username.replace('.', '');
          username = username.replace('.', '');
          username = username.replace("-", "");

          password = this.TextInput3.current.devolverTexto();
        }


        console.log(`User ${username} ;Pass ${password} `);

        if (username === "" || username === null || typeof username === undefined) {
          //this.Loading.current.ocultar();
          //this.setState({ tituloHint: "Rut" });
          //this.HintAlerta.current.mostrarConParametros("Debes ingresar tu rut.");
          //Alert.alert("Debes ingresar tu rut.");
        } else if (password === "" || password === null || typeof password === undefined) {
          //this.Loading.current.ocultar();
          // this.setState({ tituloHint: "Contraseña" });
          // this.HintAlerta.current.mostrarConParametros("Debes ingresar tu contraseña.");
          //Alert.alert("Debes ingresar tu contraseña.");
        } else {


          //this.Loading.current.mostrar();

          //------OBTENER TOKEN------        
          try {
            let TOKEN_BCI_JWT = "";
            let TOKEN_JWT = "";
            let result = "";
            await this._handleConsumoBCIWS(username, password, url, passwd).then(function (data) {
              //console.log('TOKEN_BCI_JWT: ' + data);
              setValue('TOKEN_BCI_JWT', data);
              TOKEN_BCI_JWT = data;

              console.log("el token de bci es el siguiente -->> ", data);

            });

            if (TOKEN_BCI_JWT == "Error" || TOKEN_BCI_JWT == "undefined") {

              this._Animacion(false,true); // this.Loading.current.ocultar(); //

              if (Platform.OS == "ios") {
                setTimeout(() => {
                  console.log("hemos pasado por el set time out de ios");
                  this.setState({ tituloHint: "Error de autentificación" });
                  this.HintAlerta.current.mostrarConParametros("Autentificación inválida, validar datos ingresados.");
                }, 800);
              } else {
                this.setState({ tituloHint: "Error de autentificación" });
                this.HintAlerta.current.mostrarConParametros("Autentificación inválida, validar datos ingresados.");
              }
            } else {

              console.log('TOKEN_BCI_JWT : ' + TOKEN_BCI_JWT);
              await this._fnWSLoginBCI(TOKEN_BCI_JWT, username, password, url, passwd).then(function (data) {
                result = data;
              });

              //console.log("fnWSLoginBCI : " + result);
              if (result == 'Error') {

                this._Animacion(false,true); // this.Loading.current.ocultar(); //

                if (Platform.OS == "ios") {
                  setTimeout(() => {
                    this.setState({ tituloHint: "Error de conexión" });
                    this.HintAlerta.current.mostrarConParametros("Estamos presentando problemas en estos momentos. Por favor intenta nuevamente más tarde.");
                  }, 300)
                } else {
                  this.setState({ tituloHint: "Error de conexión" });
                  this.HintAlerta.current.mostrarConParametros("Estamos presentando problemas en estos momentos. Por favor intenta nuevamente más tarde.");
                }


                //Alert.alert("", "Estamos presentando problemas en estos momentos. Por favor intenta nuevamente más tarde.")
              } else {
                //console.log("fnWSLoginBCI : " + result);
                if (result.Error["OCodError"] == "00" && result.ExisteUsuario == "1") {
                  console.log("usuario existe...");

                  //------OBTENER TOKEN------
                  await this._handleConsumoWS(username, password).then(function (data) {
                    console.log('TOKEN_JWT: ' + data);
                    setValue('TOKEN_JWT', data);
                    setValue('USER_PASS', password.toString());
                    TOKEN_JWT = data;
                  });

                  let version = DeviceInfo.getVersion(); //expo.version;
                  console.log("la version actual de la app es : " + version);
                  setValue('VERSION_APP', version);

                  //------SI USUARIO EXISTE EN BCI PERO NO BD GENESYS, REGISTRAR-------
                  if (TOKEN_JWT == 'Unauthorized') {
                    this._Animacion(false,true); // this.Loading.current.ocultar(); //
                    //Alert.alert("", "Usuario registrado en la WEB pero no en la APP...");
                    // setTimeout(() => {
                    //   this.setState({ tituloHint: "No autorizado" });
                    //   this.HintAlerta.current.mostrarConParametros("Usuario registrado en la web pero no en la app.");
                    // }, 300)

                    console.log('Usuario registrado en la WEB pero no en la APP...');

                    let _user = "83971959";
                    let _pass = "12345";
                    //------OBTENER TOKEN------                    
                    TOKEN_JWT = await this._handleConsumoWS(_user, _pass).then(function (data) {
                      console.log('TOKEN_JWT: ' + data);
                      return data;
                    });
                    //----FIN OBTENER TOKEN----

                    //----REGISTRAR USUARIO APP----
                    let rut = '';
                    let correo = '';
                    let telefono = '';
                    let pass = '';
                    let nombre = '';
                    let versionapp = '';
                    console.log('TOKEN_BCI_JWT : ' + TOKEN_BCI_JWT);
                    console.log("URL BCI : " + url);
                    await this._fnWSUsuarioApp(TOKEN_BCI_JWT, username, password, url, passwd).then(function (data) {
                      result = data;
                    });
                    if (result.Error["OCodError"] == "00" && result.ExisteUsuario == "1") {
                      nombre = result.Usuario["Nombre"];
                      correo = result.Usuario["Email"];
                      rut = result.Usuario["Rut"];
                      telefono = result.Usuario["Celular"];
                      pass = password;
                      versionapp = version;
                    }


                    let params = '{ "PV_USU_RUT": "' + rut + '" ,' +
                      '  "PV_USU_PRIMER_NOMBRE": null ,' +
                      '  "PV_USU_SEGUNDO_NOMBRE": null ,' +
                      '  "PV_USU_APELLIDO_PATERNO": null ,' +
                      '  "PV_USU_APELLIDO_MATERNO": null ,' +
                      '  "PV_USU_SERIE": null ,' +
                      '  "PV_USU_EMAIL": "' + correo + '" ,' +
                      '  "PV_USU_CELULAR": "' + telefono + '" ,' +
                      '  "PV_USUS_CONTRASENA": "' + pass + '" ,' +
                      '  "PV_USU_NOMBRE_CORTO": "' + nombre + '" ,' +
                      '  "pv_usu_version_app": "' + versionapp + '" }';
                    console.log('Params Revisar_Usuario: ' + params);
                    let RootUrl = config.BCI_SERVICIOS_WSP;
                    let RESULTADO = await this._Registrar_Usuario(params, RootUrl, TOKEN_JWT)
                    console.log("RESULTADO REGISTRO : " + RESULTADO);
                    //-----------------------------

                    let USU_ID = '';
                    await this._fnWSLogin(TOKEN_JWT, username, time_out).then(function (data) {
                      let u = JSON.parse(data[0].usuario);
                      //console.log(u);
                      setValue("usuario", JSON.stringify(u)),
                        setValue('USU_RUT', u[0].USU_RUT.toUpperCase());
                      setValue('displayName', u[0].USU_NOMBRE_CORTO);
                      setValue('USU_ID', u[0].USU_ID.toString());
                      setValue('EMAIL_USUARIO', u[0].USU_EMAIL.toString());
                      setValue('TELEFONO_USUARIO', u[0].USU_CELULAR.toString());
                      setValue('customerPhotoURL', '');

                      USU_ID = u[0].USU_ID.toString();
                      //Carga_Mensajes_No_Leidos(window.localStorage.getItem("USU_ID"));
                      setValue('NOMBRE_CORTO_LOGIN', u[0].USU_NOMBRE_CORTO);

                    });

                    let numero = await this._Carga_Mensajes_No_Leidos();
                    //console.log("MENSAJES_NO_LEIDOS : " + numero);

                    this._Animacion(true, false); // this.Loading.current.ocultar(); //

                   
                    

                    //validamos a que lugar debemos redireccionar al usuario
                    setValue('MOSTRAR_ONBOARNING', '1');

                    if (this.state.actualizarVersion) {
                      console.log("VAMOS A LA PANTALLA ACTUALIZAR -->");
                      this.props.navigation.navigate('ActualizarApp');
                    } else {

                      let huella = await AsyncStorage.getItem('huella');
                      if (huella == null) {
                        this.props.navigation.navigate('App');
                      }

                      if (huella == 1) {
                        this.props.navigation.navigate('App');
                      }
                      if (huella == 0) {
                        this.props.navigation.navigate('ActivarHuella');
                      }

                    }

                    //SE REGISTRO AL USUARIO WEB EN LA APP...
                  } else {
                    let USU_ID = '';
                    await this._fnWSLogin(TOKEN_JWT, username, time_out).then(function (data) {
                      let u = JSON.parse(data[0].usuario);
                      //console.log(u);
                      setValue("usuario", JSON.stringify(u)),
                        setValue('USU_RUT', u[0].USU_RUT.toUpperCase());
                      setValue('displayName', u[0].USU_NOMBRE_CORTO);
                      setValue('USU_ID', u[0].USU_ID.toString());
                      setValue('EMAIL_USUARIO', u[0].USU_EMAIL.toString());
                      setValue('TELEFONO_USUARIO', u[0].USU_CELULAR.toString());
                      setValue('customerPhotoURL', '');

                      USU_ID = u[0].USU_ID.toString();
                      //Carga_Mensajes_No_Leidos(window.localStorage.getItem("USU_ID"));
                      setValue('NOMBRE_CORTO_LOGIN', u[0].USU_NOMBRE_CORTO);
                    });

                    let numero = await this._Carga_Mensajes_No_Leidos();
                    //console.log("MENSAJES_NO_LEIDOS : " + numero);

                    console.log('REGISTRAR_DISPOSITIVO -->')

                    //registrarDispositivo
                    let EstadoRegistroDispositivo = '';
                    await WSRestApi.registrarDispositivo().then(function (data) {
                      console.log("resultado final registro dispositivo : ", data);
                      //AsyncStorage.setItem('dispositivo', params );
                      if (data == 'Error') {
                        AsyncStorage.setItem('EstadoRegistroDispositivo', 'N');
                      } else {
                        AsyncStorage.setItem('EstadoRegistroDispositivo', 'S');
                      }
                    });

                    // let tokenFirebase = await AsyncStorage.getItem('TOKEN_FIREBASE');
                    // let titulo_bienvenida = 'Bienvenidos';
                    // let cuerpo_bienvenida = 'App BCI Seguros';
                    // await Utils.push_bci(tokenFirebase, titulo_bienvenida, cuerpo_bienvenida, null);

                    //this.Loading.current.ocultar();

                    

                    console.log('REDIRECCIONAR AL USUARIO -->')
                    //validamos a que lugar debemos redireccionar al usuario
                    // setValue('MOSTRAR_ONBOARNING', '1');
                    // let huella = await AsyncStorage.getItem("huella");
                    // if (this.state.actualizarVersion == true) {
                    //   this.props.navigation.navigate('ActualizarApp');
                    // } else {
                    //   if (huella == 1) {
                    //     this.props.navigation.navigate('App');
                    //   } else {
                    //     this.props.navigation.navigate('ActivarHuella');
                    //   }
                    // }
                    let ActivarHuella = await AsyncStorage.getItem("MOSTRAR_ACTIVAR_HUELLA");
                    if (ActivarHuella == null) { ActivarHuella = "true" }

                    let ActualizarApp = await AsyncStorage.getItem("MOSTRAR_ACTUALIZAR_APP");
                    if (ActualizarApp == null) { ActualizarApp = this.state.actualizarVersion.toString() }

                    console.log("limpiar cuadro texto!!!...");
                    this.limpiarTextInputs();

                    setTimeout(async () => {
                      this._Animacion(true, false); // this.Loading.current.ocultar(); //
                      setValue('MOSTRAR_ONBOARNING', '1');
                      let huella = await AsyncStorage.getItem("huella");
                      if (huella == null) { huella = "0" }
                      console.log("huella ==> ", huella);

                      if (this.state.actualizarVersion == true) {

                        if (huella == "1") {
                          await AsyncStorage.setItem("MOSTRAR_ACTIVAR_HUELLA", "false");
                        } else {
                          await AsyncStorage.setItem("MOSTRAR_ACTIVAR_HUELLA", "true");
                        }
                        console.log("MOSTRAR ACTUALIZAR APP LOGIN ==> ", ActualizarApp);
                        if (ActualizarApp == "true") {
                          this.props.navigation.navigate('ActualizarApp');
                        } else {
                          // let compatible = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
                          let compatible = await FingerprintScanner.isSensorAvailable().then((biometryType) => {
                            console.log(biometryType);
                            return true
                          }).catch(error => { return false });
                          if (compatible == true) {
                            if (ActivarHuella == "false") {
                              this.props.navigation.navigate('App');
                            } else {
                              this.props.navigation.navigate('ActivarHuella');
                            }
                          } else {
                            //se redirecciona si la app esta desactualizada, no tiene huella y se omitio actualización
                            this.props.navigation.navigate('App');
                          }
                        }


                      } else {
                        console.log("VAMOS DIRECTO A CONSULTAR HUELLA...");
                        if (huella == "1") {
                          this.props.navigation.navigate('App');
                        } else {

                          //let compatible = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
                          let compatible = await FingerprintScanner.isSensorAvailable().then((biometryType) => {
                            console.log(biometryType);
                            return true
                          }).catch(error => { return false });
                          console.log("MOSTRAR ACTIVAR HUELLA ==> ", ActivarHuella);
                          console.log("ES COMPATIBLE LA APP CON FINGERPRINTX : " + compatible);
                          if (compatible == true) {
                            if (ActivarHuella === "false") {
                              this.props.navigation.navigate('App');
                            } else {
                              this.props.navigation.navigate('ActivarHuella');
                            }
                          } else {
                            this.props.navigation.navigate('App');
                          }


                        }
                      }

                    }, 2000);
                    //Utils.getAllValue();
                  }


                } else {
                  this._Animacion(false, true); // this.Loading.current.ocultar(); //
                  console.log("*****hemos caido en error");
                  if (Platform.OS == "ios") {
                    setTimeout(() => {
                      console.log("hemos caido en el ultomo error");
                      this.setState({ tituloHint: "Error de autentificación" });
                      this.HintAlerta.current.mostrarConParametros("Autentificación inválida, validar datos ingresados.");
                    }, 300);
                  } else {
                    this.setState({ tituloHint: "Error de autentificación" });
                    this.HintAlerta.current.mostrarConParametros("Autentificación inválida, validar datos ingresados.");
                  }

                }

              }

              console.log("FIN");
              //this.Loading.current.ocultar();
            }

          } catch (error) {

            this._Animacion(false, true); // this.Loading.current.ocultar(); //

            console.log("ultimo error --->> ", error);

            if (Platform.OS == "ios") {
              setTimeout(() => {
                console.log("hemos caido en el ultomo error");
                this.setState({ tituloHint: "Error de autentificación" });
                this.HintAlerta.current.mostrarConParametros("Autentificación inválida, validar datos ingresados.");
              }, 300);
            } else {
              this.setState({ tituloHint: "Error de autentificación" });
              this.HintAlerta.current.mostrarConParametros("Autentificación inválida, validar datos ingresados.");
            }

          }
          //console.log("LOGIN!!!");
        }
      }
    }
  }

  _Animacion = async (estado, error) => {

    if(error == true){
      this.setState({ verAnimacion: false });
      clearInterval(this._interval);
      return false;
    }

    if(estado == true && error == false ){
      console.log("********************************");
      console.log("*                              *");
      console.log("*            FIN               *");
      console.log("*                              *");
      console.log("********************************");
      //this.setState({ verAnimacion: false });
      clearInterval(this._interval);
      return false;
    }

    this.setState({ verAnimacion: true });

    let mensaje46 = await AsyncStorage.getItem("MENSAJE_46");
    let mensaje47 = await AsyncStorage.getItem("MENSAJE_47");
    let mensaje48 = await AsyncStorage.getItem("MENSAJE_48");
    let mensaje49 = await AsyncStorage.getItem("MENSAJE_49");


    let n = 0;
    let textoArray = [mensaje46, mensaje47, mensaje48, mensaje49];
    //this.setState({textoAnimacion: textoArray[n] })

    const animate = () => {
      Animated.spring(this.state.scale , {
        toValue: 2,

        bounciness: 6,
        useNativeDriver: true,
      }).start(() =>{
        this.state.scale.setValue(0);
      });
    }

    //animate();


    this._interval = setInterval(() => {

      //this.setState({textoAnimacion: textoArray[n] })

      console.log(`NUMERO =>  ${n}!`);

      switch (true) {
          case (n < 1):
              //console.log("less than five");
              this.setState({textoAnimacion: textoArray[1] });
              n += 1;
              break;
          case (n < 2):
              //console.log("between 5 and 8");
              this.setState({textoAnimacion: textoArray[2] });
              n += 1;
              break;
          case (n < 3):
              //console.log("between 9 and 11");
              this.setState({textoAnimacion: textoArray[3] });
              n += 1;
              break;         
          default:
              //console.log("none");
              this.setState({textoAnimacion: textoArray[0] });
              n = 0;
              break;
      }

      //animate();

    }, 2900)

  }

  validarVersion = async () => {

    console.log("se ha llamado a validar version");


    let versionActual = DeviceInfo.getVersion();//expo.version;



    let numeroActual = versionActual.split(".");
    let numero1 = numeroActual[0];
    let numero2 = numeroActual[1];
    let numero3 = numeroActual[2];

    console.log("Version actual app", numeroActual);


    //-----------------------------------------------

    let versionIos = "";
    versionIos = await AsyncStorage.getItem("VERSION_IOS") != null ? await AsyncStorage.getItem("VERSION_IOS") : "";
    console.log("la version ios nos ha traido esto ------------->>>> ", versionIos);

    let numeroActualIos = versionIos.split(".");
    let numero1Ios = numeroActualIos[0];
    let numero2Ios = numeroActualIos[1];
    let numero3Ios = numeroActualIos[2];
    console.log("numero final Ios  ", numeroActualIos);

    //-----------------------------------------------

    let versionAndroid = "";
    versionAndroid = await AsyncStorage.getItem("VERSION_ANDROID") != null ? await AsyncStorage.getItem("VERSION_ANDROID") : "";
    let numeroActualAndroid = versionAndroid.split(".");
    let numero1Android = numeroActualAndroid[0];
    let numero2Android = numeroActualAndroid[1];
    let numero3Android = numeroActualAndroid[2];
    console.log("numero final Android  ", numeroActualAndroid);

    //-----------------------------------------------

    //validacion de la verison de android
    if (Platform.OS == "android") {

      //mostrar Update es una variable que pasaremos a la pantalla siguiente, si es falsa la saltamos, sino , mostramos la pantalla de actualizacion

      let mostrarUpdate = false;
      // if (numero1 < numero1Android) {
      //   mostrarUpdate = true;
      //   return mostrarUpdate;

      // } else if (numero2 < numero2Android) {
      //   mostrarUpdate = true;
      //   return mostrarUpdate;

      // } else if (numero3 < numero3Android) {
      //   mostrarUpdate = true;
      //   console.log("el telefono android debe actualizarse ");
      //   return mostrarUpdate;
      // }
      console.log(`nro actual1 ${numero1} es menor que ${numero1Android} ?`);
      if (parseInt(numero1) < parseInt(numero1Android)) {
        mostrarUpdate = true;
        console.log("el telefono android <<< SI >>> debe actualizarse ");
      } else {

        if (parseInt(numero1) == parseInt(numero1Android)) {
          console.log("se continua revisando número versión...");
          console.log(`nro actual2 ${numero2} es menor que ${numero2Android} ?`);
          if (parseInt(numero2) < parseInt(numero2Android)) {
            mostrarUpdate = true;
            return mostrarUpdate;
          } else {

            if (parseInt(numero2) == parseInt(numero2Android)) {
              console.log("se continua revisando número versión, parte final...");
              console.log(`nro actual3 ${numero3} es menor que ${numero3Android} ?`);
              if (parseInt(numero3) < parseInt(numero3Android)) {
                mostrarUpdate = true;
                console.log("el telefono android <<< SI >>> debe actualizarse ");
                return mostrarUpdate;
              }
            }

          }

        } else {
          console.log("el telefono android <<< NO >>> debe actualizarse ");
        }

      }

      return mostrarUpdate;

    } else { //validacion de la verison de IOS

      // if (numero1 < numero1Ios) {
      //   mostrarUpdate = true;
      //   return mostrarUpdate;

      // } else if (numero2 < numero2Ios) {
      //   mostrarUpdate = true;
      //   return mostrarUpdate;

      // } else if (numero3 < numero3Ios) {
      //   mostrarUpdate = true;
      //   console.log("el telefono IOS debe actualizarse ");
      //   return mostrarUpdate;

      // }
      let mostrarUpdate = false;
      console.log(`nro actual1 ${numero1} es menor que ${numero1Ios} ?`);
      if (parseInt(numero1) < parseInt(numero1Ios)) {
        mostrarUpdate = true;
        console.log("el telefono iOS <<< SI >>> debe actualizarse ");
      } else {

        if (parseInt(numero1) == parseInt(numero1Android)) {
          console.log("se continua revisando número versión...");
          console.log(`nro actual2 ${numero2} es menor que ${numero2Ios} ?`);
          if (parseInt(numero2) < parseInt(numero2Ios)) {
            mostrarUpdate = true;
            return mostrarUpdate;
          } else {

            if (parseInt(numero2) == parseInt(numero2Ios)) {
              console.log("se continua revisando número versión, parte final...");
              console.log(`nro actual3 ${numero3} es menor que ${numero3Ios} ?`);
              if (parseInt(numero3) < parseInt(numero3Ios)) {
                mostrarUpdate = true;
                console.log("el telefono iOS <<< SI >>> debe actualizarse ");
                return mostrarUpdate;
              }
            }

          }

        } else {
          console.log("el telefono iOS <<< NO >>> debe actualizarse ");
        }

      }



      return mostrarUpdate;

    }

    // console.log("numero version actual Android  ", numeroActualAndroid);
    // console.log("la version actual de la app es : ", versionActual);
    // console.log("la version de ios es  : ", versionIos);
    // console.log("la version de android es  : ", versionAndroid);
    console.log("fin de funcion...");

  }


  _Cancelar = () => {
    console.log("Cancelar!!!");
  }


  cargarImagen = () => {

    if (width >= 768) {
      this.setState({ imagen: require('../../assets/img/bg-login_tablet.jpg'), })
    } else {
      this.setState({ imagen: require('../../assets/img/bg-login.jpg'), })
    }

  }

 

  //-----------------------------------------------------------------

  render() {
 
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, .8, 1] 
    })

    const heartButtonStyle = {
      marginBottom: 25 ,
      transform: [
        { scale: bouncyHeart }
      ]
    }

    return (

      <View style={styles.wrapper}>

        <SalirDelTeclado>
          {/*    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={offset} > */}
          <KeyboardAvoidingView behavior="position" >
            {/* <KeyboardAvoidingView behavior="position"  >  */}
            <ImageBackground
              source={this.state.imagen}
              imageStyle={{ marginTop: Platform.OS === 'ios' ? 0 : 0, }}
              style={{ height: height, width: width, resizeMode: 'cover' }}
            >

              <View style={styles.logoView}>
                <MyImagen />
              </View>

              <View style={styles.myform}>

                <View style={styles.formcontainer}>

                  {this.state.nombreCorto == null ?
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: scale(10) }}>
                      {this.state.fontLoaded == true ? (<Text style={styles.title}>Iniciar Sesión</Text>) : (<Text>Loading ... </Text>)}
                    </View>
                    :
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: scale(10) }}>
                      {this.state.fontLoaded == true ? (<Text style={styles.title}>Hola {this.state.nombreCorto}</Text>) : (<Text>Loading ... </Text>)}
                    </View>
                  }



                  <View style={{ marginBottom: 10 }} >

                    <TextInput2
                      categoria="rut"
                      texto='172534848'//"184849968" //"56041109" // "172534848" //
                      placeholder='Ingresa tu RUT'
                      placeholderTextColor='#fff'
                      ref={this.TextInput2}
                      style={{ backgroundColor: '#4e9fd6', height: verticalScale(50) }}
                     // onBlur={() => this._Validar(1)}
                      page='Login'
                      maxLength={13}
                      sacarCaracteres={true}
                    />
                    {/* <Text>{this.state.isConnected ? 'Online' : 'Offline'}</Text> */}
                  </View>

                  <View style={{ marginBottom: 10 }} >

                    <TextInput3
                      texto='123456prod'
                      sacarCaracteres={false}
                      categoria="pass"
                      placeholder='Ingresa tu contraseña'
                      placeholderTextColor='#fff'
                      backgroundColor='#4e9fd6'
                      ref={this.TextInput3}
                      style={{ backgroundColor: '#4e9fd6', height: verticalScale(48) }}
                      verificarCaracteres={(texto) => this.verificarCaracteres(texto)}
                      //onBlur={() => this._Validar(2)}
                      page='Login'
                      maxLength={20}

                    />
                  </View>


                  <View style={{ flexDirection: 'row', marginBottom: verticalScale(15), }} >

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10, }}>

                      <TouchableOpacity onPress={() => this.props.navigation.navigate('RecuperarPass')} >
                        {this.state.fontLoaded == true ? (<Text style={styles.textLink}>Olvidé mi contraseña</Text>) : (<Text>Loading ... </Text>)}
                      </TouchableOpacity>


                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-around', }}>
                      {/* <Boton texto="Ingresar" onPress={() => this.props.navigation.navigate('Home')} style={{ backgroundColor: '#00953A' , paddingVertical: verticalScale(10) ,  }} />  */}
                      <Boton texto="Ingresar"
                        onPress={() => this._Aceptar()}
                        style={{ backgroundColor: '#00953A', paddingVertical: verticalScale(10), }} />
                    </View>


                  </View>

                  



                </View>
              </View>

              

              <Hint
                ref={this.HintAlerta}
                title={this.state.tituloHint}
              ></Hint>

              <Hint2
                ref={this.HintAlertaWhatsApp}
                title={this.state.tituloHint}
                tienda={this.state.tienda}
              ></Hint2>


            </ImageBackground>

          </KeyboardAvoidingView>
        </SalirDelTeclado>

        <Loading ref={this.Loading} />

        {this.state.verAnimacion == true ? (<View
          style={{
            position: 'absolute', zIndex: 1,
            backgroundColor: '#eaeaea', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
          }}
        >

          {/* <Animated.View style={heartButtonStyle}>
            <MyImagen />
          </Animated.View> */}
         
          <View style={{backgroundColor:'transparent', width:'100%', height:verticalScale(56), marginBottom: 10,  justifyContent: 'center', alignItems: 'center' }}>
            <MyImagen />
          </View>
          <View style={{backgroundColor:'transparent', width:'100%', height:verticalScale(80), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textAnimation} >{this.state.textoAnimacion}</Text> 
          </View>
        </View>) : null}



      </View>


    );
  }
}

const SalirDelTeclado = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(), console.log("se ha presionado fuera") }}>
    {children}
  </TouchableWithoutFeedback>
)