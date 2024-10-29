// src/pages/TVShows/index.js
import React, { useEffect, useState } from 'react';
//import './TVShows.css';
import TitleCards from '../TitleCards/TitleCards'; // Ensure this path is correct
import { TMDB_Access_Key } from '../../config';

const TVShows = ({ category = "popular" }) => {
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
    // Fetch TV shows by category
    const fetchTVShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchTVShows();
  }, [category, options]);

  return (
    <div className="page">
      <h1>TV Shows</h1>
      <p>Explore a wide range of TV shows, from popular series to hidden gems.</p>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <TitleCards title={`TV Shows - ${category}`} items={apiData} />
      )}
    </div>
  );
};

export default TVShows;
