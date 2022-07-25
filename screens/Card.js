/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';

const Card = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{uri: 'https://image.tmdb.org/t/p/w500' + item?.poster_path}}
      />
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
  },
  image: {
    height: 140,
    width: 100,
    borderRadius: 20,
  },
});
