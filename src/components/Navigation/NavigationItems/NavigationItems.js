import React from 'react';
import styled from 'styled-components';
import { FaUser, FaSchool } from 'react-icons/fa';

import NavigationItem from './NavigationItem/NavigationItem';

const StyledNavigationItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  @media (min-width) {
    flex-flow: row;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 25px;
  }
`;

const NavigationItems = props => (
  <StyledNavigationItems>
    <NavigationItem link="/users">
      <ItemContainer>
        <FaUser />
        Usuário
      </ItemContainer>
    </NavigationItem>
    <NavigationItem link="/schools">
      <ItemContainer>
        <FaSchool />
        Escola
      </ItemContainer>
    </NavigationItem>
  </StyledNavigationItems>
);

export default NavigationItems;