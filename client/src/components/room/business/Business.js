import React from 'react'
import axios from 'axios'

import config from '../../../config'
import { withSocket } from '../SocketContext'

import BusinessDetails from './details/BusinessDetails'
import Options, { DefaultOptions } from './options/Options'
import ReviewList from './reviews/ReviewList'
import Loader from '../Loader'

class Business extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			business: null,
			error: false,
			errorMessage: null,
			options: null
		}

		this.props.socket.on('business-updated', business => {
			console.log('business updated')
			this.setState({ business })
		})
	}

	componentDidUpdate() {
		// Admins will have the responsibility of loading the initial data
		// First, set the default options using their location, then
		// bring in the business based on those options
		if (this.props.isAdmin) {
			if (!this.state.options) {
				this.setState({ options: {...DefaultOptions, location: this.props.location }}, () => {
					if (!this.state.business) {
						this.loadBusiness()
					}
				})
			}
		}
	}

	loadBusiness() {
		let buildQuery = function(options) {
			return Object.keys(options)
				.filter(
					key =>
						options[key] !== null &&
						options[key] !== undefined
				)
				.map(key => `${key}=${options[key]}`)
				.join('&')
		}

		axios
			.get(`${config.apiUrl}/food/random?${buildQuery(this.state.options)}`)
			.then(result => {
				this.setState({
					business: result.data,
					error: false,
					errorMessage: null
				})

				this.props.socket.emit('business', result.data)
			})
			.catch(error => {
				let errMessage
				if (error.response.data.error.description === 'Please specify a location or a latitude and longitude') {
					errMessage = 'Could not find any restaurants within your location.'
				} else {
					errMessage = 'An error occurred. Please refresh and try again or create a new room.'
				}

				this.setState({
					business: null,
					error: true,
					errorMessage: errMessage
				})
			})		
	}	

	setOptions(options, update = true) {
		this.setState({options}, () => {
			// Store the options on the socket
			update || this.props.socket.emit('options', this.state.options)
		})
	}

	render() {
		return (
			// TODO: Add error component with callback to retry (load business)
			<div className="container">			
				{this.props.isAdmin && this.state.options && (
					<div className="row ignore-spacer">
						<div className="col">
							<Options options={this.state.options} setOptions={opts => this.setOptions(opts)} />
						</div>
					</div>
				)}

				<div className="row">
					<div className="col-md-8 col-sm-12">
						{this.state.business ? 
							<BusinessDetails
								canRefresh={this.props.isAdmin} 
								refresh={() => this.loadBusiness()} 
								business={this.state.business} /> :
							<div className="loading"><Loader /></div>
						}
					</div>

					<div className="col-md-4 col-sm-12 review-col"> 
						{this.state.business ? 
							<ReviewList reviews={this.state.business.reviews.reviews} /> :
							<div className="loading"><Loader /></div>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default withSocket(Business)