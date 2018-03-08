import React from 'react'

export default class Options extends React.Component {

    constructor(props) {
        super(props)

        this.state = this.props.options
    }

    setOption(evt) {        
        let val = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value
        this.setState({ [evt.target.id]: val }, () => console.log('setting', this.state))
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
                        <input id="radius" value={this.state.radius} type="number" onChange={evt => this.setOption(evt)} className="form-control" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col">
                        <label className="check-container">Open restaurants only
                            <input checked={this.state.open_now} id="open_now" onChange={evt => this.setOption(evt)} type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

                <div className="btn-row">
                    <div className="col-xs-12">
                        <input
                            className="btn"
                            type="button"
                            value="Refresh"
                            onClick={() => this.props.setOptions(this.state)} />
                    </div>
                </div>
            </div>
        )
    }
}