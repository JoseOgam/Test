import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/loginPage/LoginPage";
import CreateUser from "./components/createUser/CreateUserPage";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import NavBar from "./components/common/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/createUser" component={CreateUser} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
