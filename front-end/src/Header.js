
import { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Context from './Context'
import { Avatar, Button, Typography } from '@material-ui/core';
import store from 'store';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: '#161616',
    flexShrink: 0,
    borderRadius: '10px 10px 0px 0px',
    textAlign: 'center',
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  welcomeMessage : {
    textAlign: 'center',
  }
})

export default ({
  drawerToggleListener, props
}) => {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const AddGravatar = () => {
    window.location="/ChangeSettings";
  };
  const curUser = store.get('user');
  
  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      {
        oauth ?
          <span>
            <Typography color="primary" variant="h5">Welcome ! Connected as :</Typography>
            {curUser.userName}
            <br></br>
              <Button onClick={AddGravatar}>
                <Avatar src={curUser.img} alt="Image" style={{width:'40px'}}></Avatar>
              </Button>
            <br></br>
            <Button variant="outlined" color="secondary" onClick={onClickLogout}>LOGOUT</Button>
          </span>
        :
          <Typography variant="h3" color="primary">Welcome to ECE's Chat !</Typography>
      }
      
    </header>
  );
}
