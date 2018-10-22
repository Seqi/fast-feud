import React from 'react'

import { Loader } from '@shared/components'
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
		}

		this.props.socket.on('business-updated', business => {
			this.setState({ business })
		})
	}

	componentDidUpdate() {
		// Admins will have the responsibility of loading the initial data
		// First, set the default options using their location, then
		// bring in the business based on those options
		if (this.props.isAdmin && !this.state.business) {
			this.loadBusiness()
		}
	}

	loadBusiness() {
		loadBusiness(this.props.options)
			.then(result => {
				this.setState({
					business: result.data,
					error: false,
					errorMessage: null
				})

				this.props.socket.emit('business', result.data)
			})
			.catch(error => {
				this.setState({
					error: true,
					errorMessage: error
				})
			})		
	}

	render() {
		return (
			// TODO: Add error component with callback to retry (load business)
			<div className="container">
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