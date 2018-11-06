import React from 'react'

import { withSocket } from '@shared/hocs/SocketContext'
import ChatMessage from './ChatMessage'

class ChatLog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			chatLog: []
		}

		this.props.socket.on('message', message => {
			this.setState({ chatLog: this.state.chatLog.concat(message) })
			this.scrollToBottom()
		})

		this.props.socket.on('voters-updated', () => {
			this.scrollToBottom()
		})
	}

	scrollToBottom() {
		let chatlog = document.getElementsByClassName('chat-log')[0]
		chatlog.scrollTop = chatlog.scrollHeight
	}

	render() {
		return (
			<div className="chat-log">
				{this.state.chatLog.map((msg, idx) => (
					<ChatMessage key={idx} msg={msg} />
				))}
			</div>
		)
	}
}

export default withSocket(ChatLog)
