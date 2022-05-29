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
        
        
      
    
      var WSUrl = 'https://plataforma-rsk.aeurus.cl/api/v100/documentDetail';
  
  
      console.log("****************************************");
      console.log("CONSULTA USUARIO ws  ==>>> ", WSUrl);
      console.log("****************************************");
  
     
  
      let params = '{"usuario_id":"' + user + '", "planta_id" : "' + panta + '", "embarque_id" : "' + embarque + '", "embarque_planta_id" : "' + embarque_planta + '"}';

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


}

export default WSRestApi;