import React from 'react';
//import { Alert, } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import config from '../config/dev.config';
//import CryptoJS from "react-native-crypto-js";
//import DeviceInfo from 'react-native-device-info';
//import { Utils} from '../helpers';

//import Constants from 'expo-constants';

let fetching = false;

class WSRestApi {

    static async fnWSUsuarioApp(user, pass) {
        
        
      
    
        var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/login';
    
    
        console.log("****************************************");
        console.log("CONSULTA USUARIO ws  ==>>> ", WSUrl);
        console.log("****************************************");
    
       
    
        let params = '{"email":"' + user + '", "password" : "' + pass + '"}';

        let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


        //  console.log(WSUrl);
        console.log(params);
        try {
          const response = await fetch(WSUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            //  'Authorization': 'Bearer ' + token,
              token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
            },
            body: params,
          });


          //console.log('status : ' + response.status);
          if (response.status == 200) {
            responseJson = response.json();
            let obj = responseJson;
            return obj;
          } else {
            return "olax";
            throw response;
          }
        } catch (error) {
          let x = JSON.stringify(error)
          console.log("ERROR1: " + error);
          return "errorx22" + error;
        }
    
    
    
      }

    
    static async fnWSRecuperaPass(correo) {

        console.log("fnWSRecuperaPass --> "+correo);
    
    
     
      //  url = url.trim();
        url = 'https://plataforma-rsk.aeurus.cl/api/v100/restorePassword';
    
        //console.log(url);
        let params = '{"email":"' + correo + '"}';
    
        let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";
    
       
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
            },
            body: JSON.stringify({ email: correo }),
          });


          //console.log('status : ' + response.status);
          if (response.status == 200) {
            responseJson = response.json();
            let obj = responseJson;
            return obj;
          } else {
            throw response;
          }
        } catch (error) {
          console.log("ERROR1: " + JSON.stringify(error));
          return error;
        }
    
    
      }


    static async recuperapass(correo){

      const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://reqres.in/api/posts', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));

    }
    

    static async lista_documentos(user_id, panta_id) {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/documentsList';
  
  
      console.log("****************************************");
      console.log("CONSULTA USUARIO ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
     
  
      let params = '{"usuario_id":"' + user_id + '", "planta_id" : "' + panta_id + '"}';

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


        //console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR lista_documentos: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }
    static async fnWSDetalleembarque(user, panta, embarque, embarque_planta) {
        
        
      
      try {
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/documentDetail';
  
  
      console.log("****************************************");
      console.log("CONSULTA USUARIO ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
    //  .replace(/['"]+/g, '')
  
      let params = '{"usuario_id":"' + user + '", "planta_id" : "' + panta + '", "embarque_id" : "' + embarque + '", "embarque_planta_id" : "' + embarque_planta+ '"}';

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      console.log(params);
      
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


        console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR lista_documentos: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }

    static async fnWSExportador(panta) {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/exportersList';
  
  
      console.log("****************************************");
      console.log("CONSULTA EXPORTADOR ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
     
  
      let params = '{ "plant_id" : ' + panta + '}';

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


       // console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR exportador1: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }

    static async fnWSGuardaEmbarque(user, panta,fecha,oden,numero_contenedor, exportador, img1, img2, img3) {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/shipmentInformation';
  
  
      console.log("****************************************");
      console.log(" fnWSGuardaEmbarque ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
      let date = new Date();
      console.log("la horax es:"+date);

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      if(month < 10){
      console.log('${day}-0${month}-${year}')
      }else{
      console.log('${day}-${month}-${year}')
      }


      let hora = date.getHours();
      let minutos= date.getMinutes();
      let segundos = date.getSeconds();

      let fechax = date.getDate('YYYY-MM-DD')

      console.log("la fecha para insertar es :"+year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+hora+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) );
     // return;

      let fechafinal = year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+((hora<10)? "0"+ hora : hora )+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) ;
      console.log("la super fecha final es -->"+fechafinal);


      let params = '{"usuario_id":"' + user + '","embarque_id":"0", "planta_id" : "' + panta + '","embarque_planta_id":"0","fecha":"'+fechafinal+'", "orden_embarque" : "' + oden + '", "numero_contenedor" : "' + numero_contenedor + '","exportador_id" : "'+exportador+'","foto_general_contenedor":"'+img1+'" ,  "foto_pared_izquierda":"'+img2+'", "foto_pared_derecha":"'+img3+'" }';

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      //console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


        console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR lista_documentos: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }

    static async fnWSGuardaEmbarqueActualiza(user, panta,fecha,oden, embarque_planta_id , numero_contenedor, exportador, img1, img2, img3) {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/shipmentInformation';
  
  
      console.log("****************************************");
      console.log(" fnWSGuardaEmbarque ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
      let date = new Date();
      console.log("la horax es:"+date);

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      if(month < 10){
      console.log('${day}-0${month}-${year}')
      }else{
      console.log('${day}-${month}-${year}')
      }


      let hora = date.getHours();
      let minutos= date.getMinutes();
      let segundos = date.getSeconds();

      let fechax = date.getDate('YYYY-MM-DD')

      console.log("la fecha para insertar es :"+year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+hora+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) );
     // return;

      let fechafinal = year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+((hora<10)? "0"+ hora : hora )+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) ;
      console.log("la super fecha final es -->"+fechafinal);


      let params = '{"usuario_id":"' + user + '","embarque_id":"'+oden+'", "planta_id" : "' + panta + '","embarque_planta_id":"'+embarque_planta_id+'","fecha":"'+fechafinal+'", "orden_embarque" : "' + oden + '", "numero_contenedor" : "' + numero_contenedor + '","exportador_id" : "'+exportador+'","foto_general_contenedor":"'+img1+'" ,  "foto_pared_izquierda":"'+img2+'", "foto_pared_derecha":"'+img3+'" }';

     // console.info(params);
     

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      //console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


        console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR lista_documentos: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }




    static async fnWSRecibidor() {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/receiversList';
  
  
      console.log("****************************************");
      console.log("CONSULTA fnWSRecibidor ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
     
  
    //  let params = '{ "plant_id" : ' + panta + '}';

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
     // console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
         // body: params,
        });


       // console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR exportador1: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }

    static async fnWSEspecie() {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/speciesList';
  
  
      console.log("****************************************");
      console.log("CONSULTA fnWSRecibidor ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
     
  
    //  let params = '{ "plant_id" : ' + panta + '}';

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
     // console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
         // body: params,
        });


       // console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR exportador1: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }

    static async fnWSGuardaCargoDetail(user, panta,embarque_id,embarque_planta_id,fecha,motonave, recibidor_id,puerto_carga, puerto_destino, numero_booking, especies,  img1) {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/loadIdentification';
  
  
      console.log("****************************************");
      console.log(" fnWSGuardaCargoDetail ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
      let date = new Date();
      console.log("la horax es:"+date);

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      if(month < 10){
      console.log('${day}-0${month}-${year}')
      }else{
      console.log('${day}-${month}-${year}')
      }


      let hora = date.getHours();
      let minutos= date.getMinutes();
      let segundos = date.getSeconds();

      let fechax = date.getDate('YYYY-MM-DD')

      console.log("la fecha para insertar es :"+year+"-"+((month<10)? "0"+month : month)+"-"+fechax +" "+((hora<10)? "0"+ hora : hora )+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) );
     // return;

      let fechafinal = year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+((hora<10)? "0"+ hora : hora )+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) ;
      console.log("la super fecha final es -->"+fechafinal);


      let params = '{"usuario_id":"' + user + '","embarque_id":"'+embarque_id+'", "planta_id" : "' + panta + '","embarque_planta_id":"'+embarque_planta_id+'","fecha":"'+fechafinal+'", "motonave" : "' + motonave + '", "recibidor_id" : "' + recibidor_id + '", "puerto_carga" : "' + puerto_carga + '", "puerto_destino" : "' + puerto_destino + '", "numero_booking" : "' + numero_booking + '", "especies" : ' + JSON.stringify(especies) + ', "foto_numero_contenedor":"'+img1+'" }';

      //console.info(params);
      //return;
      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      //console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


        console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR lista_documentos: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }


    static async fnWSGuardaContenedor(user, panta,embarque_id,embarque_planta_id,fecha,ano_fabricacion_contenedor, pti,preenfriado,limpio_sin_olor,buen_estado, temperatura,ventilacion, confirmacion, img1, img2, img3, img4, img5    ) {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/shipmentSpecification';
  
  
      console.log("****************************************");
      console.log(" fnWSGuardaContenedor ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
      let date = new Date();
      console.log("la horax es:"+date);

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      if(month < 10){
      console.log('${day}-0${month}-${year}')
      }else{
      console.log('${day}-${month}-${year}')
      }


      let hora = date.getHours();
      let minutos= date.getMinutes();
      let segundos = date.getSeconds();

      let fechax = date.getDate('YYYY-MM-DD')

      console.log("la fecha para insertar es :"+year+"-"+((month<10)? "0"+month : month)+"-"+fechax +" "+((hora<10)? "0"+ hora : hora )+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) );
     // return;

      let fechafinal = year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+((hora<10)? "0"+ hora : hora )+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) ;
      console.log("la super fecha final es -->"+fechafinal);


      let params = '{"usuario_id":"' + user + '","embarque_id":"'+embarque_id+'", "planta_id" : "' + panta + '","embarque_planta_id":"'+embarque_planta_id+'","fecha":"'+fechafinal+'", "ano_fabricacion_contenedor" : "' + ano_fabricacion_contenedor + '", "pti" : "' + pti + '", "preenfriado" : "' + preenfriado + '", "limpio_sin_olor" : "' + limpio_sin_olor + '", "buen_estado" : "' + buen_estado + '", "temperatura" : "' + temperatura + '", "ventilacion" : "' + ventilacion + '", "confirmacion" : "' + confirmacion + '", "foto_ano_fabricacion" : "' + img1 + '", "foto_pti" : "' + img2 + '", "foto_grados_celsius" : "' + img3 + '", "foto_estado_motor" : "' + img4 + '", "foto_ventilacion" : "' + img5 + '" }';

      //console.info(params);
     // return;
      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      //console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


        console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR lista_documentos: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }

    static async fnWSGuardaFotosContenedorVacio(user, panta,embarque_id,embarque_planta_id, img1, img2) {
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/savePhotosEmptyContainer';
  
  
      console.log("****************************************");
      console.log(" fnWSGuardaFotosContenedorVacio ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
      let date = new Date();
      console.log("la horax es:"+date);

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      if(month < 10){
      console.log('${day}-0${month}-${year}')
      }else{
      console.log('${day}-${month}-${year}')
      }


      let hora = date.getHours();
      let minutos= date.getMinutes();
      let segundos = date.getSeconds();

      let fechax = date.getDate('YYYY-MM-DD')

      console.log("la fecha para insertar es :"+year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+hora+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) );
     // return;

      let fechafinal = year+"-"+((month<10)? "0"+month : month)+"-"+((fechax<10)? "0"+fechax : fechax) +" "+((hora<10)? "0"+ hora : hora )+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) ;
      console.log("la super fecha final es -->"+fechafinal);


      let params = '{"user_id":' + user + ',"shipment_id":'+embarque_id+', "plant_id" : ' + panta + ',"shipment_plant_id":'+embarque_planta_id+',"photo_buffer_plate":"'+img1+'" ,  "photo_background_container":"'+img2+'"}';

      let token = "SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv";


      //  console.log(WSUrl);
      //console.log(params);
      try {
        const response = await fetch(WSUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + token,
            token:"SmFraXJvTG9NYXNHcmFuZGVEZWxEb3RpdGFHcmFjaWFzR2FiZW5Qb3JFc3Rv"
          },
          body: params,
        });


        console.log('status : ' + response.status);
        if (response.status == 200) {
          responseJson = response.json();
          let obj = responseJson;
          return obj;
        } else {
          throw response;
        }
      } catch (error) {
        console.log("ERROR lista_documentos: " + JSON.stringify(error));
        return error;
      }
  
  
  
    }






}

export default WSRestApi;