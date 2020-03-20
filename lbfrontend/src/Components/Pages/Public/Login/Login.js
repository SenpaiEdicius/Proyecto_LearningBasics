import React from 'react';
import Page from '../../Page';
import Input from '../../../Common/Input/Input';
import Button from '../../../Common/Button/Button';
import { Link } from 'react-router-dom';
import './Login.css';

export default()=>{
    return(
        <Page pageTitle="Login">
            <Input caption="Correo Electónico"/>
            <Input caption="Contraseña" type="password"/>
            <Button caption="Ingresar"></Button>
            <p>No tiene cuenta?</p>
            <Link to="/signin">Registrese Aquí</Link>
        </Page>
    );
}