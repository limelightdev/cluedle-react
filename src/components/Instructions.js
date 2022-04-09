import React from 'react';
import { ReactComponent as IconGitHub } from '../icons/GitHub.svg';

export default function Instructions() {
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
        This project is open source on
        <a href="https://github.com/limelightdev/cluedle-react" target="_blank" rel="noreferrer" className="padding--10">
          <IconGitHub />
        </a>
      </p>
      <p className="center margin-top--20 small">
        Not affiliated with Wordle or The New York Times.
      </p>
    </div>
  )
}