import React, { Fragment } from 'react';
import styled from 'styled-components';

import checkIcon from '../../../assets/icons/check.svg';
import errorIcon from '../../../assets/icons/error.svg';
import infoIcon from '../../../assets/icons/info.svg';
import warningIcon from '../../../assets/icons/warning.svg';

const StyledToast = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin: 0 15px 0 10px;
`;

const Message = styled.div`
  display: block;
  margin-right: 10px;
  word-break: break-word;
`;

const Toast = props => {
  let image = null;

  switch (props.toastType) {
    case('success'):
      image = (
        <img  src={ checkIcon } alt="Success" />
      );
      break;
    case('error'):
      image = (
        <img  src={ errorIcon } alt="Error" />
      );
      break;
    case('info'):
      image = (
        <img  src={ infoIcon } alt="Info" />
      );
      break;
    case('warning'):
      image = (
        <img  src={ warningIcon } alt="Warning" />
      );
      break;
    default:
      image = null;
  }

  return (
    <Fragment>
      <StyledToast>
        <Icon>
          { image }
        </Icon>
        <Message>
          { props.message }
        </Message>
      </StyledToast>
    </Fragment>
  );
}

export default Toast;