import React from 'react'

import BusinessDetails from './details/BusinessDetails'
import ReviewList from './reviews/ReviewList'

export default class Business extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div className="col-md-8 col-sm-12">
                    {this.props.business ? 
                        <BusinessDetails
                            canRefresh={this.props.admin} 
                            refresh={() => this.props.loadBusiness()} 
                            business={this.props.business} /> : null
                    }
                </div>

                <div className="col-md-4 col-sm-12"> 
                    <ReviewList reviews={this.props.business.reviews.reviews} />
                </div>
            </React.Fragment>
        )
    }
}

