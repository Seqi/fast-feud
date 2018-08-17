import React from 'react'

import ChatMessage from './ChatMessage'
import { withSocket } from '../SocketContext'

class ChatLog extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			chatLog: []
		}

		this.props.socket.on('message', message => {
			this.setState({ chatLog: this.state.chatLog.concat(message) })
		})
	}
    
	render() {
		return (
			<div className="chat-log">
				{ this.state.chatLog.map((msg, idx) => <ChatMessage key={idx} msg={msg} />) }
			</div>
		)
	}
}

export default withSocket(ChatLog)