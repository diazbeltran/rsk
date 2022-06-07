import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../styles/theme.style';
import { normalize } from '../../styles/normalizeFont';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';


const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20, paddingVertical: 20,
  },
  item: {
    backgroundColor: '#AFAFAF',
    marginBottom: 10,
  },
  wrapper: {
    backgroundColor: "rgba(88,88,88,0.6)",
    width: width,
    height: height + 25,
    justifyContent: "center",
    alignItems: "center"
  },
  containerModal: {
    backgroundColor: "#f4f4f4",
    width: width * 0.9,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  selected: { backgroundColor: "#f4f4f4" },

  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    alignItems: "center",
  },

  box: {
    height: verticalScale(32),
    width: "100%",
    borderRadius: 4,
    justifyContent: "space-between",
    paddingLeft: 10,
    alignItems: "flex-start",
    flexDirection: "row",
    borderRadius: theme.BORDER_RADIUS,
    paddingTop: 6,
    paddingRight: 10,
  },

  textBox: {
    height: verticalScale(29), //Pantalla.alto * 0.05,
    width: "90%",
    fontSize: moderateScale(theme.FONT_SIZE_SMALL),
    color: '#000',
  },


});    