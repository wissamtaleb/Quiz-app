import React from 'react';
import {Component} from 'react';
import './Add.css';
import axios from 'axios';
import QuestionAdd from '../../Classes/QuestionAdd'



class Add extends Component{

    constructor(){
        super();

        this.state = {
            questionValue: "",
            answer1: "",
            answer2: "",
            answer3: "",
            rightAnswer: -5,
            difficulty: 1
        }

    }

    handleChange = name => event => {
         this.setState({
             [name]: event.target.value
         })

         
    } 

    


    questionChange(event){

        this.setState({
            questionValue: event.target.value
        })

    }

    clickHandler(event){

        event.preventDefault();

        var headers = {
            'Content-Type': 'application/json'
             
        }
       let questionObj = new QuestionAdd();
        questionObj.question = this.state.questionValue;
        questionObj.answer1 = this.state.answer1;
        questionObj.answer2 = this.state.answer2;
        questionObj.answer3 = this.state.answer3;
        questionObj.difficulty = this.state.difficulty;
        questionObj.isRight = this.state.rightAnswer;

        axios.post("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/new", questionObj , {headers: headers}).then(response => console.log(response.data)).catch(() => console.log("error occured"));
        
    }




    render(){
        return (
            
  <div>

      <h1>Form Component</h1>
      <form className = "form">  
            <label className = "myLabel">Question:  </label>
          
          <input type = "text" name ="question" className = "text-box" value={this.state.question} onChange = {(event) => this.questionChange(event)}/><br/><br/><br/>

         <label className = "myLabel">Answer 1:  </label> <input type = "radio" name = "rightAnswer" value ="0" onChange = {this.handleChange('rightAnswer')}/><input className = "text-box" type = "text" name="answer1" value={this.state.answer1} onChange = {this.handleChange('answer1')}  /><br/><br/>
         <label className = "myLabel">Answer 2:  </label> <input type = "radio" name = "rightAnswer" value ="1" onChange = {this.handleChange('rightAnswer')}/><input className = "text-box" type = "text" name="answer2" value={this.state.answer2} onChange = {this.handleChange('answer2')} /><br/><br/>
         <label className = "myLabel">Answer 3:  </label> <input type = "radio" name = "rightAnswer" value ="2" onChange = {this.handleChange('rightAnswer')}/><input className = "text-box" type = "text" name="answer3" value={this.state.answer3} onChange = {this.handleChange('answer3')} /><br/><br/>
           
           <label className = "myLabel">Difficulty: </label>
           <select onChange = {this.handleChange('difficulty')}>
               <option value ="1">1</option>
               <option value ="2">2</option>
               <option value ="3">3</option>
           </select>
           <br/><br/>

          <button onClick = { (event) => this.clickHandler(event)}>Add</button>
          
      </form>
  </div>

        )
    }
}

export default Add;