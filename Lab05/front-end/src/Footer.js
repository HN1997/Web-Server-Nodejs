import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
  footer: {
    height: '30px',
    backgroundColor: '#282828',
    flexShrink: 0,
    textAlign: 'center',
    color: 'purple',
    fontSize: '30px',
  },
}

export default () => {
  return (
    <footer style={styles.footer}>
      Please, be respectful with everyone. Enjoy!
    </footer>
  );
}
