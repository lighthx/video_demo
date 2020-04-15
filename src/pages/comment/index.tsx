import {
  FlatList,
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RenderItem} from './components/renderItem';
import {RenderInputView} from './components/renderInputView';

export interface ListItemProps {
  date: number;
  text: string;
  name: string;
  items: ListItemProps[];
}

interface CommentProps {
  navigation: StackNavigationProp<any>;
}

const Comment = (props: CommentProps) => {
  const [receiverIndex, setReceiverIndex] = useState<{
    parentKey?: number;
    currentKey?: number;
  }>({parentKey: undefined, currentKey: undefined});

  const goBack = () => {
    props.navigation.goBack();
  };

  const [list, setList] = useState<ListItemProps[]>([]);

  const onRenderItemPress = (currentKey: number, parentKey?: number) => {
    setReceiverIndex({currentKey, parentKey});
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const clear = () => {
    setReceiverIndex({currentKey: undefined, parentKey: undefined});
  };

  const renderItem = ({item}: {item: ListItemProps}) => {
    return (
      <RenderItem
        data={item}
        currentKey={item.date}
        onPress={onRenderItemPress}
      />
    );
  };

  const renderCommentHeader = () => {
    return (
      <View style={styles.commentHeader}>
        <View style={styles.buttonView} />
        <Text>286条评论</Text>
        <TouchableOpacity style={styles.buttonView} onPress={goBack}>
          <Image
            source={require('./images/shut.png')}
            style={styles.buttonIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCommentContent = () => {
    return (
      <View style={styles.container}>
        {renderCommentHeader()}
        <View style={styles.container}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(v) => v.date + ''}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  const submit = (v: string) => {
    const date = Date.now();
    const data = {date, text: v, items: [], name: '小明'};
    if (receiverIndex.currentKey === undefined) {
      setList([data, ...list]);
    } else {
      const parentKey = receiverIndex.parentKey || receiverIndex.currentKey;
      setList((_list) => {
        return _list.map((v) =>
          v.date === parentKey ? {...v, items: [data, ...v.items]} : v,
        );
      });
    }
  };

  const inputRef = useRef<TextInput>(null);

  const renderInputView = () => {
    let placeholder = '';
    if (!!receiverIndex.parentKey && !!receiverIndex.currentKey) {
      placeholder =
        list
          .find((v) => v.date === receiverIndex.parentKey)
          ?.items.find((v) => v.date === receiverIndex.currentKey)?.name || '';
    } else if (receiverIndex.currentKey || receiverIndex.currentKey === 0) {
      placeholder =
        list.find((v) => v.date === receiverIndex.currentKey)?.name || '';
    }
    return (
      <RenderInputView
        submit={submit}
        placeholder={placeholder}
        inputRef={inputRef}
        clear={clear}
      />
    );
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={goBack}>
        <View style={styles.container} />
      </TouchableWithoutFeedback>

      <View style={styles.content}>{renderCommentContent()}</View>
      {renderInputView()}
    </View>
  );
};

export default Comment;
