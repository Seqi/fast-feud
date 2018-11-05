import React from 'react'

import { Loader, Error } from '@shared/components'
import { withSocket } from '@shared/hocs/SocketContext'
import { loadBusiness } from '@shared/services/business'

import ReviewList from './Reviews/ReviewList'
import BusinessDetails from './Details/BusinessDetails'

class Business extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			business: null,
			error: false,
			errorMessage: null,
			errorRetryAction: null
		}

		this.props.socket.on('business-updated', business => {
			this.setState({ 
				business: business,				
				error: false,
				errorMessage: null,
				errorRetryAction: null
			})
		})
	}

	componentDidUpdate() {
		// Admins will have the responsibility of loading the initial data
		// First, set the default options using their location, then
		// bring in the business based on those options
		if (!this.state.business && !this.state.error) {
			if (this.props.isAdmin) {
				this.loadBusiness()
			} else {				
				this.setState({
					error: true,
					errorMessage: 'Please wait for an admin to correctly configure their search options.',
					errorRetryAction: null
				})
			}
		}
	}

	loadBusiness() {
		loadBusiness(this.props.options)
			.then(result => {
				this.setState({
					business: result.data,
					error: false,
					errorMessage: null,
					errorRetryAction: null
				})

				this.props.socket.emit('business', result.data)
			})
			.catch(error => {
				this.setState({
					error: true,
					errorMessage: error.message,
					errorRetryAction: this.state.business ? null : () => this.loadBusiness()
				})
			})		
	}

	render() {
		return (
			<div className="container">
				{ this.state.error && <Error error={this.state.errorMessage} retryAction={this.state.errorRetryAction}></Error> }

				<div className="row">
					<div className="col">
						{this.state.business ? 
							<BusinessDetails
								canRefresh={this.props.isAdmin} 
								refresh={() => this.loadBusiness()} 
								business={this.state.business} /> :
							<div className="loading"><Loader /></div>
						}
					</div>
				</div>

				<div className="row ignore-spacer">
					<div className="col review-col"> 
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