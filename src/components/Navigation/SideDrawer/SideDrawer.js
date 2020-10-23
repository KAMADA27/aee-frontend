import React, { Fragment } from 'react';
import styled from 'styled-components';

import Backdrop from '../../UI/Backdrop/Backdrop';

const StyledSideDrawer = styled.div`
  position: fixed;
  width: 265px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: #fff;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  overflow-x: hidden;
  transform: translateX(-100%);

  ${ ({ open }) => open && `
    transform: translateX(0);
  ` }
`;

const SideDrawer = props => (
  <Fragment>
    <Backdrop show={ props.open } clicked={ props.closed } />
    <StyledSideDrawer open={ props.open } onClick={ props.closed }>
      <span>Logo Teste</span>
    </StyledSideDrawer>
  </Fragment>
);

export default SideDrawer;