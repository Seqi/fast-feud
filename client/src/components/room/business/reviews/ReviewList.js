import React from 'react'

import ReviewItem from './ReviewItem'

export default class ReviewList extends React.Component {
    render() {
        return (
            <div className="review-list-container">
                <h2>Reviews</h2>
                {
                    this.props.reviews.map(review => (<ReviewItem key={review.id} review={review} />))
                }
            </div>
        )
    }
}