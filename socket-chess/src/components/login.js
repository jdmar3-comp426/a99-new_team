import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
      super(props);
      this.state={
      username:'',
      password:''
      }
     }

    handleClick(event) {
        event.preventDefault();
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
                        onChange = {(event) => this.setState({username:event.target.value})}>
                    </input>
                    <label>Password : </label>
                    <input 
                        type="text" 
                        id="password" 
                        placeholder="Password" 
                        onChange = {(event) => this.setState({password:event.target.value})}>
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