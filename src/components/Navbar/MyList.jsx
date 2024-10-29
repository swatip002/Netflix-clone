// src/pages/MyList/index.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Import Firebase Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import TitleCards from '../TitleCards/TitleCards'; // Import the TitleCards component
//import './MyList.css';

const MyList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTVShows, setFavoriteTVShows] = useState([]);

  // Fetch favorites from Firestore
  const fetchFavorites = async () => {
    try {
      const moviesSnapshot = await getDocs(collection(db, 'favoriteMovies'));
      const tvShowsSnapshot = await getDocs(collection(db, 'favoriteTVShows'));

      const movies = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const tvShows = tvShowsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setFavoriteMovies(movies);
      setFavoriteTVShows(tvShows);
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="page">
      <h1>My List</h1>
      <p>Check out your favorite movies and TV shows.</p>

      {/* Render TitleCards for favorite movies */}
      {favoriteMovies.length > 0 && (
        <TitleCards title="Favorite Movies" items={favoriteMovies} />
      )}
      
      {/* Render TitleCards for favorite TV shows */}
      {favoriteTVShows.length > 0 && (
        <TitleCards title="Favorite TV Shows" items={favoriteTVShows} />
      )}
      
      {/* Optionally, you could display a message if there are no favorites */}
      {favoriteMovies.length === 0 && favoriteTVShows.length === 0 && (
        <p>Your list is empty. Add some favorites!</p>
      )}
    </div>
  );
};

export default MyList;
