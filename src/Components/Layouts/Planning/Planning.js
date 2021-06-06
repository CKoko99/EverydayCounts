import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Planning.module.css";
import Task from "./task/task";
import { planningActions } from "../../../store/index";
import { useRef } from "react";
import star from "../../../Images/Icons/Star.png";
import filledRecurring from "../../../Images/Icons/filledRecurring.png";
import { auth, db } from "../../../index";

function Planning() {
  const currentUser = auth.currentUser;
  const tasks = useSelector((state) => state.planning.tasks);
  const planningSelector = useSelector((state) => state.planning);
  const pomoSelector = useSelector((state) => state.pomo);
  const dispatch = useDispatch(planningActions);
  const history = useHistory();
  const newTaskRef = useRef();
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
      .then(history.push("/home"));
  }
  function addTaskHandler(event) {
    event.preventDefault();
    if (newTaskRef.current.value.trim() !== "") {
      const newTask = {
        task: newTaskRef.current.value,
        priority: false,
        recurring: false,
        markAsComplete: false,
        id: Math.random(),
      };
      newTaskRef.current.value = ""
      dispatch(planningActions.addTask(newTask));
    }
  }

  const tasklist = tasks.map((item, index) => {
    return (
      <Task
        recurring={item.recurring}
        task={item.task}
        key={index}
        priority={item.priority}
        id={item.id}
      />
    );
  });
  let submitButton;
  if (tasklist.length > 0) {
    submitButton = <button className={classes.submitButton} onClick={submitToDB}>Set Plan</button>;
  }
  return (
    <div className={classes.Planning}>
      <h1>Plan Your Day</h1>
      <div className={classes.Content}>
        <div className={classes.welcomeText}>
          Having a thought out plan for your day is the best way to ensure your
          important tasks get done
        </div>
        <div className={classes.section}>
          <div className={classes.subsection}>
            <form onSubmit={addTaskHandler}>
              <input
                placeholder="Add a Task"
                ref={newTaskRef}
                className={classes.addtask}
              />
            </form>
            <h2>Todays To-do List</h2>
            <div>{tasklist}</div>
          </div>
          <div className={classes.subsection}>
            {submitButton}
            <ul className={classes.instructions}>
              <li className={classes.instruction}>
                <h3>Click a Task to Remove It</h3>
              </li>
              <li className={classes.instruction}>
                <img src={star} alt="star" /> <h3> Mark Task as Priority</h3>
              </li>
              <li className={classes.instruction}>
                <img src={filledRecurring} alt="repeat" />{" "}
                <h3> Mark Task as Recurring</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Planning;
