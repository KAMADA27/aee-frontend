import React, { Fragment } from 'react';
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
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Toolbar = props => (
  <Fragment>
    <Header>
      <StyledToolbar>
        <DrawerToogle clicked={ props.drawerToggleClicked } />
      </StyledToolbar>
    </Header>
  </Fragment>
);

export default Toolbar;