import { useState, useCallback } from "react";

// An array of 5 empty slots for the initial state
const defaultLettersExact = ["", "", "", "", ""];

// Track letters that belong in a specific spot in the results
export const useLettersExactState = () => {
  // Initialize the state
  const [lettersExact, setLettersExact] = useState(defaultLettersExact);

  const setLettersExactState = useCallback((letterState, letter = null, slot = -1) => {
    // If a specific letter and slot were not passed here we may need to clear a letter from the array
    if (!letter || slot < 0 || slot > 4) {
      // Loop through the exact letters array
      for (let i = 0; i < 5; i++) {
        let letter = lettersExact[i];
        // If a letter exists in a specific slot check what its current state is
        if (letter !== "") {
          const letterEntry = letterState.find(l => l.letter === letter);
          // If the letter's state is not included in the results then clear it from the exact letter slot
          if (letterEntry.state < 1) {
            letter = "";
          }
        }
        // If the letter in this specific slot should be empty then simply update the array
        if (!letter.length) {
          lettersExact[i] = "";
        }
      }
    }
    // Otherwise we are setting a specific letter slot
    else {
      // If the existing slot is either empty or matches the current letter then it needs to be cleared
      // Otherwise the slot needs to be set to the letter
      lettersExact[slot] = (letter === "" || lettersExact[slot] === letter) ? "" : letter;
    }
    setLettersExact([...lettersExact]);
  }, [lettersExact]);

  return [lettersExact, setLettersExactState];
}