import React, { Component } from 'react';


import { WebView } from 'react-native';

export default class InAppSurvey extends Component {
  constructor() {
    super();
  }



  render() {
    return (
      <WebView
        source={{uri: 'https://brown.co1.qualtrics.com/jfe/form/SV_cu9ppqo1mckUqSF'}}
        style={{height: '80%'}}
        domStorageEnabled={true}
        scalesPageToFit={true}              
      />
    );
  }
}