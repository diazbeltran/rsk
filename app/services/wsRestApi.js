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
        
        
      
    
        var WSUrl = 'http://plataforma-rsk.aeurus.cl/api/v100/login';
    
    
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
            throw response;
          }
        } catch (error) {
          console.log("ERROR1: " + JSON.stringify(error));
          return error;
        }
    
    
    
      }

    
    static async fnWSRecuperaPass(correo) {

        console.log("fnWSRecuperaPass --> "+correo);
    
    
     
      //  url = url.trim();
        url = 'http://plataforma-rsk.aeurus.cl/api/v100/restorePassword';
    
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




}

export default WSRestApi;