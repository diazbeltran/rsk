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

      console.log("la fecha para insertar es :"+year+"-"+((month<10)? "0"+month : month)+"-"+fechax +" "+hora+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) );
     // return;

      let fechafinal = year+"-"+((month<10)? "0"+month : month)+"-"+fechax +" "+hora+":"+((minutos<10)? "0"+ minutos : minutos )+":"+((segundos<10)? "0"+segundos : segundos) ;
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




}

export default WSRestApi;