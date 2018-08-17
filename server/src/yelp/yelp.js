let request = require('request-promise-native')
let qs = require('querystring')

let yelp_baseurl = 'https://api.yelp.com/v3'
let yelp_business = '/businesses'
let yelp_search = '/businesses/search'
let yelp_autocomplete = '/autocomplete'

let yelp = function (apiKey) {

    function req(path, query) {
        return {
            url: `${yelp_baseurl}${path}?${qs.stringify(query)}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            json: true
        }
    }

    return {
        business: query => request(req(yelp_search, query)),
        review: id => request(req(`${yelp_business}/${id}/reviews`))
    }
}

module.exports = yelp