import { useState, useCallback } from 'react'

// Default letters array
// Loop through Ascii codes for (a - z) and store the letter and default state of 0 (neutral)
// [{ letter: a, state: 0}, ...]
const defaultLetterState = [];
for (let i = 97; i < 123; i++) { 
  defaultLetterState.push({
    letter: String.fromCharCode(i),
    state: 0,
  });
}

// Possible states for each letter
const letterStates = [{
  value: -1,
  name: "excluded"
}, {
  value: 0,
  name: "neutral"
}, {
  value: 1,
  name: "included"
}, {
  value: 2,
  name: "exact"
}];

// Chooses the next valid state for a given letter
export const useLetterState = () => {
  // Initialize the state
  const [letters, setLetters] = useState(defaultLetterState);
  const [letterHistory, setLetterHistory] = useState([]);

  // Change a letter's state
  const setLetterState = useCallback((key) => {
    // If we are resetting the state of all letters
    if (key === "ESC") {
      letters.forEach(l => {
        l.state = 0;
      });
      setLetterHistory([]);
      setLetters([...letters]);
      return;
    }
    // If we are removing the most recently selected letter (by setting the state back to neutral)
    if (key === "BACKSPACE" && letterHistory.length) {
      // Look up the last letter to be selected
      const letter = letterHistory[letterHistory.length - 1];
      // Remove entry from the end of the letter history
      letterHistory.pop();
      setLetterHistory([...letterHistory]);
      // Find the corresponding letter entry and reset the state
      const letterIndex = letters.findIndex(l => l.letter === letter);
      letters[letterIndex].state = 0;
      setLetters([...letters]);
      return;
    }
    // Default: Set the state of a specific letter
    const letterIndex = letters.findIndex(l => l.letter === key);
    if (letterIndex < 0) {
      return;
    }
    letters[letterIndex].state++;
    if (letters[letterIndex].state > 1) {
      letters[letterIndex].state = -1;
    }
    // Letter History tracking
    // If the letter has been selected then append it to the end of the history array
    if (letters[letterIndex].state !== 0) {
      const letterHistoryIndex = letterHistory.findIndex(l => l === letters[letterIndex].letter);
      // If the letter is already part of the history entries then remove it so that it can be re-added to the end
      if (letterHistoryIndex > -1) {
        letterHistory.splice(letterHistoryIndex, 1);
      }
      letterHistory.push(letters[letterIndex].letter);
      setLetterHistory([...letterHistory]);
    }
    // If the letter is being set back to neutral then remove it from the history array
    if (letters[letterIndex].state === 0) {
      const letterHistoryIndex = letterHistory.findIndex(l => l === letters[letterIndex].letter);
      if (letterHistoryIndex > -1) {
        letterHistory.splice(letterHistoryIndex, 1);
        setLetterHistory([...letterHistory]);
      }
    }
    // Save the letter state
    setLetters([...letters]);
  }, [letters, letterHistory]);

  return [letters, setLetterState];
}

/**
  * Returns an entry from the letterStates array
  * @param {letterState} array - The current state of letters
  * @param {lettersExactState} array - The current state of letters belonging in specific spots in the word
  * @param {string} letter - which letter to check state for
  * @param {number} [slot = -1] - if > -1, check for an exact letter match
  * @returns {object} a letterState object
  */
 export const getLetterState = (letterState, lettersExactState, letter, slot = -1) => {
  const letterIndex = letterState.findIndex(l => l.letter === letter);
  if (letterIndex < 0) {
    // Return the default letter state (neutral) if a valid letter was not provided
    return letterStates[1];
  }
  let state = letterStates.find(l => l.value === letterState[letterIndex].state);
  // Indicate that the letter is an "exact" match if either of the following are true:
  // 1. We aren't searching in a specific slot, the letter in question is included in the results, and the letter is part of the exact matches
  // 2. We are searching in a specific slot and the letter exists in that slot
  if (
    (slot === -1 && letterState[letterIndex].state > 0 && lettersExactState.findIndex(l => l === letter) > -1) ||
    (slot > -1 && lettersExactState[slot] === letter)
  ) {
    state = letterStates[3];
  }
  return state;
};

