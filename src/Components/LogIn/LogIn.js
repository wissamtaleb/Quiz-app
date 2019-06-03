import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import {withFormik , Form , Field} from 'formik';
import * as Yup from 'yup';

const LogIn = (props) => (<Form>
    <h1>LogIn Component</h1><br/>
            <div>
                
        <Field type = "email" name = "email" placeholder = "EMAIL"/>
        {props.errors.email && props.touched.email && <small>{props.errors.email}</small>}
        </div><br/>
        <div>
       
        <Field type = "password" name = "password" placeholder = "PASSWORD"/>
        {props.errors.password && props.touched.password && <small>{props.errors.password}</small>}
        </div><br/>
        <button>Log In</button>



        </Form>)
    


const FormikLogIn = withFormik({
    mapPropsToValues(){
        return {
        email: '',
        password: ''

               }
    },
    validationSchema: Yup.object().shape({
email: Yup.string().email().required(),
password: Yup.string().min(9).required()
    }),
    handleSubmit(values){

        console.log(values);
    }
})(LogIn)

export default FormikLogIn;