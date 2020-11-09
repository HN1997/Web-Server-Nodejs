import React from 'react';

//Import Components
import Channels from '../Channels/Channels';
import Channel from '../Channel/Channel';

import './Main.css';

const Main = () => {

    return(
        <div className="main">
            <Channels/>
            <Channel/>
        </div>
    );
}
export default Main;