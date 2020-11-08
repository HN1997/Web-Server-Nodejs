import {useState} from 'react';
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

//Moment.js library
const moment = require('moment');
let val;
val = moment().format('DD-MM-YYYY, h:mm');


const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#262626',
    padding: '50px',
  },
  chatMessage: {
    backgroundColor: '#fcfcfc',
  },
  header: {
    height: '60px',
    backgroundColor: '#5977af',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  footer: {
    height: '30px',
    backgroundColor: '#5977af',
    flexShrink: 0,
  },
  main: {
    backgroundColor: '#afb2b5',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  channels: {
    backgroundColor: '#717375',
    minWidth: '200px',
  },
  channel: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  messages: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    margin: '.2rem',
    padding: '.2rem',
    // backgroundColor: '#66728E',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.2)',
    },
  },
  form: {
    borderTop: '2px solid #373B44',
    padding: '.5rem',
    display: 'flex',
  },
  content: {
    flex: '1 1 auto',
    marginRight: '.5rem'
  },
  send: {
    backgroundColor: '#D6DDEC',
    padding: '.2rem .5rem',
    border: 'none',
    ':hover': {
      backgroundColor: '#2A4B99',
      cursor: 'pointer',
      color: '#fff',
    },
  },
}

const MessageForm = ({
  addMessage
}) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    addMessage({
      content: data.get('content'),
      author: 'david',
      creation: Date.now(),
    })
    e.target.elements.content.value = ''
  } 
  return (
    <form css={styles.form}  onSubmit={onSubmit}>
      <input type="input" name="content" css={styles.content} />
      <input type="submit" value="Send" css={styles.send} />
    </form>
  )
}

export default ({
  channel = {
    name: 'Fake channel'
  }
}) => {
  const [messages, setMessages] = useState([])
  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }
  return (
    <div className="App" css={styles.root}>
      <header className="App-header" css={styles.header}>
        <h1 align="center">Welcome to the chat!</h1>
      </header>
      <main className="App-main" css={styles.main}>
        <div css={styles.channels}>
          <h5>List of the channels:</h5>
        </div>
        <div css={styles.channel}>
          <div css={styles.messages}>
            <h1 align="center">Connected in the channel: {channel.name}</h1>
            <div className="chatMessage">
              { messages.map( (message, i) => (
                <li key={i} css={styles.message}>
                  <p>
                    <span>{message.author}</span>
                    {' '}
                    <span>at: {val}</span>
                  </p>
                  <div>
                    {
                      message.content
                      .split(/(\n +\n)/)
                      .filter( el => el.trim() )
                      .map( el => <p>{el}</p>)
                    }
                  </div>
                </li>
              ))}
            </div>
          </div>
          <MessageForm addMessage={addMessage} />
        </div>
      </main>
      <footer className="App-footer" style={styles.footer}>
        Connected as : david
      </footer>
    </div>
  );
}
