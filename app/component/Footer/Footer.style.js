import { StyleSheet, Platform, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../styles/scaling.js';//'../styles/scaling.js';

//import firebase from 'react-native-firebase';
// import Boton from '../components/Button/Button.component';

const { width, height } = Dimensions.get('window');
import themes from '../../styles/theme.style';

var box_count = 3;
var box_height = height / box_count;


export default StyleSheet.create({

    box: {
        height: box_height
      },
    wrapper: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems:'center',
        //backgroundColor:'#f4f4f4',
       // backgroundColor: '#fafafa',
        flexDirection: 'column',
    },
    content: {
        //height: verticalScale(height/4), 
        width: width,
        //backgroundColor:'red', 
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoView: {
        paddingTop: height / 3, //scale(height / 3), 
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: moderateScale(70),
        marginLeft:moderateScale(70),
        width: moderateScale(200),
        height: verticalScale(350),
        resizeMode: 'center'
    },
    logo2: {
        width: moderateScale(100),
        height: verticalScale(150),
        resizeMode: 'contain'
    },
    titulo: {
        fontSize: moderateScale(themes.FONT_SIZE_SMALL),
        //fontFamily: "Overpass-Bold",
        marginBottom: verticalScale(10)
    },
    icono: {
        width: moderateScale(40),
        height: verticalScale(40),
    },
    barColor: {
        height: 10,
        borderRadius: 4,
    }


});    