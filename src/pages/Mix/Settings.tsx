import React from "react"
import Modal from 'react-bootstrap/Modal'

interface Props {
  show: boolean;
  toggleModal: () => void;
  setMiddle: Function;
  toggleLast: () => void;

}

const Settings = ({show, toggleModal, setMiddle, toggleLast}: Props) => {

  return (
    <Modal show={show} onHide={toggleModal}>
      This is the settings modal
    </Modal>
  )
}

export default Settings