import React from 'react'

class GuestVote extends React.Component {
	renderVoteIcon() {
		switch (this.props.vote.vote) {
		case true:
			return <i className="fa fa-check" />
		case false:
			return <i className="fa fa-close" />
		default:
			return null
		}
	}

	render() {
		return (
			<div className="vote-container">
				<span>{this.props.vote.nickname || this.props.vote.id}</span>

				<div className="vote-options user">
					{ this.renderVoteIcon() }
				</div>
			</div>
		)
	}
}

export default GuestVote
