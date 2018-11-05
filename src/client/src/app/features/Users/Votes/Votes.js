import React from 'react'

import { withSocket } from '@shared/hocs/SocketContext'
import SelfVote from './SelfVote'
import GuestVote from './GuestVote'
import SetNickname from './SetNickname'

class Votes extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			voters: []
		}

		props.socket.on('voters-updated', voters => {
			this.setState({ voters })
		})
	}

	get self() {
		return this.state.voters.find(voter => voter.id === this.props.socket.id)
	}

	get others() {
		return this.state.voters.filter(voter => voter.id !== this.props.socket.id)
	}

	isSelf(voter) {
		return voter.id === this.props.socket.id
	}

	render() {
		if (this.state.voters.length < 1) {
			return null
		}

		return (
			<div className="votes-container">
				<div className="votes-header">
					<h4>Votes</h4>
					<div className="nickname-container">
						<SetNickname />
					</div>
				</div>
				
				<div className="votes">
					<SelfVote vote={this.self} /> 

					{this.others.map(voter => 
						<GuestVote key={voter.id} vote={voter} />
					)}
				</div>
			</div>
		)
	}
}

export default withSocket(Votes)
