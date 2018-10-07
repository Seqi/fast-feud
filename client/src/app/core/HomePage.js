import React from 'react'
import { Link } from 'react-router-dom'

import shortid from 'shortid'

export default class HomePage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			id: shortid.generate(),
			location: ''
		}
	}

	render() {
		return (
			<div className="image-container">
				<div id="home-bg"></div>

				<div className="home-content">                
					<div className="home-text">
						<h1>Gamer snacks</h1>
						<h3>Rack up that k/d with some epic noms</h3>
					</div>

					<div className="home-search container">
						<div className="row">
							<div className="input-group">
								<input className="form-control home-input"
									placeholder="Enter your location"
									onChange={evt => this.setState({ location: evt.target.value })} />

								<div className="input-group-append">
									<Link to={{ 
										pathname: this.state.id, 
										state: { location: this.state.location } 
									}}>
										<button className="btn" type="submit">
                                            Search
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>            
		)
	}
}