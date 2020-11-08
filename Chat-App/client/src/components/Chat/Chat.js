/*
    useEffect with Hooks that let us use lifecycle method
    or side effects in function components
*/
import React, {useState, useEffect} from 'react';

//module that will help us retrieving data from url
import queryString from 'query-string';

import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(()=>{
        //We get the url of the page
        //location.search gives us ?name=blabla&room=room
        //queryString gives us an object with the name and the room
        const {name, room} = queryString.parse(location.search);
        
        //passing endpoint
        socket = io(ENDPOINT);

        //put the name and room of the previous const
        //in the name and room above the useffect method
        setName(name);
        setRoom(room);

        //emitting a socket that we can retrieve from index.js of server
        socket.emit('join', {name, room});

        //at the end we add an array to the useEffect method
        //because if present, effect will only activate 
        //if the values in the list change
        //otherwise we will have 2 connections and 2 
        //disconnections for each user
    }, [ENDPOINT, location.search]);

    return (
        <h1>Chat</h1>
    )
}

export default Chat;