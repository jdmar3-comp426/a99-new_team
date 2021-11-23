import axios from 'axios';

class Authenticator{

    constructor() {
        this.authenticated = False;
    }
    LogIn(username, password)
    //userPass is an object with username and password
    {

        axios.post('/user', {
            user: username,
            pass: password
          })
          .then(function (response) {
            console.log(response);
            this.authenticated = True;
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    LogOut(){}
    isAuthenticated(){
        return this.authenticated;
    }
}

const auth = new Authenticator();

export default auth;