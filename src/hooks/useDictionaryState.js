import { useState } from "react";
import { wordleAnswers } from "../data/wordleAnswers.js";
import { wordleDictionary } from "../data/wordleDictionary.js";

export const useDictionaryState = () => {
  // Initialize the state (no words by default)
  const [dictionary, setDictionary] = useState([]);
  
  const setDictionaryState = (allWords) => {
    const words = [];
    // If we are only interested in wordle answers (not all English words)
    if (!allWords) {
      wordleAnswers.forEach(word => {
        words.push([word.slice(0, 1), word.slice(1, 2), word.slice(2, 3), word.slice(3, 4), word.slice(4, 5)]);
      });
    }
    // Otherwise use all English words from the Wordle dictionary
    else {
      wordleDictionary.forEach(word => {
        words.push([word.slice(0, 1), word.slice(1, 2), word.slice(2, 3), word.slice(3, 4), word.slice(4, 5)]);
      });
    }
    setDictionary([...words]);
  }
  
  return [dictionary, setDictionaryState];
}