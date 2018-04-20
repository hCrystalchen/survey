import React, { Component } from 'react';
import _ from 'lodash';

import GLOBALS from './Globals.js';

import Form from 'react-native-form';

import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';

const api_token = '00fwbLe1SsNBaKe09eHSMGiH-KQLbIMrGdLHBFwAMF';
const peter_test_url = 'https://dev-681865.oktapreview.com/api/v1/users?activate=true';

type Props = {};

export default class Register extends Component<Props> {
  constructor() {
    super();

    this.state = {
      hasRegistered: false,
    }
  }
  

  /* TODO (Peter): 
   * 1. Setup form properly for user to submit email address
   * 2. Upon user submission, send a curl request like this:
   *  curl -v -X POST \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -H "Authorization: SSWS ${api_token}" \
      -d '{
        "profile": {
          "firstName": "Isaac",
          "lastName": "Brock",
          "email": "isaac.brock@example.com",
          "login": "isaac.brock@example.com",
          "mobilePhone": "555-415-1337"
        }
      }' "https://{yourOktaDomain}.com/api/v1/users?activate=true"
    *   
   */

  handleSubmit() {
    const options = {
      // TODO: get rid of peter test url
      url: peter_test_url || 'https://dev-764524.oktapreview.com/api/v1/users?activate=true',
      method: 'POST',
      headers: {
        accept: 'application/json',
        contentType: 'application/json',
        authorization: `SSWS ${api_token}`,
      }
    };

    const formValues = this.refs.form.getValues();
    const authBody = _.clone(formValues);
    authBody.login = authBody.email;

    fetch(peter_test_url || 'https://dev-764524.oktapreview.com/api/v1/users?activate=true', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `SSWS ${api_token}`,
      },
      body: JSON.stringify({
        profile: authBody,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        hasRegistered: true,
      });
      console.log("User has registered: response");
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  render() {
    return (
      <View style={styles.page}>
      {this.state.hasRegistered 
      ? <View style={styles.registeredText}>
          <Text>Thanks! Check your email for a link to finish 
            creating your account! Please click the button below
            to complete the one-time demographic survey.
            </Text> 
          <Button 
            title="Demographic Survey"
            onPress={() => this.props.navigation.navigate('Demographics')}
          />
        </View>
      : <Form ref="form">
          <TextInput
            type="TextInput"
            name="firstName"
            width='80%'
            style={styles.textInput}
            placeholder="First Name"
            keyboardType='string'
          />
          <TextInput
            type="TextInput"
            name="lastName"
            width='80%'
            style={styles.textInput}
            placeholder="Last Name"
            keyboardType='string'
          />
          <TextInput
            type="TextInput"
            name="email"
            width='80%'
            style={styles.textInput}
            placeholder="Email"
            keyboardType='email-address'
          />
          <Button 
            title="Submit"
            onPress={() => {
              console.log("pressed submit");
              this.handleSubmit();
            }}
          />
        </Form> 
      }
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
  },
  textInput: {
    fontSize: 16,
    textAlign:'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: GLOBALS.COLOR.LIGHTTAN,
  },
  mainText: {
    fontSize: 24,
    textAlign:'center',
  }
});
