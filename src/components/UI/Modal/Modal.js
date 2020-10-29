import React from 'react';
import styled from 'styled-components';

import { Success, Danger } from '../Button/Button';
import Backdrop from '../Backdrop/Backdrop';

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledModal = styled.div`
  position: fixed;
  z-index: 500;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #000;
  padding: 16px;
  top: 15%;
  max-height: 510px;
  overflow: auto;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
`;

const ModalTitle = styled.div`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 500;
  color: #ec2441;
  border-bottom: 1px solid #ccc;

  div {
    margin-bottom: 15px;
  }
`;

const ModalBody = styled.div`
  margin: 35px 20px;
  font-size: 16px;
`;

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;

  button {
    margin-top: 20px;
  }
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ccc;
`;

const Modal = props => {
  let buttons = (
    <CloseBtn>
      <Danger onClick={ props.modalClosed }>
        Fechar
      </Danger>
    </CloseBtn>
  );

  if (props.confirmBtn) {
    buttons = (
      <ModalButton>
        <Danger onClick={ props.modalClosed }>
          Cancelar
        </Danger>
        <Success clicked={ props.confirmed }>
          Confirmar
        </Success>
      </ModalButton>
    );
  }

  return (
    <ModalContainer>
      <Backdrop show={ props.show } clicked={ props.modalClosed} />
      <StyledModal
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
          width: props.width
        }}>
          <ModalTitle>
            <div>{ props.title }</div>
          </ModalTitle>
          <ModalBody>
            { props.children } 
          </ModalBody>
          { buttons }
      </StyledModal>
    </ModalContainer>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) => 
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);