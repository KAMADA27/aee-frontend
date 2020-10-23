import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1 0 auto;
  width: 100%;
  margin: 100px 0;

  &:after {
    content: '\00a0';
    display: block;
    height: 0;
    visibility: hidden;
  }
`;

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevState => !prevState.showSideDrawer);
  };

  return (
    <Fragment>
      <StyledLayout>
        <Content>
          <Toolbar drawerToggleClicked={ sideDrawerToggleHandler } />
          <SideDrawer 
            open={ showSideDrawer } 
            closed={ sideDrawerCloseHandler } 
          />
          <main>
            { props.children }
          </main>
        </Content>
      </StyledLayout>
    </Fragment>
  );
}

export default Layout;