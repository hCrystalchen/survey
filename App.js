import React, { Component } from 'react';
import { Root } from 'survey/config/router';
import Push from './components/Push.js';
import PushNotification from 'react-native-push-notification';
import {AppState, View, AsyncStorage} from 'react-native';
import {scheduleNotification, setNotify} from 'survey/components/Helpers.js';
<<<<<<< HEAD
import aws_exports from 'survey/aws-exports';
=======
>>>>>>> c6b31edb9886e8c728e7bf61e9e53fdba4ded714
import Amplify, { API } from 'aws-amplify';


class App extends Component {
  constructor() {
    super();
    PushNotification.cancelAllLocalNotifications();
    setNotify();
    scheduleNotification();
//    Amplify.configure(aws_exports);
  }

  render() {
    return(
    <View style={{height: '100%', width:'100%'}}>
        <Root />
        <Push />
    </View>
    );
  }
}

export default App;