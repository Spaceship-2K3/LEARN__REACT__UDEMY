import { useState } from "react";
const Player = ({ initialName, symbol, isActive, onChangeName }) => {
    /** Exercise Tasks
     * 1) Add a function that's triggered when the <button></button> is clicked
     * 2) Change isEditing to true in that function
     * 3) Show the <span className="player-name"></span> only when isEditing is false
     * 4) Show an <input> element(which does not need to work) if isEditing is true
     */
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        /**
         *   setIsEditing(!isEditing); => schedules a state update to true
         *   setIsEditing(!isEditing); => schedules a state update to true
         */
        setIsEditing((isEditing) => !isEditing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    };

    // React cung cap 1 su kien
    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption = "Edit";

    if (isEditing) {
        editablePlayerName = (
            <input
                type="text"
                onChange={handleChange}
                required
                value={playerName}
            />
        );
        btnCaption = "Save";
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    );
};

export default Player;
