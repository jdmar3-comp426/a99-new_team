import {Component} from "react";
class Register extends Component{
constructor(props){
    super(props);
    this.state = {
        'register':false, 'nickname':'','username':'','password':'','repassword':'','repeatpass':true
      }
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChangepass = this.handleChangepass.bind(this);
}
handleRegister(event){
    if (this.repeatpass)
    {
        this.setState({'register':true});
    }
    else{
        this.setState({'register':false});
    }
}


handleChangepass(event) {
    this.setState({'repassword': event.target.value});
    if (this.password!==this.repassword){
        this.setState({'repeatpass':false})
    }
  }

render() {
    /*
    if (this.state.register){
        return (
            <div>
                <p>registered</p>
            </div>

        );
    }
    */
    return (

   <div>
       <p>Register</p>
    <form>  
      
    <label> Nickname </label>         
    <input type="text" name="nickname" size="15" onChange={(event, newValue) => this.setState({'nickname':newValue})}/>   
    <label> username: </label>     
    <input type="text" name="username" size="15" onChange={(event, newValue) => this.setState({'username':newValue})}/>
    <p>username is taken!</p>
       


    Password:  
    <input type="Password" id="pass" name="pass" onChange={(event, newValue) => this.setState({'password':newValue})}/> 
     
    Re-type password:  
    <input type="Password" id="repass" name="repass" onChange={this.handleChangepass}/> 
    <p>passwords does not match!</p>
    
    <button type="submit"  onClick={(event) => this.handleRegister(event)}>Submit</button> 
    </form>  
    </div>
    );}


}
export default Register