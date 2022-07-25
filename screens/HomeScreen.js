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
  ActivityIndicator,
} from 'react-native';
import List from '../components/List';
import {
  getPopularMovies,
  getPopularTV,
  getUpcomingMovies,
  getFamilyMovies,
  getMusicMovies,
} from '../services/Services';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [imgAcitive, setImgAcitive] = useState(0);
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovie, setPopularMovie] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [musicMovies, setMusicMovies] = useState();
  const [popularTV, setPopularTV] = useState();
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

  const getData = () => {
    return Promise.all([
      getPopularMovies(),
      getPopularTV(),
      getUpcomingMovies(),
      getFamilyMovies(),
      getMusicMovies(),
    ]);
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
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
    getPopularMovies()
      .then(allMovies => {
        setPopularMovie(allMovies);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
    getPopularTV()
      .then(allMovies => {
        setPopularTV(allMovies);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
    getFamilyMovies()
      .then(allMovies => {
        setFamilyMovies(allMovies);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
    getMusicMovies()
      .then(allMovies => {
        setMusicMovies(allMovies);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrap}>
            <ScrollView
              onScroll={({nativeEvent}) => onChange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrap}>
              {moviesImages?.map((image, index) => (
                <Image
                  key={index}
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{uri: image}}
                />
              ))}
            </ScrollView>
          </View>
          {popularMovie && (
            <List title="Popular Movies" content={popularMovie} />
          )}
          {popularTV && <List title="Popular TV Shows" content={popularTV} />}
          {familyMovies && (
            <List title="Family Movies" content={familyMovies} />
          )}
          {musicMovies && <List title="Music Movies" content={musicMovies} />}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
