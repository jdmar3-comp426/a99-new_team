import { useEffect, useState } from "react";
import { Navigate } from "react-router";
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
          setOppName(data.userName);
        });

        socket.on('status',(msg)=>(alert(msg)));
    }
    );

    function handleJoinGame(event){
      event.preventDefault();
      if(gameId===''){
        alert("Please enter a Game ID first");
        return;
      }

      socket.emit("playerJoinGame", {gameId: gameId, userName: localStorage.getItem("userName")});
      socket.emit('request opponent username and color for joinee',gameId);
    }
    if(!start || (color==='' && oppName==='')){
        return(
            <div>
              <form className="ui form">
                <label>Game ID</label>
                <input id='gameId' placeholder="Enter a Game ID to join" onChange={(event)=>setGameId(event.target.value)}></input>
        
                <label>Join Game</label>
                <button onClick={(event)=>{handleJoinGame(event)}}>Start</button>
              </form>
            </div>
          );
    }
    else{

      return <Navigate to={"/join-game/"+gameId} state={{color:color,gameId:gameId ,userName: {oppName: oppName, myName:localStorage.getItem('userName')}}}></Navigate>
    }
}
export default JoinGame;