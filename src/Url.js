import axios from 'axios';

const Url = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/';
const route = 'tweet'

export function getTweets() {
    return axios.get(Url + route);
}

export function postTweet(payload) {
    return axios.post(Url + route, {tweet: payload});
}



