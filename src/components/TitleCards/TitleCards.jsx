// src/pages/TitleCards.jsx
import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { TMDB_Access_Key } from '../../config';


const TitleCards = ({ title, category, items }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_Access_Key}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel); // Cleanup event listener
    };
  }, []);

  useEffect(() => {
    if (!items || items.length === 0) {
      // Fetch data from TMDB API if no items are passed
      fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
        .then((response) => response.json())
        .then((response) => setApiData(response.results))
        .catch((err) => console.error(err));
    }
  }, [category, items, options]);

  const displayedItems = items && items.length > 0 ? items : apiData;

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {displayedItems.length > 0 ? (
          displayedItems.map((card, index) => (
            <Link to={{ pathname: `/player/${card.id}` }} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
              <p>{card.original_title}</p>
            </Link>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
