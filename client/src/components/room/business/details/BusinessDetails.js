import React from 'react';

import Refresh from './Refresh'
import Title from './Title'
import Rating from './Rating'
import Price from './Price'
import Categories from './Categories'
import Address from './Address'
import Location from './Location'

export default class BusinessDetails extends React.Component {    

    shouldComponentUpdate(nextProps, nextState) {
        // Only update if the properties have changed (prevents the map having
        // to rerender if something irrelevant changes)
        return JSON.stringify(nextProps) !== JSON.stringify(this.props)
    }

    render() {
        return (
            <div className="business-container">
                <div className="refresh-button">
                    <Refresh canRefresh={this.props.canRefresh} onRefresh={this.props.refresh} />
                </div>

                <div className="row">
                    <div className="col">
                        <Title name={this.props.business.name} isClosed={this.props.business.is_closed} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 d-block">
                        <Rating rating={this.props.business.rating} count={this.props.business.review_count} />
                        <Price price={this.props.business.price} country={this.props.business.location.country} />
                        <Categories categories={this.props.business.categories} />
                    </div>

                    <div className="col-sm-6 text-right">
                        <Address address={this.props.business.location.display_address} phone={this.props.business.display_phone} />
                    </div>
                </div>

                <div className="business-map">
                    <Location center={{ lat: this.props.business.coordinates.latitude, lng: this.props.business.coordinates.longitude }} zoom={16} />
                </div>

                <div className="business-image"
                    style={{ backgroundImage: `url(${this.props.business.image_url})` }}>
                </div>
            </div>
        )
    }
}