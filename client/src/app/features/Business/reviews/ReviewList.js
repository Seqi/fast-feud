import React from 'react'

import ReviewItem from './ReviewItem'

export default class ReviewList extends React.Component {
	render() {
		return (
			<div className="review-list-container">
				<div className="row ignore-spacer">
					{
						this.props.reviews.map(review => (
							<div key={review.id} className="col-md-4 col-sm-12">
								<ReviewItem review={review} />
							</div>
						))
					}
				</div>
			</div>
		)
	}
}