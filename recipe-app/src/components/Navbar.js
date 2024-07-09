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
} from '../styles/NavbarStyles';

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
        <SearchButton onClick={handleSearchSubmit}>Search</SearchButton>
        <AuthButtons>
          {isLoggedIn ? (
            <>
              <NavButton to="/mypage" className='mypage-button'>My Page</NavButton>
              <NavButton as="button" className='logout-button' onClick={handleLogout}>
                Logout
              </NavButton>
            </>
          ) : (
            <>
              <NavButton to="/login" className='login-button'>Login</NavButton>
              <NavButton to="/signup" className='signup-button'>Sign Up</NavButton>
            </>
          )}
        </AuthButtons>
      </NavbarContainer>
      <BottomNav>
        <NavList>
          <NavItem>
            <Link to="/recommend">추천</Link>
          </NavItem>
          <NavItem>
            <Link to="/category">분류</Link>
          </NavItem>
          <NavItem>
            <Link to="/ranking">랭킹</Link>
          </NavItem>
          <NavItem>
            <Link to="/review">요리후기</Link>
          </NavItem>
          <NavItem>
            <Link to="/fridge">냉장고 털이</Link>
          </NavItem>
        </NavList>
      </BottomNav>
    </div>
  );
};

export default Navbar;
