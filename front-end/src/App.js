import { useContext, useState, useEffect } from 'react'
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Oups from './Oups'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'
import ChangeSettings from './ChangeSettings';
import axios from 'axios';
import store from 'store';
// Rooter
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom"

const { v4: uuid } = require('uuid')

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    padding: '50px',
  },
}


export default () => {
  const location = useLocation()
  const { oauth } = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  
  let curUser = {
    img: "https://i.stack.imgur.com/frlIf.png",
    userName: "defautUserName",
    email: "defaultEmail",
  };
  let usr = {}
  if(oauth)
  {
    try{
    usr = axios.get(`http://localhost:3001/users/${oauth.email}`)
    .then((response) => {
      //console.log(response.data);
      usr = response.data;
      store.set('user', usr);
    });
    } catch(err){
      console.log(err);
    }
    //console.log(usr);
    //store.set('user', usr);
  }
  curUser = store.get('user');

  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener} props={curUser}/>
      <Switch>
        <Route exact path="/">
          {
            oauth ? (
              <Redirect
                to={{
                  pathname: "/channels",
                  state: { from: location }
                }}
              />
            ) : (
                <Login />
              )
          }
        </Route>
        <Route path="/channels">
          {
            oauth ? (
              <Main />
            ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: location }
                  }}
                />
              )
          }
        </Route>
        <Route path="/Oups">
          <Oups />
        </Route>
        <Route path="/ChangeSettings">
          <ChangeSettings props={curUser}/>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
