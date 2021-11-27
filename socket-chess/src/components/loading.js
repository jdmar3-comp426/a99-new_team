import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';


import React, { useState } from 'react';
//import ChessBoard from "./ChessBoard";
import { v4 as uuidv4 } from 'uuid';
import { Select } from 'semantic-ui-react';
import { useNavigate, useLocation } from 'react-router';
import md5 from 'md5';
const socket = require("../connect/clientSocket.js").sock;

function Loading(props) {
    const state = useLocation();
    const gameId = state.gameId;
    const color = state.color;
    const navigate=useNavigate();
    const [start, decideStart] = useState(false);
  

    useEffect(() => 
    {
        socket.on("start game", (userId) => {
            navigate("/new-game/"+ gameId +"/"+ color)
        })
    }
    );

    return(
        <div>
            
        </div>
    );
};


  
  export default CreateNewGame;

