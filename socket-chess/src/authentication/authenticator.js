import axios from 'axios';

class Authenticator{

    constructor() {
        this.authenticated = false;
    }
    LogIn(username, password)
    {

        axios.post('/user', {
            user: username,
            pass: password
          })
          .then(function (response) {
            console.log(response);
            this.authenticated = true;
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