import React from 'react';
import './Input.css';

export default ({name, value, type, caption, onChange, error})=>{
    return(
        <fieldset>
            <legend htmlFor={name}>{caption}</legend>
            <input type={type||"text"} name={name}
            id={name} value={value}
            onChange={(onChange || ((e)=>false))}
            />
            <br/>
            {(error && true) ? (<span className="error">{error}</span>) : null}
        </fieldset>
    );
}