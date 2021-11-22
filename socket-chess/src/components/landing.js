import {Component} from "react";
import Login from './login';
import Register from "./registerClass";

class LandingPage extends Component {

    constructor(props){
      super(props);
      this.state={'logIn':false, 'register':false};
    }

    handleLogIn(){
        this.setState({'logIn':true, 'register':false});
    }

    handleRegister(){
        this.setState({'logIn':false, 'register':true});
    }

    handleHome(){
        this.setState({'logIn':false, 'register':false});
    }

    render(){
        if(this.state.logIn===true && this.state.register===false){
            return (<div>
                <Login></Login>
                <button  onClick={this.handleRegister.bind(this)}>Register</button>
                <button onClick={this.handleHome.bind(this)}>Home</button>
            </div>);
        }
        else if(this.state.logIn===false && this.state.register===true){
            return (<div>
                <Register></Register>
                <button  onClick={this.handleLogIn.bind(this)}>Login</button>
                <button onClick={this.handleHome.bind(this)}>Home</button>
            </div>);
        }
        else{
            return (
                <div>
                    <button  onClick={this.handleLogIn.bind(this)}>Login</button>
                    <button  onClick={this.handleRegister.bind(this)}>Register</button>
                </div>
            );
        }
    }
}

export default LandingPage;