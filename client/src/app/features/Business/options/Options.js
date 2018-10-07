import React from 'react'
import ReactStars from 'react-stars'

import { withSocket } from '@shared/hocs/SocketContext'

export const DefaultOptions = {
	location: '',
	price: null,
	term: 'restaurant',
	open_now: null,
	radius: undefined
}

// TODO: Notify of unsaved changes
class Options extends React.Component {

	constructor(props) {
		super(props)

		this.state = this.props.options || DefaultOptions

		this.props.socket.on('options', options => {
			this.setState(options, () => this.props.setOptions(options, false))			
		})
	}
	
	setOption(evt) {
		let val = evt.target.type === 'checkbox' ? 
			(evt.target.checked ? true : null)
			: evt.target.value
		this.setState({ [evt.target.id]: val })
	}
    
	render() {
		return (
			<div className="options-container container">
				<div className="form-row">
					<div className="form-group col-md-8">
						<label>Location</label>
						<input id="location" type="text" value={this.state.location} onChange={evt => this.setOption(evt)} className="form-control" />
					</div>

					<div className="form-group col-md-4">
						<label>Radius (m)</label>
						<input id="radius" value={this.state.radius || ''} type="number" onChange={evt => this.setOption(evt)} className="form-control" />
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col">
						<label className="check-container">Open restaurants only
							<input checked={this.state.open_now} id="open_now" onChange={evt => this.setOption(evt)} type="checkbox" />
							<span className="checkmark"></span>
						</label>
					</div>

					<div className="form-group col">
						<div className="stars">
                            Price
							<ReactStars 
								half={false} 
								value={this.state.price} 
								onChange={price => this.setState({price}) }
								size={20} 
								color1={'white'} 
								count={4} />
						</div>
					</div>
				</div>

				<div className="btn-row">
					<div className="col-xs-12">
						<input
							className="btn"
							type="button"
							value="Save"
							onClick={() => this.props.setOptions(this.state)} />
					</div>
				</div>
			</div>
		)
	}
}

export default withSocket(Options)