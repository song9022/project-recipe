import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.div`
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 10px 0;
  width: 100%;
`;

export const FooterText = styled.p`
  margin: 0;
`;

export const FooterLinks = styled.div`
  margin-top: 10px;
`;

export const FooterLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;
