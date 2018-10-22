import React from 'react'

import { withSocket } from '@shared/hocs/SocketContext'
import Vote from './Vote'
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

	render() {
		return (
			<div className="votes-container">
				<div className="votes-header">
					<h4>Votes</h4>
					<div className="nickname-container">
						<SetNickname />
					</div>
				</div>
				
				<div className="votes">
					{this.state.voters.map(voter => (
						<Vote key={voter.id} vote={voter} />
					))}
				</div>
			</div>
		)
	}
}

export default withSocket(Votes)
