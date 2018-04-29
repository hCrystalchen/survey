import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Progress from './Progress.js';

import {
  Platform,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
  Switch,
  TouchableOpacity,
  Image
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
      <Icon name="user" color={tintColor} size={26}/>
    ),
  };

  constructor() {
    super();
    this.state = {
    };
  }

  onTakeSurvey(){
    this.props.navigation.navigate('InAppSurvey');
  }

  render() {
    return (
      <View style={styles.page}>
            <Progress points={47}/>
            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={()=> this.onTakeSurvey()}>
                  <Text style={styles.buttonText}>Take Survey</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=> this.onTakeSurvey()}>
                  <Text style={styles.buttonText}>Take Survey</Text>
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
  },
  textContainer: {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingVertical: GLOBALS.FONTSIZE.TEXT,
    flexDirection:'row'
  },
});
