import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import PasswordState from "./context/passwords/PasswordState";
import Alert from "./components/Alert";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import AlertState from "./context/alert/AlertState";
import { useContext } from "react";
function App() {
  
  return (
    <> 
    <PasswordState>
      <AlertState> 
      <BrowserRouter>
        <Navbar></Navbar>
        <Alert></Alert>
        <div className="" 
        // style={{marginLeft:"3em"}}
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      </AlertState>
    </PasswordState>
    </>
  );
}
 
export default App;










