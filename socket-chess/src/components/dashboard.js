import { useState } from "react";
import { useNavigate } from "react-router";
import auth from "../authentication/authenticator";
import { Button } from 'semantic-ui-react';
import ChessBoard from "./ChessBoard";



function DashBoard(props){
    const [state, ]=useState({username:localStorage.getItem('userName')});
    let navigate=useNavigate();

    function handleClick(){
        auth.LogOut(()=>{navigate('/')});
    }

    return (
        <div>
            <h1>Welcome to Your DashBoard {state.username}</h1>
            <button onClick={handleClick}>Log Out</button>

            <div style={{ textAlign: 'center' }}>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins: {5}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Losses: {2}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Win Percentage: {71}%</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins as Black: {3}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins as White: {2}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button color="green">Click for New Game</Button>
            </div>
            
            <div>
                <ChessBoard/>
            </div>
            
        </div>

        
    );
}

// class DashBoard extends Component{
//     constructor(props){
//         super(props);
//         this.state={'username':localStorage.getItem('userName')};
//     }

//     handleClick(){
//         auth.LogOut(()=>{
//             this.props.history.push("/");
//         });
//     }

//     render(){
//         return (
//             <div>
//                 <h1>Welcome to Your DashBoard {this.state.username}</h1>
//                 <button onClick={this.handleClick.bind(this)}>Log Out</button>
//             </div>
//         );
//     }
// }

export default DashBoard;