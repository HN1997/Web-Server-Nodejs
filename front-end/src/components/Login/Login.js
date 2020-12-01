import React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const Login = () => {
    return (
            <Grid container direction="column" alignItems="center" justify="center">
            <Typography variant='h3' color="primary" align='center' style={{marginBottom:"3em"}}>Welcome to the Chat App!</Typography>
                <Button variant="outlined" color="primary" size="large">
                    <GitHubIcon fontSize="large" style={{marginRight:"10px"}}/>
                    Login with Github
                </Button>
            </Grid> 
    )
};

export default Login;