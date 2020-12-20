import {} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ReactComponent as ChannelIcon} from './icons/channel.svg';
import {ReactComponent as FriendsIcon} from './icons/friends.svg';
import {ReactComponent as SettingsIcon} from './icons/settings.svg';

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
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        
        Welcome to Ece-chat the Web application

        This application was programmed by Hugo Navillod and Pierre Camugli using as a template the code written by David Worms

        Here you can chat ith your friends

        To do so, create a channel using the button on the bottom left of your screen.
        Then get in that channel.
        There you can writte messages.
        But your messages or yet to be seen by anyone.
        To allow your friends to join you you can use the button at the bottom of your screen.
        a pop-up will show up, put your friend's email address there.
        If your friend never went on the web-site send him the link!
        If he already ent on the app he will now be able to see the channel in his list on the left as you do.
        You are now able to talk to each other!
        You can add as many friends as you want in your channels. The sky is the limit!
        You can even add your friends to a channel you've been invited in !
        So you can make your friends connect with some of your friends' friends and meet some new people!

        You can also change your avatar and your username !
        To do so you click on your avatar at the top!
        There complete the form and don't forget to save your changes!

        If you sent the wrong text to the wrong person you can still save the day because Ece-chat allows you to change and even delete the messages that you sent!
        Click on the icons near the message you want to handle and here you go!
        Yet you are not a wizard so you can't modify or delete the messages of your friends!

        Here we follow certain rules so keep them in mind :
        ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤

        1. Be respectful, civil, and welcoming. 

        Sometimes discussion can get heated, but you are responsible for your own behavior.
        This includes not targeting individuals and not posting personal information.

        ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤

        2. No insults, racism, sexism, homophobia, transphobia, and other kinds of discriminatory speech. 

        We do not welcome these types of speech.

        ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤

        3. No NSFW content

        This is including chat, avatars, pictures, memes, artworks and nicknames. 
        -If found to be sending NSFW content, it will result in an instant removal.

        ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤

        4. Do not misuse or spam in any of the channels 

        Text channels
        - Do not use several lines to say very little ("line splitting").
        - Do not say the same message repeatedly.
        - Do not include unsafe content in your messages, such as shortened links.



        <Grid item xs>
          <div css={styles.card}>
            <ChannelIcon css={styles.icon} />
            <Typography color="textPrimary">
              Create channels
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
