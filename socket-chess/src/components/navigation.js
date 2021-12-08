import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
function CustomNav(props){
  const currPage=useLocation();
  console.log(currPage.pathname);
  const [isActive, setActive] = useState(props.currPage);

  useEffect(()=>{
    setActive(currPage.pathname);
  },[currPage.pathname])
  return(
        <div>
          <nav>
          <div className="ui pointing secondary menu">
              {props.children && props.children(isActive,setActive)}
            </div>
          </nav>
        </div>
    );
}

export default CustomNav