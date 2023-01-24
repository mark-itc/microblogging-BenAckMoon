import React from 'react';
import MyContext from '../MyContext.js';

export default class PostTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(event) {
        const newTweet = {};
        newTweet.content = event.target.value;
        newTweet.date = new Date;
        newTweet.date = (newTweet.date.toISOString());
        newTweet.userName = localStorage.getItem('savedUsername');

         if (localStorage.getItem('savedUsername')) {
            newTweet.userName = localStorage.getItem('savedUsername');
        } else {
            newTweet.userName = 'somebody';
        }
        this.setState({ message: newTweet })
    }

    render() {
        const { message } = this.state;
        const isEmpty = !(message.content && (message.content.length > 0));
        const isTooLong = (!!message.content && (message.content.length > 140));

        return (
            <MyContext.Consumer>
                {({ addTweet, isLoadingPost, errorPost }) => (
                    <div className="form">

                        <textarea
                            placeholder='What you have in mind...' className="form-input" onChange={this.onChangeHandler}>
                        </textarea>

                        <div className='btn-container'>
                            <span className='error-placeholder'>
                                {errorPost.length > 0 && <span className='error-msg'> {errorPost} </span>}
                                {errorPost.length === 0 && isTooLong && <span className='error-msg'>
                                The tweet can't contain more than 140 chars.
                                </span>
                                }
                            </span>
                            <btn onClick={() => addTweet(message)} disabled={isTooLong || isLoadingPost || isEmpty}
                                className={(isLoadingPost) ? 'loading' : ''}>
                                Tweet
                            </btn>
                        </div>

                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}