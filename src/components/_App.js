import React, { useEffect, useCallback } from "react";

// CSS
import "../css/_app.css";

// Hooks
import { useLetterState, getLetterState } from "../hooks/useLetterState.js";
import { useLettersExactState } from "../hooks/useLettersExactState.js";
import { useWordState } from "../hooks/useWordState.js";

// Components
import Instructions from "./Instructions";
import Results from "./Results";
import Keyboard from "./Keyboard";

function App() {
  const [letterState, setLetterState] = useLetterState();
  const [lettersExactState, setLettersExactState] = useLettersExactState();
  const [wordState, setWordState] = useWordState();

  // Handler function to scroll to the top of the results
  const handleResultsScroll = useCallback(() => {
    const elem = document.querySelector(".results");
    if (elem) {
      elem.scrollTop = 0;
    }
  }, []);
  
  // Handler function to get a specified letter's state
  const handleGetLetterState = (letter, slot = -1) => {
    return getLetterState(letterState, lettersExactState, letter, slot);
  }

  // Handler function to set a letter state from the keyboard
  const handleSetLetterState = useCallback((key) => {
    setLetterState(key);
    setLettersExactState(letterState);
    setWordState(letterState, lettersExactState);
    handleResultsScroll();
  }, [letterState, setLetterState, lettersExactState, setLettersExactState, setWordState, handleResultsScroll]);
  
  // Handler function to toggle an exact letter match from the results
  const handleSetLettersExactState = (letter, slot) => {
    setLettersExactState(letterState, letter, slot);
    setWordState(letterState, lettersExactState);
    handleResultsScroll();
  };
  
  // Handle key presses for changing letter state and other functions
  const handleKeyDown = useCallback((event) => {
    // Ignore key press events which include ctrl or alt
    if (event.ctrlKey || event.altKey) {
      return;
    }
    // If the Esc key has been pressed
    if (event.keyCode === 27) {
      handleSetLetterState("ESC");
      return;
    }
    // If Backspace or Delete have been pressed
    if ([8, 46].indexOf(event.keyCode) > -1) {
      handleSetLetterState("BACKSPACE");
      return;
    }
    // Default action: Select an individual letter
    handleSetLetterState(event.key.toLowerCase());
  }, [handleSetLetterState]);

  // Event listener for calling handleKeyDown
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Display instructions by default (when no results are available)
  let resultsContent = <Instructions />
  if (wordState.length) {
    resultsContent = <Results wordState={wordState} getLetterState={handleGetLetterState} setLettersExactState={handleSetLettersExactState} />
  }

  return (
    <>
      <header className="header">Cluedle</header>
      <div className="board">
        <div className="board__results">
          {resultsContent}
        </div>
        <Keyboard getLetterState={handleGetLetterState} setLetterState={handleSetLetterState} />
      </div>
    </>
  );
}

export default App;
