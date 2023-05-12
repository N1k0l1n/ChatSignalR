import React from 'react'
import MessageContainer from './MessageContainer'
import SendMessageForm from './SendMessageForm'
import {Button} from 'react-bootstrap'

const Chat = ({messages, sendMessage, closeConnection}) => {
  return (
    <div className='chat'>
      <MessageContainer messages={messages}/>
      <SendMessageForm sendMessage={sendMessage}/>
      <div className='leave-room'>
        <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
      </div>
    </div>
  )
}

export default Chat
