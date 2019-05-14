import React from 'react';
import { Component } from 'react';
import Quiz from '../Quiz/Quiz';
import './body.css';
import Add from '../Add/Add';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Menu from '../Menu/Menu';

class Body extends Component {

  constructor(){
    super();

    this.state ={
      something: "something"
    }
  }

  render() {
    return (
<Router>
  <div className = "row">
  <div className = "col-12"><Menu></Menu></div>
  </div>
  
      <div className="row myBody" >
        <div className="col-2 ">

        </div>
        <div className="col-8 ">
          
         
            <div>
            <Route path="/quiz" component={Quiz} />
            <Route path="/add" component={Add} />
            </div>
          

        </div>
        <div className="col-2 ">

        </div>
      </div>
      </Router>
    )
  }
}

export default Body;