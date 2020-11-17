import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
  header: {
    height: '60px',
    backgroundColor: '#282828',
    flexShrink: 0,
    textAlign: 'center',
    color: 'purple',
    fontSize: '40px',
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
}

export default () => {
  return (
    <header css={styles.header}>
      Welcome to the Chat !
    </header>
  );
}
