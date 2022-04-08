import React from 'react';
import { ReactComponent as IconGitHub } from '../icons/GitHub.svg';

export default function Instructions() {
  return (
    <div className="instructions">
      <p className="center medium">A <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noreferrer">Wordle</a> hint tool.</p>
      <ol>
        <li>Select 3 or more letters to see possible solutions. <em>If any exist, they will appear here.</em></li>
        <li>Tap a letter more than once to switch between being <span className="bold instructions__span__padding background--included">INCLUDED</span> <span className="bold instructions__span__padding background--excluded">EXCLUDED</span> or <span className="bold instructions__span__padding background--neutral">NEUTRAL</span> to the solution.</li>
        <li>Click a solution's highlighted letter to switch between a <span className="bold instructions__span__padding background--included">BROAD</span> and <span className="bold instructions__span__padding background--exact">EXACT</span> match.</li>
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