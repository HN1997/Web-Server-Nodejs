import { Button, Checkbox, TextField } from '@material-ui/core';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Context from './Context'
import { useContext } from 'react'

const useStyles = (theme) => ({
  divroot: {
    backgroundColor: '#281a25',
  },
  paddingtop : {
    paddingTop: '10px'
  },
  input: {
    color: "white"
  }
})

export default () => {
  const BackToMenu = () => {
    window.location="/";
  };
  const styles = useStyles(useTheme());

  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)

  return (
    <div style={styles.divroot}>
      <Box m={1} p={1}>
        <Typography variant="h4" color="primary">Change your profile : </Typography>
      </Box>
      <Box m={1} p={1}>
        <TextField color="secondary" defaultValue={oauth.email} InputProps={styles.input} label="Email" variant="outlined"></TextField>
      </Box>
      <Box m={1} p={1}>
        <TextField color="secondary" defaultValue="{oauth.username}" InputProps={styles.input} label="Name" variant="outlined"></TextField>
      </Box>
      <Box m={1} p={1}>
        <TextField color="secondary" defaultValue="{oauth.username}" InputProps={styles.input} label="Gravatar address (https://...)" variant="outlined"></TextField>
      </Box>
      <Box m={1} p={1}>
        <Typography>Light mode: <Checkbox></Checkbox></Typography>
        
      </Box>
      <Box m={1} p={1}>
        <Button variant="outlined" color="secondary" onClick={BackToMenu}>SAVE</Button>
        <Button variant="outlined" color="secondary" onClick={BackToMenu} style={{marginLeft:"10px"}}>EXIT</Button>
      </Box>
    </div>
  );
}
