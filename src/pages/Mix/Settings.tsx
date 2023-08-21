import Modal from 'react-bootstrap/Modal'

interface Props {
  show: boolean;
  toggleModal: () => void;
  middle: number;
  setMiddle: Function;
  showLast: boolean;
  toggleLast: () => void;

}

const Settings = ({ show, toggleModal, middle, setMiddle, showLast, toggleLast }: Props) => {

  return (
    <Modal centered show={show} onHide={toggleModal}>
      <Modal.Header closeButton>Settings</Modal.Header>
      <Modal.Body>
        <span>How many middle names?</span>
        <input type='number' min='0' max='5' value={middle} onChange={e => setMiddle(e.target.value)}/>
        <br />
        <span>Show last name:</span>
        <button onClick={toggleLast}>{showLast ? 'yes' : 'no'}</button>
      </Modal.Body>
    </Modal>
  )
}

export default Settings