import React from 'react'
import { Link } from 'react-router-dom'

import shortid from 'shortid'

export default class TitleText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: shortid.generate()
        }
    }

    render() {
        return (
            <div className="carousel-content">
                <div className="carousel-text">
                    <h1>Gamer snacks</h1>
                    <h3>Rack up that k/d with some epic noms</h3>
                </div>

                <div className="carousel-search container">
                    <div className="row">
                        <div className="input-group">
                            <input className="form-control carousel-input"
                                placeholder="Enter your location"
                                onChange={evt => this.props.locationChanged(evt.target.value)} />
                            <div className="input-group-append">
                                <Link to={this.state.id}>
                                    <button className="btn" type="submit">
                                        Search
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}