import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import {withFormik , Form , Field} from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import './LogInTest.css';
import changeState from './../../Classes/StaticFunctions';

class LogInTest extends Component{

    
    constructor(props){

        super(props);
        
    //    let cookies = new Cookies();
    //     let loggedInCookie = cookies.get("loggedIn");
        // if (!loggedInCookie){
        //     loggedInCookie = false
        // }
        console.log("is Logged: ?");
        console.log(props.isLogged);
        this.state = {
            loggedIn: props.isLogged,   
        }

        
    }

render(){
    console.log(this.state.loggedIn);
    if(this.state.loggedIn){
        return <h1>You are logged in</h1>
    }
return (<Form>
    <h1>LogIn Component</h1><br/>
            <div>
                
        <Field type = "email" name = "email" placeholder = "EMAIL"/><br/>
        {this.props.errors.email && this.props.touched.email && <small className = "redify">{this.props.errors.email}</small>}
        </div><br/>
        <div>
       
        <Field type = "password" name = "password" placeholder = "PASSWORD"/><br/>
        {this.props.errors.password && this.props.touched.password && <small className = "redify">{this.props.errors.password}</small>}
        </div><br/>
            <small className = "redify">{this.props.errors.error}</small><br/>
        <button>Log In</button>



        </Form>)
}

componentWillReceiveProps(nextProps) {

    console.log("LoginTest componentwillrecieveprops")
    console.log(nextProps.isLogged);
    this.setState({
        LoggedIn: nextProps.isLogged
    })
}
    
}

const FormikLogIn = withFormik({
    mapPropsToValues(){
        return {
        email: '',
        password: '',
        error: ''

               }
    },
    validationSchema: Yup.object().shape({
email: Yup.string().email().required(),
password: Yup.string().min(8).required()
    }),
    handleSubmit(values , {props,setErrors}){

        const accountFields = {
            username: values.email,
            password: values.password
        }

        axios.post("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/logIn" , accountFields).then((response) => {
            if(response.data){
                console.log("props in handleSubmit parameter");
                console.log(props);
                
                console.log("props of LoginTest: ")
                console.log(this.props);
                const cookies = new Cookies();
                cookies.set('loggedIn','true');
                cookies.set('account',accountFields.username);
                console.log(cookies.get('account'));
                console.log(cookies.get('loggedIn'));
                props.changeState('true',accountFields.username);
                props.history.push('/quiz');   

            }
            else{
                setErrors({error:'invalid email or password'})
            }
        }).catch(
            (err) => {
                setErrors({error: 'Error connecting to server'});
                console.log(err);
            }
        );
       
    }
})(LogInTest)

export default FormikLogIn;