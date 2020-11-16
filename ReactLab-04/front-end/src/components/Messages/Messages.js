import './Messages.css';

import React from 'react';


//For transforming markdown to html
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'


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




const Messages = ({channel, messages}) => {

    let today = DateTime.local();
    let day =today.get('day');
    let month = today.get('month');
    let year = today.get('year');
    let hour = today.get('hour');
    let minute = today.get('minute');

    return(
        <div className="messages">
            <h3 className="roomNameHeader">Connected in the channel: {channel.name}</h3>
            <div>
                { messages.map( (message, i) => (
                    <li key={i} className="message">
                        <p className="authorHeader">
                            <span>{message.author}</span>
                            {' '}
                            <span className="sentMessageAt">(sent a message at {hour}:{minute}, {day}/{month}/{year}):</span>
                        </p>
                        <div className="messageUser">
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
    );
}

export default Messages;