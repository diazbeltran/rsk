import { StyleSheet, Dimensions, StatusBar, Platform, } from 'react-native';
import { normalize } from '../../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';


import theme from '../../styles/theme.style';
const { width, height } = Dimensions.get('window');
const Pantalla = {
    alto: Math.round(Dimensions.get("window").height) - 50, //ese 50 corresponde al tab na
    ancho: Math.round(Dimensions.get("window").width)
}

export default StyleSheet.create({

    container:{
        //backgroundColor: "#f2f2f2", 
        backgroundColor: "rgba(88,88,88,0.35)",
        width: width * 0.4, 
        height: verticalScale(110), 
        borderRadius: 4, 
        justifyContent: "center", 
        alignItems: "center", 
        paddingTop:scale(10)        
    },

    activityIndicator: {
        height:40,
        marginBottom:scale(10),
    },

    contenedor: {
        alignItems: "center",
        justifyContent: "center",
    },

    textoLoading: {
        fontFamily: "Overpass-Bold",
        //color: '#007acc', 
        color: "white",
        fontSize: width >= 768 ? moderateScale(18) : moderateScale(16),
    },



});    