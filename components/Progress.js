import React, { Component } from 'react';
import GLOBALS from './Globals.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Reward from './Reward.js';


import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

type Props = {};
export default class Progress extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      points: this.props.points
    };
  }

  render() {
    let progress = (this.state.points % 5) * 20;
    return (
      <View style={styles.container}>
        <AnimatedCircularProgress
            size={320}
            width={50}
            fill={progress}
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
