import React, { Component } from 'react';
import Demographics from "survey/components/Demographics.js";
import Settings from "survey/components/Settings.js";
import GLOBALS from 'survey/components/Globals.js';
import { authorize } from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Form, Heading } from '../components';
import { Buffer } from 'buffer';

import {
  StackNavigator,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  WebView,
  Image,
  Alert,
  UIManager, 
  LayoutAnimation
} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


type State = {
  hasLoggedInOnce: boolean,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string,
  idToken: ?string
};

const config = {
  issuer: 'https://dev-764524.oktapreview.com/oauth2/default',
  clientId: '0oaep21929h1GUvKC0h7',
  redirectUrl: 'com.oktapreview.dev-764524:/callback',
  scopes: ['openid', 'profile', 'email', 'offline_access']
};

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
  	color: GLOBALS.COLOR.RED,
  	fontSize: GLOBALS.FONTSIZE.TEXT,
  	fontWeight:'500'
  }
});


export default class App extends Component<{}, State> {
  state = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    idToken: ''
  };

  animateState(nextState: $Shape<State>, delay: number = 0) {
    setTimeout(() => {
      this.setState(() => {
        LayoutAnimation.easeInEaseOut();
        return nextState;
      });
    }, delay);
  }

  authorize = async () => {
    try {
      const authState = await authorize(config);

      this.animateState(
        {
          hasLoggedInOnce: false,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken,
          idToken: authState.idToken
        },
        500
      );
      // this.props.navigation.navigate('Demographics');

    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };

  onSignup() {
    this.props.navigation.navigate('Register');
  }

  render() {
    const { state } = this;
    if (state.idToken) {
      const jwtBody = state.idToken.split('.')[1];
      const base64 = jwtBody.replace('-', '+').replace('_', '/');
      const decodedJwt = Buffer.from(base64, 'base64');
      state.idTokenJSON = JSON.parse(decodedJwt);
    }
    return (
      <Page>
        {!!state.accessToken && (
          <Form>
            <Form.Label>Welcome to the Health Application</Form.Label>
            <Form.Value>{JSON.stringify(state.idTokenJSON)}</Form.Value>
          </Form>
        )}


    <ButtonContainer>
    {!state.accessToken && (
      <Button onPress={this.authorize} text="Log In" color="#5a96ce" />
    )}
    </ButtonContainer>

    {!state.accessToken && (
      <View style={styles.textContainer}>
			<Text style={styles.text}>Do not have an account?</Text>
			<TouchableOpacity onPress={()=> this.onSignup()}>
			    <Text style={styles.textButton}> Sign up</Text>
		    </TouchableOpacity>
		  </View>
    )}
    

    </Page>
    );
  }
}



