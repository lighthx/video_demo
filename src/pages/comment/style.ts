import {StyleSheet} from 'react-native';
import {screenHeight} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: (screenHeight * 2) / 3,
    backgroundColor: 'white',
  },
  commentHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 12,
  },
  buttonView: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    height: 20,
    width: 20,
  },
  inputView: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    marginLeft: 15,
  },
});
