import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {useState } from 'react'
import store from 'store'
import axios from 'axios';

const useStyles = (theme) => ({
  divroot: {
    backgroundColor: '#492449',
  },
  paddingtop : {
    paddingTop: '10px'
  },
})

export default ({props}) => {

  const BackToMenu = () => {
    window.location="/";
  };
  const styles = useStyles(useTheme());
  const [name, setName] = useState(props.userName);
  const [gravatarUrl, setGravatarUrl] = useState(props.img);

  const changePictureOne = () => {
    props.img = "https://octodex.github.com/images/dojocat.jpg";
    store.set('user', props);
    window.location = "/ChangeSettings";
  }
  const changePictureTwo = () => {
    props.img = "https://octodex.github.com/images/gracehoppertocat.jpg";
    store.set('user', props);
    window.location = "/ChangeSettings";
  }
  const changePictureThree = () => {
    props.img = "https://noahnyy.github.io/assets/img/sample/avatar.jpg";
    store.set('user', props);
    window.location = "/ChangeSettings";
  }
  const nameChange = (e) => {
    setName(e.target.value)
  }
  const gravatarUrlChange = (e) => {
    setGravatarUrl(e.target.value)
  }

  const saveSettings = async (e) => {
    props.userName = name;
    props.img = gravatarUrl;
    store.set('user', props);
    
    await axios.put(`http://localhost:3001/users/${props.email}`,props);
    
    window.location= "/ChangeSettings";
  }

  return (
    <div style={styles.divroot}>
      <form>
        <Box m={1} p={1}>
          <Typography variant="h4" color="secondary">Change your settings : </Typography>
        </Box>
        <Box m={1} p={1}>
          <Button onClick={changePictureOne}>
            <img src="https://octodex.github.com/images/dojocat.jpg" style={{width:'60px'}} alt="image1"></img>
          </Button>
          <Button onClick={changePictureTwo}>
            <img src="https://octodex.github.com/images/gracehoppertocat.jpg" style={{width:'60px'}} alt="image2"></img>
          </Button>
          <Button onClick={changePictureThree}>
            <img src="https://noahnyy.github.io/assets/img/sample/avatar.jpg" style={{width:'60px'}} alt="image3"></img>
          </Button>
        </Box>
        <Box m={1} p={1}>
          <TextField color="secondary" defaultValue={props.userName} InputProps={styles.input} label="Name" variant="outlined" onChange={nameChange}></TextField>
        </Box>
        <Box m={1} p={1}>
          <TextField color="secondary" defaultValue={props.img} InputProps={styles.input} label="Gravatar address (https://...)" variant="outlined" onChange={gravatarUrlChange}></TextField>
        </Box>
        <Box m={1} p={1}>
          <Button variant="outlined" color="secondary" onClick={saveSettings} >SAVE</Button>
          <Button variant="outlined" color="secondary" onClick={BackToMenu} style={{marginLeft:"10px"}}>EXIT</Button>
        </Box>
      </form>
    </div>
  );
}
