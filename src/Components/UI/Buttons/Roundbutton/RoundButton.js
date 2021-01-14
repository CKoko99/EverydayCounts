import React from 'react'
import classes from './RoundButton.module.css'
const roundbutton = props =>{
    return(
        <button className={classes.Roundbutton}>{props.children}</button>
    )
}
export default roundbutton