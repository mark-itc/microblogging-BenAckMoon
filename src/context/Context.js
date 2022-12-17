import { createContext } from "react";

export const Context = createContext({
  serverTweets: [],
  error: "",
  currentUser: "",
  addingTweet: () => { }
});