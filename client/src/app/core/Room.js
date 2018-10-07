import React from 'react'
import { Manager } from 'socket.io-client'

import config from '@config'
import { Error } from '@shared/components'
import { SocketContext } from '@shared/hocs/SocketContext'

import Chat from '@features/Chat'
import Votes from '@features/Votes/Votes'
import Business from '@features/Business/Business'

export default class Room extends React.Component {

	constructor(props) {
		super(props)

		console.log('room constructor')
		let socketManager = new Manager(config.apiUrl, { autoConnect: false,  query: `roomId=${this.props.match.params.id}` })

		this.state = {
			id: this.props.match.params.id,
			admin: false,
			socket: socketManager.socket('/')
		}

		this.initSocket()
	}

	componentDidMount() {
		console.log('connecting now')
		this.state.socket.connect()
	}

	getLocation() {
		if (this.props.location && this.props.location.state) {
			return this.props.location.state.location
		} else {
			return ''
		}
	}

	initSocket() {
		this.state.socket.on('connect', () => {
			console.log('connected')
		})

		this.state.socket.on('admin', admin => {
			if (admin) {
				console.log('Youre the admin!')
				// Generate a set of options for the admin to configure
				this.setState({
					admin: true
				})
			}
		})

		this.state.socket.on('admin-transfer', () => {
			console.log('Youre now the admin!')
			this.setState({
				admin: true
			})
		})		
	}

	render() {
		console.log('rendering room')
		return (
			<div className="app-container container">
				{this.state.error ? <Error error={this.state.errorMessage} /> : null}

				<SocketContext.Provider value={this.state.socket}>
					<div className="row">
						<Business isAdmin={this.state.admin} location={this.getLocation()} />
					</div>

					<div className="row">
						<div className="col">
							<Votes />
						</div>
					</div>

					<div className="row">
						<div className="col">
							<Chat />
						</div>
					</div>
				</SocketContext.Provider>
			</div>
		)
	}
}