import React from 'react'

const ChatMessage = (props) => {
    const {text, uid} = props.message;
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}

export default ChatMessage
