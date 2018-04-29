import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import PushNotification from 'react-native-push-notification';
import {scheduleNotification} from './Helpers.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Platform,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
  Switch,
  TouchableOpacity,
  AppState,
  AsyncStorage
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Settings extends Component<Props> {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="gear" color={tintColor} size={26}/>
    ),
  };

  constructor() {
    super();
    this.getNotificationsSettings = this.getNotificationsSettings.bind(this);
    this.state = {
      notify: true
    };
    this.getNotificationsSettings();
  }

  // Get Notify value from AsyncStorage to set value of switch appropriately (persistence)
  async getNotificationsSettings() {
    try {
        const value = await AsyncStorage.getItem('Notify');
        if (value === 'true') {
            this.setState({notify: true});
        } else {
            this.setState({notify: false});
        }
    } catch(error) {
        console.log(error);
    }
  }

  // Handles onPress of logout button
  async onLogout() {
    // temporary
    // TODO: log user out and make sure back button wouldn't bring user back to settings page
    await AsyncStorage.removeItem('UserID');
    this.props.navigation.navigate('Login');
  }

  // handles on/off switch for notifications
  async onChangedNotificationSettings(val){
    this.setState({notify: val});
    try {
        await AsyncStorage.setItem('Notify', val.toString(), scheduleNotification);
    } catch(error) {
        console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.page}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Notification Settings</Text>
            </View>
            <View style={styles.container}>
              <Text style={{color: GLOBALS.COLOR.TEXT}}>Weekly Reminders</Text>
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
    borderRadius: GLOBALS.STYLES.CORNER,
    backgroundColor: GLOBALS.COLOR.SCHEME[2],
  },
  titleText: {
    textAlign: 'center',
    fontSize: GLOBALS.FONTSIZE.TEXT,
    padding: 10,
    color: GLOBALS.COLOR.TITLETEXT
  },
  button: {
    width:'100%',
    backgroundColor: GLOBALS.COLOR.SCHEME[0],
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
