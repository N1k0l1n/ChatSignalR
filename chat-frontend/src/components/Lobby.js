import {Form, Button} from 'react-bootstrap'
import React, { useState } from 'react'

const Lobby = ({joinRoom}) => {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");

    const handleName = (e) =>{
        e.preventDefault();
        setUser(e.target.value)
    }

    const handleRoom = (e) =>{
        e.preventDefault();
        setRoom(e.target.value)
    }

  return (
    <Form className='lobby' onSubmit={e=>{
        e.preventDefault();
        joinRoom(user, room);
    }}>
      <Form.Group>
        <Form.Control placeholder='Name' onChange={handleName}/>
        <br/>
        <Form.Control placeholder='Room' onChange={handleRoom}/>
      </Form.Group>
      <br/>
      <Button variant='success' type='submit' disabled={!user || !room}>Join</Button>
    </Form>
  )
}

export default Lobby
