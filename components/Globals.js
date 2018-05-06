import React from 'react';

import {
  Dimensions
} from 'react-native';

export default {
  // TODO: secure token
  QUALTRICS_API: "QdrsdTFfn7YgW7pIs5qAs4M4O4cN4hzDwM0h8FeL",
  BASE_URL: 'http://someurl.com',
  COLOR: {
    LIGHTBLUE: '#BFE2FF',
    PALEBLUE: '#eeffff',
    BLUE: '#5a96ce',
    GREEN: '#52c7b8',
    RED:'#db4c5f',
    CRYSTAL: '#74d1e0',
    ROSE: '#f48fb1',
    YELLOW: '#fff570',
    PALEGOLD: '#fff4af',
    GOLD: '#fcde1e',
    SILVER: '#C0C0C0',
    BRONZE: '#cd7f32',
    TITLETEXT: 'white',
    TRANSPARENTWHITE: 'rgba(255, 255, 255, 0.5)',
    TRANSPARENT: 'rgba(0, 0, 0, 0)',
    TEXT: 'grey',
    LIGHTTEXT: '#b3b3b3',
    LIGHTTAN: '#FFE38C',
    TAB: '#78A9D6',
    SCHEME: ['#91C0E2', '#CFBAE1','#C59FC9','#96CAE3','#83BBEF'],
    LIGHTSCHEME: ['#b3d0e5', '#d6c7e2','#c6abc9','#a6cbdd','#9bc8f2']
  },
  STYLES: {
    CORNER: 35,
    YMARGIN: '2%',
    BUTTONWIDTH: '50%',
    WIDTH: '90%',
    FULL: '100%',
    SCREENWIDTH: Dimensions.get('window').width,
    SCREENHEIGHT: Dimensions.get('window').height
  },
  FONTSIZE: {
    TEXT: 16,
    BUTTON: 18,
    TITLE: 20,
    NOTE: 10
  }

};
