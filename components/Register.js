import React, { Component } from 'react';
import GLOBALS from './Globals.js';

import {
  StackNavigator,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  StyleSheet
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

  onLogin() {
    // TODO: find way to hide title on login and register screens
    this.props.navigation.navigate('Login');
  }

  onSignup() {
    // temporary, for testing only
    this.props.navigation.navigate('Demographics');
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{height: '45%'}}></View>
          <TextInput style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Username"
              placeholderTextColor = "#ffffff"
              selectionColor="#ffffff"
              keyboardType="default"
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              ref={(input) => this.password = input}
              />
        <TouchableOpacity style={styles.button} onPress={()=> this.onSignup()}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
		<View style={styles.textContainer}>
			<Text style={styles.text}>Already have an account?</Text>
			<TouchableOpacity onPress={()=> this.onLogin()}>
			    <Text style={styles.textButton}>Sign up</Text>
		    </TouchableOpacity>
		</View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
    alignItems: 'center',
  },
  button: {
    width: GLOBALS.STYLES.WIDTH,
    backgroundColor: GLOBALS.COLOR.BLUE,
    padding: 10,
    borderRadius: GLOBALS.STYLES.CORNER,
    elevation: 3,
    marginVertical: GLOBALS.STYLES.YMARGIN
  },
  buttonText: {
    textAlign: 'center',
    color: GLOBALS.COLOR.TITLETEXT,
    fontSize: GLOBALS.FONTSIZE.BUTTON
  },
  input: {
    width: GLOBALS.STYLES.WIDTH,
    backgroundColor: GLOBALS.COLOR.TRANSPARENTWHITE,
    borderRadius: GLOBALS.STYLES.CORNER,
    paddingHorizontal:16,
    fontSize: GLOBALS.FONTSIZE.TEXT,
    color: GLOBALS.COLOR.TITLETEXT,
    marginVertical: GLOBALS.STYLES.YMARGIN
  },
  textContainer: {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingVertical: GLOBALS.FONTSIZE.TEXT,
    flexDirection:'row'
  },
  text: {
  	color: GLOBALS.COLOR.TEXT,
  	fontSize: GLOBALS.FONTSIZE.TEXT
  },
  textButton: {
  	color: GLOBALS.COLOR.TITLETEXT,
  	fontSize: GLOBALS.FONTSIZE.TEXT,
  	fontWeight:'500'
  }
 });
