import React from 'react'

import { withSocket } from 'components/room/SocketContext'

class SetNickname extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			nickname: ''
		}
	}

	updateNickname(evt) {
		this.setState({ nickname: evt.target.value })
	}

	setNickname(evt) {
		evt.preventDefault()
		if (this.state.nickname) {
			this.props.socket.emit('set-nickname', this.state.nickname)
		}
	}

	render() {
		return (
			<form onSubmit={evt => this.setNickname(evt)}>
				<input
					className="form-control"
					type="text"
					onChange={evt => this.updateNickname(evt)}
					placeholder="Set Nickname"
				/>
			</form>
		)
	}
}

export default withSocket(SetNickname)
