import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import auth from "../authentication/authenticator";
import axios from 'axios';
import { Button, Segment, Icon } from 'semantic-ui-react';




function DashBoard(props){
    const [state, ]=useState({username:localStorage.getItem('userName')});
    const [data,setData]= useState({'eloRating':600,'winsAsWhite':0,'winsAsBlack':0, 'lossesAsWhite':0,
                                    'lossesAsBlack':0, 'drawsAsWhite':0, 'drawsAsBlack':0});
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

    useEffect( ()=>{
        async function fetchData() {
            try{
                const res= await axios.get('http://localhost:5000/app/getUserData/'+state.username);
                setData(res.data);
                console.log(res.data);
            }catch(error){
                console.log('Failed to Load User Data');
                console.log(error);
            }
        }

        fetchData();        
    },[]);

    return (
        <div>
            <Segment inverted color="blue" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignContent: 'spaceBetween'}}>
                <h1>{state.username}'s Dashboard</h1>
                <Icon name="chess" size="big"></Icon>
            </Segment>
            
            <Segment vertical clearing style={{ textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                <h2 style={{ marginLeft: 'auto', paddingLeft: '10rem'}}>Welcome to Your DashBoard, {state.username}</h2>
                <div style={{ marginLeft: 'auto', paddingRight: '1rem'}}>
                    <Button color="red" onClick={handleClick} style={{  }}>Log Out</Button>
                </div>
                
            </Segment>

            <div style={{ textAlign: 'center' }}>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins: {data.winsAsBlack + data.winsAsWhite}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Losses: {data.lossesAsBlack + data.lossesAsWhite}</h2>
                    {(data.winsAsBlack + data.winsAsWhite + data.lossesAsBlack + data.lossesAsWhite + data.drawsAsBlack + data.drawsAsWhite) === 0 ? (
                        <h2 style={{ display: 'inline-block', padding: '20px' }}>Win Percentage: - </h2>
                    ) : (
                        <h2 style={{ display: 'inline-block', padding: '20px' }}>Win Percentage: {((data.winsAsBlack + data.winsAsWhite) / (data.winsAsBlack + data.winsAsWhite + data.lossesAsBlack + data.lossesAsWhite+data.drawsAsBlack + data.drawsAsWhite)*100)}%</h2>
                    )}
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins as Black: {data.winsAsBlack}</h2>
                    <h2 style={{ display: 'inline-block', padding: '20px' }}>Wins as White: {data.winsAsWhite}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button basic color="green" onClick={handleNewGame}>Click for New Game</Button>
               < Button color="green" onClick={handleJoinGame}>Click to Join a game </Button>
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