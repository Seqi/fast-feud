import React from 'react'

import iso from 'iso-countries'
import getSymbolFromCurrencyMap from 'currency-symbol-map'

const Price = props => {

    const padPrice = (price) => {
        const maxPrice = props.maxPrice || 4

        let symbol = '$'
        if (price) {
            symbol = price[0]   
        } else {
            let country = iso.findCountryByCode(props.country)

            if(country) {
                // Default to dollars USA USA USA USA USA
                symbol = getSymbolFromCurrencyMap(country.currency) || '$'
            }            
        }

        let padCount = price ? price.length : 0
        return symbol.repeat(maxPrice - padCount)
    }

    return (        
        <div className="price">
            {props.price}
            <span className="price-pad">{padPrice(props.price)}</span>
        </div>
    )
}

export default Price