import React from 'react';

//Get Join and Chat from the components folder
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import { BrowserRouter as Router, Route } from 'react-router-dom';

//When the user comes to the page (/)
//He will be greeted with our Join component
//He will pass his data in the login form 
//And with a query string we will pass a data to the Chat
const App = () => {
    return (
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    );
}

export default App;