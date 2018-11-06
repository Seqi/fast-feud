let Yelp = require('./yelp')

function yelpUtils(apiKey) {
	let yelp = new Yelp(apiKey)

	function getRandomBusinessWithReviews(query) {
		return yelp.business({ ...query, limit: 50 })        

		// Random business 
			.then(res => {
				if (res.businesses.length > 0) {
					return res.businesses[Math.floor(Math.random() * res.businesses.length)]
				}

				return Promise.reject('No businesses found.')
			})

		// Get reviews
			.then(business => {
				return yelp.review(encodeURIComponent(business.id))
					.then(reviews => {
						business.reviews = reviews
						return business
					})
			})
	}

	return {
		getRandomBusinessWithReviews
	}
}

module.exports = yelpUtils