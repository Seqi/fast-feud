import * as axios from 'axios'

let errorMessageMap = {
	LOCATION_MISSING: 'A location was not supplied. Please configure your location and try again.',
	LOCATION_NOT_FOUND: 'Could not find any restaurants with your provided location.',
	TOO_SMALL_VALIDATION_ERROR: 'A provided value was incorrect. Please check your options and try again.'
}

export function loadBusiness(options) {
	return axios.get(`/food/random?${buildQuery(options)}`).catch(error => {
		throw new Error(
			errorMessageMap[error.response.data.error.code] ||
				'An error occurred. Please refresh and try again, reconfigure your options, or create a new room.'
		)
	})
}

function buildQuery(options) {
	return Object.keys(options)
		.filter(key => !!options[key])
		.map(key => `${key}=${options[key]}`)
		.join('&')
}
