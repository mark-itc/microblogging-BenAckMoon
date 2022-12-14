import React from "react";
import { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const TweetItem = (props) => {
  const { item } = props;
  const [displayName, setdisplayName] = useState(null);
  const inWorking = useRef(false);

  useEffect(() => {
    inWorking.current = true;
    firebase
      .firestore()
      .collection("usernames")
      .doc(item.userID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setdisplayName(doc.data().nickName);
        } else {
          firebase
            .firestore()
            .collection("users")
            .doc(item.userID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                setdisplayName(doc.data().name);
              } else {
                console.log("Error");
              }
            });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return () => {
      inWorking.current = false;
    };
  }, [item.userID]);

  return (
    <div className="card tweet">
      <div className="card-body tweet-header">
        <div className="float-start">{displayName}</div>
        <div className="float-end">{item.date}</div>
      </div>
      <div className="card-body tweet-body">
        <p className="card-text tweet-text">{item.content}</p>
      </div>
    </div>
  );
};

export default TweetItem;
