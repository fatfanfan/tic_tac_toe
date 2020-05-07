import React, { useEffect, useState } from "react";
import Board from "./Board";

const Game: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Next player: X");
  const [winner, setWinner] = useState<string>("");
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(""),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i: number) => {
    if (winner) return;

    let midHistory = history.slice(0, stepNumber + 1);
    setStepNumber(stepNumber + 1);
    const square = squares.slice();
    if (!square[i]) {
      square[i] = xIsNext ? "O" : "X";
      let nextStatus = xIsNext ? "X" : "O";
      setStatus(`Next player: ${nextStatus}`);
      setXIsNext(!xIsNext);
      setSquares(square);
      setHistory(midHistory.concat([{ squares: square }]));
    }
  };
  useEffect(() => {
    setWinner(calculateWinner(squares));
  }, [squares]);

  function jumpTo(index: number) {
    setStepNumber(index);
    if (!index) {
      setHistory([history[0]]);
      setSquares(history[0].squares);
      return;
    }
    setSquares(history[index].squares);
    index % 2 === 0 ? setXIsNext(true) : setXIsNext(false);
    xIsNext ? setStatus(`Next player: X`) : setStatus(`Next player: O`);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>winner: {winner}</div>
      </div>
      <div>
        {history.map((item, index) => (
          <div key={index.toString()}>
            {index === 0 ? (
              <button onClick={() => jumpTo(index)}>Go to game start</button>
            ) : (
              <button onClick={() => jumpTo(index)}>Go to move #{index}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

function calculateWinner(squares: string[]) {
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
  return "";
}

export default Game;
