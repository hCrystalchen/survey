import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Progress from './Progress.js';
import AnimatableButton from './AnimatableButton.js';


import {
  Platform,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
  Switch,
  TouchableOpacity,
  Image,
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
    this.parseResponseHistory = this.parseResponseHistory.bind(this);
    this.getResponseHistory = this.getResponseHistory.bind(this);
    this.state = {
        num_response: 0,
    };
  }

  componentWillMount() {
    this.getResponseHistory();
  }


  onTakeSurvey(){
    this.props.navigation.navigate('InAppSurvey');
  }

  // Create number of responses of contact on Qualtrics
  getResponseHistory() {
    // user for testing, should be actual contact id of the user logged in
    let user = 'MLRP_06P9eebOcO4kyA5';
    let mailinglist = 'ML_2ujejm2mcElgSkB';
    // temporarily hardcoded token, should secure in final product
    fetch("https://brown.co1.qualtrics.com/API/v3/mailinglists/ML_2ujejm2mcElgSkB/contacts/" + user, {
        method: "GET",
        headers: {
            "X-Api-Token": GLOBALS.QUALTRICS_API
        }
    }).then(function(response) {
        return response.json();
    }).then((data) => this.parseResponseHistory(data)).catch(function(error) {
        console.log('There has been a problem with your fetch(create contact) operation: ' + error.message);
    });
  }

  parseResponseHistory(data) {
    var responseNum = data.result.responseHistory.length;
    this.setState({num_response: responseNum});
  }

  render() {
    const { params } = this.props.navigation.state;
    const userID = params ? params.userID : null;
    return (
      <View style={styles.page}>
            <Progress points={this.state.num_response}/>
            <AnimatableButton text="Take Survey" color={GLOBALS.COLOR.TITLETEXT} background={GLOBALS.COLOR.BLUE} onPress={()=> this.onTakeSurvey()}/>
	  </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
  }
});
