import React from 'react'
import ChatMessage from './ChatMessage'

const ChatLog = props =>    
    <div className="chat-log">
    {
        props.log.map((msg, idx) => <ChatMessage key={idx} msg={msg} />)
    }
    </div>

export default ChatLog