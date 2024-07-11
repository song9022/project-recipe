import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavbarContainer,
  Logo,
  SearchBar,
  SearchButton,
  AuthButtons,
  NavButton,
  BottomNav,
  NavList,
  NavItem
} from '../styles/Navbar';
import { PiCookingPotFill, PiBooksDuotone, PiRankingFill, PiPenBold, PiMagnifyingGlassBold, PiFinnTheHumanFill, PiBreadBold, PiDoorBold } from "react-icons/pi";

const Navbar = ({ setSearchQuery, isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      setSearchQuery(input);
      navigate('/category');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <NavbarContainer>
        <Logo to="/">LOGO</Logo>
        <SearchBar
          type="text"
          placeholder="Search recipes..."
          value={input}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
        <SearchButton onClick={handleSearchSubmit}><PiMagnifyingGlassBold size={40} /></SearchButton>
        <AuthButtons>
          {isLoggedIn ? (
            <>
              <NavButton to="/mypage" className='mypage-button'><PiFinnTheHumanFill size={40} /></NavButton>
              <NavButton as="button" className='logout-button' onClick={handleLogout}>
              <PiDoorBold size={40} />
              </NavButton>
            </>
          ) : (
            <>
              <NavButton to="/login" className='login-button'><PiFinnTheHumanFill size={40} /></NavButton>
              <NavButton to="/signup" className='signup-button'><PiBreadBold size={40} /></NavButton>
            </>
          )}
        </AuthButtons>
      </NavbarContainer>
      <BottomNav>
        <NavList>
          <NavItem>
            <Link to="/recommend"><PiCookingPotFill size={40} /></Link>
          </NavItem>
          <NavItem>
            <Link to="/category"><PiBooksDuotone size={40} /></Link>
          </NavItem>
          <NavItem>
            <Link to="/ranking"><PiRankingFill size={40} /></Link>
          </NavItem>
          <NavItem>
            <Link to="/review"><PiPenBold size={40} /></Link>
          </NavItem>
        </NavList>
      </BottomNav>
    </div>
  );
};

export default Navbar;
