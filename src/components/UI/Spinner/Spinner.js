import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => (
  <ClipLoader 
    size={ 100 }
    color={ "#0099cc" }
    loading={ true }
  />
);

export default Spinner;