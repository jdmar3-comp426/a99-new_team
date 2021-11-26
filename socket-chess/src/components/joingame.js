import { useState } from "react";
import { useNavigate } from "react-router";

function JoinGame(){
    const [gameId,setGameId]=useState('');
    const navigate=useNavigate();

    function handleJoinGame(event){
      event.preventDefault();
      if(gameId===''){alert("Please enter a Game ID first");
        return
      }
      navigate("/join-game/"+gameId);
    }

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
export default JoinGame;