import React, {Component} from 'react';
import Page from '../../Page';
import Input from '../../../Common/Input/Input';
import Button_F from '../../../Common/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import {emailRegex, emptyRegex, passwordRegex} from '../../../Common/Validators/Validators';
import { paxios, setLocalStorage } from '../../../Utilities/Utilities';
export default class RegexNode extends Component{
    constructor(){
        super();
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    onClickSubmit(e){
        alert("Si funciona");
    }

    render(){
        return(
            <Page pageURL="Class">
                <br/><br/><br/>
                
                <Button_F>
                    <button className="button-3 col-s-11" onClick={this.onClickSubmit}>Verificar Respuesta</button>
                </Button_F> 
            </Page>
        )
    }
}