import React from "react";
import banner from "../../../Images/Banner.png";
import classes from "../Layout.module.css";
import SquareButton from "../../UI/Buttons/SquareButton/SquareButton";
import Textfield from "../../UI/Textfield/Textfield";
import { Link } from "react-router-dom";

const signup = (props) => (
  <div className={classes.Layout}>
    <img alt="banner" className={classes.Banner} src={banner}></img>
    <h3 className={classes.Maintext}>Sign Up</h3>
    <div className={classes.Textfields}>
      <Textfield>Username: </Textfield>
      <Textfield>Email Address: </Textfield>
      <Textfield>Password: </Textfield>
      <Textfield>Confirm Password: </Textfield>
    </div>
    <div className={classes.Buttons}>
      <Link to='/Login'><SquareButton color={"#DAA2FA"}>Returning User? Sign In!</SquareButton></Link>
      <Link to='/Home'><SquareButton color={"#FBBFCA"}>Sign Up!</SquareButton></Link>
    </div>
  </div>
);
export default signup;
