import 'semantic-ui-css/semantic.min.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
function CustomNav(props){
    const [isActive, setActive] = useState(props.currPage);
    console.log(props.children);
    return(
        <div>
          <nav>
          <div className="ui pointing secondary menu">
              <Link to="/" className={isActive === "landing" ? "active item" : "item"} onClick={() => setActive("landing")}>Home</Link>
              <Link to="/login" className={isActive === "login" ? "active item" : "item"} onClick={() => setActive("login")}>Log In</Link>
              <Link to="/register" className={isActive === "register" ? "active item" : "item"} onClick={() => setActive("register")}> Register</Link>
              {props.children && props.children(isActive,setActive)}
            </div>
          </nav>
        </div>
    );
}

export default CustomNav