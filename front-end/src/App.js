import { useContext, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Oups from './Oups'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'
import AddGravatar from './AddGravatar';
import axios from 'axios';
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

const managementUser = async (oauth) => {
  //On recupere tout ce qu il y a dans les users
  var collectionUsers = [{}]
  await axios.get('http://localhost:3001/users').then(
    async response => {
      collectionUsers = response.data
    }
  );

  var checkIfUserExists = false;

  //On parcourt les users un par un et on recupere leur username
  /*
  var a = collectionUsers.length ?
    collectionUsers.map(collectionUsers => { axios.delete('http://localhost:3001/users/'+collectionUsers.id)
        
        // if(collectionUsers.username === collectionUsers.username){
        //   checkIfUserExists = true;
          
        // }
      }
    ) :
    null
    */
  /*
  //Si l'utilisateur n'existe pas dans la bdd, on le cree
  if(checkIfUserExists === false) {
    console.log("hey!");
    const user = {
      username: 'mathilde'
    }
    axios.post('http://localhost:3001/users', user);
  }
  */
  /*
  //Sinon le rajouter
  const user = {
    username: oauth.email
  }
  console.log(user);
  await axios.post('http://localhost:3001/users', user)
  //console.log(data);
  */
}

export default () => {
  const location = useLocation()
  const { oauth } = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }

  if (oauth) {
    managementUser(oauth);
  }

  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener} />
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
        <Route path="/changinggravatar">
          <AddGravatar />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
