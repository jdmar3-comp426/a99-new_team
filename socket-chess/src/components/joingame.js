import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Button, Form, FormField, FormGroup, Segment, Icon } from "semantic-ui-react";
const socket = require("../connect/clientSocket.js").sock;

function JoinGame(){
    const [gameId,setGameId]=useState('');
    const [start, decideStart] = useState(false);
    const [oppName,setOppName]= useState('');
    const [color,setColor]=useState('');

    useEffect(() => 
    {
        socket.on("start game", (userName) => {
                decideStart(true);
        });

        socket.on("get Opponent UserName and color",(data)=>{
          setColor(data.color==='white'?'black':'white');
          console.log(data.userName);
          setOppName(data.userName);
        });

        socket.on('status',(msg)=>(alert(msg)));
    }
    ,[]);

    function handleJoinGame(event){
      event.preventDefault();
      if(gameId===''){
        alert("Please enter a Game ID first");
        return;
      }

      socket.emit("playerJoinGame", {gameId: gameId, userName: localStorage.getItem("userName")});
      socket.emit('request opponent username and color for joinee',gameId);
    }
    if(!start || oppName===''){
        return(
            <div>
              <Segment  basic style={{ display: 'flex', justifyContent: 'center'}}>
                <Form size='huge'>
                  <div style={{ textAlign: 'center', paddingBottom: '15px'}}>
                    <Icon name="chess" size="big"></Icon>
                  </div>
                  <FormGroup style={{ justifyContent: 'center', textAlign: 'center'}}>
                    <FormField>
                      <label>Game ID</label>
                      <input id='gameId' placeholder="Enter a Game ID to join" onChange={(event)=>setGameId(event.target.value)}></input>
                    </FormField>
                  </FormGroup>
                  <FormGroup style={{ justifyContent: 'center', textAlign: 'center'}}> 
                    <FormField>
                      <label>Join Game</label>
                      <Button fluid color='teal'onClick={(event)=>{handleJoinGame(event)}}>Join</Button>
                    </FormField>
                  </FormGroup>
                </Form>
              </Segment>
            </div>
          );
    }
    else{
      console.log('rec oppName:'+oppName);
      return <Navigate to={"/join-game/"+gameId} state={{color:color,gameId:gameId ,userName: {oppName: oppName, myName:localStorage.getItem('userName')}}}></Navigate>
    }
}
export default JoinGame;