import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0099cc;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

const StyledToolbar = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

const Toolbar = props => (
  <Fragment>
    <Header>
      <StyledToolbar>
        <DrawerToogle clicked={ props.drawerToggleClicked } />
        <NavLink to="/logout">Sair</NavLink>
      </StyledToolbar>
    </Header>
  </Fragment>
);

export default Toolbar;