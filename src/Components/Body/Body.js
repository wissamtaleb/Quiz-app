import React from 'react';
import { Component } from 'react';
import Quiz from '../Quiz/Quiz';
import './body.css';
import Add from '../Add/Add';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Menu from '../Menu/Menu';
import FormikLogin from '../LogInTest/LogInTest';
import SignUp from './../SignUp/SignUp';
import Preferences from '../Preferences/Preferences';

class Body extends Component {

  constructor(props){
    super(props);

    console.log("is loged 2 ? ")
    console.log(props.isLogged);
    this.state ={
      something: "something",
      navigateToHome: false,
      navigateToAdd: false
    }
  }

  navigateToHome = () => {

    this.setState({
      navigateToHome: true
    })
  }

  navigateToAdd = () => {

    this.setState({
      navigateToAdd: true
    })
  }

  render() {

    if(this.state.navigateToHome){
      this.setState({
        navigateToHome: false
      })
      return <Redirect to ="/login"></Redirect>
    }

    if(this.state.navigateToAdd){
      this.setState({
        navigateToAdd: false
      })
      return <Redirect to ="/add"></Redirect>
    }

    return (
   
<>
  <div className = "row">
  <div className = "col-12"><Menu></Menu></div>
  </div>
  
      <div className="row myBody" >
        <div className="col-2 ">

        </div>
        <div className="col-8 ">
          
         
            <div>
            <Route path="/quiz" render = {(props) =>  <Quiz {...props} isLogged ={this.props.isLogged} changeState = {this.props.changeState} navigateToHome = {this.navigateToHome}></Quiz> }/>
            <Route path="/add" render = {(props) =>  <Add {...props} isLogged ={this.props.isLogged}  navigateToHome = {this.navigateToHome}></Add> } />
            <Route path="/login" render = {(props) => <FormikLogin  {...props} isLogged ={this.props.isLogged} changeState = {this.props.changeState}></FormikLogin>}/>
            <Route path="/signUp" render = {() => <SignUp></SignUp>}/>
            <Route path="/preferences" render = {(props) => <Preferences  {...props} navigateToAdd = {this.navigateToAdd} isLogged = {this.props.isLogged} navigateToHome = {this.navigateToHome}></Preferences>}/>
            </div>
          

        </div>
        <div className="col-2 ">

        </div>
      </div>
      </>
      
      
    )
  }
}

export default Body;