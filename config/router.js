import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Settings from 'survey/components/Settings';
import Demographics from 'survey/components/Demographics';
import Login from 'survey/components/Login';
import Register from 'survey/components/Register';
import Dashboard from 'survey/components/Dashboard';
import InAppSurvey from 'survey/components/InAppSurvey';

import GLOBALS from '../components/Globals.js';

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

  Dash: {
    screen: TabNavigator({
        Dashboard: {screen: Dashboard},
        Settings: {screen: Settings},
    },
      {
        tabBarOptions: {
          activeTintColor: GLOBALS.STYLES.TITLETEXT,
          inactiveTintColor: GLOBALS.COLOR.TRANSPARENTWHITE,
          indicatorStyle: {
            backgroundColor: GLOBALS.COLOR.LIGHTBLUE
          },
          showIcon: true,
          showLabel: false,
          style: {
            backgroundColor: GLOBALS.COLOR.TAB

          },

        },
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
      }),
  },

  InAppSurvey: {
    screen: InAppSurvey,
    navigationOptions: {
      title: 'Survey of the Week',
    },
  }
}, {
    headerMode:'none',
    navigationOptions: {
        headerVisible: false,
    }
});
// },
// {
//   mode: 'modal',
//   headerMode: 'none',
// }