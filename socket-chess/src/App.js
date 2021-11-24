import './App.css';
import LandingPage from './components/landing'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/login';
import Register from './components/registerClass';
import ProtectedRoute from './components/protectedroute';
import DashBoard from './components/dashboard';
import { useState } from "react";
import 'semantic-ui-css/semantic.min.css';
import Game from "./components/game";

function App() {
  const [isActive, setActive] = useState("landing");

  return (
      <Router>
        <div>
          <nav>
          <ul className="ui pointing secondary menu">
              <li className={isActive === "landing" ? "active item" : "item"} onClick={() => setActive("landing")}><Link to="/">Home</Link></li>
              <li className={isActive === "login" ? "active item" : "item"} onClick={() => setActive("login")}><Link to="/login">Log In</Link></li>
              <li className={isActive === "register" ? "active item" : "item"} onClick={() => setActive("register")}><Link to="/register"> Register</Link></li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route exact path="/" element={<LandingPage></LandingPage>}>
          </Route>

          <Route exact path="/login" element={<Login></Login>}>
          </Route>

          <Route exact path="/register" element={<Register></Register>}>
          </Route>

          <Route exact path = '/private-dashboard' element={<ProtectedRoute><DashBoard></DashBoard></ProtectedRoute>}></Route>

          <Route exact path = '/new-game/' element={<Game/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
