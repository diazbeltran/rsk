import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Platform, } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';


export default class MySelect extends Component {

  valorAlmacenado = "";

  constructor(props) {
    super(props);

    this.inputRefs = {
      selected: null,
    };

    this.state = {
      items3: [],
      isLoading: true,
      selected: undefined,
    };
  }

  //nos devuelve el valor almacenado en el estado
  devolverValorSelect = () => {
    return this.state.selected;
  }

  componentDidMount() {
    this.setState({ dataSource: this.props.datos })

    //artist = this.props.datos;
    //console.log(this.props.datos);
  }

  UNSAFE_componentWillMount() {
    this.setState({ selected: this.props.value })
  }
  recarga(){
    this.setState({selected:null})
  }

  render() {
    const placeholder = {
      label: this.props.label != undefined ? this.props.label : "Seleccione un valor",
      value: null,
      color: '#AFAFAF',
    };

   // console.log("select exportador"+JSON.stringify(this.props.datos));

    return (
      <View style={{ width: '100%' }}>
        <RNPickerSelect
          disabled={this.props.disabled}
          placeholder={placeholder}
          items={this.props.datos}
          key={(index) =>{index}}
          onValueChange={(value, index) => {
            //console.log("selected =>", value);
            //este if se pone para un caso especial de lista con categorias	          		
            if (this.props.id == 1) {

              this.props.mostrarElemento(value);

              console.log("nos han llegado estos datos del selectxxxx ", value, index);

              if (this.props.modoListaCorta == false) {
                console.log("************ modo lista corta == false ************")
                // if (index == 2 || index == 13 || index == 15 || index == 28) {
                //   this.setState({
                //     selected: 0,
                //   });

                // } else {
                  // this.setState({
                  //   selected: value,
                  // });

                // }

                if (isNaN(value)) {
                  //console.log( 'Not a Number!' );
                  this.setState({
                    selected: 0,
                  });                  
                }else{
                  this.setState({
                    selected: value,
                  });                  
                }


              } else {
                this.setState({
                  selected: value,
                });
              }


            } else {
              this.setState({
                selected: value,
              });

            } //fin del if else

            this.props.xfuncion != null ? this.props.xfuncion(value) : null
            this.valorAlmacenado = value;
            //console.log("el valor del select FINAL es : ", this.valorAlmacenado);
          }}

          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: Platform.OS === 'ios' ? 5 : 15,
              right: 10,
            },
            placeholder: {
              color: '#AFAFAF',
              fontSize: 12,
              fontWeight: '100',
            },
          }}

          onOpen={() => {
            console.log("se ha abierto el select ... ");
          }}

          value={this.state.selected}
          useNativeAndroidPickerStyle={false}
          ref={el => {
            this.inputRefs.selected = el;
          }}
          onUpArrow={() => {
            this.inputRefs.name.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
          }}
          ref={(ref) => {
            this.inputRefs.picker = ref;
          }}
          Icon={() => {
            return (
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 10,
                  borderTopColor: '#747474',
                  borderRightWidth: 10,
                  borderRightColor: 'transparent',
                  borderLeftWidth: 10,
                  borderLeftColor: 'transparent',
                  width: 0,
                  height: 0,
                }}
              />
            );
          }}
        />
      </View>

    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    //paddingVertical: 12,
    paddingHorizontal: 10,
    //borderWidth: 1,
    //borderColor: '#808080',
    //borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    // borderWidth: 0.5,
    // borderColor: '#808080',
    // borderRadius: 8,
    color: '#595B5A',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',
  },
});