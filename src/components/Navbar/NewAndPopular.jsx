// src/pages/NewAndPopular/index.js
import React, { useEffect, useState } from 'react';
//import './NewAndPopular.css';
import TitleCards from '../TitleCards/TitleCards'; // Ensure this path is correct
import { TMDB_Access_Key } from '../../config';

const NewAndPopular = () => {
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
    // Fetch new and popular movies and TV shows
    const fetchData = async () => {
      try {
        // Change `trending/all/week` to any relevant endpoint for new and popular content
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/week?language=en-US`,
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
  }, [options]);

  return (
    <div className="page">
      <h1>New & Popular</h1>
      <p>Check out the latest and most popular movies and TV shows trending this week.</p>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <TitleCards title="New & Popular" items={apiData} />
      )}
    </div>
  );
};

export default NewAndPopular;
