import React from "react";
import { Link } from "react-router-dom";
import classes from "./Icon.module.css";
const icon = (props) => (
  <div className={classes.Icon}>
    <Link to={props.link}>
      <img
        alt=""
        style={{ backgroundColor: props.color }}
        src={props.pic}
      ></img>
    </Link>
    <p>{props.text}</p>
  </div>
);

export default icon;
