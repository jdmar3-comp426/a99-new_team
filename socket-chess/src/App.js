import './App.css';
import LandingPage from './components/landing'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/login';
import Register from './components/registerClass';
function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/register"> Register</Link></li>
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

        </Routes>
      </Router>
  );
}

export default App;
