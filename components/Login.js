import React, { Component } from 'react';
import GLOBALS from 'survey/components/Globals.js';
import { authorize } from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Form, Heading } from '../components';
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
  refreshToken: ?string
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


export default class App extends Component<{}, State> {
  state = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: ''
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
          refreshToken: authState.refreshToken
        },
        500
      );
      this.props.navigation.navigate('Demographics');

    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };

  refresh = async () => {
    try {
      const authState = await refresh(config, {
        refreshToken: this.state.refreshToken
      });

      this.animateState({
        accessToken: authState.accessToken || this.state.accessToken,
        accessTokenExpirationDate:
          authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
        refreshToken: authState.refreshToken || this.state.refreshToken
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
      this.animateState({
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
      });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  };

  onSignup() {
    this.props.navigation.navigate('Register');
  }

  render() {
    const { state } = this;
    return (
      <Page>
        {!!state.accessToken ? (
          <Form>
            <Form.Label>accessToken</Form.Label>
            <Form.Value>{state.accessToken}</Form.Value>
          </Form>
        ) : (
          <Heading><Image
          source={require('../assets/logo.png')}
          style={{width: 375, height: 375, }}
        /></Heading>
        )}





    <ButtonContainer>
    {!state.accessToken && (
            <AnimatableButton text="Log In" color={GLOBALS.COLOR.TITLETEXT} background={GLOBALS.COLOR.BLUE} onPress={this.authorize}/>
          )}
    <AnimatableButton text="Sign Up" color={GLOBALS.COLOR.TITLETEXT} background={GLOBALS.COLOR.BLUE} onPress={()=> this.onSignup()}/>

      
    </ButtonContainer>

    </Page>
    );
  }
}



