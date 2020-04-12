import React, { Component } from 'react';
import Page from '../../../Page';

export default class CreateCourse extends Component{
    constructor(){
        super();
        this.state ={

        }

    }


    render(){
        const action ="Crear Curso";
        return(
            <Page pageURL="CreateCourse" auth={this.props.auth}>
                <br/><br/><br/>

            </Page>
        )
    }
}