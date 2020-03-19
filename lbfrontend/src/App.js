import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Pages/Public/Home/Home';
import logo from './logo.svg';
import Page from './Components/Pages/Page';
import './App.css';

function App() {
  return (
    <Router>
      <Route component={Home} path="/" exact />
    </Router>
  );
}

export default App;
