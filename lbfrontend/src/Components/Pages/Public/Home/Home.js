import React from 'react';
import Page from '../../Page';

export default ({auth})=>{
    return (
        <Page pageTitle="WELCOME?" auth={auth}>
            <p>THIS IS A TEST TEMPLATE</p>
            <p>THIS IS JUST A TEST</p>
        </Page>
    );
}