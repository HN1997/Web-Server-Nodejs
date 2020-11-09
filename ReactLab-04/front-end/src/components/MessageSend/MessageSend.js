import React from 'react';

import './MessageSend.css';

const MessageSend = ({addMessage}) => {
    const onSubmit = (e) => {
      e.preventDefault()
      const data = new FormData(e.target)
      addMessage({
        content: data.get('content'),
        author: 'David',
        creation: Date.now(),
      })
      e.target.elements.content.value = ''
    } 
    return (
      <form className="form"  onSubmit={onSubmit}>
        <input type="input" name="content" className="content"/>
        <input type="submit" value="Send" className="send" />
      </form>
    )
}

export default MessageSend;