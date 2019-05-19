import { MODAL_OPEN, MODAL_CLOSE } from './modalsConstants';

export const openModal = (modalType, modalProps) => ({
  type: MODAL_OPEN,
  modalType,
  modalProps,
});

export const closeModal = () => ({
  type: MODAL_CLOSE,
  modalType: null,
  modalProps: null,
});
