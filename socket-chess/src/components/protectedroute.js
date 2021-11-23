import {Component } from "react";
import auth from '../authentication/authenticator'
//import { Navigate } from "react-router";

class ProtectedRoute extends Component{
    constructor(props){
        super(props);
        this.state={'authenticated':auth.isAuthenticated()};
    }

    render(){
        const {children}=this.props;
        return this.state.authenticated? children: <div><h1>LogIn Failed!</h1></div>//<Navigate to ='/'></Navigate>
    }
}

export default ProtectedRoute