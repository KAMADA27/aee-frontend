import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

import { updateObject, checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import Input from '../../../components/UI/Input/Input';
import Card from '../../../components/UI/Card/Card';
import { Success, Danger } from '../../../components/UI/Button/Button';
import Toast from '../../../components/UI/Toast/Toast';
import Spinner from '../../../components/UI/Spinner/Spinner';

const StyledUserEdit = styled.div`
  display: flex;
  justify-content: center
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InputContainer = styled.div`
  width: 50%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
`;

const UserEdit = props => {
  const { onFetchUser, user } = props;

  const [userForm, setUserForm] = useState({
    name: {
      label: 'Nome',
      elementType: 'input',
      elementConfig: {
        type: 'text',
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      label: 'E-mail',
      elementType: 'input',
      elementConfig: {
        type: 'email'
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
      label: 'Senha',
      elementType: 'input',
      elementConfig: {
        type: 'password'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    passwordConfirmation: {
      label: 'Confirmar Senha',
      elementType: 'input',
      elementConfig: {
        type: 'password'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    role: {
      label: 'Função',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '', displayValue: 'Selecione a Função' },
          { value: 'ADMIN', displayValue: 'Admin' },
          { value: 'SUPERVISOR', displayValue: 'Supervisor' },
          { value: 'TEACHER', displayValue: 'Professor(a)' }
        ]
      },
      value: '',
      valid: false,
      touched: false
    }
  });
  const [editMode, setEditMode] = useState(false);
  const userFormRef = useRef(userForm);

  const updateUser = useCallback(() => {
    let updatedUser = { ...userFormRef.current };

    for (let key in userFormRef.current) {
      updatedUser = updateObject(updatedUser, {
        [key]: updateObject(updatedUser[key], {
          value: user[key],
          valid: true
        })
      });
    }

    setUserForm(updatedUser);
  }, [user]);
  
  useEffect(() => {
    const id = props.match.params.id;

    if (id) {
      setEditMode(true);
      onFetchUser(id);

      delete userFormRef.current.password;
      delete userFormRef.current.passwordConfirmation;
    }
  }, [onFetchUser, props.match.params.id]);

  useEffect(() => {
    if (user && editMode) {
      updateUser();
    }
  }, [user, editMode, updateUser]);

  const goBack = () => {
    props.history.goBack(); 
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const value = event.target.value;
    const updatedFormElement = updateObject(userForm[inputIdentifier], {
      value: value,
      valid: checkValidity(value, userForm[inputIdentifier].validation),
      touched: true
    });
    const updatedUserForm = updateObject(userForm, {
      [inputIdentifier]: updatedFormElement
    });

    setUserForm(updatedUserForm);
  };

  const validateForm = () => {
    let isValid = true;
    let updatedUserForm = { ...userForm };
    const password = editMode ? null : userForm['password'].value;
    const passwordConfirmation = editMode ? null : userForm['passwordConfirmation'].value;

    if (password !== passwordConfirmation && !editMode) {
      isValid = false;

      toast.error(
        <Toast 
          toastType="error" 
          message="As senhas informadas não coincidem" 
        />
      );
    } else {
      for (let key in userForm) {
        if (!userForm[key].valid) {
          isValid = false;
          const updatedFormElement = updateObject(userForm[key], { touched: true });
          updatedUserForm = updateObject(updatedUserForm, {
            [key]: updatedFormElement
          }); 
        }
      }

      if (!isValid) {       
        toast.error(
          <Toast 
            toastType="error" 
            message="Todos os campos devem ser preenchidos corretamente!" 
          />
        );
      }
    }
    

    setUserForm(updatedUserForm);

    return isValid;
  };

  const formDataHandler = () => {
    let userFormData = {};

    for (let formElementIdentifier in userForm) {
      userFormData[formElementIdentifier] = userForm[formElementIdentifier].value;
    }

    return userFormData;
  };

  const userHandler = (event) => {
    event.preventDefault();
    const isValidUser = validateForm();

    if (!isValidUser) {
      return;
    }

    const user = formDataHandler();
    editMode ? props.onUpdateUser(props.match.params.id, user) : props.onSaveUser(user);
  };

  const formElementArray = [];
  const salvedRedirect = props.salved ? <Redirect to="/users" /> : null;
  const title = editMode ? 'Editar Usuário' : 'Cadastrar Usuário';

  for (let key in userForm) {
    formElementArray.push({
      id: key,
      config: userForm[key]
    });
  }

  const form = (
    <Form>
      { formElementArray.map(formElement => (
        <InputContainer key={ formElement.id }>
          <Input
            label={ formElement.config.label } 
            elementType={ formElement.config.elementType }
            elementConfig={ formElement.config.elementConfig }
            value={ formElement.config.value }
            invalid= { !formElement.config.valid }
            shouldValidate={ formElement.config.validation } 
            function={ formElement.config.function }
            touched={ formElement.config.touched }
            changed={ (event) => inputChangedHandler(event, formElement.id) } 
          />
        </InputContainer>
      )) }
    </Form>
  );

  let userEdit = (
    <Card title={ title } width="90%">
      <form onSubmit={ userHandler }>
        { form }
        <ButtonContainer>
          <Danger 
            type="button"
            width="12%" 
            onClick={ goBack }>
              Voltar
          </Danger>
          <Success 
            type="submit"
            width="12%">
              Salvar
          </Success>
        </ButtonContainer>
      </form>
    </Card>
  );

  if (props.loading) {
    userEdit = <Spinner />;
  }

  return (
    <StyledUserEdit>
      { salvedRedirect }
      { userEdit }
      <ToastContainer />
    </StyledUserEdit>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    salved: state.user.salved
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveUser: (userData) => dispatch(actions.saveUser(userData)),
    onUpdateUser: (id, userData) => dispatch(actions.updateUser(id, userData)),
    onFetchUser: (id) => dispatch(actions.fetchUserById(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);