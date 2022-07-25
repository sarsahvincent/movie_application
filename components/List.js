/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  View,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const List = props => {
  const {title, content} = props;
  console.log('content', content);
  return (
    <View>
      <View>
        <Text>{title}</Text>
      </View>
      <View style={styles.carousel}>
        <FlatList
          renderItem={({item}) => <Text>{item.title}</Text>}
          horizontal={true}
          data={content}
          keyExtractor={() => {}}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  carousel: {
    width: WIDTH,
    height: HEIGHT * 0.2,
  },
});
