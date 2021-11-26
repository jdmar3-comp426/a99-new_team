import './App.css';
import LandingPage from './components/landing'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/login';
import Register from './components/registerClass';
import ProtectedRoute from './components/protectedroute';
import DashBoard from './components/dashboard';
import 'semantic-ui-css/semantic.min.css';
import CustomNav from './components/navigation';
import CreateNewGame from "./components/newgame";
import JoinGame from './components/joingame';
import PlayGame from './components/playgame';
import React from 'react';

function App() {

  const fragment = (isActive,setActive) =>{ return <React.Fragment>
  <Link to="/" className={isActive === "landing" ? "active item" : "item"} onClick={() => setActive("landing")}>Home</Link>
  <Link to="/login" className={isActive === "login" ? "active item" : "item"} onClick={() => setActive("login")}>Log In</Link>
  <Link to="/register" className={isActive === "register" ? "active item" : "item"} onClick={() => setActive("register")}> Register</Link>
  </React.Fragment>}
  return (
      <Router>
        
        <Routes>
          <Route exact path="/" element={<div><CustomNav currPage='landing'>{fragment}</CustomNav> <LandingPage></LandingPage></div>}>
          </Route>

          <Route exact path="/login" element={<div><CustomNav currPage='login'>{fragment}</CustomNav><Login></Login></div>}>
          </Route>

          <Route exact path="/register" element={<div><CustomNav currPage='register'>{fragment}</CustomNav><Register></Register></div>}>
          </Route>

          <Route exact path = '/private-dashboard' element={
          
          <ProtectedRoute>

              <CustomNav currPage='dashboard'>
                {(isActive,setActive)=>{
                   return( 
                   <React.Fragment>
                     <Link to="/private-dashboard"  className={isActive === "dashboard" ? "active item" : "item"} onClick={() => setActive("dashboard")}> User DashBoard</Link>
                     <Link to ="/create-game" className={isActive === "newgame" ? "active item" : "item"} onClick={() => setActive("newgame")}> Start New Game </Link>
                     <Link to ="/join-game" className={isActive === "joingame" ? "active item" : "item"} onClick={() => setActive("joingame")}> Join a Game </Link>
                   </React.Fragment>
                   );
                   
                  }
                }
              </CustomNav>

            <DashBoard></DashBoard>

          </ProtectedRoute>}>

            </Route>

          <Route exact path = '/create-game' element={
            <ProtectedRoute>
              <CustomNav currPage='creategame'>
                {(isActive,setActive)=>{
                   return( 
                   <React.Fragment>
                     <Link to="/private-dashboard"  className={isActive === "dashboard" ? "active item" : "item"} onClick={() => setActive("dashboard")}> User DashBoard</Link>
                     <Link to ="/create-game" className={isActive === "creategame" ? "active item" : "item"} onClick={() => setActive("creategame")}> Start New Game </Link>
                     <Link to ="/join-game" className={isActive === "joingame" ? "active item" : "item"} onClick={() => setActive("joingame")}> Join a Game </Link>
                   </React.Fragment>
                   );
                   
                  }
                }
              </CustomNav>

              <CreateNewGame/>
            </ProtectedRoute>
            }></Route>



          <Route exact path = '/new-game/:gameid/:color' element={<ProtectedRoute><PlayGame></PlayGame></ProtectedRoute>}></Route>


          <Route exact path = '/join-game' element={
            <ProtectedRoute>
              <CustomNav currPage='joingame'>
                {(isActive,setActive)=>{
                   return( 
                   <React.Fragment>
                     <Link to="/private-dashboard"  className={isActive === "dashboard" ? "active item" : "item"} onClick={() => setActive("dashboard")}> User DashBoard</Link>
                     <Link to ="/create-game" className={isActive === "newgame" ? "active item" : "item"} onClick={() => setActive("creategame")}> Start New Game </Link>
                     <Link to ="/join-game" className={isActive === "joingame" ? "active item" : "item"} onClick={() => setActive("joingame")}> Join a Game </Link>
                   </React.Fragment>
                   );
                   
                  }
                }
              </CustomNav>

              <JoinGame/>
            </ProtectedRoute>
            }>
          </Route>  
          
          <Route exact path='/join-game/:gameId' element={<ProtectedRoute><PlayGame></PlayGame></ProtectedRoute>}></Route>

        </Routes>
      </Router>
  );
}

export default App;
