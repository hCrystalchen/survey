import React, { Component } from 'react';
import { Root } from 'survey/config/router';
import Push from './components/Push.js';
import PushNotification from 'react-native-push-notification';
import {AppState, View, AsyncStorage} from 'react-native';
import {scheduleNotification, setNotify} from 'survey/components/Helpers.js';


class App extends Component {
  constructor() {
    super();
    PushNotification.cancelAllLocalNotifications();
    setNotify();
    scheduleNotification();
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