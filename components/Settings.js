import React, { Component } from 'react';
import GLOBALS from './Globals.js';

import {
  Platform,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
  Switch,
  TouchableOpacity,
  AppState,
  AsynStorage
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Settings extends Component<Props> {
  constructor() {
    super();
    this._scheduleNotification = this._scheduleNotification.bind(this);
    this.state = {
      notify: true
    };
  }

    // Schedules weekly notifications if user turns switch on or cancel all notifications if the user turns switch off
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

  // Handles onPress of logout button
  onLogout() {
    // temporary
    // TODO: log user out and make sure back button wouldn't bring user back to settings page
    this.props.navigation.navigate('Login');
  }

  // handles on/off switch for notifications
  async onChangedNotificationSettings(val){
    this.setState({notify: val});
    try {
        await AsyncStorage.setItem('Notify', val);
    } catch(error) {
        console.log(error);
    }
    this._scheduleNotification();
  }

  render() {
    return (
      <View style={styles.page}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Notification Settings</Text>
            </View>
            <View style={styles.container}>
              <Text>Weekly Reminders</Text>
              <Switch
              value={this.state.notify}
              onValueChange={(val) => this.onChangedNotificationSettings(val)}/>
            </View>
            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={()=> this.onLogout()}>
                  <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    width: GLOBALS.STYLES.WIDTH,
    backgroundColor: GLOBALS.COLOR.BLUE,
  },
  titleText: {
    textAlign: 'left',
    fontSize: GLOBALS.FONTSIZE.TEXT,
    padding: 10,
    color: GLOBALS.COLOR.TITLETEXT
  },
  button: {
    width:'100%',
    backgroundColor: GLOBALS.COLOR.BLUE,
    padding: 10,
    borderRadius: GLOBALS.STYLES.CORNER,
    elevation: 3,
    marginTop: '30%'
  },
  buttonText: {
    textAlign: 'center',
    color: GLOBALS.COLOR.TITLETEXT,
    fontSize: GLOBALS.FONTSIZE.BUTTON
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
  },
  container: {
    width: GLOBALS.STYLES.WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
    marginTop: '2%'
  }
});
