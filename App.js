import React, { Component } from 'react';
import Demographics from "./components/Demographics.js";
import Settings from "./components/Settings.js";
import GLOBALS from './components/Globals.js';

import {
  StackNavigator,
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


const scopes = ['openid', 'profile', 'email', 'offline_access'];

type State = {
  hasLoggedInOnce: boolean,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string
};

const config = {
  issuer: 'https://{yourOktaDomain}.oktapreview.com/oauth2/default',
  clientId: '{clientId}',
  redirectUrl: 'com.{yourReversedOktaDomain}:/callback',
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'offline_access']
};


type Props = {};
export default class App extends Component<Props> {
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
    const { createAccount } = styles;

    return (
      <View style={styles.container}>
        <Demographics/>
        <Text style={createAccount}>
          Create Account
        </Text>
        <Settings/>
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
    color: 'black',
    fontWeight: 'bold',
  }


});
