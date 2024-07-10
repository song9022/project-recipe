import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #2E64FE;
  border-bottom: 1px solid #2E64FE;
`;

export const Logo = styled(Link)`
  font-size: 80px;
  font-weight: bold;
  text-decoration: none;
  color: white;
  margin-right: 50px;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

export const SearchBar = styled.input`
  flex: 1;
  margin: 0 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const NavButton = styled(Link)`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  color: white;

  &.login-button {
    background-color: #007bff;
  }

  &.signup-button {
    background-color: #28a745;
  }

  &.mypage-button {
    background-color: #6c757d;
  }

  &.logout-button {
    background-color: #dc3545;
  }
`;

export const BottomNav = styled.div`
  background-color: #343a40;
  padding: 10px 0;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;
`;

export const NavItem = styled.li`
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;
