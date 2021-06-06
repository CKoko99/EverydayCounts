import Welcome from "./Components/Layouts/Welcome/Welcome";
import Login from "./Components/Layouts/Login/Login";
import Signup from "./Components/Layouts/SignUp/SignUp";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Components/Layouts/Home/Home";
import Planning from "./Components/Layouts/Planning/Planning";
import Pomo from "./Components/Layouts/Pomo/Pomo";
import Checkup from "./Components/Layouts/Checkup/Checkup";
import Stats from "./Components/Layouts/Stats/Stats";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Layouts/NavBar/Navbar";
import { auth, db } from "./index";
import { authActions, planningActions, pomoActions } from "./store";
import { useState } from "react";
function App() {

  const planningDispatch = useDispatch(planningActions);
  const authDispatch = useDispatch(authActions)
  const pomoDispatch = useDispatch(pomoActions);
  const [ranOnce, setRanOnce] = useState(false)
  auth.onAuthStateChanged((user) => {
    if (user && !ranOnce) {
      setRanOnce(true)
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
          const planning = querySnapshot.data().planningState;
          const pomo = querySnapshot.data().pomoState
          planningDispatch(
            planningActions.updateFromDB({
              tasks: planning.tasks,
              day: planning.day,
              totalCompletedTasks: planning.totalCompletedTasks,
              totalAttemptedTasks: planning.totalAttemptedTasks,
              currentGrade: planning.currentGrade,
            })
          );
          pomoDispatch(pomoActions.updateFromDB({dailyTotal: pomo.dailyTotal, completeTotal: pomo.completeTotal}))
        });
      authDispatch(authActions.login({token: user.refreshToken, userId: user.uid}))
    }
  });
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      {!isLoggedIn && (
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
      {isLoggedIn && (
        <Switch>
          <Route path="/Home" exact component={Home} />
          <Route path="/Plan" exact component={Planning} />
          <Route path="/pomo" exact component={Pomo} />
          <Route path="/checkup" exact component={Checkup} />
          <Route path="/stats" exact component={Stats} />
          <Route path="*">
            <Redirect to="/Home" />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
