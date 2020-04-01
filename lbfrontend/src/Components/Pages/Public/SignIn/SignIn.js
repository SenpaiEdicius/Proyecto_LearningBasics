import React, {Component} from 'react';
import Page from '../../Page';
import Input from '../../../Common/Input/Input';
import Button_F from '../../../Common/Button/Button';
import { Link } from 'react-router-dom';
import './SignIn.css';
import {emailRegex, emptyRegex, passwordRegex, nameRegex} from '../../../Common/Validators/Validators';
import {paxios, setLocalStorage} from '../../../Utilities/Utilities'

export default class Signin extends Component{

    constructor(){
        super();
        this.state = {
            name: '',
            nameError: null,
            email: '',
            emailError: null,
            password: '',
            passwordError: null
        }
        this.onChangeHandler=this.onChangeHandler.bind(this);
        this.validate = this.validate.bind(this);
        this.onClickSignIn = this.onClickSignIn.bind(this);
    }

    validate(state){
        let nameErrors = null;
        let tmpErrors = [];
        const {email, password, name} = state;
        if(email !== undefined){
            if((!(emailRegex.test(email)))||(emptyRegex.test(email))){
                tmpErrors.push("Ingrese un correo con un formato correcto");
            }
            if(tmpErrors.length){
                nameErrors = Object.assign({}, nameErrors, {emailError: tmpErrors});
            }
        }
        if(password !== undefined){
            tmpErrors=[];
            if((!(passwordRegex.test(password)))||(emptyRegex.test(password))){
                tmpErrors.push("Ingrese una contraseña con un formato válido"); 
                tmpErrors.push("(Iniciar con mayúscula, contener un número, una minúscula, mínimo 8 caracteres y máximo 20)");
            }
            if(tmpErrors.length){
                nameErrors = Object.assign({}, nameErrors, {passwordError: tmpErrors.join('. ')});
            }
        }
        if(name !== undefined){
            tmpErrors=[];
            if((!(nameRegex.test(name)))||(emptyRegex.test(name))){
                tmpErrors.push("Ingrese un correo con un formato correcto");
            }
            if(tmpErrors.length){
                nameErrors = Object.assign({}, nameErrors, {nameError: tmpErrors});
            }
        }
        return nameErrors;
    }

    onChangeHandler(e){
        const{name, value} = e.currentTarget;
        let errors = this.validate({[name]:value});
        if(!errors){
            errors = {[name+'Error']: ''};
        }
        this.setState({
            ...this.state,
            [name]:value,
            ...errors
        })
    }

    onClickSignIn(e){
        e.preventDefault();
        e.stopPropagation();
        let errors = this.validate(this.state);
        if(errors){
            this.setState({...this.state, ...errors});
        }else{
            const {email, password, name} = this.state;
            if(
                email === "demo@demo.com" ||
                email === "demo@demo.demo" ||
                email === "test@test.com" ||
                email === "test@test.test" ||
                email === "aaa@aaa.aaa" ||
                email === "aaa@aaa.com" ||
                email === "aa@aa.aa"
            )
                alert("Sea mas original con el correo por favor");
            else if(email === "easter@egg.com")
                alert("Easter Egg detected. Congratulations");
            else{
                paxios.post(
                    "/api/user/register",
                    {
                        usernames: name,
                        useremail: email,
                        userpassword: password
                    }
                )
                .then((resp)=>{
                    console.log(resp.data);
                    setLocalStorage('jwt', resp.data.jwt);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }
    }

    render(){
        return(
            <Page pageTitle="SignIn">
                <Input
                    name="name"
                    caption="Nombre Completo"
                    value={this.state.name}
                    onChange={this.onChangeHandler} 
                    error={this.state.nameError}
                />
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
                    <button onClick={this.onClickSignIn}>SignIn</button>
                </Button_F>
                <p>Ya tiene cuenta?</p>
                <Link to="/login">Ingrese Aquí</Link>
            </Page>
        );    
    }
}