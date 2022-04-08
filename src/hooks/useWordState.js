import { useState } from "react";
import { wordleAnswers } from "../data/wordleAnswers.js";

// Build a list of wordle answers. Each word is its own array of letters.
const wordList = [];
wordleAnswers.forEach(word => {
  wordList.push([word.slice(0, 1), word.slice(1, 2), word.slice(2, 3), word.slice(3, 4), word.slice(4, 5)]);
});

// Tracks matching words
export const useWordState = () => {
  // Initialize the state (no results by default)
  const [words, setWords] = useState([]);

  const setWordState = (letters, lettersExact) => {
    // Create a new array of letters which are included in the solution
    const lettersIncluded = letters.filter(l => l.state > 0);
    // Create a new array of letters which are excluded from the solution
    const lettersExcluded = letters.filter(l => l.state < 0);
    // If no letters have been included, less than 5 have been excluded, or less than 3 letters have been selected in total, then empty the state array
    if ((lettersIncluded.length < 1 && lettersExcluded.length < 5) || lettersIncluded.length + lettersExcluded.length < 3) {
      setWords([]);
      return;
    }
    // Create a results array by running a filter against the main word list
    const results = wordList.filter(word => {
      let wordMatch = true;
      // Loop through any exact slot letters
      let exactSlot = -1;
      wordMatch = lettersExact.every(l => {
        exactSlot++;
        // Eliminate words that do not contain a specific letter in the exact position
        if (l !== "" && l !== word[exactSlot]) {
          return false;
        }
        // Return true by default
        return true;
      });
      // If the above check failed
      if (!wordMatch) {
        return false;
      }
      // Loop through any included letters
      wordMatch = lettersIncluded.every(l => {
        // Eliminate words that do not contain a specific letter at any position
        if (!word.find(letter => letter === l.letter)) {
          return false;
        }
        // Return true by default
        return true;
      });
      // If the above check failed
      if (!wordMatch) {
        return false;
      }
      // Loop through any excluded letters
      wordMatch = lettersExcluded.every(l => {
        // Eliminate words that contain an excluded letter
        if (word.find(letter => letter === l.letter)) {
          return false;
        }
        // Return true by default
        return true;
      });
      return wordMatch;
    })
    setWords([...results]);
  };

  return [words, setWordState];
}