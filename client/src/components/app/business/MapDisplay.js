import React from 'react'

import GoogleMapReact from 'google-map-react'

import config from '../../../config'

export default class MapDisplay extends React.Component {

    constructor() {
        super()

        this.state = {
            mapsApi: null,
            marker: null
        }
    }

    setMapsApiAndMarkers(mapsApi) {
        this.setState({ mapsApi }, () => this.setMarker(this.props.center))
    }

    setMarker(position) {
        let mapsApi = this.state.mapsApi
        this.setState({
            marker: new mapsApi.maps.Marker({
                position,
                map: mapsApi.map
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.marker) {
            this.state.marker.setMap(null)
        }
        
        this.setMarker(nextProps.center)
    }

    render() {
        console.log('rendering map')
        return (
            <GoogleMapReact bootstrapURLKeys={{ key: config.mapsApiKey }}
                onGoogleApiLoaded={ mapsApi => this.setMapsApiAndMarkers(mapsApi)}
                yesIWantToUseGoogleMapApiInternals={true} // wtf is this name                
                center={this.props.center}
                zoom={this.props.zoom} />
        )
    }
}

