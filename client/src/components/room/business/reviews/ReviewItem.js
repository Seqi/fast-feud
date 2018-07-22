import React from 'react'
import ReactStars from 'react-stars'

export default class ReviewItem extends React.Component {
    render() {
        return (
            <div className="review-item-container">
                <span className="review-username">{this.props.review.user.name}</span>
                <ReactStars color1={'transparent'} color2={'white'} value={this.props.review.rating} />
                <p>{this.props.review.text}</p>
            </div>
        )
    }
}