import React from 'react'
import { Manager } from 'socket.io-client'

import { Error } from '@shared/components'
import { SocketContext } from '@shared/hocs/SocketContext'

import Business from '@features/Business/Business'
import Options, { DefaultOptions } from '@features/Options/Options'
import Users from '@features/Users/Users'

export default class Room extends React.Component {
	constructor(props) {
		super(props)

		let socketManager = new Manager('/', { autoConnect: false, query: `roomId=${this.props.match.params.id}` })

		this.state = {
			id: this.props.match.params.id,
			isAdmin: false,
			socket: socketManager.socket('/'),
			options: { ...DefaultOptions, location: this.getLocation() }
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

		this.state.socket.on('admin', isAdmin => {
			if (isAdmin) {
				console.log('Youre the admin!')
			}

			// Generate a set of options for the admin to configure
			this.setState({ isAdmin })
		})

		this.state.socket.on('admin-transfer', () => {
			console.log('Youre now the admin!')
			this.setState({
				isAdmin: true
			})
		})
	}

	setOptions(options, update = true) {
		this.setState({ options }, () => {
			// Store the options on the socket
			update || this.props.socket.emit('options', this.state.options)
		})
	}

	render() {
		return (
			<div className="app-container container-fluid">
				{this.state.error ? <Error error={this.state.errorMessage} /> : null}

				<SocketContext.Provider value={this.state.socket}>
					<div className="row no-gutters ignore-spacer">
						<div className="col-xl business-panel">
							<Business isAdmin={this.state.isAdmin} options={this.state.options} />
						</div>

						<div className="col-xl-2 user-panel">
							<Users />
						</div>
					</div>

					{this.state.isAdmin && this.state.options && (
						<div className="options-panel">
							<Options options={this.state.options} setOptions={opts => this.setOptions(opts)} />
						</div>
					)}
				</SocketContext.Provider>
			</div>
		)
	}
}
