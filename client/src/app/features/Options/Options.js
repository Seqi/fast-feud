import React from 'react'
import ReactStars from 'react-stars'

import { withSocket } from '@shared/hocs/SocketContext'

export const DefaultOptions = {
	location: '',
	price: null,
	term: 'restaurant',
	open_now: null,
	radius: null
}

// TODO: Notify of unsaved changes
class Options extends React.Component {
	constructor(props) {
		super(props)

		this.state = { showOptions: false, ...(this.props.options || DefaultOptions) }

		this.props.socket.on('options', options => {
			this.setState(options, () => this.props.setOptions(options, false))
		})

		// Hide this component if scrolling so we're not overlapping anything
		window.onscroll = () => {
			// Do some basic DOM manipulation so we're not spamming setState
			let display
			if (window.scrollY > 0) {
				display = 'none'
			} else {
				display = 'block'
			}

			document.getElementsByClassName('options-toggle')[0].parentElement.style.display = display
		}
	}

	setOption(evt) {
		let val

		// If the checkbox is false, set null
		// This stops the query item being set to false
		// rather than just ignoring
		if (evt.target.type === 'checkbox') {
			val = evt.target.checked ? true : null
		} else {
			val = evt.target.value
		}
		this.setState({ [evt.target.id]: val })
	}

	toggleOptions() {
		this.setState({showOptions: !this.state.showOptions })
	}

	isStateValid() {
		return this.isLocationValid() && this.isRadiusValid()
	}

	isLocationValid() {
		return this.state.location.length > 0
	}

	isRadiusValid() {
		return this.state.radius >= 0
	}

	render() {
		return (
			<div className="container">
				<div className={`options-container ${!this.state.showOptions? 'invisible' : undefined }` }>
					<div className="form-row">
						<div className="form-group col-md-8">
							<label>Location</label>
							<input
								id="location"
								type="text"
								value={this.state.location}
								onChange={evt => this.setOption(evt)}
								className={`form-control ${this.isLocationValid() ? '' : 'error'}`}
							/>
						</div>

						<div className="form-group col-md-4">
							<label>Radius (m)</label>
							<input
								id="radius"
								value={this.state.radius || ''}
								type="number"
								min="0"								
								onChange={evt => this.setOption(evt)}
								className={`form-control ${this.isRadiusValid() ? '' : 'error'}`}
							/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col">
							<label className="check-container">
								Open restaurants only
								<input
									checked={this.state.open_now || false}
									id="open_now"
									onChange={evt => this.setOption(evt)}
									type="checkbox"
								/>
								<span className="checkmark" />
							</label>
						</div>

						<div className="form-group col">
							<div className="stars">
								Price
								<ReactStars
									half={false}
									value={this.state.price}
									onChange={price => this.setState({ price })}
									size={20}
									color1={'rgba(42,42,42,0.2)'}
									color2={'rgba(42,42,42)'}
									count={4}
								/>
							</div>
						</div>
					</div>

					<div className="btn-row">
						<div className="col-xs-12">
							<input
								className="btn"
								type="button"
								value="Save"
								disabled={!this.isStateValid()} 
								onClick={() => this.toggleOptions() && this.props.setOptions(this.state)}
							/>
						</div>
					</div>
				</div>

				<div className="options-toggle">
					<button type="button" className="btn show-options-btn" onClick={() => this.toggleOptions()}>
						Show Options
					</button>
				</div>
			</div>
		)
	}
}

export default withSocket(Options)
