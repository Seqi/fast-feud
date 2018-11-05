import React from 'react'

import ChatLog from './ChatLog'
import ChatEntry from './ChatEntry'

export default class Chat extends React.Component {
	render() {
		return (
			<div className="chat-container">
				<ChatLog />
				<ChatEntry />                
			</div>
		)
	}
}