import React from "react";
import banner from "../../../Images/Banner.png";
import classes from "../Layout.module.css";
import SquareButton from "../../UI/Buttons/SquareButton/SquareButton";
import Textfield from "../../UI/Textfield/Textfield";
import { Link } from "react-router-dom";

const login = (props) => (
  <div className={classes.Layout}>
    <img alt="banner" className={classes.Banner} src={banner}></img>
    <h3 className={classes.Maintext}>Login</h3>
    <div className={classes.Textfields}>
      <Textfield>Username: </Textfield>
      <Textfield>Password: </Textfield>
    </div>
    <div className={classes.Buttons}>
      <Link to='/Signup'><SquareButton color={"#DAA2FA"}>New User? Sign Up!</SquareButton></Link>
      <Link to='/Home'><SquareButton color={"#FBBFCA"}>Sign In!</SquareButton></Link>
    </div>
  </div>
);
export default login;
