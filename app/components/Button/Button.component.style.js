import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import { normalize } from '../../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';
//
//import {headingText, textInput} from '../../styles/common.style';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: theme.CONTAINER_PADDING,
    
      },

      buttoncontainer: {
        //backgroundColor: theme.BUTTON_BACKGROUD_COLOR,
        backgroundColor: '#F4891F',
        
        paddingVertical: 15,
        //marginBottom: 10,
        borderRadius: theme.BORDER_RADIUS, 
      },
      buttontext: {
        textAlign: theme.BUTTON_TEXTALIGN,
        color: theme.BUTTON_COLOR,
        fontWeight: theme.FONT_WEIGHT_BOLD,
        fontSize: moderateScale(theme.FONT_SIZE_SMALL),
        //fontFamily: "Overpass-Bold",
      }, 


      // fontSize: normalize(Fuentes.subtitulos),
      // color: "#595B5A",
      // marginBottom: verticalScale(margenSubtitulos),
      // fontFamily: "Overpass-Bold"



});    