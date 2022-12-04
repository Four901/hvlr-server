import React from 'react'
import HVLR from "./Components/HVLR";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    
    <Router>
    
    
    <div className='container' style={{display:'flex',float:'center'}}>
    

    <Routes> 
    
    
    <Route exact path="/sign-up"  element={ <SignUp  />} />
    
    <Route  exact path="/sign-in"  element={ <Login  />} />
    
    <Route exact path="/"  element={ <SignUp  />} />
    <Route exact path="/hvlr"  element={ <HVLR />} />
    
      </Routes>
    
    </div>
    
    </Router>
  );
}

export default App;
