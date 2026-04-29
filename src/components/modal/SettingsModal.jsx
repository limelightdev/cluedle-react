import { useRef, useEffect } from 'preact/hooks';
import IconClose from '../../icons/Close.svg?react';

export default function SettingsModal({ isOpen, allWords, toggleAllWords, handleClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.classList.add('modal--closing');
      const onAnimEnd = () => {
        dialog.classList.remove('modal--closing');
        dialog.close();
      };
      dialog.addEventListener('animationend', onAnimEnd, { once: true });
    }
  }, [isOpen]);

  const handleDialogClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal__content modal__content--settings"
      onClick={handleDialogClick}
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
    </dialog>
  )
}
