import {useContext, useEffect} from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
// Local
import Context from './Context'
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import axios from 'axios';
import {
  Route,
  Switch,
} from 'react-router-dom'
import { Button } from '@material-ui/core';

const useStyles = (theme) => ({
  root: {
    backgroundColor: '#492449',
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  drawer: {
    width: '200px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
  buttonBottom: {
    position: 'absolute',
    display:'block',
    bottom: '0',
    width:'100%',
  },
  displayChannels : {
    backgroundColor: '#232123',
    height: '100%',
  }
})

//When user click CREATE A CHANNEL button
const onClickButton = async () => {
  var channelName = prompt("Name of the new channel :");
  if(channelName===null || channelName===""){
    const txt = "Error, can't create a channel with an empty name.";
    alert(txt);
  }
  else if(channelName!==null || channelName!==""){
    const txt = channelName;
    const {data: {id}} = await axios.post('http://localhost:3001/channels', {
          name: txt
    })
    window.location="/channels";
  }
}


export default ({props}) => {
  const {
    currentChannel,
    drawerVisible,
  } = useContext(Context)
  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible
  
  return (
    <main css={styles.root}>
      <Drawer
        PaperProps={{ style: { position: 'relative' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative' }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
      >
        <div css={styles.displayChannels}><Channels/></div>
        <div css={styles.buttonBottom}>
          <Button className="divBottom" variant="outlined" color="secondary" fullWidth onClick={onClickButton}>CREATE A CHANNEL</Button>
        </div>
      </Drawer>
      <Switch>
        <Route path="/channels/:id">
          <Channel props={props}/>
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </main>
  );
}
