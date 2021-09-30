import { useState } from "react"
import Square from "./Square"

function Board() {
    const [mark, setMark] = useState( Array(9).fill(null) );
    const [next, setNext] = useState(true);

    const handleClick = (i) => {
        const squares = mark.slice();
        if(calculateWinner(mark)) {
            return;
        }
        squares[i] = next ? "X" : "O";
        setMark([...squares]);
        setNext(!next);
    }

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

      const winner = calculateWinner(mark);
      let status;
      if(winner) {
          status = `Winner: ${winner}`;
      } else {
          status = `Next player: ${ next ? "X" : "O" }`;
      }

    return (
        <div>
        <div className="status">{status}</div>
        <div className="board-row">
            <Square id="0" value={mark[0]} handleClick={handleClick}/>
            <Square id="1" value={mark[1]} handleClick={handleClick}/>
            <Square id="2" value={mark[2]} handleClick={handleClick}/>
        </div>
        <div className="board-row">
            <Square id="3" value={mark[3]} handleClick={handleClick}/>
            <Square id="4" value={mark[4]} handleClick={handleClick}/>
            <Square id="5" value={mark[5]} handleClick={handleClick}/>
        </div>
        <div className="board-row">
            <Square id="6" value={mark[6]} handleClick={handleClick}/>
            <Square id="7" value={mark[7]} handleClick={handleClick}/>
            <Square id="8" value={mark[8]} handleClick={handleClick}/>
        </div>
        </div>
    );
}

export default Board;