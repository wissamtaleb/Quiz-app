import React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Body from './Components/Body/Body';
import Header from './Components/Header/Header';
import {BrowserRouter as Router , Link , NavLink} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Quiz from './Components/Quiz/Quiz';
import Add from './Components/Add/Add';
import Cookies from 'universal-cookie';

export default class App extends Component{

  constructor(){
    super();

    let cookies = new Cookies();
    let isLogged = cookies.get('loggedIn');
    let account = cookies.get('account');
    if(isLogged){

      this.account = cookies.get('account');
    }

    else{isLogged = false}

    this.state = {
      isLogged,
      account,
      navigateToHome: false,
      // changeState: ''

    }
   
    this.changeState = this.changeState.bind(this);
  }



  changeState(isLogged,account){
    this.setState({
      isLogged: isLogged,
      account: account
    }, () => console.log("log from change state:" + this.state.isLogged))
  }

  componentWillUpdate(){
    console.log("component updated");
  }
 
 render(){

 return ( 
  <Router>
    <div className="App">
    <div className="container">

    <Header changeState = {this.changeState} isLogged = {this.state.isLogged} account = {this.state.account}></Header>
    

  
  <Body changeState = {this.changeState} isLogged = {this.state.isLogged}></Body>
 
  
            
          



    </div>
    </div>
    </Router>
  );
}

rerenderComponent(){
  this.forceUpdate();
}
}




