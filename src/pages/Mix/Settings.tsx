import Modal from 'react-bootstrap/Modal'
import { useAtom } from 'jotai'
import { themeAtom } from '../../lib/atom'
import './settings.css'

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
  const [theme] = useAtom(themeAtom)

  return (
    <Modal centered show={show} onHide={toggleModal} dialogClassName='settings-modal' data-theme={theme}>
      <Modal.Header closeButton>Settings</Modal.Header>
      <Modal.Body>
        <div className='setting-group'>
          <span>How many middle names?</span>
          <input
            type='number'
            min='0'
            max={maxMiddle}
            value={middle}
            onChange={e => setMiddle(Math.min(maxMiddle, Math.max(0, Number(e.target.value) || 0)))}
          />
        </div>
        <div className='setting-group'>
          <span>Show last name:</span>
          <button className='toggle-button' onClick={toggleLast}>{showLast ? 'yes' : 'no'}</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Settings
