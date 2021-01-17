import React from 'react'
import classes from './task.module.css'
const task = props =>{
    return(
        <div className={classes.Taskitem}>
            <p className={classes.Task}>{props.task}</p>
        </div>
    )
}
export default task