import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../store/actions/index';
import { FaRegEdit, FaRegWindowClose } from "react-icons/fa";

import Spinner from '../../components/UI/Spinner/Spinner';
import Card from '../../components/UI/Card/Card';
import Table from '../../components/UI/Table/Table';
import Modal from '../../components/UI/Modal/Modal';

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
  const [deleting, setDeleting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers]);

  const addUserHandler = () => {
    props.history.push('/users/register');
  };

  const editUserHandler = (user) => {
    const id = user.id;
    props.history.push('/users/edit/' + id);
  };

  const confirmDeleteHandler = (row) => {
    setDeleting(true);
    setUser(row);
  };

  const deleteUserHandler = () => {
    props.onDeleteUser(user.id);
    setDeleting(false);
  }

  const deleteCancelHandler = () => {
    setDeleting(false);
  };

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
      cell: (row) => <DeleteButton onClick={ () => confirmDeleteHandler(row) }><FaRegWindowClose /></DeleteButton>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];
  let modalMessage = null;

  if (user) {
    modalMessage = `Tem certeza que deseja remover o usuário: ${ user.name } ?`;
  }

  if (!props.loading) {
    userTable = (
      <Fragment>
         <Modal 
            show={ deleting } 
            modalClosed={ deleteCancelHandler }
            confirmBtn={ true }
            title="Remover Usuário"
            confirmed={ deleteUserHandler }>
              { modalMessage }
          </Modal>
        <Table 
          columns={ userColumns }
          data={ props.users }
          filterBy="name"
          clicked={ addUserHandler }
          btnName="Cadastrar Usuário"
        />
      </Fragment>
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