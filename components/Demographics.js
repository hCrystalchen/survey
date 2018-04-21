import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Demographics extends Component<Props> {
  constructor() {
    super();
    this.state = {
      note: "The information you have provided will be used for research purpose only and will not be shared.",
      prompt: 'A little bit about yourself...',
      age:'',
      married:'',
      language:'',
      home:'',
      hostel:''
    };
  }

  static navigationOptions = {
    title: 'Demographics',
  }
  // Ensures that only number input can be entered in the age field
  onAgeChanged(text){
      let replacement = '';

      // check each digit of the input
      for (var i=0; i < text.length; i++) {
          // if input is a number
          if(!isNaN(text[i])) {
              // cast number to string
              replacement = replacement + text[i];
          }
          else {
              this.setState({age: ''});
              // alert the user to enter a number only
              alert("Please enter a number in the Age field");
          }
      }
      // update state
      this.setState({ age: replacement});
  }

  // Handles onPress of start button: check if all fields are filled out and create contact on Qualtrics
  onStart() {
//    if (this.state.age == '' || this.state.married == '' || this.state.language == '' || this.state.home == '' || this.state.hostel == '') {
//        alert('Please fill out all fields before proceeding');
//    } else {
        // send demographics info as fields of contact to Qualtrics and create new contact
        this.props.navigation.navigate('Dashboard');
//    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.pageTitle}>{this.state.prompt}{'\n'}{'\n'}</Text>

          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Age</Text>
          </View>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            onChangeText={(text)=> this.onAgeChanged(text)}
            value={this.state.age}
            maxLength={2}
          />
          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Marital Status</Text>
          </View>
          <Picker
            style={styles.picker}
            selectedValue= {this.state.married}
            onValueChange={(itemValue, itemIndex) => this.setState({married: itemValue})}>
            <Picker.Item label="" value=""/>
            <Picker.Item label="Married" value="married" />
            <Picker.Item label="Not married, but in relationship" value="relationship" />
            <Picker.Item label="Single" value="single" />
          </Picker>

          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Native Language</Text>
          </View>
          <Picker
            style={styles.picker}
            selectedValue= {this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="" value=""/>
            <Picker.Item label="Nyanja" value="nyanja" />
            <Picker.Item label="Bemba" value="bemba" />
            <Picker.Item label="English" value="english"/>
            <Picker.Item label="Other" value="other"/>
          </Picker>

          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Home Province</Text>
          </View>
          <Picker
            style={styles.picker}
            selectedValue= {this.state.home}
            onValueChange={(itemValue, itemIndex) => this.setState({home: itemValue})}>
            <Picker.Item label="" value=""/>
            <Picker.Item label="Central" value="central" />
            <Picker.Item label="Copperbelt" value="copperbelt" />
            <Picker.Item label="Eastern" value="eastern"/>
            <Picker.Item label="Luapula" value="luapula"/>
            <Picker.Item label="Lusaka" value="lusaka"/>
            <Picker.Item label="Muchinga" value="muchinga"/>
            <Picker.Item label="North-Western" value="north-western"/>
            <Picker.Item label="Northern" value="northern"/>
            <Picker.Item label="Southern" value="southern"/>
            <Picker.Item label="Western" value="western"/>
          </Picker>


          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Hostel</Text>
          </View>
          <Picker
            style={styles.picker}
            selectedValue= {this.state.hostel}
            onValueChange={(itemValue, itemIndex) => this.setState({hostel: itemValue})}>
            <Picker.Item label="" value=""/>
            <Picker.Item label="Option 1" value="1" />
            <Picker.Item label="Option 2" value="2" />
            <Picker.Item label="Option 3" value="3" />
          </Picker>

          <Text style={styles.note}>{this.state.note}{'\n'}{'\n'}</Text>

          <TouchableOpacity style={styles.button} onPress={()=> this.onStart()}>
              <Text style={styles.buttonText}>Get Started!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    textAlign: 'left',
    width: GLOBALS.STYLES.WIDTH,
    fontSize: GLOBALS.FONTSIZE.TITLE
  },
  note: {
    textAlign: 'left',
    width: GLOBALS.STYLES.WIDTH,
    fontSize: GLOBALS.FONTSIZE.NOTE
  },
  button: {
    width:'80%',
    backgroundColor: GLOBALS.COLOR.BLUE,
    padding: 10,
    borderRadius: GLOBALS.STYLES.CORNER,
    elevation: 3
  },
  buttonText: {
    textAlign: 'center',
    color: GLOBALS.COLOR.TITLETEXT,
    fontSize: GLOBALS.FONTSIZE.BUTTON
  },
  textInput: {
    width: GLOBALS.STYLES.WIDTH,
    textAlign:'center'
  },
  picker: {
    height: 50,
    width: GLOBALS.STYLES.WIDTH,
    justifyContent: 'center'
  },
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
  }
});
