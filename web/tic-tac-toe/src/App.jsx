import { useState } from "react";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next player: X");

  function handleSquareClick(index) {
    if (squares[index]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquares(newSquares);

    setTimeout(() => {
      const winner = calculateWinner(newSquares);
      if (winner) {
        setStatus(`Winner: ${winner}`);
      } else {
        setStatus(`Next player: ${xIsNext ? "O" : "X"}`);
      }
    }, 50);
  }

  const boardRows = [];
  for (let j = 0; j < 3; j++) {
    const row = [];
    for (let i = j * 3; i < j * 3 + 3; i++) {
      row.push(
        <Square value={squares[i]} onSquareClick={() => handleSquareClick(i)} />
      );
    }
    boardRows.push(<div className="board-row">{row}</div>);
  }

  return (
    <>
      {boardRows}
      <span> {status} </span>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
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
