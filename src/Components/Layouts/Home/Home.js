import React from "react";
import classes from "./Home.module.css";
import Icon from "./Icon/Icon";
import task from "../../../Images/Icons/completed-task.svg";
import tomato from "../../../Images/Icons/tomato.svg";
import bed from "../../../Images/Icons/bed.svg";
import stats from "../../../Images/Icons/profits.svg";
import { useSelector } from "react-redux";
import { auth } from "../../../index";
const items = [
  {
    pic: task,
    text: "Plan Your Day",
    color: "#23F0C7",
    link: "/plan",
  },
  {
    pic: tomato,
    text: "Pomodoro Tracker",
    color: "#FFEED6",
    link: "/pomo",
  },
  {
    pic: bed,
    text: "End your day",
    color: "#A663CC",
    link: "/checkup",
  },
  {
    pic: stats,
    text: "See how you’re doing",
    color: "#FBBFCA",
    link: "/stats",
  },
];

function Home (props) {
  const username = auth.currentUser.displayName
  const planningSelector = useSelector(state => state.planning)
  const currentDate = new Date();
  var options = { month: 'long'};
  const month = new Intl.DateTimeFormat('en-US', options).format(currentDate)
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()
  return (
    <div>
      <div className={classes.Maintext}>
        <h3>Welcome {username}</h3>
        <h4>{month} {day}, {year} </h4>
        <h4>Day {planningSelector.day}</h4>
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
export default Home;
