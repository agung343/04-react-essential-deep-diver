// how to update state immutability
// lifting state

import React, { useState } from "react";

const init = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onActivePlayer, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(init);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevBoard) => {
      const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onActivePlayer();
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIdx) => (
              <li key={colIdx}>
                <button onClick={() => handleSelectSquare(rowIdx, colIdx)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
