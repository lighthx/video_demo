import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    minHeight: 80,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    color: '#ccc',
    fontWeight: '600',
    marginBottom: 3,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 19,
  },
  dateText: {
    fontSize: 13,
    color: '#ccc',
  },
  inputView: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  itemsView: {
    marginLeft: 55,
  },
});
