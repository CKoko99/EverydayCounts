import React from "react";
import tomato from "../../../Images/Icons/tomato.svg";
import singletomato from "../../../Images/Icons/singletomato.svg";
import classes from "./Pomo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { pomoActions } from "../../../store";
import { auth, db } from "../../../index";

function Pomo() {
  const currentUser = auth.currentUser;
  const currentValue = useSelector((state) => state.pomo.newSessions);
  const dailyTotal = useSelector((state) => state.pomo.dailyTotal);
  const planningSelector = useSelector((state) => state.planning);
  const pomoSelector = useSelector((state) => state.pomo);
  const pomoDispatch = useDispatch(pomoActions);
  function updateAddCurrentHandler() {
    pomoDispatch(pomoActions.updateCurrent(1));
  }
  function updateSubCurrentHandler() {
    pomoDispatch(pomoActions.updateCurrent(-1));
  }
  /*function updateTotalHandler(){
    pomoDispatch(pomoActions.updateTotal())
    setTimeout(function(){submitToDB()},1000)
  }*/
  function submitToDB() {
    db.collection("users")
      .doc(currentUser.uid)
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
      .then(pomoDispatch(pomoActions.resetNewSessions()));
  }
  const tomatos = [];
  for (let i = 0; i < dailyTotal; i++) {
    tomatos.push(
      <img
        className={classes.tomato}
        alt="small-tomato"
        key={i}
        src={singletomato}
      ></img>
    );
  }
  return (
    <div className={classes.Pomo}>
      <h1>Pomodoro Tracker</h1>
      <div className={classes.Content}>
        <div className={classes.welcomeText}>
          Use the Pomodoro Method to keep track of how much deep work you get
          done. Choose a task to work on intensely for 25 minutes then log each
          session.
        </div>
        <div className={classes.section}>
          <div className={classes.subSection}>
            <h2>Track New Sessions</h2>
            <img
              alt="main tomato"
              className={classes.MainImg}
              src={tomato}
            ></img>
            <div className={classes.TrackerControls}>
              <h3
                className={classes.TrackerButton}
                onClick={updateSubCurrentHandler}
              >
                -
              </h3>{" "}
              <h3 className={classes.TrackerNum}>{currentValue}</h3>{" "}
              <h3
                className={classes.TrackerButton}
                onClick={updateAddCurrentHandler}
              >
                {" "}
                +
              </h3>
            </div>
          </div>
          <div className={[classes.subSection, classes['desktop-flip']].join(' ')}>
            <button className={classes.pomoButton} onClick={submitToDB}>Update Tracking</button>
            <div>
            <h3>Total Pomo Sessions for the Day</h3>
            {tomatos}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pomo;
