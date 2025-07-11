import Modal from 'react-bootstrap/Modal'
import { useAtom } from 'jotai'
import { themeAtom } from '../../lib/atom'
import './settings.scoped.css'

interface Props {
  show: boolean;
  toggleModal: () => void;
  middle: number;
  setMiddle: Function;
  showLast: boolean;
  toggleLast: () => void;
  maxMiddle: number
}

const Settings = ({ show, toggleModal, middle, setMiddle, showLast, toggleLast, maxMiddle }: Props) => {
  const [theme] = useAtom(themeAtom)

  return (
    <Modal centered show={show} onHide={toggleModal} className="settings-modal">
      <Modal.Header closeButton data-theme={theme}>Settings</Modal.Header>
      <Modal.Body data-theme={theme}>
        <div className="setting-group">
          <span>How many middle names?</span>
          <input type='number' min='0' max={maxMiddle} value={middle} onChange={e => setMiddle(e.target.value)}/>
        </div>
        <div className="setting-group">
          <span>Show last name:</span>
          <button className="toggle-button" onClick={toggleLast}>{showLast ? 'yes' : 'no'}</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Settings