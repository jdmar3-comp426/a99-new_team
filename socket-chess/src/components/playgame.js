
import React from 'react';
import { useLocation } from 'react-router';
import WithMoveValidation from './ChessBoard';

function PlayGame(props) {
    const location = useLocation();
    //const params=useParams(); // can use it to get gameID
      return (
        <div>
          <div style={boardsContainer}>
            <WithMoveValidation playerNames={{myname:location.state.userName.myName, oppName: location.state.userName.oppName}} orientation={location.state.color}/>
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
  