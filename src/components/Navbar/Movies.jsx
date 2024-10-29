// src/pages/Movies/index.js
import React, { useEffect, useState } from 'react';
//import './Movies.css';
import TitleCards from '../TitleCards/TitleCards'; // Ensure this path is correct
import { TMDB_Access_Key } from '../../config';

const Movies = ({ category = "popular" }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_Access_Key}`,
    },
  };

  useEffect(() => {
    // Fetch movies by category
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchMovies();
  }, [category, options]);

  return (
    <div className="page">
      <p>Discover a great collection of movies across various genres.</p>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <TitleCards title={`Movies - ${category}`} items={apiData} />
      )}
    </div>
  );
};

export default Movies;
