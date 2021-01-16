import React, { Component } from "react";
import banner from "../../../Images/Banner.png";
import classes from "../Layout.module.css";
import SquareButton from "../../UI/Buttons/SquareButton/SquareButton";
import Textfield from "../../UI/Textfield/Textfield";
import { Link } from "react-router-dom";
import axios from "../../../axiosinstance";

class login extends Component {
  state = {
    user: "",
    password: "",
    Loginiswrong: false,
  };
  usernameHandler = (event) => {
    this.setState({ user: event.target.value });
  };
  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  loginhandler = () => {
    axios.get("/users.json").then((res) => {
      const responses = { ...res.data };
      for (let response in responses) {
        const theresponse = responses[response];
        if (
          theresponse.username === this.state.user &&
          theresponse.password === this.state.password
        ) {
          this.props.history.push('/Home')
        }
        else{
          this.setState({ Loginiswrong: true });
        }
      }
    });
  };

  render() {
    let wrongLoginText = null
    if(this.state.Loginiswrong === true){
      wrongLoginText = <p style={{color: "red"}}>Your Username or Password is incorrect</p>
    }
    return (
      <div className={classes.Layout}>
        <img alt="banner" className={classes.Banner} src={banner}></img>
        <h3 className={classes.Maintext}>Login</h3>
        <div className={classes.Textfields}>
          <Textfield changed={this.usernameHandler}>Username: </Textfield>
          <Textfield changed={this.passwordHandler}>Password: </Textfield>
          {wrongLoginText}
        </div>
        <div className={classes.Buttons}>
          <Link to="/Signup">
            <SquareButton color={"#DAA2FA"}>New User? Sign Up!</SquareButton>
          </Link>

            <SquareButton 
            clicked={this.loginhandler}
            color={"#FBBFCA"}>Sign In!</SquareButton>

        </div>
      </div>
    );
  }
}
export default login;
