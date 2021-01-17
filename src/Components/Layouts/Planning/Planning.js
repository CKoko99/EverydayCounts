import React, { Component } from "react";
import classes from "./Planning.module.css"
import Addtask from './Addtask'
import Task from './task/task'
class Planning extends Component{
    state = {
        tasks: [
            {
                task: 'Work On Code',
                priority: false,
                recurring: true,
            },
            {
                task: 'Yessir',
                priority: false,
                recurring: true,
            }
        ]
    }
    render(){
        const tasklist = this.state.tasks.map((item, index)=>{
            return <Task task={item.task}
                key={index}
                recurring={item.recurring}
                priority={item.priority}
            />
        })

        return(<div className={classes.Planning}>
            <h3>Plan Your Day</h3>
            <div className={classes.Content}>
                <Addtask>Add A Task</Addtask>
                <h3>Todays To-do List</h3>
                <div>{tasklist}</div>
            </div>
        </div>)
    }
}
export default Planning;