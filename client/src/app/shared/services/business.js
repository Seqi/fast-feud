import * as axios from 'axios'
import config from '@config'

export function loadBusiness(options) {
	return axios
		.get(`${config.apiUrl}/food/random?${buildQuery(options)}`)
		.catch(error => {
			let errMessage
			if (
				error.response.data.error.description ===
				'Please specify a location or a latitude and longitude'
			) {
				errMessage = 'Could not find any restaurants within your location.'
			} else {
				errMessage =
					'An error occurred. Please refresh and try again, reconfigure your options, or create a new room.'
			}

			throw new Error(errMessage)
		})
}

function buildQuery(options) {
	return Object.keys(options)
		.filter(key => options[key] !== null && options[key] !== undefined)
		.map(key => `${key}=${options[key]}`)
		.join('&')
}
