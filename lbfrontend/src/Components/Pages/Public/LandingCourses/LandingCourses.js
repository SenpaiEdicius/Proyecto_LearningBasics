import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IoIosInformationCircleOutline, IoIosSync, IoMdAddCircle, IoIosImage } from 'react-icons/io';
import Button_F from '../../../Common/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../../Common/Loading/Loading';
import Page from '../../Page';
import { paxios } from '../../../Utilities/Utilities.js';
import { saxios } from '../../../Utilities/Utilities';
import { DiCss3,DiHtml5,DiPhp } from "react-icons/di";
import './LandingCourses.css';
export default class LandingCourses extends Component {
  constructor(){
    super();
    this.state={
        data:null,
        courseID:''

    }

 }
 componentDidMount(){

    const courseID = this.props.match.params.id;
    this.setState({'courseID': courseID})
    const uri = `/api/public/landingcourse/${courseID}`;

    saxios.get(uri)
    .then(
        ({data})=>{
            console.log({data});
            this.setState({
                'data': data,
            }, function(){
               
                this.render();
            });
        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )
};


render(){
    let link = "/subscription";
    let dsc =""; 
    
    if(this.props.auth.isLogged){
      link="/course/classes/";
      dsc="Iniciar"
    }

    if(this.state.data === null){
        var CourseInfo =
         ["id" > 0,
         "courseName">"blank",
         "courseDesc">"blank",
        "courseHours">"blank"]
    }else{
        var CourseInfo = [
            this.state.data._id,
            this.state.data.courseName,
            this.state.data.courseDesc,
            this.state.data.courseHours
        ];
    }

    let  icon2use;
    if(CourseInfo[0]==="5e93dbee6ddabd5ba4554503"){
        icon2use=<DiHtml5/>;
    }else{
        if(CourseInfo[0]==="5e93dc176ddabd5ba4554504"){
            icon2use=<DiCss3/>;
        }else{
            icon2use=<DiPhp/>;
        }
    }
   
    return(
        <Page pageURL="landingcourse" >
            <br/>
            <br/>
            <br/>
            <section className="LandingContent">
                <section className="page-landingcourse">
                    <section className="courses col-s-12 col-m-3 col-2 no-padding">
                        <div className="info"><span>{icon2use}</span></div>
                    </section>
                    <div className="text col-s-12 col-m-9 col-10 no-padding">
                        <h1>{CourseInfo[1]}</h1>
                    </div>

                </section>
                <section className="page-landingcourse">
                <section className="courses col-s-12 col-m-3 col-2 no-padding">
                        <div className="info"><span>{icon2use}</span></div>
                    </section>
                    <div className="text col-s-12 col-m-9 col-10 no-padding">
                      
                        <h2>  Descripción del Curso: <br/></h2>{CourseInfo[2]}
                    </div>

                </section>
                <section className="page-landingcourse">
                    <section className="courses col-s-12 col-m-3 col-2 no-padding">
                        <div className="info"><span>{icon2use}</span></div>
                    </section>
                    <div className="text col-s-12 col-m-9 col-10 no-padding">
                        <h2>Tiempo de Completación: <br/></h2> {CourseInfo[3]} Hora(s)
                    </div>

                </section>
            </section>
          
         
            
            {(this.props.auth.isLogged)? <Link className="button-3" to={link+CourseInfo[0]}>{dsc}</Link>:
            <Link className="button-3" to={link}>Registrar</Link> }
            <br/>
            
        </Page>
    )
}
  }
  