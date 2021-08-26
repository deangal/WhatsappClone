import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../../firebase';
import { actionTypes } from '../../Reducer';
import { useStateValue } from '../../StateProvider';
import db from '../../firebase';
import './login.scss'
const Login = () => {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => {
        dispatch({type: actionTypes.SET_USER, user: result.user})})  
        .catch(error => alert(error.message))

        
    }
    return (
        
        <div className="login">
            <div className="loginContainer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" width='350px' height='350px' alt="" />

                <div className="loginText">
                    <h1>Sign In to Whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
             </div>
        </div>    
        
    );
};

export default Login;