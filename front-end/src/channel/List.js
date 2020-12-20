import {forwardRef, useImperativeHandle, useLayoutEffect, useRef} from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
// Markdown
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    'pre': {
      
      overflowY: 'auto',
    },
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
})

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
  props
}, ref) => {
  const styles = useStyles(useTheme())
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  return (
    <div css={styles.root} ref={rootEl}>
      <h1>You are in => {channel.name}</h1>
      <h2> 
          {
            // for(i=0;i<channel.emails.length;i++)
            // {
            //   channel.emails[i]+
            //   " - "
            // }
          }
      </h2>
      <ul>
        { messages.map( (message, i) => {
            const {contents: content} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);

            //Get Channel id
            var locationActuelle = window.location.pathname;
            var paths = locationActuelle.split("/");
            var idCurrentChannel = paths[2];

            //Delete a message button
            var supprBouton = async () => {
              var bool = window.confirm('Do you want to delete this message?');
              if(bool){
                if(message.author !== props.email){
                  alert("It's not your own message!");
                } else {
                  console.log(idCurrentChannel);
                  console.log(message.creation);
                  await axios.delete(`http://localhost:3001/messages/${idCurrentChannel}/${message.creation}`)
                  alert("Message deleted!");
                  window.location = `${idCurrentChannel}`;
                }
              }
            }

            //Update Message Button
            var modifyButton = async () => {
              console.log(message.creation);
              if(message.author !== props.email){
                alert("It's not your own message!");
              } else {
                let newMsg = window.prompt("Enter your new message : ");
                if(newMsg===null || newMsg===""){
                  alert("Message empty! Message modification aborted.")
                } else {
                  await axios.put(`http://localhost:3001/messages/${idCurrentChannel}/${message.creation}`,{
                    ctnt: newMsg
                  })
                  alert(`New message : ${newMsg}`);
                  window.location = `${idCurrentChannel}`;
                }
              }
            }
            return (
              <li key={i} css={styles.message}>
                <p>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs().calendar(message.creation)}</span>
                  <Button onClick={supprBouton}><DeleteIcon style={{width:'40px'}}></DeleteIcon></Button>
                  <Button onClick={modifyButton}><ChatBubbleIcon style={{width:'40px'}}></ChatBubbleIcon></Button>
                </p>
                <div dangerouslySetInnerHTML={{__html: content}}>
                </div>
              </li>
            )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
