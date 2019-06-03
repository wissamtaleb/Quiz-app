import React from 'react';
import {Component} from 'react';
import './header.css'
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Link, NavLink, withRouter,Redirect } from 'react-router-dom';
import Route  from 'react-router-dom/Route';
import changeState from './../../Classes/StaticFunctions';


class Header extends Component{

  constructor(props){

    super(props);
   

    this.state = {
      isLogged: props.isLogged,
      account: props.account,
      navigateToHome: false,
      // changeState: ''

    }

   
    
    
  }

  

  componentWillUpdate(){
    let cookies = new Cookies();
    let isLogged = cookies.get('loggedIn');
    let account = cookies.get('account');
    let count = 0 ;
    if(isLogged){

      this.account = cookies.get('account');
    }

   

   
  }

    render(){
      let myUpper = (<></>);
      if(this.state.isLogged){
      myUpper = (<h6>Welcome {this.state.account} <a href="#" onClick = {() => this.signOut()}>SignOut</a></h6>)
      
      }
      else{
      myUpper = (<h6><a href = "" onClick = {(e) => this.goToLogin(e)}>Sign In</a></h6>)
      } 

      if(this.state.navigateToHome === true){
        this.setState({
          navigateToHome: false
        })
        return (<Redirect to ="/login"/>)
      }
        return (
            
  <div className="row header">
    <div className="col-4">
    <div className = "upper">
{myUpper}

    </div>
      
    </div>
    <div className="col-4">
      <h1>Quiz App</h1>
    </div>
    <div className="col-4">
      
    </div>
  </div>

        )
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ 
        isLogged: nextProps.isLogged,
        account: nextProps.account
      });  
    }

    signOut(){

      let promise = new Promise(function(resolve, reject) {
        let cookies = new Cookies();
      cookies.remove("loggedIn");
      cookies.remove("account");
    
   
      resolve(true);
      
      });

      console.log("before change state");
      console.log(this.props.isLogged);
      
      
     this.props.changeState(false,'');
     
     console.log("after change state");
     console.log(this.props.isLogged);
     
      promise.then( () => {
        this.setState({
          navigateToHome: true
          
        })
        // console.log(this.state.navigateToHome);
      }).then(() => {

         
        // this.props.changeState();
      })
     

      
      

    }

    goToLogin(e){
      e.preventDefault();
      this.props.history.push("/login");
    }
}




export default withRouter(Header);
