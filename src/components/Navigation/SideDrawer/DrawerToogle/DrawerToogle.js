import React from 'react';
import styled from 'styled-components';

const StyledDrawerToogle = styled.div`
  width: 25px;
  height: 42px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
`;

const Line = styled.div`
  width: 90%;
  height: 3px;
  background-color: #fff;
`;

const DrawerToogle = props => (
  <StyledDrawerToogle onClick={ props.clicked }>
    <Line />
    <Line />
    <Line />
  </StyledDrawerToogle>
);

export default DrawerToogle;