import React from 'react';
import './Input.css';

export default({caption, type, ...props})=>{
    return(
        <fieldset>
            <legend>{caption}</legend>
            <input type={type||"text"}></input>
        </fieldset>
    );
}