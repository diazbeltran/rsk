import { StyleSheet, Dimensions } from 'react-native';
//import { normalize } from '../../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';
import themes from '../../styles/theme.style';

const backgroundTextInput = "#F4F4F4";
const textColor = "#595B5A";
//colores y fuentes para el placeholder de los text input 
const textPlaceholder = "#8F8F8F";
const placeholder = "";

colorButtom = "#00953A";
//buttomText = "Overpass Bold" //16pt

selectIconColor = "#595B5A";
//titulos de los input
TextTitleInputColor = "#595B5A";
Titulo = "#1D1D1B";
Subtitulo = "#595B5A";

//colorIconoMas = "#595B5A";


export default StyleSheet.create({

    adjuntarImagenes: {
        height: 100,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    circuloAdjuntarImagen: {
        height: scale(60),
        width: scale(80),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        backgroundColor: themes.TEXT_INPUT_BACKGROUNDCOLOR,
        borderRadius: 4,
    },

    textoAdjuntarImagen: {
        fontSize: themes.FONT_SIZE_SMALL,
        opacity: 0.5,
       // fontFamily: "Overpass-Bold",
        marginBottom: 5
    },
    datosImagen: {
        fontSize: themes.FONT_SIZE_SMALLER,
        opacity: 0.5,
       // fontFamily: "Overpass-Bold",
        marginBottom: 5
    },
    foto: {
        height: scale(60),
        width: scale(80),
        borderRadius: 4,
    }


})
