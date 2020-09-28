import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../components/UI/Input/Input';
import { Success } from '../../components/UI/Button/Button';

const StyledAuth = styled.div`
  display: flex;
  background: linear-gradient(to bottom, #ccf2ff, #0099cc);
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`;

const ForgotPassword = styled.p`
  margin-top: 12%;
  color: #ccc;
  cursor:pointer;
  font-size: 14px;
`;

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'E-mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Senha'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  });

  const formElementArray = [];

  for (let key in authForm) {
    formElementArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = formElementArray.map(formElement => (
    <Input 
      key={ formElement.id }
      elementType={ formElement.elementType }
      elementConfig={ formElement.config.elementConfig }
      value={ formElement.value }
      invalid={ !formElement.config.valid }
      shouldValidate={ formElement.config.validation }
      touched={ formElement.config.touched }
      changed={ (event) => this.inputChangedHandler(event, formElement.id) }
    />
  ))

  return (
    <StyledAuth>
      <Form>
        { form }
        <Success width="100%">Entrar</Success>
        <ForgotPassword>Esqueceu a Senha?</ForgotPassword>
      </Form>
    </StyledAuth>
  );
}

export default Auth;