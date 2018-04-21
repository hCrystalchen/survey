import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class Push extends Component<Props> {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    PushNotification.configure({
        onNotification: function(notification) {
            console.log('NOTIFICATION', notification);
        },
    });
  }
  render() {
    return null;
  }
}

