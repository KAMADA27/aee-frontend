import React, { useState, Fragment, useEffect } from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  display: flex
`;

const Label = styled.label `
  display: block;
  white-space: nowrap;
  margin-bottom: 8px;
`;

const InputElement = styled.input`
  flex: 1;
  outline: none;
  border: 1px solid #ccc;
  background-color: #fff;
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 100%;
  box-sizing: border-box;

  ${ ({ invalid }) => invalid && `
    border: 1px solid #ec2441;
  `}

  ${ ({ disabled }) => disabled && `
    background-color: #ccc;
    color: #000;
  `}
`;

const SelectElement = styled.select`
  flex: 1;
  outline: none;
  border: 1px solid #ccc;
  background-color: #fff;
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 100%;
  box-sizing: border-box;

  ${ ({ invalid }) => invalid && `
    border: 1px solid #ec2441;
  `}

  ${ ({ disabled }) => disabled && `
    background-color: #ccc;
    color: #000;
  `}
`;

const Input = props => {
  let inputElement = null;

  const [invalidInput, setInvalidInput] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);

  const { invalid, shouldValidate, touched } = props;
  const { disabled } = props.elementConfig;
  
  useEffect(() => {
    if (invalid && shouldValidate && touched) {
      setInvalidInput(true);
    } else if (disabled) {
      setDisabledInput(true);
    } else {
      setInvalidInput(false);
    }
  }, [invalid, shouldValidate, touched, disabled])

  switch (props.elementType) {
    case ('input'):
      inputElement = (
        <InputContainer>
          <InputElement 
            invalid={ invalidInput }
            disabled={ disabledInput }
            { ...props.elementConfig }
            value={ props.value }
            onChange={ props.changed }
          />
        </InputContainer>
      );
      break;
    case ('select'):
      inputElement = (
        <InputContainer>
          <SelectElement 
            invalid={ invalidInput }
            disabled={ disabledInput }
            { ...props.elementConfig }
            value={ props.value }
            onChange={ props.changed }>
              {  props.elementConfig.options ? props.elementConfig.options.map(option => (
                <option key={ option.value } value={ option.value } >
                  { option.displayValue }
                </option>
              )) : null }
          </SelectElement>
        </InputContainer>
      );
      break;
    default: 
      inputElement = (
        <InputContainer>
          <InputElement 
            invalid={ invalid }
            disabled={ disabled }
            { ...props.elementConfig }
            value={ props.value }
            onChange={ props.changed }
          />
        </InputContainer>
      );
  }

  let input = (
    <StyledInput>
      <Label>{ props.label }</Label>
      { inputElement }
    </StyledInput>
  );

  return (
    <Fragment>
      { input }
    </Fragment>
  );
}

export default Input;