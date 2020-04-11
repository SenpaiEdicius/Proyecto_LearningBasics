import React, {Component} from 'react';
import Page from '../../Page';
import Input from '../../../Common/Input/Input';
import Button_F from '../../../Common/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import {emailRegex, emptyRegex, passwordRegex} from '../../../Common/Validators/Validators';
import { paxios, setLocalStorage } from '../../../Utilities/Utilities';
import { saxios } from '../../../Utilities/Utilities';
export default class TextNode extends Component{
    constructor(){
        super();
        this.state={
            data:null,
            courseID:'',
            answer:'',
        }
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e){
        const {name, value} = e.currentTarget;
        this.setState({
            ...this.state,
            [name]:value,
        })
    }

    componentDidMount(){
        const nodeID = this.props.match.params.idn;
        this.setState({'nodeNumber': nodeID})
        const courseID = this.props.match.params.idc;
        this.setState({'courseID': courseID})
        const uri = `/api/user/course/nodes/${courseID}`;

        saxios.get(uri)
        .then(
            ({data})=>{
                console.log({data}); //BORRRARRR ESTO DESPUES
                this.setState({
                    'data': data[nodeID-1]
                }, function(){
                    console.log(this.state.data);
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

    onClickSubmit(e){
        var answer = this.state.answer;
        const courseID = this.props.match.params.idc;
        this.setState({'courseID': courseID})
        const nodeID = this.props.match.params.idn;
        this.setState({'nodeNumber': nodeID})
        const uri = `/api/user/course/class/${courseID}`;
        saxios.put(uri,{
            'answer':answer,
            'userid':this.props.auth.id,
            'NodeNumber':nodeID
        }).then(
            ({data})=>{
                this.setState({...this.state, redirectTo: true});
                console.log({data}); //BORRRARRR ESTO DESPUES
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
    };

        render(){
            if(this.state.redirectTo){
                var location = '/course/classes/'+this.props.match.params.idc;
                return (<Redirect to={location} />);
            }
            console.log(this.state.data);
            if(this.state.data === null){
                var NodeInfo = ["nodeNumber" > 0,"nodeName">"blank","nodeDesc">"blank",
                "nodeDialogue">"blank","completionType">"blank","rightAnswer">"blank","nodeCompletion">"blank"]
            }else{
                var NodeInfo = [this.state.data.nodeNumber,this.state.data.nodeName,this.state.data.nodeDesc,this.state.data.nodeDialogue,
                    this.state.data.completionType,this.state.data.rightAnswer,this.state.data.nodeCompletion];   //No imprime booolean completion
            }
           
            return(
                <Page pageURL="Class">
                    <br/>
                    <br/>
                    <br/>
                    <span>
                        
                    <ul>
                        <li><b>Titulo: </b>  {NodeInfo[1]}</li>
                        <li><b>Descripción: </b>  {NodeInfo[2]}</li>
                        <li><b>Instrucciones: </b>  {NodeInfo[3]}</li>
                        </ul>
                    </span>
                    <br/>
                        <Input 
                            name="answer"
                            caption="Ingrese su respuesta"
                            value={this.state.answer}
                            onChange={this.onChangeHandler}
                            className="col-s-12 col-m-12 col-12 input-1"   
                        />
                    
                    <Button_F>
                        <button className="button-3 col-s-11" onClick={this.onClickSubmit}>Verificar Respuesta</button>
                    </Button_F> 
                </Page>
            )
        }
    }