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
            <div className="business-container box">
                {
                    this.props.canRefresh ?
                        (<i className="fa fa-refresh fa-2x refresh-button" onClick={() => this.props.refresh()} />) : null
                }

                <div className="row">
                    <div className="col title">
                        <h1>{business.name}</h1>
                        <i className={business.is_closed ? 'fa fa-ban' : 'fa fa-clock-o'}
                            title={business.is_closed ? 'Closed now' : 'Open now'}></i>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 d-block">
                        <div className="business-rating">
                            <ReactStars value={business.rating} color1={'transparent'} color2={'white'} count={5} edit={false} />

                            <span>({business.review_count})</span>

                            <div>
                                {business.price}
                            </div>

                            <div className="tags">
                                {business.categories.map((category, idx) =>
                                    (<span key={idx}>{category.title}</span>))}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 text-right">
                        {business.location.display_address.map((line, idx) => (<div key={idx}>{line}</div>))}

                        <h3>{business.display_phone}</h3>
                    </div>
                </div>

                <div className="business-image"
                    style={{ backgroundImage: `url(${business.image_url})` }}>
                </div>
            </div>
        )
    }
}