import React, { Component } from 'react';
import { 
  StackNavigator,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Platform, 
  WebView 
} from 'react-native';
import _ from 'lodash';
import GLOBALS from './Globals.js';
import Form from 'react-native-form';

// TODO: fix registration form styling

// TODO: securely hide the api token
const api_token = '00ua58H-0ucUvhE79Pv7WwbigKn2ceSiiagG611Q24';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: GLOBALS.COLOR.LIGHTBLUE,
    paddingVertical: '10%',
  },
  formContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    fontSize: GLOBALS.FONTSIZE.TITLE,
    color: GLOBALS.COLOR.TITLETEXT,
    fontWeight: "500",
  },
  demographicButton: {
    marginTop: '20%',
  },
  submitButton: {
    // width: GLOBALS.STYLES.WIDTH,
    backgroundColor: GLOBALS.COLOR.BLUE,
    padding: 10,
    borderRadius: GLOBALS.STYLES.CORNER,
    elevation: 3,
    marginTop: '20%',
  },
  buttonText: {
    textAlign: 'center',
    color: GLOBALS.COLOR.TITLETEXT,
    fontSize: GLOBALS.FONTSIZE.BUTTON,
    fontWeight:'500',
  },
  textInput: {
    fontSize: 16,
    textAlign:'center',
    // width: GLOBALS.STYLES.WIDTH, TODO: fix input width
    borderColor: GLOBALS.COLOR.LIGHTTAN,
  },
  errorText: {
    color: 'red',
    fontSize: GLOBALS.FONTSIZE.TEXT
  },
  text: {
  	color: GLOBALS.COLOR.TEXT,
  	fontSize: GLOBALS.FONTSIZE.TEXT
  },
 });

 type Props = {};

class Register extends Component<Props> {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      hasRegistered: false,
      hasError: false,
      errorMessage: '',
      openWebView: false,
    }
  }

  // Validates an email input according to a regex
  // from: http://form.guide/best-practices/validate-email-address-using-javascript.html
  validateEmail(email) {
    const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    console.log("Email: " + re.test(email));
    return re.test(email);
  }

  // Returns true if the string has a number in it ; false otherwise
  isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str))
  }

  // Validates the first and last name fields by making sure they are:
  // a) both strings
  // b) not numbers
  validateNames(firstName, lastName) {
    if (typeof firstName != "string" || typeof lastName != "string") return false

    if (this.isNumber(firstName) || this.isNumber(lastName)) {
      return false;
    }

    console.log(`firstName: ${firstName} ; is it a number? ${this.isNumber(firstName)}`)
    console.log(`lastName: ${lastName} ; is it a number? ${this.isNumber(lastName)}`)
    return true;
  }

  // Returns true if the form values are all valid
  validateFormValues(formVals) {
    const isFieldEmpty = Object.keys(formVals).some(k => {
      return formVals[k] === "" || formVals[k] === undefined;
    });

    if (isFieldEmpty) {
      this.setState({
        errorMessage: 'Please fill out all fields.',
        hasError: true,
      });
      return false;
    }

    if (!this.validateEmail(formVals.email)) {
      this.setState({
        errorMessage: 'Invalid email: please enter a valid email.',
        hasError: true,
      });
      return false;
    }

    if (!this.validateNames(formVals.firstName, formVals.lastName)) {
      this.setState({
        errorMessage: 'Invalid name: please enter a valid name.',
        hasError: true,
      });
      return false;
    }
    
    return true;
  }

  handleSubmit() {
    // const options = {
    //   url: 'https://dev-764524.oktapreview.com/api/v1/users?activate=true',
    //   method: 'POST',
    //   headers: {
    //     accept: 'application/json',
    //     contentType: 'application/json',
    //     authorization: `SSWS ${api_token}`,
    //   }
    // };

    const formValues = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      login: this.state.email,
    };
    const valid = this.validateFormValues(formValues);
    if (!valid) {
      // Exit out because there are invalid form entries
      return;
    } else {
      this.setState({
        hasRegistered: true,
        hasError: false,
        errorMessage: '',
      });
    }

    // TODO: Secure API token for final product
    // fetch('https://dev-764524.oktapreview.com/api/v1/users?activate=true', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': `SSWS ${api_token}`,
    //   },
    //   body: JSON.stringify({
    //     profile: authBody,
    //   }),
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.setState({
    //     hasRegistered: true,
    //     errorMessage: '',
    //     hasError: false,
    //   });
    //   console.log("User registration response");
    //   console.log(responseJson);
    // })
    // .catch((error) => {
    //   this.setState({
    //     errorMessage: 'There was an error registering your account. Please try again or contact your administrator.',
    //     hasError: true,
    //   });
    //   console.error(error);
    // });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Registration</Text>

        {this.state.hasRegistered 
          ? 
          <View>
            <Text style={styles.registeredText}>Thanks! Check your email for a link to finish 
              creating your account! Please click the button below
              to complete our one-time demographic survey.
              </Text> 
            <Button 
              style={styles.demographicButton}
              title="Demographic Survey"
              onPress={() => this.props.navigation.navigate('Demographics')}
            />
          </View>
          : 
          <View>
            {this.state.hasError && 
            <Text style={styles.errorText}>
              {this.state.errorMessage}
            </Text>}

            <Form ref="form" style={styles.formContainer}>
              <TextInput
                autoCapitalize="words"
                type="TextInput"
                name="firstName"
                style={styles.textInput}
                placeholder="First Name"
                keyboardType='name-phone-pad'
                onChangeText={(firstName) => this.setState({firstName})}
                value={this.state.firstName}
              />
              <TextInput
                autoCapitalize="words"
                type="TextInput"
                name="lastName"
                style={styles.textInput}
                placeholder="Last Name"
                keyboardType='name-phone-pad'
                onChangeText={(lastName) => this.setState({lastName})}
                value={this.state.lastName}
              />
              <TextInput
                type="TextInput"
                name="email"
                style={styles.textInput}
                placeholder="Email"
                keyboardType='email-address'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <TouchableOpacity style={styles.submitButton} onPress={() => this.handleSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </Form>
          </View>
        }
      </View>
    );
  }
}

export default Register;