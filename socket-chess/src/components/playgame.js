
import React from 'react';
import { useLocation,useParams } from 'react-router';
import WithMoveValidation from './ChessBoard';

function PlayGame(props) {
  
    const location = useLocation();
    const params=useParams(); // can use it to get gameID
    // console.log(location.state.userName.myName);
    // console.log(location.state.userName.oppName);

    
      return (
        <div>
          <div style={boardsContainer}>
            <WithMoveValidation gameId = {params.gameid} playerNames={{myName:location.state.userName.myName, oppName: location.state.userName.oppName}} orientation={location.state.color}/>
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
  