import React from "react";
import { useState } from "react";
import "firebase/firestore";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import { Context } from "../context/Context";


const ProfileDesign = (props) => {
  
  const { authUser, authStorage } = props;
  const [currentUser] = useState(authUser.uid);

  return (
    <Context.Provider value={{ currentUser }}>
      <ProfileName currentUser={authUser.uid}></ProfileName>
      <ProfilePicture
        currentUser={authUser.uid}
        storage={authStorage}
      ></ProfilePicture>
    </Context.Provider>
  );
};

export default ProfileDesign;
