import React from 'react';
import Page from '../../Page';
import { DiCss3,DiHtml5,DiPhp,DiCode } from "react-icons/di";
export default ({auth})=>{
    return (
        <Page pageTitle="WELCOME?" auth={auth}>
            <section className="page-landing">
                <div className="landing-photo col-s-12 col-m-9 col-10 no-padding">
                    <h2 className="col-s-12">Bienvenidos al Futuro del Aprendizaje</h2>
                    <button className="col-s-8 col-m-5 col-3">Ver Cursos</button>
                </div>
                <h2 className="col-s-12">Populares</h2>
                <section className="courses col-s-12 col-m-3 col-2 no-padding">
                    <h2 className="col-s-12">Populares</h2>
                    <div className="info"><span><DiHtml5/></span></div>
                    <div className="info"><span><DiCss3/></span></div>
                    <div className="info"><span><DiPhp/></span></div>
                </section>
            </section>
        </Page>
    );
}