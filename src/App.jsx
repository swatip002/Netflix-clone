import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import TVShows from './components/Navbar/TVShows';
import Movies from './components/Navbar/Movies';
import NewAndPopular from './components/Navbar/NewAndPopular';
import MyList from './components/Navbar/MyList';
import BrowseByLanguages from './components/Navbar/BrowseByLanguage';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate('/');
      } else {
        console.log("Logged Out");
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Navbar /> {/* Include Navbar component */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/tv-shows' element={<TVShows />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/new-and-popular' element={<NewAndPopular />} />
        <Route path='/my-list' element={<MyList />} />
        <Route path='/browse-by-languages' element={<BrowseByLanguages />} />
      </Routes>
    </div>
  );
};

export default App;
