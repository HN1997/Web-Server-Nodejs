/*
  We are using React Hooks, an addition to react function based components
  Before, function-base components were just dummy components but now
  with hooks, we can use state and lifecycle inside of them.
  We can convert 90% of class-based components to function based
  components and they look much cleaner with less code and improved
  readability.
*/

//To use State inside of the function based components
import React, {useState} from 'react';
import { Link } from 'react-router-dom'; //link to our /chat path

import './Join.css'; //import some css style


//In return, in Link : able to read name and room from our previous div, also checking if name and room is empty (he can't click)
const Join = () => {

  //array of a variable + a setter function, initial value in useState.
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  //When he is on the main, the user has to choose a name and the room he wants to join
  return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
          <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
          <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button className="button mt-20" type="submit">Sign In</button>
          </Link>
        </div>
      </div>
  );
}

export default Join;
