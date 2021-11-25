import 'semantic-ui-css/semantic.min.css';
import { useState } from "react";
function CustomNav(props){
    const [isActive, setActive] = useState(props.currPage);
    console.log(props.children);
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