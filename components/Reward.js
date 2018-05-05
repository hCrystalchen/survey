import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
  Platform,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  AppState,
  AsyncStorage,
  Image
} from 'react-native';

  function RewardIcon(props) {
    let p = props.points;
    let handler = props.onPress;
    if (p <= 25) {
        let heartPoints = p;
        return <IconHelper name="heart" style={styles.heart} points={heartPoints} onPress={handler}/>;
    } else if (p <= 50) {
        let starPoints = p - 25;
        return <IconHelper name="star" style={styles.star} points={starPoints} onPress={handler}/>;
    } else if (p <= 65) {
        let bronzePoints = p - 50;
        return <IconHelper name="trophy" style={styles.bronze} points={bronzePoints} onPress={handler}/>;
    } else if (p <= 80) {
        let silverPoints = p - 65;
        return <IconHelper name="trophy" style={styles.silver} points={silverPoints} onPress={handler}/>;
    } else if (p <= 100) {
        let goldPoints = p - 80;
        return <IconHelper name="trophy" style={styles.gold} points={goldPoints} onPress={handler}/>;
    } else if (p <= 149) {
        let diamondPoints = p - 100;
        return <IconHelper name="diamond" style={styles.diamond} points={diamondPoints} onPress={handler}/>;
    } else if (p <= 599){
        let diamondPoints = p - 100;
        return <IconHelper name="diamond" style={styles.smallDiamond} points={diamondPoints} onPress={handler}/>;
    } else {
        let diamondPoints = p - 100;
        return <IconHelper name="diamond" style={styles.tinyDiamond} points={diamondPoints} onPress={handler}/>;
    }
  }

  function IconHelper(props) {
    let points = props.points;
    let handler = props.onPress;
    let style = props.style;
    let name = props.name;
    let p = Math.floor(points / 5);
    if (p > 0) {
        return <Icon name={name} onPress={handler} style={style}>{p}</Icon>;
    } else {
        return (
            <Icon name={name} onPress={handler} style={style}></Icon>
        );
    }
  }

  function Beginning(props) {
    return (
        <Image
            width = {200}
            height = {200}
            source={{uri: 'logo'}}
            style={{width: 200, height: 200,}}
            onPress={props.onPress}
        />
    );
  }

type Props = {};
export default class Reward extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      points: this.props.points,
      onPress: this.props.onPress
    };
  }

  render() {
    return <RewardIcon points={this.state.points} onPress={this.state.onPress}/>;
  }
}

const styles = StyleSheet.create({
  star: {
    color: GLOBALS.COLOR.YELLOW,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 3.5
  },
  heart: {
    color: GLOBALS.COLOR.ROSE,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 3.5
  },
  gold: {
    color: GLOBALS.COLOR.GOLD,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 3.5
  },
  silver: {
    color: GLOBALS.COLOR.SILVER,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 3.5
  },
  bronze: {
    color: GLOBALS.COLOR.BRONZE,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 3.5
  },
  diamond: {
    color: GLOBALS.COLOR.CRYSTAL,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 4
  },
  smallDiamond: {
    color: GLOBALS.COLOR.CRYSTAL,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 5
  },
  tinyDiamond: {
    color: GLOBALS.COLOR.CRYSTAL,
    fontSize: GLOBALS.STYLES.SCREENWIDTH / 6
  }
});
