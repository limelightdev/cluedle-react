import React from 'react';
import { useState } from 'react';
import { ReactComponent as IconShare } from '../icons/Share.svg';
import { ReactComponent as IconTwitter } from '../icons/Twitter.svg';
import { ReactComponent as IconGitHub } from '../icons/GitHub.svg';

export default function Instructions() {
  const defaultShareButtonText = "Share";
  const [shareButtonText, setShareButtonText] = useState(defaultShareButtonText);
  return (
    <div className="instructions">
      <p className="center medium">A <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noreferrer">Wordle</a> hint tool.</p>
      <ol>
        <li>
          <p>Select one or more letters to see possible solutions. <em>If any exist, they will appear here.</em></p>
          <ul>
            <li>Tap a letter to <span className="bold instructions__span__padding background--included">INCLUDE</span> it.</li>
            <li>Tap it twice to <span className="bold instructions__span__padding background--excluded">EXCLUDE</span> it.</li>
            <li>A third tap will <span className="bold instructions__span__padding background--neutral">RESET</span> it.</li>
          </ul>
        </li>
        <li>Click a matching letter in the word list to indicate <span className="bold instructions__span__padding background--exact">EXACT</span> placement.</li>
      </ol>
      <p className="center margin--0">
        <button
          type="button"
          className="instructions__button instructions__button--share margin-right--40"
          onClick={() => {
            navigator.clipboard.writeText(
              "Cluedle ⬛🟨🟩\nA Wordle hint tool\nhttps://cluedle.app"
            ).then(() => {
              setShareButtonText("Copied!");
            }, () => {
              // Ignore errors and display default button text
              setShareButtonText(defaultShareButtonText);
            });
          }}
        >
          <IconShare />
          <span>{shareButtonText}</span>
        </button>
        <a href="https://twitter.com/cluedleapp" target="_blank" rel="noreferrer" className="padding--10">
          <IconTwitter />
        </a>
        <a href="https://github.com/limelightdev/cluedle-react" target="_blank" rel="noreferrer" className="padding--10">
          <IconGitHub />
        </a>
      </p>
      <p className="center margin-top--20 small">
        Not affiliated with Wordle or The New York Times
      </p>
    </div>
  )
}