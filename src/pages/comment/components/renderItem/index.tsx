import React, {FunctionComponent} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {IconButton} from '../../../home/components/iconButton';
import {ListItemProps} from '../../index';
import moment from 'moment';

export interface RenderItemProps {
  data: ListItemProps;
  currentKey: number;
  parentKey?: number;
  onPress: (index: number, parentIndex?: number) => void;
}

const _RenderItem: FunctionComponent<RenderItemProps> = (
  props: RenderItemProps,
) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => props.onPress(props.currentKey, props.parentKey)}>
        <Image
          source={require('./images/avatar.png')}
          resizeMode={'contain'}
          style={styles.avatar}
        />
        <View style={styles.itemContent}>
          <Text style={styles.name}>{props.data.name}</Text>
          <Text style={styles.commentText}>
            {props.data.text + ' '}
            <Text style={styles.dateText}>
              {moment(props.data.date).format('HH:mm:ss')}
            </Text>
          </Text>
        </View>
        <IconButton
          icon={require('./images/heart.png')}
          text={'3000'}
          scale={0.6}
          onPress={() => {}}
        />
      </TouchableOpacity>
      <View style={styles.itemsView}>
        {props.data.items.map((v) => (
          <RenderItem
            data={v}
            currentKey={v.date}
            onPress={props.onPress}
            parentKey={props.currentKey}
            key={v.date}
          />
        ))}
      </View>
    </View>
  );
};

function propsAreEqual(pre: RenderItemProps, next: RenderItemProps) {
  return (
    pre.data.items.length === next.data.items.length &&
    pre.data.date === next.data.date
  );
}

export const RenderItem: FunctionComponent<RenderItemProps> = React.memo(
  _RenderItem,
  propsAreEqual,
);
