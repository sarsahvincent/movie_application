/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {getPopularMovies, getUpcomingMovies} from '../services/Services';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [imgAcitive, setImgAcitive] = useState(0);
  const [moviesImages, setMoviesImages] = useState([]);
  console.log('moviesImages', moviesImages);
  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgAcitive) {
        setImgAcitive(slide);
      }
    }
  };

  const imaggg = [
    'https://img.freepik.com/free-vector/spring-flower-collection_23-2148853687.jpg?w=2000',
    'https://images.unsplash.com/photo-1560790671-b76ca4de55ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlL',
    'https://media.istockphoto.com/vectors/retro-delicate-wedding-card-with-pink-watercolor-texture-and-flowers-vector-id1294181713?k=20&m=1294181713&s=612x612&w=0&h=DDI5NgivZ3IfStpbiXqiPpkII92KlGnEG8-FSUry3aY=',
  ];
  useEffect(() => {
    getUpcomingMovies()
      .then(allMovies => {
        let moviesImagesArray = [];
        allMovies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {moviesImages?.map((image, index) => (
            <Image
              k
              key={index}
              resizeMode="stretch"
              style={styles.wrap}
              source={{uri: image}}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {moviesImages.map((image, index) => (
            <Text
              key={image}
              style={imgAcitive == index ? styles.dotActive : styles.dot}>
              ⬤
            </Text>
          ))}
        </View>
      </View>
      {/* <SliderBox images={moviesImages} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.4,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    color: 'white',
    margin: 3,
  },
});
