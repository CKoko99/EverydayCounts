import React, { Component } from "react";
import banner from "../../../Images/Banner.png";
import classes from "../Layout.module.css";
import SquareButton from "../../UI/Buttons/SquareButton/SquareButton";
import Textfield from "../../UI/Textfield/Textfield";
import { Link } from "react-router-dom";
import axios from "../../../axiosinstance";

class signup extends Component {
  state = {
    Username: "",
    Email: "",
    Password: "",
    ConfirmPass: "",
    passmatch: true,
    Usernametaken: false,
    Emailtaken: false,
  };
  usernamehandler = (event) => {
    this.setState({ Username: event.target.value });
  };
  emailhandler = (event) => {
    this.setState({ Email: event.target.value });
  };
  passwordhandler = (event) => {
    this.setState({ Password: event.target.value });
  };
  confirmpasshandler = (event) => {
    this.setState({ ConfirmPass: event.target.value });
  };
  loginclicked = () => {
    if (this.state.ConfirmPass === this.state.Password) {
      this.setState({ passmatch: true,Usernametaken: false, Emailtaken: false });
      const user = {
        email: this.state.Email,
        username: this.state.Username,
        password: this.state.Password,
      };
      axios.get("/users.json").then((res) => {
        const responses = { ...res.data };
        for (let response in responses) {
          const theresponse = responses[response];
          if (theresponse.email === user.email) {
            this.setState({ Emailtaken: true });
          }
          if (theresponse.username === user.username) {
            this.setState({ Usernametaken: true });
          }
        }
        if (
          this.state.Usernametaken === false &&
          this.state.Emailtaken === false
        ) {
          axios.post("/users.json", user).then((res) => {
            this.props.history.push('/Home')
          });
        }
      });
    } else {
      this.setState({ passmatch: false });
    }
  };

  render() {
    let passmatchText,
      usernameTakenText,
      emailTakenText = null;
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
    }
    return (
      <div className={classes.Layout}>
        <img alt="banner" className={classes.Banner} src={banner}></img>
        <h3 className={classes.Maintext}>Sign Up</h3>
        <div className={classes.Textfields}>
          <Textfield changed={this.usernamehandler} value={this.state.Username}>
            Username:{" "}
          </Textfield>
          <Textfield changed={this.emailhandler} value={this.state.Email}>
            Email Address:{" "}
          </Textfield>
          <Textfield changed={this.passwordhandler} value={this.state.Password}>
            Password:{" "}
          </Textfield>
          <Textfield
            changed={this.confirmpasshandler}
            value={this.state.ConfirmPass}
          >
            Confirm Password:{" "}
          </Textfield>
          {passmatchText}
          {usernameTakenText}
          {emailTakenText}
          <p style={{ color: "black" }}>{this.state.ConfirmPass}</p>
          <p style={{ color: "black" }}>{this.state.Password}</p>
        </div>
        <div className={classes.Buttons}>
          <Link to="/Login">
            <SquareButton color={"#DAA2FA"}>
              Returning User? Sign In!
            </SquareButton>
          </Link>

          <SquareButton color={"#FBBFCA"} clicked={this.loginclicked}>
            Sign Up!
          </SquareButton>
        </div>
      </div>
    );
  }
}
export default signup;
