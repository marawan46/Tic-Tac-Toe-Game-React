import React, { useState } from 'react';
import ModePicker from "./ModePicker"

function Square({value,onSquareClick,win}){
  const superClass = win ?  "square selected" : "square";
    return <button className={superClass} onClick={onSquareClick}>{value}</button>
}

function Board({turn, squares, onPlay}){
    const [winnerSquares, setWinnerSquare] = useState(Array(9).fill(false))
    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo.winner;
    
    let status;
    const [mode, setMode] = useState(null)
    const draw = checkDraw(squares,mode);
    if (winner) {
        status = "Winner: " + winner;
    }
    else if(draw){
        status = "Draw!";
    } 
    else {
      status = "Current Player: " + (turn ? "X" : "O");
    }
    React.useEffect(() => {
      if (winner) {
        const updatedWinnerSquare = Array(9).fill(false);
        winnerInfo.winnerSquares.forEach((index) => {
          updatedWinnerSquare[index] = true;
        });
        setWinnerSquare(updatedWinnerSquare);
      } else {
        setWinnerSquare(Array(9).fill(false));
      }
    }, [winner, squares]);

    function handleClick(i){
        if(mode){
          console.log(mode);
          if(calculateWinner(squares).winner)return
        }
        else if(squares[i] || calculateWinner(squares).winner||checkDraw(squares))
            return


        console.log("clicked!!")

        let nextSquares = squares.slice()//make a copy first
        
        if(turn){
            nextSquares[i] = "X"// change the copied version 
        //to get the benefits of immutability
        }
        else{
            nextSquares[i] = "O"
    }
        onPlay(nextSquares)
  }

const SubmitClicked = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      const formData = new FormData(e.target); // Get form data
      const selectedMode = formData.get('mode'); // Retrieve the selected mode
      setMode(selectedMode); // Update the state with the selected mode
    };

    return(
        <div>
            <div className='State'>{status}</div>
            <div className='board'>
            <div className="board-row">
                <Square onSquareClick={()=>handleClick(0)} value={squares[0]} win={winnerSquares[0]}/>
                <Square onSquareClick={()=>handleClick(1)} value={squares[1]} win={winnerSquares[1]}/>
                <Square onSquareClick={()=>handleClick(2)} value={squares[2]} win={winnerSquares[2]}/>
            </div>
            <div className="board-row">
                <Square onSquareClick={()=>handleClick(3)} value={squares[3]}win={winnerSquares[3]}/>
                <Square onSquareClick={()=>handleClick(4)} value={squares[4]}win={winnerSquares[4]}/>
                <Square onSquareClick={()=>handleClick(5)} value={squares[5]}win={winnerSquares[5]}/>
            </div>
            <div className="board-row">
                <Square onSquareClick={()=>handleClick(6)} value={squares[6]}win={winnerSquares[6]}/>
                <Square onSquareClick={()=>handleClick(7)} value={squares[7]}win={winnerSquares[7]}/>
                <Square onSquareClick={()=>handleClick(8)} value={squares[8]}win={winnerSquares[8]}/>
            </div>
            </div>
            <ModePicker handleSubmit={SubmitClicked} currentMode={mode}/>
        </div>
    )
}

export default function Game(){
    const [turn, setTurn] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    //save the current move to get back
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        //setHistory([...history, nextSquares]);
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setTurn(!turn);
      }

      function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setTurn(nextMove % 2 === 0)
      }
    
      const moves = history.map((squares, move) => {
        //squares are array ele & move is the index
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        //to let react know every list item
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      });

    return(
    <div className='game'>
        <div className='game-board'>
            <Board turn={turn} squares={currentSquares} onPlay={handlePlay} />

        </div>

        <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    )

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
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {winner:squares[a],winnerSquares:[a,b,c]};
      }
    }
    return {winner:null, winnerSquares:[]};
  }
function checkDraw(squares,mode){
  if(mode)return;
  let count = 0;
    for (let i = 0; i < 9; i++) {
      if (squares[i]) {
        count++;
      }
    }
    if(count === 9)return true;
    else return false;
  }