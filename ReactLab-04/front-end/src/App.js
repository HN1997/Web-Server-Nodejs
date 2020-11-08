import {useState} from 'react';
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

//For transforming markdown to html
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

//Importing components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//Moment.js library - deprecated
//it's slow
//it's heavey
//it's mutable ?
//it's hard to debug
//uncomment the following to use moment
/*
const moment = require('moment');
let val;
val = moment().format('h:mm, DD-MM-YYYY');
*/

//Instead we will use Luxon
const {DateTime} = require('luxon');
let today = DateTime.local();
let day =today.get('day');
let month = today.get('month');
let year = today.get('year');
let hour = today.get('hour');
let minute = today.get('minute');


const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#262626',
    padding: '50px',
  },
  chatMessage: {
    backgroundColor: '#db2323',
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
      author: 'David',
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

  //A text in markdown
  const someText = "# Hello world!";
  const someText2 = "*Try markdown with stars before and after your message*"

  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }

  return (
    <div className="App" css={styles.root}>
      <Header />
      <main className="App-main" css={styles.main}>
        <div css={styles.channels}>
          <h5 align="center">List of the channels:</h5>
          <div>
            <ul>
              <li>
              {channel.name}
              </li>
            </ul>
          </div>
        </div>
        <div css={styles.channel}>
          <div css={styles.messages}>
            <h1 align="center">Connected in the channel: {channel.name}</h1>
            <div>
                Some text in markdown:
                {
                  unified()
                    .use(parse)
                    .use(remark2react)
                    .processSync(someText).result
                }
                {
                  unified()
                    .use(parse)
                    .use(remark2react)
                    .processSync(someText2).result
                }
            </div>
            <div className="chatMessage">
              { messages.map( (message, i) => (
                <li key={i} css={styles.message}>
                  <p>
                    <span>{message.author}</span>
                    {' '}
                    <span>(sent a message at {hour}:{minute}, {day}/{month}/{year}):</span>
                  </p>
                  <div className="chatMessage">
                    {
                      unified()
                      .use(parse)
                      .use(remark2react)
                      .processSync(message.content).result
                    }
                  </div>
                </li>
              ))}
            </div>
          </div>
          <MessageForm addMessage={addMessage} />
        </div>
      </main>
      <Footer/>
    </div>
  );
}
