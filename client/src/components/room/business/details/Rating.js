import React from 'react'
import ReactStars from 'react-stars'

const Rating = props => 
    <div className="rating">
        <ReactStars value={props.rating} color1={'transparent'} color2={'white'} count={5} edit={false} />
        <span>({props.count})</span>
    </div>

export default Rating