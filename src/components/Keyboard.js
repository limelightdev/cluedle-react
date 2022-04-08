import React from 'react'
import { ReactComponent as IconRefresh } from '../icons/Refresh.svg';
import { ReactComponent as IconBackspace } from '../icons/Backspace.svg';

// Keyboard rows
const keyboardRows = [{
  id: 0,
  keys: ["q","w","e","r","t","y","u","i","o","p"],
  width: 100,
}, {
  id: 1,
  keys: ["a","s","d","f","g","h","j","k","l"],
  width: 90,
}, {
  id: 2,
  keys: ["z","x","c","v","b","n","m"],
  width: 100,
}];

export default function Keyboard({ setLetterState, getLetterState }) {
  return (
    <div className="keyboard">
      {
        keyboardRows.map((row) => {
          const keyboardRowKeys = row.keys;
          return (
            <div key={`row_${row.id}`} className={`keyboard__row keyboard__row--${row.width}`}>
              {
                row.id === 2 && ( // Add an ESC key to the last row
                  <button
                    type="button"
                    title="Reset Letters (Esc)"
                    key={"button_ESC"}
                    onClick={() => setLetterState("ESC")}
                    className={`keyboard__row__button keyboard__row__button--015 background--${getLetterState("").name}`}
                  >
                    <IconRefresh />
                  </button>
                )
              }
              {
                keyboardRowKeys.map((key) => (
                  <button 
                    type="button"
                    key={`button_${key}`}
                    onClick={() => setLetterState(key)}
                    className={`keyboard__row__button keyboard__row__button--010 background--${getLetterState(key).name}`}
                  >
                    {key}
                  </button>
                ))
              }
              {
                row.id === 2 && ( // Add a Backspace key to the last row
                  <button
                    type="button"
                    title="Backspace"
                    key={"button_BACKSPACE"}
                    onClick={() => setLetterState("BACKSPACE")}
                    className={`keyboard__row__button keyboard__row__button--015 background--${getLetterState("").name}`}
                  >
                    <IconBackspace />
                  </button>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}