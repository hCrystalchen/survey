import React, { Component } from 'react';
import GLOBALS from './Globals.js';

import {
  Platform,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
  Switch,
  TouchableOpacity
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
    this.state = {
        Notify:true,
        Theme:true
    };
  }
  // Handles onPress of logout button
  onLogout() {

  }

  onChangedNotificationSettings(val){
    this.setState({Notify: val});
  }

  onChangedThemeSettings(val){
    this.setState({Theme: val});
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
              value={this.state.Notify}
              onValueChange={(val) => this.onChangedNotificationSettings(val)}/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Theme Settings</Text>
            </View>
            <View style={styles.container}>
              <Text>Light Theme</Text>
              <Switch
              value={this.state.Theme}
              onValueChange={(val) => this.onChangedThemeSettings(val)}/>
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
    width: '80%',
    backgroundColor: GLOBALS.COLOR.BLUE,
  },
  titleText: {
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    color: GLOBALS.COLOR.TITLETEXT
  },
  button: {
    width:'100%',
    backgroundColor: GLOBALS.COLOR.BLUE,
    padding: 10,
    borderRadius: 15,
    elevation: 3,
    marginTop: '30%'
  },
  buttonText: {
    textAlign: 'center',
    color: GLOBALS.COLOR.TITLETEXT,
    fontSize: 18
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
  },
  container: {
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
    marginTop: '2%'
  }
});
