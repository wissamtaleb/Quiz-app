import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import QuestionFinal from '../../Classes/QuestionFinal';
import './quiz-css.css';
import Cookies from 'universal-cookie';
import {BrowserRouter as Router , Link , NavLink, withRouter ,Redirect} from 'react-router-dom';

class Quiz extends Component{

    constructor(props){
        super(props);


       let myQuestion = new QuestionFinal;
        myQuestion.question = "";
        myQuestion.answerText = ["","",""];
        myQuestion.answerId = [0,0,0];
        
        this.state = {
            question: myQuestion,
            answerValue: 0,
            isRight: null,
            submitDisabled: true,
           
            nextDisabled: false,


            isLogged: props.isLogged,
            
            
        }

        this.radioRef = React.createRef();

        
        
            
       

    }

    start(){

        let questionFinal = new QuestionFinal();
        axios.get("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/question/1").then(response => {

      
        
        this.setState({

            question: response.data,
            isRight: null,
            answerValue: 0,
            submitDisabled: true
        })

        })

       const node = this.radioRef.current;
       console.log(node);
    }

    answerChange(event){

        this.setState({
            answerValue: event.target.value
        } , () => {      if(this.state.answerValue != 0){
            this.setState({
                submitDisabled: false
            })
           
        }})

  
        
    }

    onSubmit(event){

        event.preventDefault();

        axios.get("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/validate/" + this.state.answerValue).then(response => {
            this.setState({

                isRight: response.data
            })
        })
    }


    toLogin(event){
      this.props.navigateToHome();
    }



    render(){

       
        if(!this.props.isLogged){
            return (<h1>Your are NOT logged in <a  href="#" onClick = {(e) => this.toLogin(e)}>LogIn</a></h1>)
        }
        var i =-1;
        console.log(this.state.question);
        console.log(this.state.answerValue);
        const answers = this.state.question.answerText.map(answer =>{ 
            i++;
            return (<>
        <br/>
            <input type = "radio"  className = "thisRadio" ref={this.radioRef} name = "radioAnswer" onChange = {(event) => this.answerChange(event)} value = {this.state.question.answerId[i] }/><label>{answer}</label>
            </>)
        })

        var myJsx;
        if(this.state.isRight ==null){
            myJsx = (<label> </label>)
        }

        else{
            myJsx = (<label>your answer is {this.state.isRight ? `${true}` : `${false}`}</label>)
        }
        return (<div className = "quizComponent">
        <h1>Quiz Component</h1><br/>
        
        <form>
        <label>{this.state.question.question}</label>
      {answers}
      <br/>
      <button disabled = {this.state.submitDisabled} onClick = {(event) => this.onSubmit(event)}>Submit</button>
      <br/>
      {myJsx}

      

        </form>
        <br/>
        <button disabled = {this.state.nextDisabled} onClick = {() => this.start()}>NextQuestion</button>
        </div>)
    }
}

export default Quiz;