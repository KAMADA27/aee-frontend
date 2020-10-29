import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 20% auto;
`

const Spinner = () => (
  <ClipLoader 
    css={ override }
    size={ 100 }
    color={ "#0099cc" }
    loading={ true }
  />
);

export default Spinner;