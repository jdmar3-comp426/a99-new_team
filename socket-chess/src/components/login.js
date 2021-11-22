import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
      super(props);
      this.state={
      username:'',
      password:''
      }
     }

    handleClick() {
        return
    }

    render() {
        
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <label>Username : </label>
                    <input type="text" 
                        id="username" 
                        placeholder="Username" 
                        onChange = {(event,newValue) => this.setState({username:newValue})}>
                    </input>
                    <label>Password : </label>
                    <input 
                        type="text" 
                        id="password" 
                        placeholder="Password" 
                        onChange = {(event,newValue) => this.setState({password:newValue})}>
                    </input>
                    <button 
                        type="submit" 
                        onClick={(event) => this.handleClick(event)}>
                        Submit
                    </button>
                </form>
            </div>
        );
      }
    }
    export default Login;