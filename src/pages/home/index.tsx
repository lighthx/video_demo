import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

import React, {MutableRefObject, useRef} from 'react';
import {movies} from '../../utils/constants';
import {ListItem} from './components/listItem';
import {screenHeight} from '../../utils/constants';
import {styles} from './style';
import {StackNavigationProp} from '@react-navigation/stack';

interface HomeProps {
  navigation: StackNavigationProp<any>;
}

const Home = (props: HomeProps) => {
  const ref: MutableRefObject<ScrollView | null> = useRef(null);
  const listItemRefs: {[key: string]: any | null} = {};
  let currentItemIndex = 0;
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let itemIndex = Math.round(e.nativeEvent.contentOffset.y / screenHeight);
    if (currentItemIndex !== itemIndex) {
      listItemRefs[currentItemIndex]?.pause();
      currentItemIndex = itemIndex;
      listItemRefs[currentItemIndex]?.play();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={ref}
        pagingEnabled={true}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsVerticalScrollIndicator={false}>
        {movies.map((v, i) => (
          <ListItem
            data={v}
            key={i}
            ref={(r) => (listItemRefs[i] = r)}
            index={i}
            navigation={props.navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
