import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../store/actions/index';
import { FaRegEdit, FaRegWindowClose } from "react-icons/fa";

import Spinner from '../../components/UI/Spinner/Spinner';
import Card from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';

const StyledUsers = styled.div`
  display: flex;
  justify-content: center;
`

const EditButton = styled.div`
  color: #0099cc;
  font-size: 16px;
`;

const DeleteButton = styled.div`
  color: #e60000;
  font-size: 16px;
`;

const Users = props => {
  const { onFetchUsers } = props;

  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers]);

  const editUserHandler = (user) => {
    const id = user.id;
    props.history.push('/users/edit/' + id);
  }

  let userTable = <Spinner />;
  let userColumns = [
    {
      name: 'Nome',
      selector: 'name'
    },
    {
      name: 'E-mail',
      selector: 'email'
    },
    {
      name: 'Função',
      selector: 'role'
    },
    {
      name: 'Editar',
      cell: (row) => <EditButton onClick={ () => editUserHandler(row) }><FaRegEdit /></EditButton>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    },
    {
      name: 'Remover',
      cell: (row) => <DeleteButton onClick={ () => this.confirmDeleteHandler(row) }><FaRegWindowClose /></DeleteButton>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const addUserHandler = () => {
    props.history.push('/users/register');
  }

  if (!props.loading) {
    userTable = (
      <Table 
        columns={ userColumns }
        data={ props.users }
        filterBy="name"
        clicked={ addUserHandler }
        btnName="Cadastrar Usuário"
      />
    );
  }

  return (
    <StyledUsers>
      <Card title="Usuários" width="90%">
        { userTable }
      </Card>
    </StyledUsers>
  );
};

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loading: state.user.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => dispatch(actions.fetchUsers()),
    onDeleteUser: (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);