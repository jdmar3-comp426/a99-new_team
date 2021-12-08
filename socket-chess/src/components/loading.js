import  { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
const socket = require("../connect/clientSocket.js").sock;

function Loading(props) {
    const location = useLocation();
    const gameId = location.state.gameId;
    const color = location.state.color;
    const [start, decideStart] = useState(false);
    const [oppName,setOppName]= useState('');
    const [sentOppInfo,setSentOppInfo]= useState(false);
  

    useEffect(() => 
    {

        socket.on('status',(msg)=>(alert(msg)));
        
        socket.on("start game", (userName) => {
            if(!(userName===localStorage.getItem('userName'))){
                setOppName(userName);
                decideStart(true);
            }
            else{
                setOppName('');
                decideStart(false);
            }
        });

        socket.on("give userName and Color",(oppSocketId)=>{
            socket.emit("recieved userName and color from creator",{color:color, gameId:gameId ,userName: localStorage.getItem('userName')});
            setSentOppInfo(true);
        })

    }
    ,[]);
    if(!(start && sentOppInfo)){
        return(<div>
            <h1>LOADING .....</h1>
            <h2> Waiting for other player to join</h2>
            <h3> Game Id : {gameId}</h3>
        </div>);
    }
    else{
        
        return <Navigate to={"/new-game/"+gameId} state={{color:color,gameId:gameId ,userName: {oppName: oppName, myName:localStorage.getItem('userName')}}}></Navigate>
    }
};


  
  export default Loading;

