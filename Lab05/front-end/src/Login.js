import {} from 'react';
import { Button, Typography } from '@material-ui/core'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input'

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    justifyContent: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
});

export default ({
  onUser
}) => {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div>
        <fieldset>
          <Box justifyContent="center" display="flex">
          <Typography variant="h5" color="secondary" className={styles.MyTypoStyle}>Username</Typography>
          </Box>
          <Input id="username" name="username" color="primary"></Input>
        </fieldset>
        <fieldset>
          <Box justifyContent="center" display="flex">
            <Typography variant="h5" color="secondary">Password</Typography>
          </Box>
          <Input id="password" name="password" type="password" color="primary"></Input>
        </fieldset>
        <Box justifyContent="center" display="flex">
          <fieldset>
            <Button 
              color="secondary" 
              variant="outlined"
              type="submit"
              value="login"
              onClick={ (e) => {
                e.stopPropagation()
                onUser({username: 'david'})
              }}
              >
              Login
            </Button>
          </fieldset>
        </Box>
      </div>
    </div>
  );
}
