
import React, { useState } from 'react';
//import ChessBoard from "./ChessBoard";
import { v4 as uuidv4 } from 'uuid';
import { Select } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import md5 from 'md5';
const socket = require("../connect/clientSocket.js").sock;

function CreateNewGame(props) {
  const [color,setColor]=useState('white');
  const [gameId,setGameId]=useState('');
  const navigate=useNavigate();

  function handleClick(event) {
    event.preventDefault();
    if (gameId==='')
    {
      alert("Please generate a Game ID first");
      return;
    }
    socket.emit("createNewGame", gameId);

    socket.emit("playerJoinGame", {gameId: gameId, userName: localStorage.getItem("userName")});

    navigate("/loading-page", {state: {gameId: gameId, color: color}});
  }

  return(
    <div>
      <form className="ui form">
        <label>Game ID: Copy and Send it to a friend after you start the game</label>
        <input  disabled placeholder='Game ID' value={gameId}></input>
        <button onClick={(event)=>{event.preventDefault();setGameId(md5(localStorage.getItem('userName')+uuidv4()))}}>Generate Game ID</button>

        <label>Select Piece Color to Play as</label>
        <Select onChange={(event,data)=>setColor(data.value)} value={color} options={[{key:'w',value:'white',text:'White'},{key:'b',value:'black',text:'Black'}]} />

        <label>Start Game</label>
        <button onClick={handleClick}>Start</button>
      </form>
    </div>
  );
};


  
  export default CreateNewGame;
  
  // const boardsContainer = {
  //   display: "flex",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   flexWrap: "wrap",
  //   width: "100vw",
  //   marginTop: 30,
  //   marginBottom: 50
  // };
  
