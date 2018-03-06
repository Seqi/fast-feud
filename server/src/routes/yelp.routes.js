let express = require('express')
let router = express.Router()

let config = require('../config')
let yelputils = require('../yelp/yelp-utils')(config.yelp_apikey)

router.get('/random', (req, res) => {
    yelputils.getRandomBusinessWithReviews(req.query)
        .then(business => res.json(business))
        .catch(err => {
            console.log('Error getting random business with args ', req.query, err)
            res.status(400).json(err.error)
        })
})

module.exports = router