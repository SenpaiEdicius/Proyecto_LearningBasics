import React, { Component } from 'react';
import {IoIosLogIn, IoIosHome} from 'react-icons/io';
import './Footer.css'

export default class Footer extends Component{
    render(){
        return(
            <footer>
                <div>
                   <nav>
                        <ul>
                            <li><IoIosHome/>Home</li>
                            <li><IoIosLogIn/>Login</li>
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