import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [playerName, editPlayerName] = useState(initialName);
  const [isEditing, SetIsEditing] = useState(false);

  function handleEditClick() {
    SetIsEditing((editing) => !editing);
  }

  function handleOnChange(e) {
    editPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleOnChange}
      />
    );
  }

  return (
    <li className="player">
      <span className="player-info">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
