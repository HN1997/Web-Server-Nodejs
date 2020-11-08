/*
    useEffect with Hooks that let us use lifecycle method
    or side effects in function components
*/
import React, {useState, useEffect} from 'react';

//module that will help us retrieving data from url
import queryString from 'query-string';

import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;



const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5001';

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
        socket.emit('join', {name, room}, () =>{
            
        });

        //used for disconnect effect
        return () => {
            socket.emit('disconnect');

            //turn off socket instance of one client
            socket.off();
        };

        //at the end we add an array to the useEffect method
        //because if present, effect will only activate 
        //if the values in the list change
        //otherwise we will have 2 connections and 2 
        //disconnections for each user
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message)=> {
            //add a message to our messages array
            setMessages(...messages, message);
        });

        //putting messages at the end because
        //we want to run this useEffect only when
        //messages array changes
    }, [messages]);

    //function for send messages
    const sendMessage = (event) => {
        //we don't want the web page to refresh
        event.preventDefault();

        if(message)
        {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    console.log(message, messages);

    //returns the frontend of the chat
    return ( 
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat;