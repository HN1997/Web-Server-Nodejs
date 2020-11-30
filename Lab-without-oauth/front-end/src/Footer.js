/** @jsx jsx */
import {useContext} from 'react';
import { jsx } from '@emotion/core'
import { Context } from './Context';

const styles = {
  footer: {
    height: '30px',
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
}

export default () => {
  const {user} = useContext(Context)
  return (
    <footer style={styles.footer}>
      footer {user && user.email}
    </footer>
  );
}
