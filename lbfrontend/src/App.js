import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import SignIn from './Components/Pages/Public/SignIn/SignIn';
import './App.css';

function App() {
  return (
    <Router>
      <Route component={Home} path="/" exact />
      <Route component={Login} path="/login" exact/>
      <Route component={SignIn} path="/signin" exact/>
    </Router>
  );
}

export default App;
