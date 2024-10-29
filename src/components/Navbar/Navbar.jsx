import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" onClick={() => navigate('/')} />
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/TVShows')}>TV Shows</li>
          <li onClick={() => navigate('/Movies')}>Movies</li>
          <li onClick={() => navigate('/NewAndPopular')}>New & Popular</li>
          <li onClick={() => navigate('/MyList')}>My List</li>
          <li onClick={() => navigate('/BrowseByLanguages')}>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt="Bell Icon" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className='profile' />
          <img src={caret_icon} alt="Dropdown Icon" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
