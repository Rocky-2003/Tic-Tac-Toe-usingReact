import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  for (let turn of gameTurns) {
    let { square, player } = turn;
    let { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function drivewinner(gameBoard, playerName) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }

  return winner;
}

function driveActivePlayer(gameTurns) {
  let currentTurn = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentTurn = "O";
  }

  return currentTurn;
}

function App() {
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = driveActivePlayer(gameTurns);
  const gameBoard = driveGameBoard(gameTurns);
  const winner = drivewinner(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex, ValueOfPlayer) {
    if (ValueOfPlayer !== null) return;

    setGameTurns((prevTurn) => {
      const currentTurn = driveActivePlayer(prevTurn);

      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentTurn },
        ...prevTurn,
      ];

      return updateTurn;
    });
  }

  function handleRestartMatch() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayerName((prevPlayerName) => {
      return {
        ...prevPlayerName,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            playerData={playerName}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestartMatch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
