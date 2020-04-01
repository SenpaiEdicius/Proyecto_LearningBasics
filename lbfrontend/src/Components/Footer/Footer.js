import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {IoIosLogIn, IoIosHome} from 'react-icons/io';
import './Footer.css'

export default class Footer extends Component{
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
        if(this.props.hide && true){
            return null;
        }
        if(this.props.auth && this.props.auth.isLogged && true){
            return(
                <footer>
                    <div>
                       <nav>
                            <ul>
                                <li><p>You're Logged</p></li>
                                <li><Link to ="/"><IoIosHome/>Home</Link></li>
                                <li><span onClick={this.logoutOnClick}><IoIosLogIn/>Logout</span></li>
                            </ul>   
                        </nav> 
                    </div>
                    <div>   
                        <p>Learning Basics™ Todos los Derechos Reservados</p>
                    </div>
                </footer>
            );
        }
        else{
            return(
                <footer>
                    <div>
                       <nav>
                            <ul>
                                <p>Not Logged</p>
                                <Link to ="/"><IoIosHome/>Home</Link>
                                <Link to="/login"><IoIosLogIn/>Login</Link>
                            </ul>   
                        </nav> 
                    </div>
                    <div>   
                        <p>Learning Basics™ Todos los Derechos Reservados</p>
                    </div>
                </footer>
            );
    
        }
    }
}