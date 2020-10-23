import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

import Input from '../../components/UI/Input/Input';
import { Success } from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

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

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = updateObject(authForm, {
      [inputIdentifier]: updateObject(authForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[inputIdentifier].validation),
        touched: true
      })
    });

    setAuthForm(updatedForm);
  };

  const authHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value);
  };

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
      elementType={ formElement.config.elementType }
      elementConfig={ formElement.config.elementConfig }
      value={ formElement.config.value }
      invalid={ !formElement.config.valid }
      shouldValidate={ formElement.config.validation }
      touched={ formElement.config.touched }
      changed={ (event) => inputChangedHandler(event, formElement.id) }
    />
  ));

  let auth = (
    <Form onSubmit={ (event) => authHandler(event) }>
      { form }
      <Success width="100%">Entrar</Success>
      <ForgotPassword>Esqueceu a Senha?</ForgotPassword>
    </Form>
  );

  if (props.loading) {
    auth = <Spinner />;
  }

  return (
    <StyledAuth>
      { auth }
    </StyledAuth>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);