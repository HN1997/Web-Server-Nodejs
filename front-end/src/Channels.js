import {useContext, useEffect} from 'react';
import axios from 'axios';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import Link from '@material-ui/core/Link'
// Local
import Context from './Context'
import {useHistory} from 'react-router-dom'
import { Typography, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
  // root: {
  //   minWidth: '200px',
  // },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
  },
  settingsIconStyle: {
    padding: '.1rem .0rem .0rem .2rem',
  }
}

export default () => {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const history = useHistory();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <div>
      <Typography variant="h6" color="secondary" css={styles.channel}>List of channels:</Typography>
      <ul style={styles.root}>
        { channels.map( (channel, i) => (
          <li key={i} css={styles.channel}>
            <Link
              href={`/channels/${channel.id}`}
              onClick={ (e) => {
                e.preventDefault()
                history.push(`/channels/${channel.id}`)
              }}
            >
              {channel.name}
            </Link>
            <Button>
              <SettingsIcon fontSize="small" color="secondary" css={styles.settingsIconStyle}></SettingsIcon>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
