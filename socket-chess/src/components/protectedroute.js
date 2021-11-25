import {Component } from "react";
import auth from '../authentication/authenticator'
import CustomNav from "./navigation";
//import { Navigate } from "react-router";

class ProtectedRoute extends Component{
    constructor(props){
        super(props);
        this.state={'authenticated':auth.isAuthenticated()};
    }

    componentDidMount(){
        if(localStorage.getItem('userName')){
            this.setState({'authenticated':true});
            auth.setAuthenticated(true);
        }
    }

    render(){
        console.log(this.props);
        return this.state.authenticated? this.props.children: <div><CustomNav currPage='login'></CustomNav><div><h1>LogIn Failed!</h1></div></div>//<Navigate to ='/'></Navigate>
    }
}

export default ProtectedRoute