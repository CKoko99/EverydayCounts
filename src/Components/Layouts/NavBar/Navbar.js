import classes from "./Navbar.module.css";
import { Link, useHistory } from "react-router-dom";
import home from "../../../Images/Icons/home.svg";
import { useDispatch } from "react-redux";
import { authActions, planningActions, pomoActions } from "../../../store";
import { auth, db } from "../../../index";
function Navbar() {
  const authDispatch = useDispatch(authActions);
  const currentUser = auth.currentUser;
  const planningDispatch = useDispatch(planningActions);
  const pomoDispatch = useDispatch(pomoActions);
  const history = useHistory()
  function readFromDB() {
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
        )
        history.push("/home")
      });
  }
  function logoutHandler() {
    planningDispatch(planningActions.resetState())
    pomoDispatch(pomoActions.resetState())
    authDispatch(authActions.logout());
    auth.signOut().then(() => {
      console.log("signed out");
    });
  }
  return (
    <div className={classes.Navbar}>
      <Link to="/home">
        <img onClick={readFromDB} src={home} alt="home" />
      </Link>
      <div className={classes.navtext}>
        {false && (<Link to="/Settings">
          <h4>Settings</h4>
        </Link>)}
        <Link to="/">
          <h4 onClick={logoutHandler}>Logout</h4>
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
