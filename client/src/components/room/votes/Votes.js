import React from 'react'

import Vote from './Vote'
import SetNickname from './SetNickname'
import { withSocket } from 'components/room/SocketContext'

class Votes extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			voters: [],
		}        

		console.log('votes constructor')

		props.socket.on('voters-updated', voters => {
			console.log('voters updated', voters)
			this.setState({ voters })
		})
	}

	convertVoterToCol(voters, i) {
		return (
			<div className="col-md-6">
				<Vote key={i} vote={voters[i]} />
			</div>
		)
	}

	convertVotersToRows(voters) {
		let result = []

		for (let i = 0; i < voters.length; i += 2) {
			result.push(
				(<div key={i} className="row">
					{this.convertVoterToCol(voters, i)}
					{voters[i + 1] ? this.convertVoterToCol(voters, i + 1) : null}
				</div>)
			)
		}

		return result
	}

	render() {
		return (
			<div className="votes-container container">
				<div className="votes-header">
					<h4>Votes</h4>
					<div className="nickname-container">
						<SetNickname />
					</div>
				</div>
				{
					this.convertVotersToRows(this.state.voters)
				}
			</div>
		)
	}
}

export default withSocket(Votes)