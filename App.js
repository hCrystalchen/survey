import React, { Component } from 'react';
import { Root } from 'survey/config/router';
import Push from './components/Push.js';
import PushNotification from 'react-native-push-notification';
import {AppState, View} from 'react-native';

class App extends Component {
  constructor() {
    super();
    this._scheduleNotification();
  }

  _scheduleNotification = async() => {
    try{
        const value = await AsyncStorage.getItem('Notify');
        if(value !== null) {
            if (value) {
                PushNotification.localNotificationSchedule({
                    message: "Reminder to take survey", // (required)
                    repeatType: 'week', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`.
                    date: new Date(Date.now() + (604800 * 1000)) // in 60 secs
                });
            } else {
                PushNotification.cancelAllLocalNotifications();
            }
        }
    } catch(error) {
        console.log(error)
    }
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