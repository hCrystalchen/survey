import React, { Component } from 'react';
import GLOBALS from './Globals.js';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = {};
export default class Settings extends Component<Props> {
  constructor() {
    super();
    this.state = {
      notify: true,
      theme: true
    };
  }

  render() {
    return (
      <View style={styles.page}>
        <TextInput
          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    width: '80%',
    backgroundColor: GLOBALS.COLOR.BLUE,
  },
});
