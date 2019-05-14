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

export default class App extends Component{

  constructor(){
    super();
  }
 
 render(){

 return ( 
    <div className="App">
    <div className="container">
    <Header></Header>
   

  
  <Body></Body>
 

            
          



    </div>
    </div>
  );
}

rerenderComponent(){
  this.forceUpdate();
}
}

