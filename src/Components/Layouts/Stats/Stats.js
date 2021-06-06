import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../index";
import { planningActions, pomoActions } from "../../../store";
import classes from "./Stats.module.css";

function Stats() {
  const planning = useSelector((state) => state.planning);
  const pomocount = useSelector((state) => state.pomo);
  const planningDispatch = useDispatch(planningActions);
  const pomoDispatch = useDispatch(pomoActions);

  const currentUser = auth.currentUser;
  const [ranOnce, setRanOnce] = useState(false);
  useEffect(() => {
    if (!ranOnce) {
      setRanOnce(true)
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((querySnapshot) => {
          const planning = querySnapshot.data().planningState;
          const pomo = querySnapshot.data().pomoState;
          planningDispatch(
            planningActions.updateFromDB({
              tasks: planning.tasks,
              day: planning.day,
              totalCompletedTasks: planning.totalCompletedTasks,
              totalAttemptedTasks: planning.totalAttemptedTasks,
              currentGrade: planning.currentGrade,
            })
          );
          pomoDispatch(
            pomoActions.updateFromDB({
              dailyTotal: pomo.dailyTotal,
              completeTotal: pomo.completeTotal,
            })
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <>
      <div className={classes.stats}>
        <h3>Stat Tracker</h3>{" "}
        <div className={classes.content}>
          <ul>
            <li>
              <h3>Day: </h3>
              <h3>{planning.day}</h3>
            </li>
            <li>
              <h3>Completed Tasks: </h3>
              <h3>{planning.totalCompletedTasks}</h3>
            </li>
            <li>
              <h3>Attempted Tasks: </h3>
              <h3>{planning.totalAttemptedTasks}</h3>
            </li>
            <li>
              <h3>Pomodoro Count: </h3>
              <h3>{pomocount.completeTotal}</h3>
            </li>
          </ul>
          <h3>Grade:</h3>
          <h3>{planning.currentGrade}</h3>
        </div>
      </div>
    </>
  );
}

export default Stats;
