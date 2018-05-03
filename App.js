import React, { Component } from 'react';
import { Root } from 'survey/config/router';
import Push from './components/Push.js';
import PushNotification from 'react-native-push-notification';
import {AppState, View, AsyncStorage} from 'react-native';
import {scheduleNotification, setNotify} from 'survey/components/Helpers.js';
import Amplify from 'aws-amplify';
import aws_exports from './survey/aws-exports';
import Amplify, { API } from 'aws-amplify';


class App extends Component {
  constructor() {
    super();
    PushNotification.cancelAllLocalNotifications();
    setNotify();
    scheduleNotification();
    Amplify.configure(aws_exports);
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