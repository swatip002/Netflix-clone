// src/pages/BrowseByLanguage.jsx
import React, { useEffect, useState } from 'react';
//import './BrowseByLanguage.css';
import TitleCards from '../TitleCards/TitleCards'; // Ensure this path is correct
import { TMDB_Access_Key } from '../../config';

const BrowseByLanguage = ({ language }) => {
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
    // Fetch movies/TV shows by language
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=${language}&sort_by=popularity.desc&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchData();
  }, [language, options]);

  return (
    <div className="page">
      <h1>Browse by Language</h1>
      <p>Explore movies and TV shows available in {language}.</p>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <TitleCards title={`Movies in ${language}`} items={apiData} />
      )}
    </div>
  );
};

export default BrowseByLanguage;
