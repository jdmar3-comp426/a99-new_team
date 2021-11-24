import './App.css';
import LandingPage from './components/landing'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/login';
import Register from './components/registerClass';
import ProtectedRoute from './components/protectedroute';
import DashBoard from './components/dashboard';
import 'semantic-ui-css/semantic.min.css';
import CustomNav from './components/navigation';
function App() {

  return (
      <Router>
        
        <Routes>
          <Route exact path="/" element={<div><CustomNav currPage='landing'/> <LandingPage></LandingPage></div>}>
          </Route>

          <Route exact path="/login" element={<div><CustomNav currPage='login'/><Login></Login></div>}>
          </Route>

          <Route exact path="/register" element={<div><CustomNav currPage='register'/><Register></Register></div>}>
          </Route>

          <Route exact path = '/private-dashboard' element={
          
          <ProtectedRoute>

              <CustomNav currPage='dashBoard'>
                {(isActive,setActive)=>{
                   return <Link to="/private-dashboard" className={isActive === "dashboard" ? "active item" : "item"} onClick={() => setActive("dashboard")}> User DashBoard</Link>
                  }
                }
              </CustomNav>

            <DashBoard></DashBoard>

          </ProtectedRoute>}>

            </Route>

        </Routes>
      </Router>
  );
}

export default App;
