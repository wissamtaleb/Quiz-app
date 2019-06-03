import React from 'react';
import {Component} from 'react';
import Axios from 'axios';
import './Update.css';


class Update extends Component{


    constructor(props){
        super(props);

        this.state = {
            questionText: ""
        }

        console.log(this.props.myId);
    }
    
    componentDidMount(){

       var headers = {
            'Content-Type': 'application/json'
             }
        
        Axios.post("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/questionById", this.props.myId , {headers: headers}).then((response) =>{

        this.setState({
            questionText: response.data.questionText
        })
        })
    }


    saveUpdate(){

        
    }


    changeHandler(e){

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render(){
        console.log(this.state.questionText);
        return (<>
        <input className = "my-textbox" name = "questionText" type = "text" value = {this.state.questionText} onChange = {(e) => this.changeHandler(e)} />
        <br/><br/>
        <button>Save</button>
        <button onClick= {() => this.props.backFromUpdate()} >Back</button>
        
        </>)
    }
}

export default Update;