import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class Login extends Component<Props> {
  constructor() {
    super();
    this.state = {
        Note:"The information you have provided will be used for research purpose only and will not be shared.",
        Prompt:'A little bit about yourself...',
        Age:'',
        Married:'',
        Language:'',
        Home:'',
        Hostel:''
    };
  }

  static navigationOptions = {
    title: 'Welcome',
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
              this.setState({Age: ''});
              // alert the user to enter a number only
              alert("Please enter a number in the Age field");
          }
      }
      // update state
      this.setState({ Age: replacement});
  }

  // Handles onPress of start button: check if all fields are filled out and create contact on Qualtrics
  onStart() {
    if (this.state.Age == '' || this.state.Married == '' || this.state.Language == '' || this.state.Home == '' || this.state.Hostel == '') {
        alert('Please fill out all fields before proceeding');
    } else {
        // send Login info as fields of contact to Qualtrics and create new contact
    }
  }
  render() {
//    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{this.state.Prompt}{'\n'}{'\n'}</Text>

        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Age</Text>
        </View>
        <TextInput
           style={styles.textInput}
           keyboardType='numeric'
           onChangeText={(text)=> this.onAgeChanged(text)}
           value={this.state.Age}
           maxLength={2}
        />
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Marital Status</Text>
        </View>
        <Picker
          style={styles.picker}
          selectedValue= {this.state.Married}
          onValueChange={(itemValue, itemIndex) => this.setState({Married: itemValue})}>
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
          selectedValue= {this.state.Language}
          onValueChange={(itemValue, itemIndex) => this.setState({Language: itemValue})}>
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
          selectedValue= {this.state.Home}
          onValueChange={(itemValue, itemIndex) => this.setState({Home: itemValue})}>
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
          selectedValue= {this.state.Hostel}
          onValueChange={(itemValue, itemIndex) => this.setState({Hostel: itemValue})}>
          <Picker.Item label="" value=""/>
          <Picker.Item label="Option 1" value="1" />
          <Picker.Item label="Option 2" value="2" />
          <Picker.Item label="Option 3" value="3" />
        </Picker>

        <Text style={styles.note}>{this.state.Note}{'\n'}{'\n'}</Text>

        <TouchableOpacity style={styles.button} onPress={()=> this.onStart()}>
            <Text style={styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    textAlign: 'left',
    width: '80%',
    fontSize: 20
  },
  note: {
    textAlign: 'left',
    width: '80%',
    fontSize: 14
  },
  button: {
    width:'80%',
    backgroundColor: '#5d99c6',
    padding: 10,
    borderRadius: 15,
    elevation: 3
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  textInput: {
    width: '80%',
    textAlign:'center'
  },
  picker: {
    height: 50,
    width: '80%',
    justifyContent: 'center'
  },
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90caf9',
  }
});
