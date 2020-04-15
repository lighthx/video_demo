import React, {
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useRef,
  useState,
  Ref,
} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Video from 'react-native-video';
import {styles} from './style';
import {IconButton} from '../iconButton';
import {StackNavigationProp} from '@react-navigation/stack';

interface ListItemProps {
  data: number;
  index: number;
  navigation: StackNavigationProp<any>;
}

export const ListItem = forwardRef(
  (props: ListItemProps, ref: Ref<{play: () => void; pause: () => void}>) => {
    const playerRef: MutableRefObject<Video | null> = useRef(null);
    const [paused, setPaused] = useState(props.index !== 0);
    const [canHandlePaused, setCanHandlePaused] = useState(false);
    const switchHandle = () => {
      setPaused(!paused);
      setCanHandlePaused(!canHandlePaused);
    };
    const play = () => {
      setPaused(false);
      setCanHandlePaused(false);
    };

    const pause = () => {
      setPaused(true);
    };
    useImperativeHandle(ref, () => ({
      play,
      pause,
    }));

    const renderIconButtonArr = [
      {
        icon: require('./images/user.png'),
        text: '',
        onPress: () => {},
      },
      {
        icon: require('./images/heart.png'),
        text: '30w',
        onPress: () => {},
      },
      {
        icon: require('./images/comment.png'),
        text: '3445',
        onPress: () => {
          props.navigation.navigate('Comment');
        },
      },
      {
        icon: require('./images/share.png'),
        text: '分享',
        onPress: () => {},
      },
    ];

    const renderAbsoluteView = () => {
      return (
        <TouchableWithoutFeedback onPress={switchHandle}>
          <View style={styles.absoluteView}>
            {canHandlePaused && (
              <IconButton
                icon={require('./images/play.png')}
                onPress={switchHandle}
                scale={2}
                withoutAnimation={true}
              />
            )}
            <View style={styles.touchBar}>
              {renderIconButtonArr.map((v, i) => (
                <IconButton
                  key={i}
                  icon={v.icon}
                  text={v.text}
                  onPress={v.onPress}
                />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    };

    return (
      <View style={styles.container}>
        <Video
          source={props.data}
          style={styles.container}
          resizeMode={'cover'}
          controls={false}
          ref={playerRef}
          fullscreenAutorotate={false}
          onLoad={(e) => {
            if (e.canStepForward) {
              if (playerRef.current && props.index !== 0) {
                playerRef.current.seek(0.1);
              }
            }
          }}
          repeat={true}
          paused={paused}
        />
        {renderAbsoluteView()}
      </View>
    );
  },
);
