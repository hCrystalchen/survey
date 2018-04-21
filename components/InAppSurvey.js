import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class InAppSurvey extends Component {
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