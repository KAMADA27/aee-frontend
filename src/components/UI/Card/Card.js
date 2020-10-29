import React from 'react';

import styled from 'styled-components';

const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-bottom: 30px;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 10px;
`;

const CardTitle = styled.div`
  padding: 1.4rem;
  background-color: #0099cc;
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;

  span {
    font-size: 18px;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

const CardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
  box-sizing: border-box;
`;

const Card = props => (
  <StyledCard style={{ width: props.width }}>
    <CardTitle>
      <span>{ props.title }</span>
    </CardTitle>
    <CardBody>
      { props.children }
    </CardBody>
  </StyledCard>
);

export default Card;