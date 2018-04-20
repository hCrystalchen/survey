import React, { Component } from 'react';
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
              <Text>Dark/Light App Theme</Text>
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
    backgroundColor: '#5d99c6',
  },
  titleText: {
    textAlign: 'left',
    fontSize: 16,
    padding: 10,
    color: 'white'
  },
  button: {
    width:'100%',
    backgroundColor: '#5d99c6',
    padding: 10,
    borderRadius: 15,
    elevation: 3,
    marginTop: '30%'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90caf9',
  },
  container: {
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#90caf9',
    marginTop: '2%'
  }
});

