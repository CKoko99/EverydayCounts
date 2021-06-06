import React from "react";
import {useDispatch} from 'react-redux'
import classes from "./task.module.css";
import emptyStar from "../../../../Images/Icons/EmptyStar.png";
import star from "../../../../Images/Icons/Star.png";
import filledRecurring from "../../../../Images/Icons/filledRecurring.png";
import emptyRecurring from "../../../../Images/Icons/emptyRecurring.png";
import { planningActions } from "../../../../store";
function Task (props){
  const dispatch = useDispatch(planningActions)
  function toggleRecurringHandler(){
    dispatch(planningActions.toggleRecurring(props.id))
  }
  function togglePriorityHandler(){
    dispatch(planningActions.togglePriority(props.id))
  }
  function removeTaskHandler(){
    dispatch(planningActions.removeTask(props.id))
  }
    let starType, recuringImg;
  if (props.priority) {
    starType = star;
  } else {
    starType = emptyStar;
  }
  if(props.recurring){
    recuringImg = filledRecurring
  }else{
      recuringImg= emptyRecurring
  }
  return (
    <div className={classes.wholeTask}>
      <div className={classes.Taskitem}>
        <p onClick={removeTaskHandler} className={classes.Task}>{props.task}</p>
      </div>
      <div className={classes.actionItems}>
        <img className={classes.actionItem} alt="star" onClick={togglePriorityHandler} src={starType} />
        <img className={classes.actionItem} alt="star" onClick={toggleRecurringHandler} src={recuringImg} />
      </div>
    </div>
  );
};
export default Task;
