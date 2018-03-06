import React from 'react';

import ReactStars from 'react-stars'

export default class Business extends React.Component {

    render() {
        let business = this.props.business

        if (!business) {
            return null
        }

        console.log(business)

        return (
            <div className="business-container">
                <h1>{business.name}</h1>

                <div className="business-rating">
                    <ReactStars value={business.rating} color1={'transparent'} color2={'white'}  count={5} edit={false} />

                    <div>
                        {business.price}
                    </div>
                </div>

                <h3>{business.display_phone}</h3>

                <div className="business-image"
                    style={{ backgroundImage: `url(${business.image_url})` }}>
                </div>
            </div>
        )
    }
}