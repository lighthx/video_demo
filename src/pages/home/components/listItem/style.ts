import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
  },
  absoluteView: {
    left: 0,
    top: 0,
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchBar: {
    height: 300,
    justifyContent: 'space-between',
    width: 50,
    right: 10,
    bottom: 100,
    position: 'absolute',
  },
});
