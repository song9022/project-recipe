import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MyPageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

export const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-bottom: ${props => (props.active ? '2px solid #000' : 'none')};
`;

export const SubTabMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

export const SortOptions = styled.div`
  display: flex;
  gap: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const CenterImage = styled.img`
  width: 150px;
  height: 150px;
`;

export const RegisterButton = styled(Link)`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;
