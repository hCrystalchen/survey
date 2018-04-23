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
  TouchableOpacity,
  AsyncStorage
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
    this.createContact = this.createContact.bind(this);
    this.onStart = this.onStart.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.setID = this.setID.bind(this);
    this.state = {
      age:'',
      maritalStatus:'',
      language:'',
      homeProvince:'',
      hostel:''
    };
    this.note = "The information you have provided will be used for research purpose only and will not be shared.";
    this.prompt = 'A little bit about yourself...';
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

  // Stores userID of current user, if id not null but tries to submit demographic questions again,
  // remove previous contact and create new contact with the updated info
  async setID(data) {
    var id = data.result.id;
    try {
        const value = await AsyncStorage.getItem('UserID', (error, result) => {
            if (result !== null) {
                  this.deleteContact(result);
            }
        });
        await AsyncStorage.setItem('UserID', id);
    } catch(error) {
        console.log("Error setting id data" + error.message);
    }
  }

  // Remove contact by id (using Qualtrics' API)
  deleteContact(id) {
    let url = "https://brown.co1.qualtrics.com/API/v3/mailinglists/ML_2ujejm2mcElgSkB/contacts/" + id;
    fetch(url, {
        method: "DELETE",
        headers: {
            "X-Api-Token": "QdrsdTFfn7YgW7pIs5qAs4M4O4cN4hzDwM0h8FeL"
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch(delete contact) operation:' + error.message);
    });
  }

  // Handles onPress of start button: check if all fields are filled out and create contact on Qualtrics
  onStart() {
    if (this.state.age == '' || this.state.maritalStatus == '' || this.state.language == '' || this.state.homeProvince == '' || this.state.hostel == '') {
        alert('Please fill out all fields before proceeding');
    } else {
        this.createContact();
        // navigate to Dashboard
        this.props.navigation.navigate('Dash');
    }
  }

  // Create contact with appropriate demographics info on Qualtrics
  createContact() {
    // send demographics info as fields of contact to Qualtrics and create new contact
    let data = JSON.stringify({embeddedData: this.state});
    // temporarily hardcoded token, should secure in final product
    fetch("https://brown.co1.qualtrics.com/API/v3/mailinglists/ML_2ujejm2mcElgSkB/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Token": "QdrsdTFfn7YgW7pIs5qAs4M4O4cN4hzDwM0h8FeL"
        },
        body: data
    }).then(function(response) {
        return response.json();
    }).then((data) => this.setID(data)).catch(function(error) {
        console.log('There has been a problem with your fetch(create contact) operation: ' + error.message);
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.pageTitle}>{this.prompt}{'\n'}{'\n'}</Text>

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
            selectedValue= {this.state.maritalStatus}
            onValueChange={(itemValue, itemIndex) => this.setState({maritalStatus: itemValue})}>
            <Picker.Item label="" value=""/>
            <Picker.Item label="Married" value="married" />
            <Picker.Item label="Not married, but in relationship" value="in relationship" />
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
            selectedValue= {this.state.homeProvince}
            onValueChange={(itemValue, itemIndex) => this.setState({homeProvince: itemValue})}>
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

          <Text style={styles.note}>{this.note}{'\n'}{'\n'}</Text>

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
