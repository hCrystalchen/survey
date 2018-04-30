import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import * as Animatable from 'react-native-animatable';
import {animateButton} from './Helpers.js';

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Props = {};
export default class AnimatableButton extends Component<Props> {
  constructor(props) {
    super(props);
    this.animateCallback = this.animateCallback.bind(this);
    this.state = {
      text: this.props.text,
      background: this.props.background,
      color: this.props.color,
      onPress: this.props.onPress
    };
  }

  animateCallback() {
    animateButton(this.refs.button, this.state.onPress);
  }

  render() {
    return (
       <Animatable.View ref="button" style={styles.buttonContainer}>
           <TouchableOpacity style={[styles.button, {backgroundColor: this.state.background}]} onPress={()=> this.animateCallback()}>
              <Text style={[styles.buttonText, {color: this.state.color}]}>{this.state.text}</Text>
           </TouchableOpacity>
       </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer:{
    width: GLOBALS.STYLES.BUTTONWIDTH,
    marginVertical: GLOBALS.STYLES.YMARGIN
  },
  button: {
    width: GLOBALS.STYLES.FULL,
    padding: 10,
    borderRadius: GLOBALS.STYLES.CORNER,
    elevation: 3
  },
  buttonText: {
    textAlign: 'center',
    fontSize: GLOBALS.FONTSIZE.BUTTON
  }
});
