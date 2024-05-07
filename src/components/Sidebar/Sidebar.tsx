import {Link } from "react-router-dom";
import "./Sidebar.css"
const Sidebar = () => {
  return (
      <div className="App-Sidebar">  
        <div id="option1"><Link to="/">Contact Page</Link></div>
        <div id="option2"><Link to="/map">Map and Chart</Link></div>
      </div> 
  )
}

export default Sidebar