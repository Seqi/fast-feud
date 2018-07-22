import React from 'react'

const Address = props => 
    <div>
        {props.address.map((line, idx) => <div key={idx}>{line}</div>)}
        <h3>{props.phone}</h3>
    </div>

export default Address