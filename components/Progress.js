import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Reward from './Reward.js';


import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

type Props = {};
export default class Progress extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      points: this.props.points,
      progress: (this.props.points % 5) * 20
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
        this.setState({
            points: nextProps.points,
            progress: (nextProps.points % 5) *20
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
            size={GLOBALS.STYLES.SCREENWIDTH * 0.8}
            width={GLOBALS.STYLES.SCREENWIDTH / 7}
            fill={this.state.progress}
            tintColor={GLOBALS.COLOR.GREEN}
            rotation={180}
            backgroundColor={GLOBALS.COLOR.PALEBLUE}>
                {
                    (fill) => (
                        <Reward points={this.state.points} onPress={() => alert("PRESSED!")} />
                    )
                }
        </AnimatedCircularProgress>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
