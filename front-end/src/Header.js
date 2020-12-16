
import { useContext } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Context from './Context'
import { Typography } from '@material-ui/core';

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
  drawerToggleListener
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
            {oauth.email}
            <Link onClick={onClickLogout}>logout</Link>
          </span>
        :
          <Typography variant="h3" color="primary">Welcome to ECE's Chat !</Typography>
      }
      
    </header>
  );
}
