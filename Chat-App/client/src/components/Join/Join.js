//useState is from hooks
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//importing css
import './Join.css';

const Join = () => {
    //hooks here : variable name, function setName
    //passing it an empty string as initial value for our
    //name state
    const [name, setName] = useState('');
    //same for the room
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}></input></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)}></input></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;