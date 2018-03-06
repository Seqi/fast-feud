import React from 'react'

export default class ImageCarousel extends React.Component {
    render() {
        return (
            <div className="carousel slide h-100" data-ride="carousel">
                <div className="carousel-inner h-100">
                    <div className="carousel-item active">
                        <div id="ci-1" className="carousel-image"></div>
                    </div>
                    <div className="carousel-item">
                        <div id="ci-2" className="carousel-image"></div>
                    </div>
                    <div className="carousel-item">
                        <div id="ci-3" className="carousel-image"></div>
                    </div>
                </div>
            </div>
        )
    }
}