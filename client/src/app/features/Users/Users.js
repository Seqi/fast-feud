import React from 'react'

import Votes from './Votes'
import Chat from './Chat'

export default class Users extends React.Component {
	render() {
		return (
			<div className="user-container">
				<div className="votes-panel">
					<Votes />
				</div>
				
				<div className="chat-panel">
					<Chat />
				</div>
			</div>
		)
	}
}
