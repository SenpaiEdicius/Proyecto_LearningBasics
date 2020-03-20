import React from 'react';
import { Link } from 'react-router-dom'; 

import { FaLeanpub } from 'react-icons/fa'
import './Header.css';

export default ({children})=>{
    return(
        <header>
            <div>
                <Link to="/"><FaLeanpub/></Link>
                <p>Learning Basics</p>
                <Link to="/login">Log In</Link>
            </div>
            <h1>{children}</h1>
        </header>
    );   
}