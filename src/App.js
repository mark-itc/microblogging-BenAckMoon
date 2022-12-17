import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import firebase from "firebase/app";
import "firebase/firestore";
import Login from "./components/Login";
import TweetDesign from "./components/TweetDesign";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwftGlqWCNgJ9bORi7OudiB5LNpCucbvA",
  authDomain: "microblog-itc-ben.firebaseapp.com",
  projectId: "microblog-itc-ben",
  storageBucket: "microblog-itc-ben.appspot.com",
  messagingSenderId: "283071898031",
  appId: "1:283071898031:web:69a86f049c963c470ccf5a",

};

firebase.initializeApp(firebaseConfig);
// var storage = firebase.storage();

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [authStorage, setAuthStorage] = useState(null);
  const login = async (authUser) => {
    setAuthUser(authUser);
    setAuthStorage(firebase.storage());
    await firebase
      .firestore()
      .collection("users")
      .doc(authUser.uid)
      .set({ name: authUser.displayName });
  };

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); // NONE, LOCAL or SESSION
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authStorage,
        login,
        logout: () => setAuthUser(null),
      }}>
      {!authUser && <Login />}
      {authUser && <TweetDesign authUser={authUser} authStorage={authStorage} />}
    </AuthContext.Provider>
  );
}

export default App;
