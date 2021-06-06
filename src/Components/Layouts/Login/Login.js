import React, { useState } from "react";
import banner from "../../../Images/Banner.png";
import classes from "../Layout.module.css";
import SquareButton from "../../UI/Buttons/SquareButton/SquareButton";
import Textfield from "../../UI/Textfield/Textfield";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store";
import {auth} from '../../../index'


function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");
  const authDispatch = useDispatch(authActions)
  const history = useHistory()
  function emailInputHandler(event) {
    setEmailInput(event.target.value);
  }
  function passwordInputHandler(event) {
    setPasswordInput(event.target.value);
  }
  function loginHandler() {
    auth.signInWithEmailAndPassword(emailInput, passwordInput)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        authDispatch(authActions.login({token: data.idToken, userID: data.localId}))
        history.replace('/home')
      })
      .catch((err) => {
        let errorMessage = "Authentication failed incorrect Username and Password";
        setLoginErrorText(errorMessage)
        //alert(err.message);
      });
  }
  return (
    <div className={classes.Layout}>
      <img alt="banner" className={classes.Banner} src={banner}></img>
      <h3 className={classes.Maintext}>Login</h3>
      <div className={classes.Textfields}>
        <Textfield value={emailInput} changed={emailInputHandler}>
          Email:
        </Textfield>
        <Textfield value={passwordInput} changed={passwordInputHandler}>
          Password:
        </Textfield>
        <p style={{ color: "red" }}>{loginErrorText}</p>
      </div>
      <div className={classes.Buttons}>
        <Link to="/Signup">
          <SquareButton color={"#DAA2FA"}>New User? Sign Up!</SquareButton>
        </Link>

        <SquareButton clicked={loginHandler} color={"#FBBFCA"}>
          Sign In!
        </SquareButton>
      </div>
    </div>
  );
}
export default Login;
