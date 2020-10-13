import React, { useState, useEffect} from 'react'; //again import hooks with useState and useEffect (for lifecycle methodes)
import queryString from 'query-string'; //help us with retrieving data from the URL
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  //run when the components renders
  useEffect(() => {
    const {name, room} = queryString.parse(location.search); //gets the name and room from the url

    //passing an endpoint to the server
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, ({ error }) => {

    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [ENDPOINT, location.search]); //Only if these 2 values change, we need to re-render our use effect (otherwise it will be called mutliple times)

  return (
      <h1>Chat</h1>
  );
};

export default Chat;
