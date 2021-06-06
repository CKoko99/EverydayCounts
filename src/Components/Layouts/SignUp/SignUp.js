import React, { useState } from "react";
import banner from "../../../Images/Banner.png";
import classes from "../Layout.module.css";
import SquareButton from "../../UI/Buttons/SquareButton/SquareButton";
import Textfield from "../../UI/Textfield/Textfield";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store";

function SignUp() {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confPassInput, setConfPassInput] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const authDispatch = useDispatch(authActions);
  const planningSelector = useSelector((state) => state.planning);
  const pomoSelector = useSelector((state) => state.pomo);
  const history = useHistory();
  function setUsernameInputHandler(event) {
    setUsernameInput(event.target.value);
  }
  function setEmailInputHandler(event) {
    setEmailInput(event.target.value);
  }
  function setPasswordInputHandler(event) {
    setPasswordInput(event.target.value);
  }
  function setConfPassInputHandler(event) {
    setConfPassInput(event.target.value);
  }

  function loginSubmitVerificationHandler() {
    if (!emailInput.includes("@")) {
      setLoginErrorMessage("Enter a valid Email Address");
      return;
    }
    if (passwordInput !== confPassInput) {
      setLoginErrorMessage("Passwords do not match");
      return;
    }
    SignUpSubmitRequest();
  }
  function SignUpSubmitRequest() {
    auth
      .createUserWithEmailAndPassword(emailInput, passwordInput)
      .then((cred) => {
        console.log(cred);
        console.log(cred.user);
        authDispatch(
          authActions.login({
            token: cred.user.refreshToken,
            userId: cred.user.uid,
          })
          );
          var user = auth.currentUser;
          user.updateProfile({
            displayName: usernameInput
          })
        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            planningState: {
              day: planningSelector.day,
              tasks: planningSelector.tasks,
              totalAttemptedTasks: planningSelector.totalAttemptedTasks,
              totalCompletedTasks: planningSelector.totalCompletedTasks,
              currentGrade: planningSelector.currentGrade,
            },
            pomoState: {
              completeTotal: pomoSelector.completeTotal,
              dailyTotal: pomoSelector.dailyTotal,
            },
          })
          .then(history.push("/home"));
      });
  }

  /*if (!response.ok) {
      throw new Error("Something Went Wrong");
    }
    const responseData = await response.json();
    console.log(responseData);

    for (const key in responseData) {
      if (responseData[key].username === usernameInput) {
        setLoginErrorMessage("Username is taken");
        return;
      }
      if (responseData[key].email === passwordInput) {
        setLoginErrorMessage("Email is taken");
        return;
      }
    }*/

  /*
  if (this.state.passmatch === false) {
    passmatchText = <p style={{ color: "black" }}>Passwords do not match</p>;
  }
  if (this.state.Usernametaken === true) {
    usernameTakenText = (
      <p style={{ color: "red" }}>Username is already taken</p>
    );
  }
  if (this.state.Emailtaken === true) {
    emailTakenText = <p style={{ color: "red" }}>Email is already taken</p>;
  }*/
  return (
    <div className={classes.Layout}>
      <img alt="banner" className={classes.Banner} src={banner}></img>
      <h3 className={classes.Maintext}>Sign Up</h3>
      <div className={classes.Textfields}>
        <Textfield changed={setUsernameInputHandler} value={usernameInput}>
          Username:
        </Textfield>
        <Textfield changed={setEmailInputHandler} value={emailInput}>
          Email Address:
        </Textfield>
        <Textfield changed={setPasswordInputHandler} value={passwordInput}>
          Password:
        </Textfield>
        <Textfield changed={setConfPassInputHandler} value={confPassInput}>
          Confirm Password:
        </Textfield>
        {loginErrorMessage}
      </div>
      <div className={classes.Buttons}>
        <Link to="/Login">
          <SquareButton color={"#DAA2FA"}>
            Returning User? Sign In!
          </SquareButton>
        </Link>

        <SquareButton
          color={"#FBBFCA"}
          clicked={loginSubmitVerificationHandler}
        >
          Sign Up!
        </SquareButton>
      </div>
    </div>
  );
}

export default SignUp;
