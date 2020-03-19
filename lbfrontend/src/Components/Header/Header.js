import React from 'react';
import { FaLeanpub } from 'react-icons/fa'
import './Header.css';

export default ({children})=>{
    return(
        <header>
            <div>
                <span><FaLeanpub/></span>
                <p>Learning Basics</p>
                <p>Log In</p>
            </div>
            <h1>{children}</h1>
        </header>
    );   
}