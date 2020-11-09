import React from 'react';

import './Channels.css';

//importing list of channel
var channel = require('../Channel/Channel').channel;


const Channels = () => (
    <div className="channels">
        <h5 align="center">List of the channels:</h5>
        <div>
            <ul>
                <li>{channel.name}</li>
            </ul>
        </div>
    </div>
)

export default Channels;