import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {setJWTBearer, setLocalStorage, getLocalStorage, removeLocalStorage} from './Components/Utilities/Utilities';
import  PrivateRoute  from './Components/SecureRoutes/SecureRoutes';
/*--------------Public Routing------------------*/
import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import Forgot from './Components/Pages/Public/Forgot/Forgot';
import SignIn from './Components/Pages/Public/SignIn/SignIn';
/*--------------Private Routing------------------*/
import MyCourses from './Components/Pages/Private/MyCourses/MyCourses';
import Access from './Components/Pages/Private/Admin/Access/Access';
import Level from './Components/Pages/Private/Admin/Access/Level';
/*--------------CSS------------------*/
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      user: getLocalStorage('user')||{},
      jwt: getLocalStorage('jwt')||'',
      id: getLocalStorage('id')||'',
      isLogged: false
    }
    if(this.state.jwt!==''){
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
      id: fuser.user._id,
      type:fuser.user.userType,
      jwt: jwt
    });
    setJWTBearer(jwt);
    setLocalStorage('jwt', jwt);
    setLocalStorage('user', fuser);
    setLocalStorage('id', this.state.id);
    setLocalStorage('type',this.state.type)
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
      id: this.state.id,
      logout: this.logout
    };
    return (
      <Router>
        <Route render={(props) => { return (<Home {...props} auth={auth} />) }} path="/" exact />
        <Route render={(props) => { return (<Login {...props} auth={auth} login={this.login} />)}} path="/login" exact/>
        <Route render={(props) => { return (<SignIn {...props} auth={auth} />) }} path="/register" exact/>
        <Route render={(props) => { return (<Forgot {...props} auth={auth}/>)}} path="/forgot" exact/>
        <PrivateRoute component={MyCourses} path="/mycourses" exact auth={auth}/>
        <PrivateRoute component={Access} path="/access" exact auth={auth}/>
        <PrivateRoute component={Level} path="/access/level/:userType/:op" exact auth={auth}/>
        
      </Router>
      );  
  }
}

export default App;
