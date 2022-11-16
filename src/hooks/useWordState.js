import { useState } from "react";

// Tracks matching words
export const useWordState = () => {
  // Initialize the state (no results by default)
  const [words, setWords] = useState([]);
  
  const setWordState = (dictionary, letters, lettersExact) => {
    // Create a new array of letters which are included in the solution
    const lettersIncluded = letters.filter(l => l.state > 0);
    // Create a new array of letters which are excluded from the solution
    const lettersExcluded = letters.filter(l => l.state < 0);
    // Keep track of the # of results to return up to a maximum
    let wordCount = 0, maxWordCount = 200;
    // If no letters have been selected then empty the state array
    if (!(lettersIncluded.length + lettersExcluded.length)) {
      setWords([]);
      return;
    }
    // Create a results array by running a filter against the main word list
    const results = dictionary.filter(word => {
      // If we've already reached the max # of word matches
      if (wordCount === maxWordCount) {
        return false;
      }
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
      if (wordMatch) {
        wordCount++;
      }
      return wordMatch;
    })
    setWords([...results]);
  };

  return [words, setWordState];
}