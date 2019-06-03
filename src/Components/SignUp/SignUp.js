import React from 'react';
import {Component} from 'react';
import {withFormik , Form , Field} from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

class SignUp extends Component{


    constructor(props){
        super(props);

        this.state ={ 
            exists: false
        }
    }


    render(){
        
        return (
            <>
            <h1>SignUp Component</h1>
            <br/><br/>
            <Form>
            <Field type = "email" name = "username" placeholder = "USERNAME"></Field><br/>
            {this.props.errors.username && this.props.touched.username && <small className = "redify">{this.props.errors.username}</small>}<br/><br/>
            <Field type = "password" name = "password" placeholder = "PASSWORD"></Field><br/>
            {this.props.errors.password && this.props.touched.password && <small className = "redify">{this.props.errors.password}</small>}<br/><br/>
            <Field type = "text" name = "name" placeholder = "FIRST NAME"></Field><br/>
            {this.props.errors.name && this.props.touched.name && <small className = "redify">{this.props.errors.name}</small>}<br/><br/>

            {this.props.errors.error  && <small className = "redify">{this.props.errors.error}</small>}<br/><br/>
            <button >Sign Up</button>
            </Form>
            </>)
    }


    
}

const FormikSignUp = withFormik({
    mapPropsToValues(){
        return {
            username: '',
            password: '',
            name: '',
            error: ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        name: Yup.string().required()
    }),
    handleSubmit(values , {props, setErrors}){
        
        var headers = {
            'Content-Type': 'text/plain'
             
        }
        let account = {
            username: values.username,
            password: values.password
        }

        console.log(values.username);
        console.log(account.password);  

        let exists;
        Axios.post("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/checkUsername", values.username, {headers: headers}).then((response) => {

            if(response.data){
                setErrors({error: "Username already taken"})
            }

            else{

                Axios.post("http://localhost:8080/Quiz_app-0.0.1-SNAPSHOT/index/user", account).then((response) => {

                    console.log("signing up")
                    console.log(response.data);
                })
            }
            
         
            })

           

   

    }

})(SignUp)

export default FormikSignUp;