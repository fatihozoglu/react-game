import { useState } from "react"
import Board from "./Board";

function Game() {
    //Defining 3 states history, next, step
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [next, setNext] = useState(true);
    const [step, setStep] =useState(0);

    //Winner calculator function
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            }
        }
        return null;
    }

    //Defining what will happen when a Square component is clicked
    const handleClick = (i) => {
        setHistory(history.slice(0, step + 1));
        const current = history[history.length - 1];
        const squares = current.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = next ? 'X' : 'O';
        setHistory(history.concat([squares]));
        setStep(history.length);
        setNext(!next);
    };

    //Defining what wil happen when a step button is clicked
    const jumpTo = (step) => {
        setStep(step);
        setNext(step % 2 === 0);
    }

    //Mapping the history state and creating a button out of every array instance in history array
    const moves = history.map((item, index) => {
        const description = index ? `Go to move #${index}` : `Go to game start`;
        return <li key={index}>
                    <button className="step-btn" onClick={() => jumpTo(index)}>{ description }</button>
                </li>
    })

    //Defining the current history array and calculating if there is a winner
    const current = history[step];
    const winner = calculateWinner(current);

    //Setting the description part
    let status;
    if(winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${ next ? "X" : "O" }`;
    }

    return (
        <div className="game">
            <h1>tic-tac-toe</h1>
            <div className="game-container">
                <div className="game-board">
                    <Board history={current} onClick={handleClick}/>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        </div>
    );
}

export default Game;