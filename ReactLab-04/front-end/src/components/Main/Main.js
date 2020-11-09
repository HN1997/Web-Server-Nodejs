import React, {useState} from 'react';
//For transforming markdown to html
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import './Main.css';

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

//using Luxon instead of Moment.js
const {DateTime} = require('luxon');


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
      <form className="form"  onSubmit={onSubmit}>
        <input type="input" name="content" className="content" />
        <input type="submit" value="Send" className="send" />
      </form>
    )
  }


const Main = () => {
    var channel = {
        name: 'Fake channel',
    }

    const [messages, setMessages] = useState([])

    let today = DateTime.local();
    let day =today.get('day');
    let month = today.get('month');
    let year = today.get('year');
    let hour = today.get('hour');
    let minute = today.get('minute');

      //A text in markdown
    const someText = "# Hello world!";
    const someText2 = "*Try markdown with stars before and after your message*"

    const addMessage = (message) => {
        setMessages([
          ...messages,
          message
        ])
      }

    return(
        <div className="main">

            <div className="channels">
                <h5 align="center">List of the channels:</h5>
                    <div>
                        <ul>
                            <li>
                            {channel.name}
                            </li>
                        </ul>
                    </div>
            </div>

            <div className="channel">
                <div className="messages">
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
                            <li key={i} className="message">
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
        </div>
    );
}
export default Main;