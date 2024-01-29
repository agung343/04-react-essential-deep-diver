import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState("X")

  function handleSwitchActivePlayer() {
    setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X")
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
          </ol>
          <GameBoard onActivePlayer={handleSwitchActivePlayer} activePlayerSymbol={activePlayer} />
        </div>
        <Log />
      </main>
    </>
  );
}

export default App;
