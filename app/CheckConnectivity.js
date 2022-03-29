/* CheckConnectivity.js */
import { Platform } from 'react-native';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

_CheckConnectivity = async () => {

    if (Platform.OS === "android") {
        let result = await NetInfo.fetch();
        console.log("resultado => ", result);
        return result.isConnected;
    }else{
        let result = await NetInfo.fetch();
        console.log("resultado iOS => ", result);
        return result.isConnected;
    }

}


async function fnCheckConnectivity() {
    
    try {
        let resultado = await _CheckConnectivity();
        console.log("checkConnectivity => " , resultado);
        
        return resultado;
    } catch (error) {
        console.log(error);
        return false
    }
}

// Now you have to export each function you want
export {
    fnCheckConnectivity
};  