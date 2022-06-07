import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Alert, FlatList, Platform, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ListMultiSelect.component.style';
import { scale, verticalScale, moderateScale } from '../../styles/scaling';
import Boton from './../Button/Button.component';
import { Utils, Validar, CheckConnectivity } from '../../helpers'; //'../../../../helpers';
import Loading from '../../components/Loading/Loading.component';

import Hint from '../../components/Hint/Hint.component';



//import WSRestApiDenuncia from  '../../services/wsRestApiDenuncia';//'../../../../services/wsRestApiDenuncia';

import WSRestApi from '../../services/wsRestApi';



const { width, height } = Dimensions.get('window');
const size = (width >= 768) ? scale(20) : scale(40)
const size2 = (width >= 768) ? scale(20) : scale(25)

class ListMultiSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {

            modalVisible: false,
            dataSource: [],

            texto: '',
            placeholder: '',
            multiline: '',
            numberOfLines: '',

            ocultar: true,
            seleccionados: [],
            texto: this.props.placeholder,
            texto_busqueda:'',
            isLoading: false,
            sindatos:false,
            texto_final:'',

        };

        this.Loading = React.createRef();
        this.Hint = React.createRef();

    }

    devolverSeleccionados = () => {
        return this.state.seleccionados;
    }
    
    devolverSeleccionadosTexto = () => {
        return this.state.texto_final;
    }
    
    
    async UNSAFE_componentWillMount() {
        

        console.log("inicio componente busqueda")
             
       

    }

    setModalVisible = async (visible, texto) => {
        this.setState({ modalVisible: visible, texto_busqueda:texto });
    }   

    carga_dato_busqueda = async (visible, texto, tipo) =>{
        this.setState({dataSource:[],dataSource1Selected:[]});
        this.Loading.current.mostrar();
        
        console.log(" ", tipo);

        this.setState({ modalVisible: visible, texto_busqueda:texto });

        let MyArray=[];
        
        await WSRestApi.fnWSConsultaDatosTipo(texto, tipo).then((result) => {
            //console.log(result.listadevalores);|
            if (tipo=='portsearch') {
                
                console.log("el portxxx- >",result);

                if(result.ok==false){
                    this.Hint.current.mostrarConParametros("Sin datos");
                    this.setState({sindatos:true});
                    this.Loading.current.ocultar();
                    return
                }

                let dato = result.data.ports;
                //let dato = result.data.vessels;

                if(result.data.ports.length==0){
                    this.Hint.current.mostrarConParametros("Sin datos");
                    this.setState({sindatos:true});
                }
              //console.log("lista de datos para la carga  ---> ",dato);
    
              console.log("por aqui paseseesads");
                let i = 0;
                dato.forEach((elem) => {
    
                    let seleccionar = false;
                    
                    let aux = {
                        
                        key: i,
                        text: elem.cn_name +' - '+ elem.name,
                        value: elem.vessel_id,
                        selected: '',
                        isSelect: seleccionar,
                    }
    
                //    console.log("elemento a cargar  ---> "+JSON.stringify(aux));
                 //   console.log("elemento a cargar key ---> "+this.state.keyDM);
    
                    MyArray.push(aux);
                    //this.setState({ dataSource: [...this.state.dataSource, aux], keyDM: i });
                    //this.state.dataSource1Selected = MyArray;
                    i = i + 1;
                });
                
                this.setState({ dataSource: MyArray });
                 //   this.state.dataSource1Selected = MyArray;
                this.Loading.current.ocultar();
                console.log('Daño: ', this.state.dataSource);
                return;


            } else {
                


                if(result.ok==false){
                    this.Hint.current.mostrarConParametros("Sin datos");
                    this.setState({sindatos:true});
                    this.Loading.current.ocultar();
                    return
                }
                let dato = result.data.vessels;

                if(dato.length==0){
                    this.Hint.current.mostrarConParametros("Sin datos");
                    this.setState({sindatos:true});
                }
              //console.log("lista de datos para la carga  ---> ",dato);
    
              console.log("por aqui paseseesads");
                let i = 0;
                dato.forEach((elem) => {
    
                    let seleccionar = false;
                    
                    let aux = {
                        
                        key: i,
                        text: elem.cn_name +' - '+ elem.name,
                        value: elem.vessel_id,
                        selected: '',
                        isSelect: seleccionar,
                    }
    
                //    console.log("elemento a cargar  ---> "+JSON.stringify(aux));
                 //   console.log("elemento a cargar key ---> "+this.state.keyDM);
    
                    MyArray.push(aux);
                   // this.setState({ dataSource: [...this.state.dataSource, aux], keyDM: i });
                    //this.state.dataSource1Selected = MyArray;
                    i = i + 1;
                });

                this.setState({ dataSource: MyArray, keyDM: i });

    
                this.Loading.current.ocultar();
                console.log('Daño: ', this.state.dataSource);
                return;
            }
            
            
          
        })

        

        
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#e6e6e6",
                }}
            />
        );
    };

    selectItem = (item) => {

        console.log("se ha seleccionado este item ==> ", item.text);

        console.log("se han seleccionado este item ==> ", this.state.seleccionados);

        this.setState({texto_final:item.text})
      
        item.isSelect = !item.isSelect;
        item.selectedClass = item.isSelect ? styles.selected : styles.list;

        const index = this.state.dataSource.findIndex(
            data => item.value === data.value
        );

        //console.log(item);
        this.state.dataSource[index] = item;

        this.setState({
            dataSource: this.state.dataSource,
        });




        let MyArray = [];
        let datos = this.state.dataSource;
        datos.forEach((elem) => {
            if (elem.isSelect == true) {
                let data = {
                    value: elem.value,
                    text: elem.text,
                    selected: '',
                    isSelect: elem.isSelect,
                    selectedClass: elem.selectedClass
                }

                MyArray.push(data);

            }
        });

        this.setModalVisible(!this.state.modalVisible);

        this.setState({
            seleccionados: MyArray,
           
        });



    }

    renderItem = (item) => (

        <TouchableOpacity
            style={styles.list}
            onPress={() => 
                this.selectItem(item)
                //console.log("hola mundo")
            }
        >
            <Text style={{ flex: 1 }}>{item.text}</Text>
            <View style={{ marginRight: 10 }}>
                {item.isSelect === true ? (<View style={{ width: scale(25) }}><Ionicons name="md-checkbox" size={size2} style={{ color: 'black' }} /></View>) : (<View style={{ width: scale(25), }}><Ionicons name="md-square-outline" size={size2} style={{ color: 'black', }} /></View>)}
            </View>

        </TouchableOpacity>

    );

    render() {
        return (

            <View style={{ marginBottom: 10 }}>
                <Modal
                    animationType="fade"
                    presentationStyle="overFullScreen"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                        //Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.wrapper}>
                        <View style={{ ...styles.containerModal }}>
                            {/* <Text style={styles.item}>Hello World!</Text> */}
                            <View style={{ width: '100%', height: 350, marginBottom: 10 }}>
                                <FlatList
                                    data={this.state.dataSource}
                                    renderItem={({ item }) => this.renderItem(item)}
                                    keyExtractor={item => item.value}
                                    extraData={this.state}
                                    ItemSeparatorComponent={this.renderSeparator}
                                />
                            </View>


                            {this.state.sindatos==true?(
                                <View style={{ backgroundColor: '#F4891F', marginBottom: 10, width: '100%', borderRadius: 4 }}>
                                <Boton onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }} texto="Close" style={{}} />

                                
                            </View>
                            ):(
                                <View></View>
                            )}
                            {/* <View style={{ backgroundColor: '#0065A5', marginBottom: 10, width: '100%', borderRadius: 4 }}>
                                <Boton onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }} texto="Select" style={{}} />

                                <Text>{this.state.texto_busqueda}</Text>
                            </View> */}

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent',
                        height: verticalScale(30),
                        borderRadius: 4,
                        marginTop: verticalScale(10),
                        paddingRight: width >= 768 ? 0 : scale(5),
                        //paddingTop: verticalScale(-4),
                        //backgroundColor:"red"

                    }}
                    onPress={() => {
                        console.log("click")
                        //this.setModalVisible(!this.state.modalVisible);
                    }}
                >

                    <View style={{

                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: "center",
                        borderRadius: 4,
                        width: '100%',
                        height: '100%',
                        paddingRight: scale(1),
                        
                    }}

                    >
                        
                        {this.state.texto_final!='' ? (
                            <View style={{marginLeft:'9%', width: scale(240), height: '100%', alignContent: 'center', justifyContent: 'center', paddingBottom: verticalScale(1) }}>
                            {/* <Text key='1' style={[{ color: Platform.OS === 'ios' ? 'black' : '#595B5A', marginLeft: scale(10), fontSize: 16, fontWeight: '100' }]}>
                                {this.state.seleccionados[0].text} </Text> */}
                            <TextInput style={{marginLeft:0,
                                                height: 40,
                                                width:'100%',
                                                margin: 12,
                                                borderWidth: 1,
                                                padding: 10,
                                                backgroundColor: '#efeeef',
                                                borderRadius: 5,
                                                borderColor: '#dadee3', }}
                            value={this.state.texto_final}
                            editable={false}
                            ></TextInput>
                                
                                </View>
                        ) : <View></View>}
                       
                                        <Hint
                                                
                                                ref={this.Hint}
                                                onPress={() => {
                                                    console.log("click")
                                                    //this.setModalVisible(!this.state.modalVisible);
                                                }}
                                            ></Hint>
                    </View>

                </TouchableOpacity>
                <Loading ref={this.Loading} />
            </View>
        );
    }

}

export default ListMultiSelect;    