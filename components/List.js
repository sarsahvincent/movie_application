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
import Card from '../screens/Card';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const List = props => {
  const {title, content} = props;
  console.log('content', content);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.carousel}>
        <FlatList
          renderItem={({item}) => <Card item={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={content}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  carousel: {
    width: WIDTH,
    height: HEIGHT * 0.2,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});
