import React from 'react';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { connect } from 'react-redux';

const modalLookUp = {
  TestModal,
  LoginModal,
  RegisterModal,
};

const modalsManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookUp[modalType];

    renderedModal = <ModalComponent {...modalProps} />
  }

  
  return (
  <span>{renderedModal}</span>
  );
}

const mapStateToProps = (state) => ({
  currentModal: state.modals,
});

export default connect(mapStateToProps)(modalsManager);
