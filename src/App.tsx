//neccessary imports
import ContactPage from "./components/ContactPage/ContactPage"
import MapPage from "./components/MapPage/MapPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; // imports for react routing 
import "./App.css"
import Sidebar from "./components/Sidebar/Sidebar";
const App = () => {
  return (
    <>
      <Router>
        <div className="app_main">   {/*high level structure of the app sets here*/}
                <Sidebar/>          {/*Sidebar component for choosing between map and contact page*/}
                <div className="App">
                    <Routes>  
                      <Route path="/contact" element={<ContactPage />}></Route> {/*Contact Component*/}
                      <Route path="/map" element={<MapPage />}></Route>   {/*Map Component*/}
                    </Routes>
                </div>
        </div>
      </Router>
    </>
  )
}

export default App