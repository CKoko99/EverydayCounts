import React from 'react'
import classes from './SquareButton.module.css'

const squarebutton = props =>{
    return(
        <button className={classes.Squarebutton}
            style={{backgroundColor: props.color}}
            onClick={props.clicked}
        >{props.children}</button>
    )
}
export default squarebutton