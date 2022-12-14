import React from "react";
import { Context } from "../context/Context";

export default class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: "",
      tweetText: "",
      date: "",
      userName: "",
      charactersLeft: 0,
      maxLengthWarning: false,
      maxTweetLengthReached: false,
      arrayOfTweets: [],
      loading: false,
    };
    this.item = {};
  }

  handleChange(event) {
    this.setState({ tweetText: event.target.value });
    const value = event.target.value;
    this.setState({
      charactersLeft: (value.length - 140) * -1,
      maxLengthWarning: value.length > 99 ? true : false,
      maxTweetLengthReached: value.length > 140 ? true : false,
    });
  }

  handleSubmit(event, currentUser, addingTweet) {
    event.preventDefault();
    this.setState({ loading: true });

    setTimeout(() => {
      if (!this.state.tweetText) return;

      console.log("currentUser: " + currentUser);
      const item = {
        content: this.state.tweetText,
        userID: currentUser,
        date: new Date().toISOString(),
      };

      addingTweet(item);
      this.setState({
        value: "",
        id: "",
        tweetText: "",
        date: "",
        maxLengthWarning: false,
      });
      this.afterSubmit();
    }, 1500);
  }

  afterSubmit() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <Context.Consumer>
        {({ error, currentUser, addingTweet }) => (
          <div className="tweetForm">
            <form
              className="card"
              onSubmit={(event) =>
                this.handleSubmit(event, currentUser, addingTweet)
              }
            >
              <div className="card-body">
                <textarea
                  className="form-control"
                  name="text"
                  rows="3"
                  placeholder="What you have in mind..."
                  value={this.state.tweetText}
                  onChange={(event) => this.handleChange(event)}
                ></textarea>
              </div>
              <div className="card-body form-footer">
                {this.state.maxLengthWarning &&
                  !this.state.maxTweetLengthReached && (
                    <div className="float-start">
                      {this.state.charactersLeft} characters left.
                    </div>
                  )}
                <div className="float-end">
                  {!this.state.tweetText && (
                    <button className="btn btn-primary disabled">Tweet</button>
                  )}
                  {this.state.tweetText &&
                    this.state.maxTweetLengthReached &&
                    !this.state.loading && (
                      <button className="btn btn-primary disabled">
                        Tweet
                      </button>
                    )}
                  {this.state.tweetText &&
                    !this.state.maxTweetLengthReached &&
                    !this.state.loading && (
                      <button className="btn btn-primary">Tweet</button>
                    )}
                  {this.state.tweetText && this.state.loading && (
                    <button className="btn btn-primary disabled">
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      Loading ...
                    </button>
                  )}
                </div>
              </div>
            </form>
            {this.state.maxTweetLengthReached && (
              <div className="alert alert-danger" role="alert">
                The tweet can't contain more than 140 chars.
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {currentUser === "Anonymous user" && (
              <div className="alert alert-warning" role="alert">
                You are currently logged in as 'Anonymous user'. Please change
                your user name in the <a href="/profile">profile</a> section.
              </div>
            )}
          </div>
        )}
      </Context.Consumer>
    );
  }
}
