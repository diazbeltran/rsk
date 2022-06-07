import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Button.component.style';

class ButtonX extends Component {

  constructor(props) {
    super(props)
    this.state = {
      texto2: '',
      color: '#fff',
    };
  }

  componentDidMount() {
    passedTexto = this.props.texto;
    this.setState({ texto2: passedTexto });
    console.log(this.props.style.color);

    if (this.props.style.color == undefined) {
      this.setState({ color: '#fff' });
    } else {
      MyColor = this.props.style.color;
      this.setState({ color: MyColor });
    }

  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.buttoncontainer, this.props.style]}
      >
        <Text style={[styles.buttontext, { color: this.state.color }]} >{this.state.texto2}</Text>
      </TouchableOpacity>
    );
  }
}

export default ButtonX;