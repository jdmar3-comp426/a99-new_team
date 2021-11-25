import { useState } from "react";
import { useNavigate } from "react-router";
import auth from "../authentication/authenticator";
import { Button, Segment, Icon } from 'semantic-ui-react';




function DashBoard(props){
    const [state, ]=useState({username:localStorage.getItem('userName')});
    let navigate=useNavigate();

    function handleClick(){
        auth.LogOut(()=>{navigate('/')});
    }

    function handleNewGame() {
        navigate("/create-game");
    }

    function handleJoinGame() {
        navigate("/join-game");
    }

    return (
        <div>
            <Segment inverted color="blue" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignContent: 'spaceBetween'}}>
                <h1>{state.username}'s Dashboard</h1>
                <Icon name="chess" size="big"></Icon>
            </Segment>
            
            <Segment vertical clearing style={{ textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                <h2 style={{ marginLeft: 'auto', paddingLeft: '10rem'}}>Welcome to Your DashBoard {state.username}</h2>
                <div style={{ marginLeft: 'auto', paddingRight: '1rem'}}>
                    <Button color="red" onClick={handleClick} style={{  }}>Log Out</Button>
                </div>
                
            </Segment>
           

            <div style={{ textAlign: 'center' }}>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins: {5}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Losses: {2}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Win Percentage: {71}%</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins as Black: {3}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins as White: {2}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button color="green" onClick={handleNewGame}>Click for New Game</Button>
               < Button color="green" onClick={handleJoinGame}>Click to Join </Button>
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