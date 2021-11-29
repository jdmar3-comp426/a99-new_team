
import React from 'react';
import { useLocation,useParams } from 'react-router';
//import { socketID } from '../connect/clientSocket';
import WithMoveValidation from './ChessBoard';
const socket = require("../connect/clientSocket.js").sock;

function PlayGame(props) {
  
    const location = useLocation();
    const params=useParams(); // can use it to get gameID
    console.log(location.state.userName.myName);
    console.log(location.state.userName.oppName);

    function handleClick(event){
      event.preventDefault();
      socket.emit('gameOver',params.gameId);
    }
      return (
        <div>
          <div style={boardsContainer}>
            <WithMoveValidation gameId = {params.gameid} playerNames={{myName:location.state.userName.myName, oppName: location.state.userName.oppName}} orientation={location.state.color}/>
          </div>
          <div>
          <button type="giveup" className="ui green button" onClick={(event) => handleClick(event)}>I choose DEATH</button> 
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
  