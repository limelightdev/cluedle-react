import React from 'react';
import Modal from 'react-modal';
import { ReactComponent as IconClose } from '../../icons/Close.svg'

Modal.setAppElement('#root');

export default function SettingsModal({ isOpen, allWords, toggleAllWords, handleClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal__content modal__content--settings"
      closeTimeoutMS={300}
    >
      <h2 className="modal__content--title">SETTINGS</h2>
      <button
        type="button"
        className="modal__button modal__button--close"
        onClick={handleClose}
      >
        <IconClose />
      </button>
      <div className="modal__content--item">
        <div className="modal__content--item-settings">
          <div className="modal__content--item-settings-title">
            Show All Words
          </div>
          <div className="modal__content--item-settings-description">
            Show all English words from the Wordle dictionary (14,800+) instead of just the answers (2,300+). Not for the faint of heart 🔥
          </div>
        </div>
        <div>
          <div className="button__toggle--container">
            <button
              type="button"
              key="button_allWords"
              onClick={() => toggleAllWords()}
              className={`button__toggle ${allWords ? 'button__toggle--on' : ''}`}
            >
              <span className="button__toggle--knob"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="modal__content--item">
        <div className="modal__content--item-settings">
          <div className="modal__content--item-settings-title">
            Feedback
          </div>
        </div>
        <div>
          <a href="https://twitter.com/cluedleapp" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>
    </Modal>
  )
}