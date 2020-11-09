import React, {useState} from 'react';
import './Channel.css';


import MessageSend from '../MessageSend/MessageSend';
import Messages from '../Messages/Messages';

//list of channels
var channel = {
    name: 'Fake channel',
};

const Channel = () => {

    const [messages, setMessages] = useState([])

    const addMessage = (message) => {
        setMessages([
          ...messages,
          message
        ])
    }

    return(
        <div className="channel">
            <Messages channel={channel} messages={messages}/>
            <MessageSend addMessage={addMessage} />
        </div>
    );
}

export {channel};
export default Channel;