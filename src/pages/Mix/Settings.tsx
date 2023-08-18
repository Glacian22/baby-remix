import React from "react"
import Modal from 'react-bootstrap/Modal'

interface Props {
  show: boolean;
  toggleModal: () => void;
  middle: number;
  setMiddle: Function;
  toggleLast: () => void;

}

const Settings = ({ show, toggleModal, middle, setMiddle, toggleLast }: Props) => {

  return (
    <Modal centered show={show} onHide={toggleModal}>
      <Modal.Header closeButton>Settings</Modal.Header>
      <Modal.Body>
        <span>How many middle names?</span>
        <input type='number' min='0' max='5' value={middle} onChange={e => setMiddle(e.target.value)}/>
      </Modal.Body>
    </Modal>
  )
}

export default Settings