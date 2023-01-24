import React from 'react';
import { getTweets, postTweet } from '../Url.js';
import MyContext from '../MyContext.js';
import PostTweet from '../components/PostTweet.js';
import Tweet from '../components/Tweet.js';
import './home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            addTweet: this.addTweet.bind(this),
            isLoadingGet: false,
            isLoadingPost: false,
            errorGet: '',
            errorPost: '',
        }
        this.getTweets = this.getTweets.bind(this);
    }

    async postTweet(newMsg) {
        this.setState({ isLoadingPost: true });
        try {
            setTimeout(() => { }, 500);
            await postTweet(newMsg)
            if (this.state.errorPost.length > 0) {
                this.setState({ errorPost: '' });
            }
        }
        catch (error) {
            this.setState({ errorPost: error.toString() });
        }
        this.setState({ isLoadingPost: false });
    }

    sortTweets(arr) {
        return arr.sort((a, b) => (a.date < b.date) ? 1 : -1);
    }

    addTweet(newMsg) {
        this.postTweet(newMsg);
        this.setState((prevState) => ({ messages: [newMsg, ...prevState.messages] }));
    }

    componentDidMount() {
        this.getTweets();
        this.interval =
            setInterval
            (this.getTweets, 2500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async getTweets() {
        this.setState({ isLoadingGet: true });
        try {
            const response = await getTweets();
            const sortedTweets = this.sortTweets(response.data.tweets);
            this.setState({ messages: sortedTweets });
            if (this.state.errorGet.length > 0) {
                this.setState({ errorGet: '' });
            }
        }
        catch (error) {
            this.setState({ errorGet: error.toString() });
        }
        this.setState({ isLoadingGet: false });
    }

    render() {
        const { messages, isLoadingGet, errorGet } = this.state;
        return (
            <main>
                <MyContext.Provider value={this.state}> <PostTweet /> </MyContext.Provider>

            <div className={(isLoadingGet && messages.length === 0) ? 'msg-container loading' : 'msg-container'} >
        {errorGet.length > 0 &&<div className='error-msg'>{errorGet}</div>}
        {errorGet.length === 0 &&  messages &&  messages.map((msg) => {
                return (
                    <Tweet
                        userName={msg.userName}
                        content={msg.content}
                        date={msg.date}
                        key={msg.userName + msg.date}
                    />
                );
                })}

        </div>
    </main>
);
    }
}