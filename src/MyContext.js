import React from 'react';

const MyContext = React.createContext({
  messages: [],
  addMessage: (newMsg) => { },
  isLoadingGet: null,
  isLoadingPost: null,
  errorGet: '',
  errorPost: '',
});

export default MyContext;