import React from 'react'

export default class TitleText extends React.Component {
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
                                <button class="btn" type="submit">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}