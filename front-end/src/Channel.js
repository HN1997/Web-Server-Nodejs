import {useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// Local
import Form from './channel/Form'
import List from './channel/List'
import Context from './Context'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default ({props}) => {
  const history = useHistory()
  const { id } = useParams()
  const {channels} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  if(!channel) {
    history.push('/channels')
    return <div/>
  }
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`)
    setMessages(messages)
    if(listRef.current){
      listRef.current.scroll()
    }
  }
  if(channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  const AddUserButton = async () => {
    var email = prompt("Invite a Friend with his email : ");
    if(email === null || email===""){
      //Si le champs est vide
      alert("Oups, empty field!")
    }
    else{
      //Regarder si il existe dans la bdd et pas l'utilisateur actuel
      var userExit = false;
      var userToAdd = await axios.get(`http://localhost:3001/users/${email}`);
      var thisUser =  await axios.get(`http://localhost:3001/users/${props.email}`);
      var thisUserEmail = thisUser.data.email;

      //Si l'utilisateur n'existe pas dans la bdd
      if(userToAdd.data === "" || userToAdd === null){
        alert("Oups, user does not exit!");
      }
      //Si il essaye de s'ajouter soi meme
      else if(userToAdd.data.email === thisUserEmail){
        alert("You can't add yourself!");
      }
      //Il peut ajouter un nouvel user
      else{
        await axios.put(`http://localhost:3001/channels/${idCurrentChannel}`,
        {
          email: userToAdd.data.email
        })
        alert(`User ${userToAdd.data.email} added to the chat!`);
      }
    }
  }
  
  var locationActuelle = window.location.pathname;
  var paths = locationActuelle.split("/");
  var idCurrentChannel = paths[2];
  
  return (
    <div css={styles.root}>
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
        props={props}
      />
        <Form addMessage={addMessage} channel={channel} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
      <Button onClick={AddUserButton} variant="outlined" color="secondary">Invite A Friend!</Button>
    </div>
  );
}
