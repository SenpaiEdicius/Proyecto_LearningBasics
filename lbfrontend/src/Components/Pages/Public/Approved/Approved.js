import React, {Component} from 'react';
import Page from '../../Page';
import { paxios,getLocalStorage } from "../../../Utilities/Utilities";
export default class Approved extends Component{
    constructor(){
        super();
        this.state = {}
    }
    componentDidMount(){
        const token = getLocalStorage('token')||undefined;
        if(token !== undefined){
            paxios
          .post(`/api/user/payment/execute/${token}`)
          .then((resp) => {
            console.log(resp.data);
          })
          .catch((error) => {
            console.log(error);
          });
        } else{
            alert("Ocurrio un error");
            window.location.replace("http://localhost:3001/");
        }
        
    }
    render(){
        return(
            <Page pageURL="/approved" auth={this.props.auth}>
                <section className="page-approved">
                    <div className="approved-text main-color">
                        <h2>Tu transaccion fue aprovada exitosamente</h2>
                    </div>
                </section>
            </Page>
        );
    }
}