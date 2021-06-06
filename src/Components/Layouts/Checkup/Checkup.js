import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../../index";
import { planningActions, pomoActions } from "../../../store";
import classes from "./checkup.module.css";
import CheckupTask from "./CheckupTask";
import { calculateGrade } from "../../../store/index";

function Checkup() {
  const currentUser = auth.currentUser;
  const tasks = useSelector((state) => state.planning.tasks);
  const [currentValue, setCurrentValue] = useState(0)
  const pomo = useSelector((state) => state.pomo);
  const planningSelector = useSelector((state) => state.planning);
  const dispatch = useDispatch(planningActions);
  const pomoDispatch = useDispatch(pomoActions);
  const history = useHistory();
  function updateAddCurrentHandler() {
    pomoDispatch(pomoActions.updateCurrent(1));
    setCurrentValue(currentValue+1)
  }
  function updateSubCurrentHandler() {
    if (currentValue <= 0) {
      return;
    } else {
      pomoDispatch(pomoActions.updateCurrent(-1));
      setCurrentValue(currentValue -1)
    }
  }
 
  let completedtasks = 0;

  function submitToDB() {
    let totalAttemptedTasks = planningSelector.totalAttemptedTasks;
    let totalCompletedTasks = planningSelector.totalCompletedTasks;
    console.log(totalAttemptedTasks)
    tasks.forEach((task) => {
      taskslist.push({
        task: task.task,
        priority: task.priority,
        recurring: task.recurring,
        markAsComplete: task.markAsComplete,
        id: task.id,
      });
    });
    
    taskslist.forEach((task) => {
      if(!task.props){
      totalAttemptedTasks += 1;
      if (task.markAsComplete) {
        totalCompletedTasks += 1;
      }
      if (task.recurring) {
        task.markAsComplete = false;
      }}
    });
    const completeTotal = pomo.dailyTotal + pomo.completeTotal;
    console.log(totalAttemptedTasks)
    const newTasks = taskslist.filter((task) => task.recurring);
    const newGrade = calculateGrade(totalCompletedTasks, totalAttemptedTasks);
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        planningState: {
          day: planningSelector.day + 1,
          tasks: newTasks,
          totalAttemptedTasks: totalAttemptedTasks,
          totalCompletedTasks: totalCompletedTasks,
          currentGrade: newGrade,
        },
        pomoState: {
          completeTotal: completeTotal,
          dailyTotal: 0,
        },
      })
      .then((cred) => {
        history.push("/home");
        pomoDispatch(pomoActions.endDaySubmit());
        dispatch(planningActions.endDay());
      });
  }
  if (false) {
    submitToDB();
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].markAsComplete) {
      completedtasks++;
    }
  }
  const taskslist = tasks.map((item) => {
    return (
      <CheckupTask key={item.id} id={item.id} task={item.task} done={item.markAsComplete} />
    );
  });
  return (
    <div className={classes.Checkup}>
      <h1>End Your Day</h1>
      <div className={classes.Content}>
        <div className={classes.welcomeText}>
          Create Self-Accountability by Evaluating what you planned to get done
          Today and what you accomplished.
        </div>
        <div className={classes.section}>
          <div className={classes.subSection}>
            <h2>Mark Tasks as Complete</h2>
            {taskslist}
          </div>
          <div className={classes.subSection}>
            <h3>Today's Score:</h3>
            <h3>
              {completedtasks}/{taskslist.length}
            </h3>

            <h3>Additonal Focus Sessions?</h3>
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
            <h3>Total Pomo Sessions for the Day:</h3>
            <h3>{pomo.dailyTotal}</h3>
              <button className={classes.submitButton} onClick={submitToDB}>End Your Day</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkup;
