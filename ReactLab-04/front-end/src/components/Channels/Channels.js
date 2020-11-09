import React from 'react';

import './Channels.css';

//importing list of channel
var channel = require('../Channel/Channel').channel;


const Channels = () => (
    <div className="channels">
        <h4 align="center">List of the channels:</h4>
        <p className="channelsName"> {channel.name} </p>
    </div>
)

export default Channels;