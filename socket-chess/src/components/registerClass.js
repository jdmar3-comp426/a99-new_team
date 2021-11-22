import {Component} from "react";
class Register extends Component{
constructor(props){
    super(props);
    this.state = {
        'register':false, 'nickname':'','username':'','password':'','repassword':'','repeatpass':false
      }
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChangepass = this.handleChangepass.bind(this);
}
handleRegister(event){
    event.preventDefault();
    if (this.state.repeatpass)
    {
        this.setState({'register':true});
    }
    else{
        this.setState({'register':false});
        alert("Cannot Submit!");
    }

}


handleChangepass(event) { //validate password
    console.log(this.state);
    if (!(this.state.password===this.state.repassword)){
        this.setState({'repeatpass':false});
    }
    else if(this.state.password!=='')
        this.setState({'repeatpass':true});
    else
        this.setState({'repeatpass':false});
  }

render() {
    if (this.state.register){
        return (
            <div>
                <p>registered</p>
            </div>

        );
    }
    
    return (

   <div>
       <p>Register</p>
    <form>  
      
    <label> Nickname </label>         
    <input type="text" name="nickname" size="15" onChange={(event) => this.setState({'nickname':event.target.value})}/>   
    <label> username: </label>     
    <input type="text" name="username" size="15" onChange={(event) => this.setState({'username':event.target.value})}/>
    <p>username is taken!</p>
       


    <label>Password:</label>
    <input type="Password" id="pass" name="pass" onChange={(event) => this.setState({'password':event.target.value})}/> 
     
    <label>Re-type password:</label>  
    <input type="Password" id="repass" name="repass" onChange={(event) => this.setState({'repassword':event.target.value})} onBlur={this.handleChangepass}/> 
    
    { !this.state.repeatpass && <p>passwords does not match!</p>}
    
    <button type="submit"  onClick={(event) => this.handleRegister(event)}>Submit</button> 
    </form>  
    </div>
    );}


}
export default Register