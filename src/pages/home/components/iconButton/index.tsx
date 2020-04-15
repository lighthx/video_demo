import React, {useMemo, useState} from 'react';
import {Image, Text, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import {styles} from './style';
import Animated, {
  Clock,
  Value,
  set,
  useCode,
  Easing,
  block,
  clockRunning,
  cond,
  startClock,
  timing,
} from 'react-native-reanimated';
function runTiming(clock: Clock, value: number, dest: number) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 250,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    state.position,
  ]);
}

interface IconButtonProps {
  icon: number;
  text?: string;
  onPress: () => void;
  scale?: number;
  style?: ViewStyle;
  withoutAnimation?: boolean;
}

export const IconButton = (props: IconButtonProps) => {
  const [transitionScale, setTransitionScale] = useState(false);
  const {transitionVal, clock} = useMemo(
    () => ({
      transitionVal: new Value(0),
      clock: new Clock(),
    }),
    [],
  );
  useCode(
    () =>
      cond(
        transitionScale ? new Value(1) : new Value(0),
        set(transitionVal, runTiming(clock, 1, 1.2)),
        set(transitionVal, runTiming(clock, 1.2, 1)),
      ),
    [transitionScale],
  );

  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
      onPressIn={() => {
        setTransitionScale(true);
      }}
      onPressOut={() => {
        setTransitionScale(false);
      }}>
      <Animated.View
        style={[
          styles.iconButton,
          props.style,
          {transform: [{scale: props.withoutAnimation ? 1 : transitionVal}]},
        ]}>
        <Image
          source={props.icon}
          style={{
            ...styles.icon,
            width: styles.icon.width * (props.scale || 1),
            height: styles.icon.height * (props.scale || 1),
          }}
          resizeMode={'contain'}
        />
        {!!props.text && <Text style={styles.iconText}>{props.text}</Text>}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
