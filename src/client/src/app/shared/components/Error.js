import React from 'react'

export default class Error extends React.Component {
	render() {
		return (
			<div className="row ignore-spacer">
				<div className="col">
					<div className="error-bar">
						<span>{this.props.error || 'An error occurred.'}</span>

						{this.props.retryAction && (
							<span>
								<button className="btn btn-outline-light" type="button" onClick={this.props.retryAction}>
									Retry
								</button>
							</span>
						)}
					</div>
				</div>
			</div>
		)
	}
}
