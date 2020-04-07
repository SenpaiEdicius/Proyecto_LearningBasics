import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 
import {IoIosSettings,IoIosCloseCircleOutline,IoMdLogOut} from 'react-icons/io';
import img from './logoLearningBasics.png';
export default class Header extends Component{
    constructor(){
        super();
        this.logoutOnClick = this.logoutOnClick.bind(this);
        this.state = {
            open : false,
            display: false,
        }
    }
   
    logoutOnClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.auth.logout();
      }
    render(){
        const shown = this.state.open;
        const displaying = this.state.display;
        if(this.props.auth && this.props.auth.isLogged && true){
            return(
                <header className="col-s-12">
                <div className="title col-s-7 col-m-5 col-12 no-margin no-padding">
                    <Link to="/"><img src={img} alt="Logo Learning Basics" width="200"/></Link>
                    
                </div>
                <div onClick={ ()=>{this.setState({open: !shown})}} className={displaying ? "hide":"burger"} id="hmb">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={displaying ? "close":"close hidden"}>
                <IoIosCloseCircleOutline onClick={ ()=>{this.setState({display: !displaying})}}/>
                </div>     
                <ul className={ shown ? "nav-links open col-s-12 col-m-5 col-5 col-l-5 no-margin center": "nav-links col-s-12 col-m-5 col-5 col-l-5 no-margin center" }>
                    <li><Link to="/courses">Todos los Cursos</Link></li>
                    <li><Link to="/mycourses">Cursos Registrados</Link></li>
                    
                    <li><Link onClick={ ()=>{this.setState({display: !displaying})}}><IoIosSettings/></Link></li>
                </ul>
                <ul className={displaying ? "menu-links open col-s-12 col-m-5 col-3 col-l-3 no-margin center no-padding": 
                "menu-links col-s-12 col-m-5 col-3 col-l-3 no-margin center no-padding" }>
                    <li><h2>Bienvenido</h2></li>
                    <li><Link>Aqui van los links</Link></li>
                    <li><Link>Por Mientras</Link></li>
                    <li><Link to="/subscription">Subscripcion</Link></li>
                    
                    <li><Link to="/mycourses">Mis Cursos</Link></li>
                    <li><Link onClick={this.logoutOnClick}><IoMdLogOut/> Cerrar Sesión</Link></li>
                </ul>
            </header>
            );       
        }
        else{
            return(   
            <header className="col-s-12">
                <div className="title col-s-7 col-m-5 col-12 no-margin no-padding">
                    <Link to="/"><img src={img} alt="Logo Learning Basics" width="200"/></Link>
                    
                </div>
                <div onClick={ ()=>{this.setState({open: !shown})}} className="burger" id="hmb">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>     
                <ul className={ shown ? "nav-links open col-s-12 col-m-5 col-5 col-l-4 no-margin center": "nav-links col-s-12 col-m-5 col-5 col-l-4 no-margin center" }>
                    <li><Link to="/courses">Cursos</Link></li>
                    <li><Link to="/subscriptions">Subscripciones</Link></li>
                    <li><Link to="/login">Inicia Sesión</Link></li>
                </ul>
            </header>
            );       
        }
    }
}