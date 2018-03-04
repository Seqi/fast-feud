import React from 'react'
import { Link } from 'react-router-dom'

import shortid from 'shortid'

export default class TitleText extends React.Component {

    generateId() {
        return shortid.generate()
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
                            <input className="form-control carousel-input" placeholder="Enter your location" />
                            <div className="input-group-append">
                                <button className="btn" type="submit">
                                    <Link to={this.generateId()}>
                                        Search
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}