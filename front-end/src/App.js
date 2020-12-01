import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid} from '@material-ui/core';
import Login from './components/Login/Login';

const App = () => {
    return (
        <Grid 
        container 
        justify="center" 
        alignItems="center" 
        direction="column" 
        style={{minHeight:"100vh", backgroundColor:"black"}} 
        spacing={5}
        >
            <Grid item style={{border:"0.2px solid purple"}}>
                <Router>
                    <Route path="/" exact component={Login} />
                </Router>
            </Grid> 
        </Grid>
    )
};

export default App;