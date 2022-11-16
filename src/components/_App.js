import React, { useState, useEffect, useCallback } from "react";

// CSS
import "../css/_app.css";

// Hooks
import { useLetterState, getLetterState } from "../hooks/useLetterState.js";
import { useLettersExactState } from "../hooks/useLettersExactState.js";
import { useDictionaryState } from "../hooks/useDictionaryState";
import { useWordState } from "../hooks/useWordState.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

// Components
import Instructions from "./Instructions";
import Results from "./Results";
import Keyboard from "./Keyboard";
import SettingsModal from "./modal/SettingsModal";

// Button images
import { ReactComponent as IconSettings } from '../icons/Settings.svg'

function App() {
  // Custom hooks
  const [letterState, setLetterState] = useLetterState();
  const [lettersExactState, setLettersExactState] = useLettersExactState();
  const [dictionaryState, setDictionaryState] = useDictionaryState();
  const [wordState, setWordState] = useWordState();

  // Modal state
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  
  // Application settings (aligned with local storage)
  const [allWords, setAllWords] = useLocalStorage('cluedle.allWords', false);
  const toggleAllWords = () => {
    setAllWords((state) => !state);
  }

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
    setWordState(dictionaryState, letterState, lettersExactState);
    handleResultsScroll();
  }, [letterState, setLetterState, lettersExactState, setLettersExactState, dictionaryState, setWordState, handleResultsScroll]);
  
  // Handler function to toggle an exact letter match from the results
  const handleSetLettersExactState = (letter, slot) => {
    setLettersExactState(letterState, letter, slot);
    setWordState(dictionaryState, letterState, lettersExactState);
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

  // Build the dictionary any time the allWords setting is read or updated
  useEffect(() => {
    setDictionaryState(allWords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWords]);

  // Refresh the words listed any time the dictonary is updated
  useEffect(() => {
    setWordState(dictionaryState, letterState, lettersExactState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionaryState]);

  // Display instructions by default (when no results are available)
  let resultsContent = <Instructions />
  if (wordState.length) {
    resultsContent = <Results wordState={wordState} getLetterState={handleGetLetterState} setLettersExactState={handleSetLettersExactState} />
  }

  return (
    <>
      <header className="header">
        Cluedle
        <button type="button" className="header__button header__button--settings" onClick={() => setSettingsModalOpen(true)}>
          <IconSettings />
        </button>
      </header>
      <div className="board">
        <div className="board__results">
          {resultsContent}
        </div>
        <Keyboard getLetterState={handleGetLetterState} setLetterState={handleSetLetterState} />
      </div>
      <SettingsModal
        isOpen={settingsModalOpen}
        allWords={allWords}
        toggleAllWords={toggleAllWords}
        handleClose={() => { setSettingsModalOpen(false); } }
      />
    </>
  );
}

export default App;
