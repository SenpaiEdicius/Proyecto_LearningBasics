import React, {Component} from 'react';
import Page from '../../Page';
import Input from '../../../Common/Input/Input';
import Button_F from '../../../Common/Button/Button';
import { Link } from 'react-router-dom';
import {emailRegex, emptyRegex, passwordRegex} from '../../../Common/Validators/Validators';
import './Login.css';

export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            emailError: null,
            password: '',
            passwordError: null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(state){
        let nameErrors = false;
        let tmpErrors = [];
        const {email, password} = state;
        if(email !== undefined){
            if((!(emailRegex.test(email)))||(emptyRegex.test(email))){
                tmpErrors.push("Ingrese un correo con un formato válido");
            }  
            if(tmpErrors.length){
                nameErrors = Object.assign({}, nameErrors, {emailError: tmpErrors});
            }
        }
        if(password !== undefined){
            tmpErrors = [];
            if(!(passwordRegex.test(password))||(emptyRegex.test(password))){
                tmpErrors.push("Ingrese una contraseña con un formato válido"); 
                tmpErrors.push("(Iniciar con mayúscula, contener un número, mínimo 8 caracteres y máximo 20)");
            }
            if(tmpErrors.length){
                nameErrors = Object.assign({}, nameErrors, {passwordError: tmpErrors.join('. ')});
            }
        }

        return nameErrors;
    }

    onChangeHandler(e){
        const {name, value} = e.currentTarget;
        let errors = this.validate({[name]:value});
        if(!errors){
            errors = {[name+"Error"]:''};
        }
        this.setState({
            ...this.state,
            [name]:value,
            ...errors
        })
    }

    onClickLogin(e){
        e.preventDefault();
        e.stopPropagation();
        const errors = this.validate(this.state);
        if(errors){
            this.setState({...this.state, ...errors});
        }else{
            alert("Everything's A-OK");
        }

    }

    render(){
        return(
            <Page pageTitle="Login">
                <Input 
                    name="email"
                    caption="Correo Electónico"
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                    error={this.state.emailError}    
                />
                <Input
                    name="password"
                    caption="Contraseña"
                    value={this.state.password}
                    onChange={this.onChangeHandler} 
                    type="password"
                    error={this.state.passwordError}
                />
                <Button_F>
                    <button onClick={this.onClickLogin}>Login</button>
                </Button_F>
                <p>No tiene cuenta?</p>
                <Link to="/signin">Registrese Aquí</Link>
            </Page>
        );    
    }
}