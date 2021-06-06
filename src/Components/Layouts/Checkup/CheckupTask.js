import classes from './CheckupTask.module.css'
import check from '../../../Images/Icons/check.png'
import unfilledcheck from '../../../Images/Icons/unfilledcheck.png'
import star from "../../../Images/Icons/Star.png";
import { useDispatch } from 'react-redux';
import { planningActions } from '../../../store';


function CheckupTask(props) {

    const dispatch = useDispatch(planningActions)
    function markAsCompleteHandler(){
        dispatch(planningActions.markAsComplete(props.id))
    }
    let checkIMG
    if(props.done){
        checkIMG = check
    }else{
        checkIMG=unfilledcheck
    }
  return (
    <>
      <div className={classes.Taskitem}>
          {props.priority && <img alt="priority" src={star}/>}
        <p className={classes.Task}>{props.task}</p>
        <img onClick={markAsCompleteHandler} alt="complete" src={checkIMG}/>
      </div>
    </>
  );
}

export default CheckupTask;
