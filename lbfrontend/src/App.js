import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom';
import {setJWTBearer, setLocalStorage, getLocalStorage, removeLocalStorage} from './Components/Utilities/Utilities';
import  PrivateRoute  from './Components/SecureRoutes/SecureRoutes';
/*--------------Public Routing------------------*/
import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import Forgot from './Components/Pages/Public/Forgot/Forgot';
import AllCourses from './Components/Pages/Public/Courses/Courses';
import SignIn from './Components/Pages/Public/SignIn/SignIn';
/*--------------Private Routing------------------*/
import MyCourses from './Components/Pages/Private/MyCourses/MyCourses';
import UpdateUser from './Components/Pages/Private/UpdateUser/UpdateUser';
import UpdatePassword from './Components/Pages/Private/UpdatePassword/UpdatePassword';
import Nodes from './Components/Pages/Private/Nodes/Nodes';
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
    removeLocalStorage('id');
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
        <Switch>
          
          <Route render={(props) => { return (<Home {...props} auth={auth} />) }} path="/" exact />
          <Route render={(props) => { return (<Login {...props} auth={auth} login={this.login} />)}} path="/login" exact/>
          <Route render={(props) => { return (<SignIn {...props} auth={auth} />) }} path="/register" exact/>
          <Router render={(props) => { return (<Forgot {...props} auth={auth}/>)}} path="/forgot" exact/>
          <PrivateRoute component={MyCourses} path="/mycourses" exact auth={auth}/>
          <PrivateRoute component={Access} path="/access" exact auth={auth}/>
          <PrivateRoute component={Level} path="/access/level/:userType/:op" exact auth={auth}/>
          <PrivateRoute component={Pages} path="/pages" exact auth={auth}/>
          <PrivateRoute component={NewPage} path="/pages/newPage" exact auth={auth}/>
          <PrivateRoute component={NewPage} path="/pages/modify/:id" exact auth={auth}/>
          <Route render={(props) => { return (<Found {...props} auth={auth} />) }} path="/404" exact />
          
          <Redirect to="/404" auth={auth}/>
        </Switch>
        <Route render={(props) => { return (<AllCourses {...props} auth={auth} />) }} path="/courses" exact/>
        <PrivateRoute component={UpdatePassword} path='/updatePass' exact auth={auth}/>
        <PrivateRoute component={UpdateUser} path="/update" exact auth={auth}/>
        <PrivateRoute component={Nodes} path='/course/classes/:id' auth={auth}/>
      </Router>
      );  
  }
}

export default App;
