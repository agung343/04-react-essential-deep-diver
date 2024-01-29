import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

// posible winning combination
import { WINNING_COMBINATIONS } from "./winning-combination";

// reducing state management
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol]
    }
  }
  return winner
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...init.map(restart => [...restart])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard
}

const init = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2"
  })

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, player)

  // handle case if game draw
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSwitchActivePlayer(rowIdx, colIdx) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIdx, col: colIdx }, player: activePlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayer((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={player.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName = {handlePlayerNameChange}
            />
            <Player
              initialName={player.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName = {handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
          <GameBoard
            onActivePlayer={handleSwitchActivePlayer}
            activePlayerSymbol={activePlayer}
            board={gameBoard}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
