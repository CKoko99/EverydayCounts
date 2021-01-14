import { Component } from "react";
import Welcome from "./Components/Layouts/Welcome/Welcome";
import Login from './Components/Layouts/Login/Login'
import Signup from './Components/Layouts/SignUp/SignUp'
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Components/Layouts/Home/Home'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route path='/' exact component={Welcome}/>
            <Route path='/Login' exact component={Login}/>
            <Route path='/Signup' exact component={Signup}/>
            <Route path='/Home' exact component={Home}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
