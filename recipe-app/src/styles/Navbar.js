import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 중앙 정렬 */
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #fff;
  gap: 10px; /* 요소 사이의 간격 조절 */
`;

export const Logo = styled(Link)`
  font-size: 80px;
  font-weight: bold;
  text-decoration: none;
  color: #5882FA;
  margin-right: 10px; /* 간격을 줄임 */

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

export const SearchBar = styled.input`
  width: 17.5%; /* 서치바의 길이를 줄임 */
  min-height: 30px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 10px; /* 요소 사이의 간격 조절 */
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-left: 10px; /* 서치바와의 간격 조절 */

  &:hover {
    background-color: #0056b3;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 10px; /* 요소 사이의 간격 조절 */
  justify-content: flex-end;
  margin-left: 10px; /* 간격을 줄임 */
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
    background-color: #F7D358;
  }

  &.mypage-button {
    background-color: #6c757d;
  }

  &.logout-button {
    background-color: #dc3545;
  }
`;

export const BottomNav = styled.div`
  background-color: #5882FA;
  padding: 10px 0;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;

  & > li {
    margin: 0 50px; /* 항목 사이의 간격을 조절 */
  }
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
