/* eslint-disable prettier/prettier */
import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'c88893c8204684b8505a7cce995a535d';

//Get popular movies

export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
  return resp?.data?.results;
};

//Get upcoming movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?api_key=${apiKey}`);
  return resp?.data?.results;
};
//Get upcoming TV
export const gegPopularTV = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?api_key=${apiKey}`);
  return resp?.data?.results;
};
