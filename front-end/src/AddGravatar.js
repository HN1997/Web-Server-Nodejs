import { Button, Checkbox, TextField } from '@material-ui/core';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Context from './Context'
import { useContext, useState } from 'react'

const useStyles = (theme) => ({
  divroot: {
    backgroundColor: '#492449',
  },
  paddingtop : {
    paddingTop: '10px'
  },
})

export default ({props}) => {
    const {
    oauth, setOauth
  } = useContext(Context)

  const BackToMenu = () => {
    window.location="/";
  };
  const styles = useStyles(useTheme());

  const [email, setEmail] = useState(props.email);
  const [name, setName] = useState(props.userName);
  const [gravatarUrl, setGravatarUrl] = useState(props.img);

  const changePictureOne = () => {
    setGravatarUrl("https://octodex.github.com/images/dojocat.jpg");
  }
  const changePictureTwo = () => {
    setGravatarUrl("https://octodex.github.com/images/gracehoppertocat.jpg");
  }
  const changePictureThree = () => {
    setGravatarUrl("https://noahnyy.github.io/assets/img/sample/avatar.jpg");
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const nameChange = (e) => {
    setName(e.target.value)
  }
  const gravatarUrlChange = (e) => {
    setGravatarUrl(e.target.value)
  }

  const saveSettings = (e) => {
    props.email = email;
    props.userName = name;
    props.img = gravatarUrl;
    alert("Data saved! You can leave the page with the exit button :)");
  }

  return (
    <div style={styles.divroot}>
      <form>
        <Box m={1} p={1}>
          <Typography variant="h4" color="secondary">Change your settings : </Typography>
        </Box>
        <Box m={1} p={1}>
          <Button onClick={changePictureOne}>
            <img src="https://octodex.github.com/images/dojocat.jpg" style={{width:'40px'}}></img>
          </Button>
          <Button onClick={changePictureTwo}>
            <img src="https://octodex.github.com/images/gracehoppertocat.jpg" style={{width:'40px'}}></img>
          </Button>
          <Button onClick={changePictureThree}>
            <img src="https://noahnyy.github.io/assets/img/sample/avatar.jpg" style={{width:'40px'}}></img>
          </Button>
        </Box>
        <Box m={1} p={1}>
          <TextField color="secondary" defaultValue={props.email} InputProps={styles.input} label="Email" variant="outlined" onChange={emailChange}></TextField>
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
