import ContactPage from "./components/ContactPage/ContactPage"
import MapPage from "./components/MapPage/MapPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import Sidebar from "./components/Sidebar/Sidebar";
const App = () => {
  return (
    <>
      <Router>
                <div className="App">
                    <Sidebar/>
                    <Routes>
                      <Route path="/contact" element={<ContactPage />}></Route>
                      <Route path="/map" element={<MapPage />}></Route>
                    </Routes>
                </div>
            </Router>
    </>
  )
}

export default App