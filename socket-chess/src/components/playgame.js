
import React from 'react';
import { useParams } from 'react-router';
import WithMoveValidation from './ChessBoard';

function PlayGame(props) {
    const params=useParams();
      return (
        <div>
          <div style={boardsContainer}>
            <WithMoveValidation orientation={params.color}/>
          </div>
        </div>
      );
    }

  
  export default PlayGame;
  
  const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100vw",
    marginTop: 30,
    marginBottom: 50
  };
  