// edit button will change input name
// show span className if isEditing false
// show <input> element if isEditing true
// button text save if isEditing true, "edit" if isEditing false
// onChange input name

import { useState } from "react";

function Player({ initialName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function editHandler() {
    setIsEditing((isEditing) => !isEditing);
  }

  //   function changeHandler(e) {
  //     setPlayerName(e.target.value)
  //   }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            defaultValue={initialName}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
