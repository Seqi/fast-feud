import React from 'react'

const ChatMessage = props => 
	<div className="chat-message">
		<span>
			{props.msg.nickname || props.msg.id}:
		</span>
		{props.msg.message}
	</div>

export default ChatMessage