export default function GameBoard({ onSelectSquare, board }) {
  // let gameBoard = initialGameBoard;

  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSlectedSquare(rowIndex, playerIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       let updatedGameBoard = [
  //         ...prevGameBoard.map((innerElement) => [...innerElement]),
  //       ];
  //       updatedGameBoard[rowIndex][playerIndex] = activePlayerSymbol;
  //       return updatedGameBoard;
  //     });
  //     onSelectSquare();
  //   }

  //   return (
  //     <ol id="game-board">
  //       {gameBoard.map((row, rowIndex) => (
  //         <li key={rowIndex}>
  //           <ol>
  //             {row.map((playerSymbol, playerIndex) => (
  //               <li key={playerIndex}>
  //                 <button
  //                   onClick={() => {
  //                     handleSlectedSquare(rowIndex, playerIndex);
  //                   }}
  //                 >
  //                   {playerSymbol}
  //                 </button>
  //               </li>
  //             ))}
  //           </ol>
  //         </li>
  //       ))}
  //     </ol>
  //   );

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, playerIndex) => (
              <li key={playerIndex}>
                <button
                  onClick={() => {
                    onSelectSquare(
                      rowIndex,
                      playerIndex,
                      board[rowIndex][playerIndex]
                    );
                  }}
                >
                  {board[rowIndex][playerIndex]}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
