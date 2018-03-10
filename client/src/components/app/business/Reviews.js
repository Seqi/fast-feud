import React from 'react'

import Review from './Review'

export default class Reviews extends React.Component {
    render() {
        return (
            <div className="reviews-container">
                <h2>Reviews</h2>
                {
                    this.props.reviews.map(review => (<Review key={review.id} review={review} />))
                }
            </div>
        )
    }
}