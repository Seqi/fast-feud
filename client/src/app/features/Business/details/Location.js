import React from 'react'

import GoogleMapReact from 'google-map-react'

import config from '@config'

export default class Location extends React.Component {

	constructor() {
		super()

		this.marker = null
		this.state = {
			mapsApi: null
		}
	}

	componentDidUpdate() {
		this.setMarker(this.props.center)		
	}

	setMapsApiAndMarkers(mapsApi) {
		this.setState({ mapsApi }, () => this.setMarker(this.props.center))
	}

	setMarker(position) {		
		if (this.marker) {
			this.marker.setMap(null)
		}

		let mapsApi = this.state.mapsApi
		this.marker = new mapsApi.maps.Marker({
			position: position,
			map: mapsApi.map
		})
	}

	render() {
		return (
			<GoogleMapReact bootstrapURLKeys={{ key: config.mapsApiKey }}
				onGoogleApiLoaded={ mapsApi => this.setMapsApiAndMarkers(mapsApi)}
				yesIWantToUseGoogleMapApiInternals={true} // wtf is this name                
				center={this.props.center}
				zoom={this.props.zoom} />
		)
	}
}

