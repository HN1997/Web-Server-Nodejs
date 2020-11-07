import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//need for react applications
//We have a div in public/index.html
//Every code that we write will be injected in the div
ReactDOM.render(<App />, document.getElementById('root'));