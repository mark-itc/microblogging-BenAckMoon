import React from "react";
import "../App.css";
import TweetForm from "./TweetForm";
import List from "./List";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { Context } from "../context/Context";
import ProfileDesign from "./ProfileDesign";
import SignOut from "./SignOut";
import { useState } from "react";

const NavBar = () => {
  return (
    <nav className="container navbar navbar-expand fixed-top">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-link" exact activeClassName="selected" to="/">
            Home
          </NavLink>
          <NavLink
            className="nav-link"
            activeClassName="selected"
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className="nav-link"
            activeClassName="selected"
            to="/sign_out"
          >
            Sign out
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const TweetDesign = (props) => {
  const { authUser, authStorage } = props;
  const [error, setError] = useState(null);
  const [currentUser] = useState(authUser.uid);

  const addingTweet = async (item) => {
    const newTweet = await firebase.firestore().collection("tweets").add(item);
    if (typeof newTweet === "string") {
      if (newTweet.includes("Oops! Something went wrong.")) {
        setError(newTweet);
      }
    }
  };

  return (
    <Context.Provider value={{ error, currentUser, addingTweet }}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <TweetForm />
              <List />
            </Route>
            <Route path="/profile">
              <ProfileDesign
                authUser={authUser}
                authStorage={authStorage}
              ></ProfileDesign>
            </Route>
            <Route path="/sign_out">
              <SignOut />
            </Route>
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
};

export default TweetDesign;
