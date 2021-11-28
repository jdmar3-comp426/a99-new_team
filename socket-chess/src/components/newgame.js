
import React, { useState } from 'react';
//import ChessBoard from "./ChessBoard";
import { v4 as uuidv4 } from 'uuid';
import { Button, Form, FormField, FormGroup, Icon, Segment, Select } from 'semantic-ui-react';
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
      <Segment basic style={{ display: 'flex', justifyContent: 'center'}}>
        <Form size='huge'>
          <div style={{ textAlign: 'center', paddingBottom: '15px'}}>
            <Icon name="chess" size="big"></Icon>
          </div>
        
          <FormGroup style={{ justifyContent: 'center', textAlign: 'center'}}>
            <FormField>
              <label>Game ID: Copy and Send it to a friend after you start the game</label>
              <input  disabled placeholder='Game ID' value={gameId}></input>
            </FormField>
          </FormGroup>
          <FormGroup style={{ justifyContent: 'center', textAlign: 'center'}}>
            <FormField>
              <label>Select Piece Color to Play as</label>
              <Select onChange={(event,data)=>setColor(data.value)} value={color} options={[{key:'w',value:'white',text:'White'},{key:'b',value:'black',text:'Black'}]} />
            </FormField>
          </FormGroup>
          <FormGroup style={{ justifyContent: 'center', textAlign: 'center'}}>
            <FormField>
              <Button size='large' basic color='blue' onClick={(event)=>{event.preventDefault();setGameId(md5(localStorage.getItem('userName')+uuidv4()))}}>Generate Game ID</Button>
              <label style={{ paddingTop: '20px'}}>Start Game</label>
              <Button fluid style={{ justifyContent: 'center'}} color='green' onClick={handleClick}>Start</Button>
            </FormField>
          </FormGroup>
          
        </Form>
      </Segment>
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
  
