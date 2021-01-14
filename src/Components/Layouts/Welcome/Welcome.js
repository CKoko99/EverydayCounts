import React from 'react'
import RoundButton from '../../UI/Buttons/Roundbutton/RoundButton'
import banner from '../../../Images/Banner.png'
import classes from '../Layout.module.css'
import {Link} from 'react-router-dom'

const welcome = props => (
    <div className={classes.Layout}>
        <img alt="banner" className={classes.Banner} src={banner}></img>
        <h3 className={classes.Maintext}>Welcome to Everyday Counts</h3>
        <h4 className={classes.Subtext}>January 12, 2021</h4>
        <Link to='/Login' ><RoundButton>Tap to Begin</RoundButton></Link>
    </div>
)
export default welcome;