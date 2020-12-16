
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Typography } from '@material-ui/core';

const styles = {
  footer: {
    height: '30px',
    backgroundColor: '#161616',
    flexShrink: 0,
    borderRadius: '0px 0px 10px 10px',
    textAlign:'center',
  },
}

export default () => {
  return (
    <footer style={styles.footer}>
      <Typography color="primary">
        Please, be respectful with everyone and enjoy !
        </Typography>
    </footer>
  );
}
