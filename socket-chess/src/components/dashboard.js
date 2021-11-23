import { useState } from "react";
import { useNavigate } from "react-router";
import auth from "../authentication/authenticator";




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