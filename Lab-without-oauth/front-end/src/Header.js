import {useContext} from 'react'
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Context} from './Context'
import Link from '@material-ui/core/Link'

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
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
  }
})

export default ({
  drawerToggleListener
}) => {
  const {user, setUser} = useContext(Context)
  console.log('header:',user)
  const styles = useStyles(useTheme())
  const handleDrawerToggle = (e) => {
    drawerToggleListener()
  }
  const onLogin = (e) => {
     e.stopPropagation()
     setUser({
       email: 'hugo.navillod@edu.ece.fr'
     })
  }
  const onLogout = (e) => {
    e.stopPropagation()
    setUser(null)
 }
  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
       {
        user ? (
          <span>
            Welcome {user.email}
            <Link onClick={onLogout} color="secondary">logout</Link>
          </span>
        )
        : (
          <span>Welcome to the chat app!
            <Link onClick={onLogin} color="secondary">login</Link>
          </span>
        )
      }
    </header>
  );
}
