import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../../style';
import {IconButton} from '../../../home/components/iconButton';
import React, {RefObject, useEffect, useState} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';

interface RenderInputViewProps {
  submit: (v: string) => void;
  placeholder: string;
  inputRef: RefObject<TextInput>;
  clear: () => void;
}

export const RenderInputView = (props: RenderInputViewProps) => {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setFocused(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setFocused(false);
      props.clear();
    });
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);
  const inserts = useSafeArea();

  const renderButtonArr = [
    {
      icon: require('./images/at.png'),
      onPress: () => {},
    },
    {
      icon: require('./images/emoji.png'),
      onPress: () => {},
    },
    {
      icon: text.length
        ? require('./images/sendActive.png')
        : require('./images/send.png'),
      onPress: () => {
        if (text) {
          props.submit(text);
          setText('');
          setTimeout(() => Keyboard.dismiss(), 0);
        }
      },
      disabled: !__DEV__ && focused,
    },
  ];

  return (
    <KeyboardAvoidingView behavior={'position'} enabled={Platform.OS === 'ios'}>
      <View
        style={[
          styles.inputView,
          {
            paddingBottom: inserts.bottom,
            height: styles.inputView.height + inserts.bottom,
          },
        ]}>
        <TextInput
          style={[styles.input, {paddingTop: 15}]}
          placeholder={
            props.placeholder
              ? `回复 @${props.placeholder}`
              : '留下你的精彩评论吧'
          }
          onChangeText={(v) => setText(v)}
          value={text}
          multiline={true}
          numberOfLines={2}
          underlineColorAndroid={'transparent'}
          ref={props.inputRef}
        />
        {renderButtonArr
          .filter((v) => !v.disabled)
          .map((v, i) => (
            <IconButton
              key={i}
              icon={v.icon}
              onPress={v.onPress}
              scale={0.8}
              style={styles.button}
            />
          ))}
      </View>
    </KeyboardAvoidingView>
  );
};
