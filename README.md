
# Cluedle

🔗 https://cluedle.xyz

A [Wordle](https://www.nytimes.com/games/wordle/) hint tool.

Cluedle is a "reverse" Wordle of sorts. Upon selecting 3 or more letters, corresponding answers are presented (unless all of the selected letters are excluded from the solution, in which case a minimum of 5 letters is required). Users can then click on a highlighted letter in a solution to indicate that it should appear in that exact spot, filtering the results even more.

1. Select 3 or more letters to see possible solutions.
2. Tap a letter more than once to switch between being *INCLUDED*, *EXCLUDED*, or *NEUTRAL* to the solution.
3. Click a solution's highlighted letter to switch between a *BROAD* and *EXACT* match.

## Installation ⚛️

After downloading this repository:

1. Ensure that you have an appropriate package manager installed on your system such as `npm` (ships with [Node.js](https://nodejs.org/en/download/)) or `yarn`.
2. In your terminal of choice, navigate to the folder where the code resides and run `npm ci` to pull down the required dependencies. This only needs to be done whenever a new version of **package.json** or **package-lock.json** is pulled down.
3. Start the application by running `npm run start`.

## Contributing 👇

This project is built with [React](https://reactjs.org). Feel free to open an issue for any bugs or feature requests.

To contribute to the code, see [CONTRIBUTING.md](https://github.com/limelightdev/cluedle-react/blob/master/CONTRIBUTING.md)

## Acknowledgements 👋

I created this project as way of practicing my React skills. I had just completed an introductory course and wanted to build a self-assigned project. (Side note, I highly recommend the [Learn React Today](https://courses.webdevsimplified.com/learn-react-today) course for anyone that is new to React). I also studied some of the conventions found in Devang Thakkar's [Wordle Archive](https://github.com/devangthakkar/wordle_archive), which helped a lot.

As such, you may come across one or more antipatterns as I delved into the idea of custom hooks on my own. I would gladly welcome any constructive feedback!

And finally, the most obvious inspiration for this project is the official [Wordle](https://www.nytimes.com/games/wordle/) game. It should be noted, however, that Cluedle is not affiliated with Wordle or The New York Times Company.
