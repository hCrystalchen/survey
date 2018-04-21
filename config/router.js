import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Settings from 'survey/components/Settings';
import Demographics from 'survey/components/Demographics';
import Login from 'survey/components/Login';
import Register from 'survey/components/Register';
import Dashboard from 'survey/components/Dashboard';
import InAppSurvey from 'survey/components/InAppSurvey';


// This file contains all of the routes/screen configurations for our app.
export const Root = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Sexual Health Survey App - Login',
    },
  },

  Register: {
    navigationOptions: {
      title: 'User Registration',
    },
    screen: Register,
  },

  Settings: {
    screen: Settings,
  },

  Demographics: {
    screen: Demographics,
  },

  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: 'Demographics',
    },
  },

  InAppSurvey: {
    screen: InAppSurvey,
    navigationOptions: {
      title: 'Survey of the Week',
    },
  }
});
// }, 
// {
//   mode: 'modal',
//   headerMode: 'none',
// }