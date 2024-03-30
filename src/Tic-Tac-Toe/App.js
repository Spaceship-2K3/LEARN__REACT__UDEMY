import { useState } from "react";
import "./index.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./components/GameOver";
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
const PLAYERS = {
    X: "Player  1",
    O: "Player  2",
};
function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
}

function deriveWinner(gameBoard, players) {
    let winner;

    // Kiem tra 3 o vuong canh nhau, game se thang khi ca 3 dau deu giong nhau
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        /*console.log(
            `firstSquareSymbol : ${firstSquareSymbol} `,
            `secondSquareSymbol : ${secondSquareSymbol} `,
            `thirdSquareSymbol : ${thirdSquareSymbol} `
        );*/
        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function deriveGameBoard(gameTurns) {
    const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);

    //const [activePlayer, setActivePlayer] = useState("X");

    // todo : quan ly mot mang du lieu lan luot
    const [gameTurns, setGameTurns] = useState([]); // ! Trang thai bang tro choi nay o day

    const activePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);

    const winner = deriveWinner(gameBoard, players);

    const hasDraw = gameTurns.length === 9 && !winner;

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            // ! cap nhat trang thai khong the thay doi
            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    };

    const handleRestart = () => {
        setGameTurns([]);
    };
    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prevPlayers) => {
            return { ...prevPlayers, [symbol]: newName };
        });
    };

    return (
        <>
            <header>
                <img src={require("./assets/game-logo.png")} alt="logo-game" />
                <h1>Tic-Tac-Toe</h1>
            </header>
            <main>
                <div id="game-container">
                    <ol id="players" className="highlight-player">
                        <Player
                            initialName={PLAYERS.X}
                            symbol="X"
                            isActive={activePlayer === "X"}
                            onChangeName={handlePlayerNameChange}
                        />
                        <Player
                            initialName={PLAYERS.O}
                            symbol="O"
                            isActive={activePlayer === "O"}
                            onChangeName={handlePlayerNameChange}
                        />
                    </ol>
                    {(winner || hasDraw) && (
                        <GameOver winner={winner} onRestart={handleRestart} />
                    )}
                    <GameBoard
                        onSelectSquare={handleSelectSquare}
                        board={gameBoard}
                    />
                </div>

                <Log turns={gameTurns} />
            </main>
        </>
    );
}

export default App;
