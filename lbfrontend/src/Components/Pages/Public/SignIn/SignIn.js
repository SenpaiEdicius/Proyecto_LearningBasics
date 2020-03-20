import React from 'react';
import Page from '../../Page';
import Input from '../../../Common/Input/Input';
import Button from '../../../Common/Button/Button';
import { Link } from 'react-router-dom';
import './SignIn.css';

export default()=>{
    return(
        <Page pageTitle="SignIn">
            <Input caption="Correo Electónico"/>
            <Input caption="Contraseña" type="password"/>
            <Button caption="Regístrate"></Button>
            <p>Ya tiene cuenta?</p>
            <Link to="/login">Ingrese Aquí</Link>
        </Page>
    );
}