import React from 'react'

const ChatMessage = props => 
	<div className="chat-message">
		<span>
			{props.msg.nickname || props.msg.id}: {props.msg.message}
		</span>
	</div>

export default ChatMessage