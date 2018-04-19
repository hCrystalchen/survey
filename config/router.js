import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Settings from 'survey/components/Settings';
import Demographics from 'survey/components/Demographics';
import Login from 'survey/components/Login';

// This file contains all of the routes/screen configurations for our app.
export const Root = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Sexual Health Survey App - Login',
    },
  },

  Settings: {
    screen: Settings,
  },

  Demographics: {
    screen: Demographics,
  }
  
});
// }, 
// {
//   mode: 'modal',
//   headerMode: 'none',
// }