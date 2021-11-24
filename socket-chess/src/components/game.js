
import React, { useState } from 'react';
import ChessBoard from "./ChessBoard";

function Game(props) {
      return (
        <div>
          <div style={boardsContainer}>
            <ChessBoard/>
          </div>
        </div>
      );
    }

  
  export default Game;
  
  const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100vw",
    marginTop: 30,
    marginBottom: 50
  };
  