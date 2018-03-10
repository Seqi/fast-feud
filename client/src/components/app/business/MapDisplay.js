import React from 'react'

import GoogleMapReact from 'google-map-react'

import config from '../../../config'

export default class MapDisplay extends React.Component {
    render() {
        <GoogleMapReact bootstrapURLKeys={{key: config.mapsApiKey}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom} />
    }
}

