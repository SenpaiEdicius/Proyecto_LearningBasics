import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
export default ({pageTitle, hideFooter, children, auth})=>{
    const finalHideFooter = hideFooter||false;
    return(
        <section>
            <Header auth={auth} title={pageTitle||'Page'}></Header>
            <main>
                {children}
            </main>
            {(!finalHideFooter)?(<Footer auth={auth}></Footer>):null}
        </section>
    );
}