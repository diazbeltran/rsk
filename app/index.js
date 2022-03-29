import React, { Component } from 'react'
import messaging from '@react-native-firebase/messaging';
import {StyleSheet,View, Text} from "react-native" ;

import AsyncStorage from '@react-native-async-storage/async-storage';


const StartNavigator = require('./routes/routes.js').default;

export default class index extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (

              
             <StartNavigator />
        )
    }
}
