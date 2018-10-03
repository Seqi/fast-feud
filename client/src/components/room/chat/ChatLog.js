import React from 'react'

import { withSocket } from 'components/room/SocketContext'
import ChatMessage from './ChatMessage'

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