import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 

import { FaLeanpub } from 'react-icons/fa'
import './Header.css';

export default class Header extends Component{
    constructor(){
        super();
        this.logoutOnClick = this.logoutOnClick.bind(this);
    }
    logoutOnClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.auth.logout();
      }
    render(){
        if(this.props.auth && this.props.auth.isLogged && true){
            return(
                <header>
                    <div>
                        <Link to="/"><FaLeanpub/></Link>
                        <p>Learning Basics</p>
                        <span onClick={this.logoutOnClick}>Logout</span>
                    </div>
                    <h1>{this.props.title}</h1>
                </header>
            );       
        }
        else{
            return(
                <header>
                    <div>
                        <Link to="/"><FaLeanpub/></Link>
                        <p>Learning Basics</p>
                        <Link to="/login">Log In</Link>
                    </div>
                    <h1>{this.props.title}</h1>
                </header>
            );       
        }
    }
}