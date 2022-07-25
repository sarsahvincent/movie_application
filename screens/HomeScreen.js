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
  FlatList,
} from 'react-native';
import List from '../components/List';
import {getPopularMovies, getUpcomingMovies} from '../services/Services';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [imgAcitive, setImgAcitive] = useState(0);
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovie, setPopularMovie] = useState([]);
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
    getPopularMovies()
      .then(allMovies => {
        setPopularMovie(allMovies);
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
      </View>
      <List title="Popular Movies" content={popularMovie} />
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
    height: HEIGHT * 0.6,
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
