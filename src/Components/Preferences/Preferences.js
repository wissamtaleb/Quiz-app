import React from 'react';
import {Component} from 'react';
import Axios from 'axios';
import './Preferences.css'
import Update from './../Update/Update'

class Preferences extends Component{

    constructor(props){
        super(props);
        this.state ={
            questionsList: [],
            selectList: [],
            id: "",
            displayedQuestionsList: [],
            textbox: "",
            OpenUpdate: false
        }
    }


    componentDidMount() {
        console.log("mounted");
        Axios.get("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/allQuestions").then((response) => {

        this.setState({
            questionsList: response.data,
            displayedQuestionsList: response.data

        }, console.log(this.state.questionsList));

        
        })

    }

    toSelect(e){

        let myValue = e.target.id;
        console.log(e.target.id);
        
        if(!this.state.selectList.includes(myValue)){
        this.setState(prevState => {
            selectList: prevState.selectList.push(myValue)
            return this.state.selectList;
        }, () => {console.log(this.state.selectList)
        return 1;})
    }

    else{

        this.setState((prevState) => {
            selectList: this.deleteFromArray(prevState.selectList , myValue) ;
            return this.state.selectList;
        } , () => {console.log(this.state.selectList);
        return 1;})
    }

    
    }


    deleteList(){

        var converted = this.state.selectList.map(i => parseInt(i));
        Axios.post("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/questions",converted).then((response) => {
            console.log(response.data);
        }).then(() => {
            Axios.get("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/allQuestions").then((response) => {

                this.setState({
                    questionsList: response.data,
                    displayedQuestionsList: response.data,
                    selectList: []
                }, console.log(this.state.questionsList));
        
                
                })
        });

        
    }

    clear(){
        this.setState({
            selectList: []
        })
    }

    search(){
        let displayed = this.state.questionsList;
        if(this.state.id !== ""){
        displayed = displayed.filter( (question) => question.id == this.state.id);
}

if(this.state.textbox!==""){
    displayed = displayed.filter((question => question.questionText.includes(this.state.textbox)));
}

this.setState({
    displayedQuestionsList: displayed
})

   


    }


    changeHandler(e){

        let myVal = e.target.value
        this.setState({
            [e.target.name]: myVal
        })
    }

    goToUpdate(){
        if(this.state.selectList.length == 1){

            this.setState({
                OpenUpdate: true
            })

        }

        else{
            alert("you have to select 1 row");
        }
    }

    backFromUpdate(){
        this.setState({
            OpenUpdate: false
        })
    }

    updatePresented = (e) => {

        this.changeId(e);
        
        this.edit(this.state.id);
    }

    render(){


        if(this.state.OpenUpdate){
            return <Update myId = {this.state.selectList[0]} backFromUpdate = {() => this.backFromUpdate() }></Update>
        }
        
        if(!this.props.isLogged){
            return (<h1>Your are NOT logged in <a  href="#" onClick = {() => this.props.navigateToHome()}>LogIn</a></h1>)
        }
        let Jsx = this.state.displayedQuestionsList.map((question) => (<tr className = {this.state.selectList.includes(question.id+"") ? "to-delete" : "" }><td  onClick={e => this.toSelect(e)} id ={question.id}>{question.questionText}</td>
            <td>{question.id}</td></tr>
            ))
        return (<><h1>Preferences Component </h1><br/>
       

          
          <div className = "search">
          <h2>Search</h2>
          <label>id:</label><input name = "id" className = "my-text-box" type = "text" value = {this.state.id} onChange ={e => this.changeHandler(e)}/>
          <label>text:</label><input name = "textbox" className = "my-text-box" type = "text" value = {this.state.textbox} onChange = {e => this.changeHandler(e)}/>
          <button className = "my-button" onClick = {() => this.search()}>Search</button>
          </div>
            <br/><br/>  
       <div >
       
          
       
        <table className = "my-table">
        <tr>
            <button className = "my-button" onClick ={() => this.props.navigateToAdd()}>Add</button>
            <button className = "my-button" onClick = {() => this.goToUpdate()}>Update</button>
            <button className = "my-button" onClick = {this.updatePresented}>Delete</button>
            <button className = "my-button" onClick ={() => this.clear()}>Clear</button>
            </tr> <br/><br/>{Jsx}</table>
        </div>
        
        
        </>
            )

            
    }

    deleteFromArray(arr , value){
        
var index = arr.indexOf(value);
if (index >= 0) {
  arr.splice( index, 1 );
}

return arr;
    }

    


}

export default Preferences;