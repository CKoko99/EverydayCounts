import React from "react";
import classes from "./Textfield.module.css";

const textfield = (props) => (
  <input className={classes.Textfield} placeholder={props.children}
    onChange={props.changed}
    value={props.value}
  ></input>
);
export default textfield;
