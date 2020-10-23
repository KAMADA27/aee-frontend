import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavigationItem = styled.li`
  margin: 5% 0;
  box-sizing: border-box;
  display: block;
  width: 100%;
  
  a {
    color: #0074bf;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;
  }
`;

const NavigationItem = props => (
  <StyledNavigationItem>
    <NavLink
      to={ props.link }
      exact={ props.exact }>
        { props.children }
    </NavLink>
  </StyledNavigationItem>
);

export default NavigationItem;


