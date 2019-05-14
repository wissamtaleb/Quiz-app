import React from 'react';
import {Component} from 'react';
import {Link , NavLink} from 'react-router-dom'
import './Menu.css';

class Menu extends Component{

    constructor(){

        super();
    }

    render(){
        // return (<>
        //     <Link to="/quiz"  >Quiz</Link>
        //     <Link to="/add" >Add</Link>
        //     </>
        // )

        return (
            <nav className=" navbar-expand-sm navbar-expand-lg increase-width navbar-dark navbar">
            
              <div className="navbar-header increase-width" >
                <Link className="navbar-brand" to="/">Quiz</Link>    
              </div>
              <ul className="nav navbar-nav increase-width mx-auto">
                <li className="nav-item"><Link className="nav-link" to="/quiz">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/quiz">Quiz</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/add">Add</Link></li>
                
              </ul> 
            
          </nav>
        )
    }
}

export default Menu;


