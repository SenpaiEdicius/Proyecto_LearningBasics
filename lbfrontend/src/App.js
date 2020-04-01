import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {setJWTBearer, setLocalStorage, getLocalStorage, removeLocalStorage} from './Components/Utilities/Utilities';

import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import SignIn from './Components/Pages/Public/SignIn/SignIn';
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      user: getLocalStorage('user')||{},
      jwt: getLocalStorage('jwt')||'',
      isLogged: false
    }
    if(this.state.jwt!=''){
      this.state.isLogged=true;
      setJWTBearer(this.state.jwt);
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  login(user){
    const {jwt, ...fuser} = user;
    this.setState({
      ...this.state,
      isLogged:true,
      user: fuser,
      jwt: jwt
    });
    setJWTBearer(jwt);
    setLocalStorage('jwt', jwt);
    setLocalStorage('user', fuser);
  }

  logout(){
    removeLocalStorage('jwt');
    removeLocalStorage('user');
    this.setState({
      ...this.state,
      isLogged:false,
      user:{},
      jwt:''
    });
  }

  render(){
    const auth = {
      isLogged:this.state.isLogged,
      user:this.state.user,
      logout: this.logout
    };
    return (
      <Router>
        <Route render={(props) => { return (<Home {...props} auth={auth} />) }} path="/" exact />
        <Route render={(props) => { return (<Login {...props} auth={auth} login={this.login} />)}} path="/login" exact/>
        <Route render={(props) => { return (<SignIn {...props} auth={auth} />) }} path="/signin" exact/>
      </Router>
    );  
  }
}

export default App;
