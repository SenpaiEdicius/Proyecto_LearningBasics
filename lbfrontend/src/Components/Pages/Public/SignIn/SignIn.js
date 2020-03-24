import React from 'react';
import Page from '../../Page';
import Input from '../../../Common/Input/Input';
import Button_F from '../../../Common/Button/Button';
import { Link } from 'react-router-dom';
import './SignIn.css';

export default()=>{
    return(
        <Page pageTitle="SignIn">
            <Input caption="Correo Electónico"/>
            <Input caption="Contraseña" type="password"/>
            <Button_F>
                    <button>Regístrate</button>
                </Button_F>
            <p>Ya tiene cuenta?</p>
            <Link to="/login">Ingrese Aquí</Link>
        </Page>
    );
}