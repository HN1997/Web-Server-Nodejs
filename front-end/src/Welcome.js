import {} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    // background: 'rgba(0,0,0,.2)',
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '20%',
    fill: '#69bdd2',
  }
})

export default () => {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Typography variant="h6" color="secondary">Welcome to the chat!</Typography>
        <Typography>You can change your setting by clicking your profile picture.</Typography>
        <Typography>The list of your channels are on the left.</Typography>
        <Typography>Add a new Channel by clicking the button "CREATE A CHANNEL".</Typography>
        <Typography>In a channel, you can add a new friend !</Typography>
        <Typography>You can send a message and modify or delete your own message.</Typography>
      </Grid>
    </div>
  );
}
