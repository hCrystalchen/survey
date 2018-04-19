import React, { Component } from 'react';
import Demographics from "survey/components/Demographics.js";
import Settings from "survey/components/Settings.js";
import GLOBALS from 'survey/components/Globals.js';

import {
  StackNavigator,
  View,
  Button,
  Text,
  Platform,
  StyleSheet
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

const Register = () => {

}


type Props = {};
class Login extends Component<Props> {
  constructor() {
    super();
    this.state = {
      hasLoggedInOnce: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: ''
    };
  }

  render() {
    const { accessToken, accessTokenExpirationDate} = this.state;
    const { container, createAccount } = styles;

    return (
      <View style={container}>
        {/* <Demographics/> */}

        <Button 
          style={createAccount}
          onPress={() => {
            this.props.navigation.navigate('Register');
            this.authorize
          }} 
          title="Create Account"
          // text="Create Account" 
          color="#017CC0"
        />
        {/* <Settings/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
    alignItems: 'center',
    backgroundColor: '#90caf9',
  },

  createAccount: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Login;
