import {Component} from "react";
import { Form, Segment, FormGroup, FormField } from "semantic-ui-react";
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
       <Segment padded="very" style={{ textAlign: "center", width: "65%", margin: "auto", marginTop: "4rem"}}>
        <h1 style={{ textAlign: 'center', paddingBottom: "2rem"}}>Register</h1>
            <Form size="huge">  
                <FormGroup style={{ display: 'flex', justifyContent: "center", textAlign: "left"}}>
                    <FormField width={8}>
                        <label> Nickname: </label>         
                        <input type="text" name="nickname" size="15" onChange={(event) => this.setState({'nickname':event.target.value})}/> 
                    </FormField>
                </FormGroup>
                <FormGroup style={{ display: 'flex', justifyContent: "center", textAlign: "left"}}>
                    <FormField width={8}>
                        <label> Username: </label>     
                        <input type="text" name="username" size="15" onChange={(event) => this.setState({'username':event.target.value})}/>
                        <p>Username is taken!</p> 
                    </FormField>
                </FormGroup>
                <FormGroup style={{ display: 'flex', justifyContent: "center", textAlign: "left"}}>
                    <FormField width={8}>
                        <label>Password:</label>
                        <input type="Password" id="pass" name="pass" onChange={(event) => this.setState({'password':event.target.value})}/> 
                    </FormField>
                </FormGroup>
                <FormGroup style={{ display: 'flex', justifyContent: "center", textAlign: "left"}}>
                    <FormField width={8}>
                        <label>Re-type password:</label>  
                        <input type="Password" id="repass" name="repass" onChange={(event) => this.setState({'repassword':event.target.value})} onBlur={this.handleChangepass}/>  
                    </FormField>
                </FormGroup>
                
                { !this.state.repeatpass && this.state.password!=='' && <p>passwords does not match!</p>}
                
                <button type="submit" className="ui green button" onClick={(event) => this.handleRegister(event)}>Submit</button> 
            </Form>  
        </Segment>
    
    </div>
    );}


}
export default Register