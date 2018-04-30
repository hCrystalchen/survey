import React, { Component } from 'react';
import GLOBALS from 'survey/components/Globals.js';
import AnimatableButton from './AnimatableButton.js';

import {
  StackNavigator,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  WebView,
  Image
} from 'react-native';

const scopes = ['openid', 'profile', 'email', 'offline_access'];

type State = {
  hasLoggedInOnce: boolean,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string
};

const config = {
  issuer: 'https://dev-764524.oktapreview.com/oauth2/default',
  clientId: '0oaep21929h1GUvKC0h7',
  redirectUrl: 'com.oktapreview.dev-764524:/callback',
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'offline_access']
};

authorize = async () => {
  try {
    const authState = await authorize(config);

  } catch (error) {
    Alert.alert('Failed to log in', error.message);
  }
};

refresh = async () => {
  try {
    const authState = await refresh(config, {
      refreshToken: this.state.refreshToken
    });

  } catch (error) {
    Alert.alert('Failed to refresh token', error.message);
  }
};

revoke = async () => {
  try {
    await revoke(config, {
      tokenToRevoke: this.state.accessToken,
      sendClientId: true
    });
  } catch (error) {
    Alert.alert('Failed to revoke token', error.message);
  }
};




type Props = {};
class Login extends Component<Props> {
  constructor() {
    super();
    this.state = {
      hasLoggedInOnce: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
      openWebView: false,
    }
  }

  onLogin() {
    // temporary, for testing only
    this.props.navigation.navigate('Demographics');
    this.authorize
  }

  printLog() {
    console.log("webview open");
    return true;
  }

  onSignup() {
    this.props.navigation.navigate('Register');
  }

  render() {
    const { accessToken, accessTokenExpirationDate} = this.state;
    const { container, createAccount } = styles;

    return (
      <View style={styles.container}>
          <View style={{height: '50%'}}>
          <Image
            source={require('../assets/logo.png')}
            style={{width: 375, height: 375, }}
          />
          </View>
          <TextInput style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Username"
              placeholderTextColor = {GLOBALS.COLOR.LIGHTTEXT}
              selectionColor="#ffffff"
              keyboardType="default"
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = {GLOBALS.COLOR.LIGHTTEXT}
              ref={(input) => this.password = input}
              />
        <AnimatableButton text="Login" background = {GLOBALS.COLOR.BLUE} color = {GLOBALS.COLOR.TITLETEXT} onPress = {() => this.onLogin()} />
		<View style={styles.textContainer}>
			<Text style={styles.text}>Do not have an account?</Text>
			<TouchableOpacity onPress={()=> this.onSignup()}>
			    <Text style={styles.textButton}> Sign up</Text>
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
  input: {
    width: GLOBALS.STYLES.WIDTH,
    backgroundColor: GLOBALS.COLOR.TRANSPARENTWHITE,
    borderRadius: GLOBALS.STYLES.CORNER,
    paddingHorizontal:16,
    fontSize: GLOBALS.FONTSIZE.TEXT,
    color: GLOBALS.COLOR.LIGHTTEXT,
    marginVertical: GLOBALS.STYLES.YMARGIN
  },
  textContainer: {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingVertical:16,
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

export default Login;
