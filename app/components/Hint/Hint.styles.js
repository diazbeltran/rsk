import { StyleSheet, Dimensions } from 'react-native';
//import { normalize } from '../../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';
import themes from '../../styles/theme.style';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({

    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        //paddingVertical: verticalScale(30),
        paddingHorizontal: 0,
        paddingBottom: verticalScale(30),
    },
    titulo: {
        fontSize: width >= 768 ? moderateScale(themes.FONT_SIZE_LARGE)-2 :  moderateScale(themes.FONT_SIZE_LARGE), //moderateScale(themes.FONT_SIZE_LARGE),
        fontFamily: "Overpass-Bold",
        color: "white"
    },
    subtitulo: {
        fontSize: width >= 768 ? moderateScale(themes.FONT_SIZE_MEDIUM)-2 :  moderateScale(themes.FONT_SIZE_MEDIUM), //moderateScale(themes.FONT_SIZE_MEDIUM),
        fontFamily: "Overpass-Bold",
        color: "#595B5A"
    },
    textoChico: {
        fontSize: width >= 768 ? moderateScale(themes.FONT_SIZE_SMALL)-2 :  moderateScale(themes.FONT_SIZE_SMALL), //moderateScale(themes.FONT_SIZE_SMALL),
        fontFamily: "Overpass-Regular",
        color: "#595B5A"
    },

    boton: {
        width: ( (width*0.9)-60 ) / 2  , 
        borderWidth: 1, 
        borderColor:'#E2E2E2',
        justifyContent:'center',
        alignItems:'center',
    }

})