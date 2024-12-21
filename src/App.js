// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
// import { Navbar } from "react-bootstrap";
// import CricketInfoNavbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import BatterCards from "./Cards";

function App() {
  return (
    // <div>
    //   {/* <CricketInfoNavbar/> */}
    //   {/* <BatterCards/> */}
    //   <LoginPage/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/Cards" element={<BatterCards/>}/> 
      </Routes>
    </Router>
  );
}

export default App;