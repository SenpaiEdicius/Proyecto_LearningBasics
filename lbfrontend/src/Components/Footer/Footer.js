import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {IoIosLogIn, IoIosHome} from 'react-icons/io';
import './Footer.css'

export default class Footer extends Component{
    render(){
        return(
            <footer>
                <div>
                   <nav>
                        <ul>
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