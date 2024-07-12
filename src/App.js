import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouterConfig from './routes/Router';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([])

  return (
    <Router>
      <div className="App">
        <Navbar setSearchQuery={setSearchQuery} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserDate={setUserData} />
        <div className="content">
          <RouterConfig searchQuery={searchQuery} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} userData={userData} setUserDate={setUserData} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
