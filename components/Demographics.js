import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import AnimatableButton from './AnimatableButton.js';
import * as Animatable from 'react-native-animatable';

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
  AsyncStorage,
  Keyboard
} from 'react-native';

function Title(props) {
    return (
        <View style={{width: '50%', height: '100%', backgroundColor: props.color, justifyContent: 'center'}}>
            <Text style={styles.titleText}>{props.title}</Text>
        </View>
    );
}

type Props = {};
export default class Demographics extends Component<Props> {
  constructor() {
    super();
    this.createContact = this.createContact.bind(this);
    this.onStart = this.onStart.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.setID = this.setID.bind(this);
    this.navigateOnStart = this.navigateOnStart.bind(this);
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
            "X-Api-Token": GLOBALS.QUALTRICS_API
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
        this.navigateOnStart();
    }
  }

  navigateOnStart() {
    // navigate to Dashboard
    this.props.navigation.navigate('Dash');
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
            "X-Api-Token": GLOBALS.QUALTRICS_API
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
          <Text style={styles.pageTitle}>{this.prompt}</Text>
          <Animatable.View ref="age_view" style={[styles.item, {backgroundColor: GLOBALS.COLOR.LIGHTSCHEME[0]}]} animation="bounceInDown" duration={1500}>
          <Title color={GLOBALS.COLOR.SCHEME[0]} title="Age"/>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            onChangeText={(text)=> this.onAgeChanged(text)}
            onBlur={() => Keyboard.dismiss}
            value={this.state.age}
            maxLength={2}
          />
          </Animatable.View>

          <Animatable.View ref="status_view" style={[styles.item, {backgroundColor: GLOBALS.COLOR.LIGHTSCHEME[1]}]} animation="bounceInLeft" duration={1500}>
          <Title color={GLOBALS.COLOR.SCHEME[1]} title="Marital Status"/>
          <Picker
            style={styles.picker}
            selectedValue= {this.state.maritalStatus}
            onValueChange={(itemValue, itemIndex) => this.setState({maritalStatus: itemValue})}>
            <Picker.Item label="" value=""/>
            <Picker.Item label="Married" value="married" />
            <Picker.Item label="Not married, but in relationship" value="in relationship" />
            <Picker.Item label="Single" value="single" />
          </Picker>
          </Animatable.View>

          <Animatable.View ref="language_view" style={[styles.item, {backgroundColor: GLOBALS.COLOR.LIGHTSCHEME[2]}]} animation="bounceInRight" duration={1500}>
          <Title color={GLOBALS.COLOR.SCHEME[2]} title="Native Language"/>
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
          </Animatable.View>

          <Animatable.View ref="home_view" style={[styles.item, {backgroundColor: GLOBALS.COLOR.LIGHTSCHEME[3]}]} animation="bounceInLeft" duration={1500}>
          <Title color={GLOBALS.COLOR.SCHEME[3]} title="Home Province"/>
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
          </Animatable.View>

          <Animatable.View ref="hostel_view" style={[styles.item, {backgroundColor: GLOBALS.COLOR.LIGHTSCHEME[4]}]} animation="bounceInRight" duration={1500}>
          <Title color={GLOBALS.COLOR.SCHEME[4]} title="Hostel"/>
          <Picker
            style={styles.picker}
            selectedValue= {this.state.hostel}
            onValueChange={(itemValue, itemIndex) => this.setState({hostel: itemValue})}>
            <Picker.Item label="" value=""/>
            <Picker.Item label="Option 1" value="1" />
            <Picker.Item label="Option 2" value="2" />
            <Picker.Item label="Option 3" value="3" />
          </Picker>
          </Animatable.View>

          <Animatable.View ref="button_view" style={styles.buttonContainer} animation="bounceInUp" duration={1500}>
              <Text style={styles.note}>{this.note}{'\n'}</Text>
              <AnimatableButton text="Get Started!" color={GLOBALS.COLOR.TITLETEXT} background={GLOBALS.COLOR.BLUE} onPress={()=> this.onStart()}/>
          </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    textAlign: 'center',
    width: GLOBALS.STYLES.WIDTH,
    fontSize: GLOBALS.FONTSIZE.TITLE,
    marginBottom: 10
  },
  note: {
    textAlign: 'center',
    width: GLOBALS.STYLES.WIDTH,
    fontSize: GLOBALS.FONTSIZE.NOTE
  },
  textInput: {
    width: '60%',
    textAlign:'left'
  },
  picker: {
    width: '50%',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: GLOBALS.FONTSIZE.TEXT,
    padding: 10,
    color: GLOBALS.COLOR.TITLETEXT
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
  },
  item: {
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 }
});
