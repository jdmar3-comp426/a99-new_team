import axios from 'axios';

class Authenticator{

    constructor() {
        this.authenticated = false;
    }

    async LogIn(loginInfo, callBack)
    {
      console.log(loginInfo);
      // let axiosConfig = {
      //   headers: {
      //       'Content-Type': 'application/json',
      //   }
      // };
        console.log("sending post");
        const response = await axios.post('http://localhost:5000/app/verifyLogin', {
            user: loginInfo.username,
            pass: loginInfo.password
          })
          
          if(response.data.valid){
            this.authenticated=true;
            localStorage.setItem('userName',loginInfo.username);
          }
          else{
            this.authenticated=false;
          }

          callBack()
    }
    LogOut(callBack){
      this.authenticated=false;
      localStorage.removeItem('userName');
      callBack();
    }
    isAuthenticated(){
        return this.authenticated;
    }
}

const auth = new Authenticator();

export default auth;