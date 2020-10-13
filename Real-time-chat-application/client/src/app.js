import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join';
import Chat from './components/Chat';


/*
  When the use first come on the page, he is going to be greated
  with our join component. He is going to pass his data in the login form
  and, due to query string, we are going to pass that data
  to the chat. Once we have the data, the chat component will be
  rendered.
*/
const App = () => {
  <Router>
    <Route path="/" exact component={join} />
    <Route path="/chat" component={chat} />
  </Router>
}

export default App;
