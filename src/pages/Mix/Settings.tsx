import Modal from 'react-bootstrap/Modal'

interface Props {
  show: boolean;
  toggleModal: () => void;
  middle: number;
  setMiddle: (n: number) => void;
  showLast: boolean;
  toggleLast: () => void;
  maxMiddle: number
}

const Settings = ({ show, toggleModal, middle, setMiddle, showLast, toggleLast, maxMiddle }: Props) => {

  return (
    <Modal centered show={show} onHide={toggleModal}>
      <Modal.Header closeButton>Settings</Modal.Header>
      <Modal.Body>
        <span>How many middle names?</span>
        <input type='number' min='0' max={maxMiddle} value={middle} onChange={e => setMiddle(Math.min(maxMiddle, Math.max(0, Number(e.target.value) || 0)))}/>
        <br />
        <span>Show last name:</span>
        <button onClick={toggleLast}>{showLast ? 'yes' : 'no'}</button>
      </Modal.Body>
    </Modal>
  )
}

export default Settings