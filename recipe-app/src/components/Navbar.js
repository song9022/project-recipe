import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavbarContainer,
  Logo,
  SearchBar,
  SearchSelect,
  SearchButton,
  AuthButtons,
  NavButton,
  BottomNav,
  NavList,
  NavItem,
} from "../styles/Navbar";
import {
  PiCookingPotFill,
  PiBooksDuotone,
  PiRankingFill,
  PiPenBold,
  PiMagnifyingGlassBold,
  PiFinnTheHumanFill,
  PiBreadBold,
  PiDoorBold,
} from "react-icons/pi";
import axios from "axios";

const Navbar = ({
  setSearchResults,
  isLoggedIn,
  setIsLoggedIn,
  userData,
  setUserData,
}) => {
  const [searchQuery, setSearchQuery] = useState({
    keyword: "",
    searchType: "",
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    axios
      .get(
        `http://localhost:8080/api/recipes/search?keyword=${searchQuery.keyword}&searchType=${searchQuery.searchType}`
      )
      .then((response) => {
        setSearchResults(response.data);
        navigate("/search-results");  // 검색 결과 페이지로 이동
      })
      .catch((error) => {
        console.error("Error searching recipes:", error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <NavbarContainer>
        <Logo to="/">LOGO</Logo>
        <SearchBar
          type="text"
          placeholder="Search recipes..."
          name="keyword"
          value={searchQuery.keyword}
          onChange={handleSearchChange}
        />
        <SearchSelect
          name="searchType"
          value={searchQuery.searchType}
          onChange={handleSearchChange}
        >
          <option value="name">레시피명</option>
          <option value="ingredient">재료</option>
        </SearchSelect>
        <SearchButton onClick={handleSearch}>
          <PiMagnifyingGlassBold size={40} />
        </SearchButton>
        <AuthButtons>
          {isLoggedIn ? (
            <>
              <NavButton to="/mypage" className="mypage-button">
                <PiFinnTheHumanFill size={40} />
              </NavButton>
              <NavButton
                as="button"
                className="logout-button"
                onClick={handleLogout}
              >
                <PiDoorBold size={40} />
              </NavButton>
            </>
          ) : (
            <>
              <NavButton to="/login" className="login-button">
                <PiFinnTheHumanFill size={40} />
              </NavButton>
              <NavButton to="/signup" className="signup-button">
                <PiBreadBold size={40} />
              </NavButton>
            </>
          )}
        </AuthButtons>
      </NavbarContainer>
      <BottomNav>
        <NavList>
          <NavItem>
            <Link to="/recommend">
              <PiCookingPotFill size={40} />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/category">
              <PiBooksDuotone size={40} />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/ranking">
              <PiRankingFill size={40} />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/review">
              <PiPenBold size={40} />
            </Link>
          </NavItem>
        </NavList>
      </BottomNav>
    </div>
  );
};

export default Navbar;
