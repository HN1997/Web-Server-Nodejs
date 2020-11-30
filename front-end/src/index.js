import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ContextProvider from './Context';
import { CookiesProvider } from 'react-cookie';
import 'typeface-roboto'
// Layout
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
});

ReactDOM.render(
  <React.StrictMode>
      <ContextProvider>
        <CookiesProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
