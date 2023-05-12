import React from 'react'

const ConnectedUsers = ({users}) => {
  return (
    <div className='user-list'>
      <h4>Connected Users</h4>
      {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
    </div>
  )
}

export default ConnectedUsers
