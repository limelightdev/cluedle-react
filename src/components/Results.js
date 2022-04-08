import React from 'react'

export default function Results({ wordState, getLetterState, setLettersExactState }) {
  return (
    <div className="results">
      {
        wordState.map(arrLetters => {
          // Get the state for each letter which is part of the word
          const letterState = [
            getLetterState(arrLetters[0], 0),
            getLetterState(arrLetters[1], 1),
            getLetterState(arrLetters[2], 2),
            getLetterState(arrLetters[3], 3),
            getLetterState(arrLetters[4], 4)
          ];
          // Build a new array for the word's letters which will either render a div or a button depending on letter state
          const resultLetters = [];
          for (let i = 0; i < 5; i++) {
            if (letterState[i].value < 1) {
              resultLetters.push(
                <div className={`results__row__letter background--excluded`}>{arrLetters[i]}</div>
              );
            }
            else {
              resultLetters.push(
                <button
                  type="button"
                  onClick={() => setLettersExactState(arrLetters[i], i)}
                  className={`results__row__letter background--${letterState[i].name}`}
                >
                  {arrLetters[i]}
                </button>
              );
            }
          }
          return (
            <div key={arrLetters.join()} className="results__row">
              {resultLetters[0]}
              {resultLetters[1]}
              {resultLetters[2]}
              {resultLetters[3]}
              {resultLetters[4]}
            </div>
          )
        })
      }
    </div>
  )
}
