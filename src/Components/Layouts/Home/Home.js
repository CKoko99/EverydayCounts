import React from "react";
import classes from "./Home.module.css";
import Icon from "./Icon/Icon";
import task from "../../../Images/Icons/completed-task.svg";
import tomato from "../../../Images/Icons/tomato.svg";
import bed from "../../../Images/Icons/bed.svg";
import stats from "../../../Images/Icons/profits.svg";
const items = [
  {
    pic: task,
    text: "Plan Your Day",
    color: "#23F0C7",
    link: "/plan",
  },
  {
    pic: tomato,
    text: "Using the pomodoro technique track your focus sessions",
    color: "#FFEED6",
    link: "/plan",
  },
  {
    pic: bed,
    text: "End your day",
    color: "#A663CC",
    link: "/plan",
  },
  {
    pic: stats,
    text: "See how you’re doing",
    color: "#FBBFCA",
    link: "/plan",
  },
];
const home = (props) => {
  return (
    <div>
      <div className={classes.Maintext}>
        <h3>Welcome User</h3>
        <h4>January 12th, 2020</h4>
        <h4>Day 1</h4>
      </div>
      <div className={classes.Icons}>
        {items.map((item) => {
          return (
            <Icon
                key={item.text}
              pic={item.pic}
              text={item.text}
              color={item.color}
              link={item.link}
            />
          );
        })}
      </div>
    </div>
  );
};
export default home;
