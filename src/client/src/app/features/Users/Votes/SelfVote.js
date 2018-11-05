import React from 'react'
import { withSocket } from '@shared/hocs/SocketContext'

class SelfVote extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			vote: this.props.vote ? this.props.vote.vote : null
		}
	}

	changeVote(vote) {
		// If the vote matches (re-clicked), undo the vote
		if (vote === this.state.vote) {
			vote = null
		}

		this.setState({ vote }, () =>
			this.props.socket.emit('vote', { id: this.props.socket.id, vote })
		)
	}

	render() {
		return (
			<div className="vote-container self">
				<span>
					{this.props.vote.nickname || this.props.vote.id}
				</span>
				<div className="vote-options">
					<i onClick={() => this.changeVote(true)} className={`fa fa-check ${this.state.vote === true ? 'active-vote' : ''}`} />
					<i onClick={() => this.changeVote(false)} className={`fa fa-close ${this.state.vote === false ? 'active-vote' : ''}`} />
				</div>
			</div>
		)
	}
}

export default withSocket(SelfVote)
