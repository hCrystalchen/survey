import React, { Component } from 'react';
<<<<<<< HEAD
//import Demographics from "./components/Demographics.js";
import { Settings } from "./components/Settings.js";
import { UIManager, LayoutAnimation } from 'react-native';
import AppAuth from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Form, Heading } from './components';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


import {
  StackNavigator,
  View,
  Platform,
  StyleSheet
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const scopes = ['openid', 'profile', 'email', 'offline_access'];


type Props = {};

type State = {
  hasLoggedInOnce: boolean,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string
 };

// export default class App extends Component<Props> {
//   constructor() {
//     super();
//     this.state = {
//     };
//   }
export default class App extends Component<{}, State> {
  auth = new AppAuth({
    issuer: 'https://dev-764524.oktapreview.com/oauth2/default',
    clientId: '0oaep21929h1GUvKC0h7',
    redirectUrl: 'com.oktapreview.dev-764524:/callback'
  });
 
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
      const authState = await this.auth.authorize(scopes);
      this.animateState(
        {
          hasLoggedInOnce: true,
          accessToken: authState.accessToken,
          accessTokenExpirationDate: authState.accessTokenExpirationDate,
          refreshToken: authState.refreshToken
        },
        500
      );
    } catch (error) {
      console.error(error);
    }
  };
 
  refresh = async () => {
    try {
      const authState = await this.auth.refresh(this.state.refreshToken, scopes);
      this.animateState({
        accessToken: authState.accessToken || this.state.accessToken,
        accessTokenExpirationDate:
        authState.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
        refreshToken: authState.refreshToken || this.state.refreshToken
      });
    } catch (error) {
      console.error(error);
    }
  };
 
  revoke = async () => {
    try {
      await this.auth.revokeToken(this.state.accessToken);
      this.animateState({
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
      });
    } catch (error) {
      console.error(error);
    }
  };
 
  render() {
    const {state} = this;
    return (
      <Page>
        {!!state.accessToken ? (
          <Form>
            <Form.Label>accessToken</Form.Label>
            <Form.Value>{state.accessToken}</Form.Value>
            <Form.Label>accessTokenExpirationDate</Form.Label>
            <Form.Value>{state.accessTokenExpirationDate}</Form.Value>
            <Form.Label>refreshToken</Form.Label>
            <Form.Value>{state.refreshToken}</Form.Value>
          </Form>
        ) : (
          <Heading>{state.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>
        )}
 
        <ButtonContainer>
          {!state.accessToken && (
            <Button onPress={this.authorize} text="Authorize" color="#017CC0"/>
          )}
          {!!state.refreshToken && <Button onPress={this.refresh} text="Refresh" color="#24C2CB"/>}
          {!!state.accessToken && <Button onPress={this.revoke} text="Revoke" color="#EF525B"/>}
        </ButtonContainer>
      </Page>
    );
  } 
}

//   render() {
//     return (
//       <View style={styles.container}>
//         <Settings/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#90caf9',
//   }
// });
=======
import { Root } from 'survey/config/router';

class App extends Component {
  render() {
    return <Root />;
  }
}

export default App;
>>>>>>> 229d844e3538047db85cb25d033388bf63fd2958
