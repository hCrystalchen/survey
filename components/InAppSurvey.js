import React, { Component } from 'react';


import { WebView } from 'react-native';
import com.amazonaws.mobileconnectors.dynamodbv2.dynamodbmapper.DynamoDBMapper;

export default class InAppSurvey extends Component {
  constructor() {
    super();
  }



  render() {
    return (
      <WebView
        source={{uri: 'https://google.com'}}
        style={{height: '80%'}}
        domStorageEnabled={true}
        scalesPageToFit={true}              
      />
    );
  }
}