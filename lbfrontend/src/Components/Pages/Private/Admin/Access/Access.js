import React , {Component}from 'react';
import {Link} from 'react-router-dom';
import {saxios,getLocalStorage} from '../../../../Utilities/Utilities';
import {IoMdLock,IoIosUnlock} from 'react-icons/io';
import Page from '../../../Page';
export default class Access extends Component{
    constructor(){
        super();
        this.state={
            userTypes: [{cod:"1",dsc:"Administrador", url:"/access/level/ADM"},{cod:"2",dsc:"Cliente",url:"/access/level/CLI"}],
            user: (getLocalStorage('user')||{})
        }
    }
    render(){
        const types = this.state.userTypes.map((type)=>{
            return(<li className="list-item" key={type.dsc}>{type.dsc} <div className="buttons">
                <button className="col-s-6"><Link to={type.url+"/DENY"}><IoMdLock/></Link></button>
                <button className="col-s-6"><Link to={type.url+"/GRNT"}><IoIosUnlock/></Link></button>
            </div>
            </li>);
        });
        return(
            <Page pageURL="/Access" auth={this.props.auth}>
                <div className="page-list">
                <div className="action-title"><h1>Control de Accesos</h1></div>
                    <ul className="list">
                        {types}
                    </ul>
                </div>
            </Page>
        );
    }
}