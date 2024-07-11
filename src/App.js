import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouterConfig from './routes/Router';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar setSearchQuery={setSearchQuery} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content">
          <RouterConfig searchQuery={searchQuery} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;