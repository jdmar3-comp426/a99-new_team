import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import auth from '../authentication/authenticator'



function Login(props){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    let navigate= useNavigate();

    function handleClick(event){
        event.preventDefault();
        if(userName!=='' && password!=='')
            auth.LogIn({'username':userName, 'password':password},()=>{console.log(this); navigate('/private-dashboard') });
        else
            alert("Please enter Username and Password");
    }

    return (
                    <div>
                        <h1>Login</h1>
                        <form>
                            <label>Username : </label>
                            <input type="text" 
                                id="username" 
                                placeholder="Username" 
                                onChange = {(event) => setUserName(event.target.value)}>
                            </input>
                            <label>Password : </label>
                            <input 
                                type="text" 
                                id="password" 
                                placeholder="Password" 
                                onChange = {(event) => setPassword(event.target.value)}>
                            </input>
                            <button 
                                type="submit" 
                                onClick={handleClick}>
                                Submit
                            </button>
                        </form>
                    </div>
                );
}

// class Login extends Component {
//     constructor(props){
//       super(props);
//       this.state={
//       'username':'',
//       'password':'',
//       }
//      }

//     handleClick(event) {
//         event.preventDefault();
//         if(this.state.username!=='' && this.state.password!=='')
//             auth.LogIn({'username':this.state.username, 'password':this.state.password},()=>{console.log(this);});
//         else
//             alert("Please enter Username and Password");
//         return
//     }

//     render() {
        
//         return (
//             <div>
//                 <h1>Login</h1>
//                 <form>
//                     <label>Username : </label>
//                     <input type="text" 
//                         id="username" 
//                         placeholder="Username" 
//                         onChange = {(event) => this.setState({username:event.target.value})}>
//                     </input>
//                     <label>Password : </label>
//                     <input 
//                         type="text" 
//                         id="password" 
//                         placeholder="Password" 
//                         onChange = {(event) => this.setState({password:event.target.value})}>
//                     </input>
//                     <button 
//                         type="submit" 
//                         onClick={(event) => this.handleClick(event)}>
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         );
//       }
//     }
    export default Login;