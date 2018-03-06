import React from 'react'
import axios from 'axios'

import Business from './Business'
import Error from './Error'

import config from '../../config'

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            error: false,
            errorMessage: null,

            location: this.props.location.state.location,
            business: null
        }


        this.fetch()
    }


    fetch() {
        axios.get(`${config.apiUrl}/food/random?location=${this.state.location}`)
            .then(result => {
                this.setState({ business: result.data })
            })
            .catch(error => {
                if (error.response.data.error.description === 'Please specify a location or a latitude and longitude') {
                    this.setState({
                        error: true,
                        errorMessage: 'Could not find any restaurants within your location.'
                    })
                }
            })
    }

    render() {
        return (
            <div className="app-container container">
                <div class="row">
                    {this.state.error ? <Error error={this.state.errorMessage} /> : null}
                </div>

                <div class="row">
                    <div className="col-md-8">
                        <Business business={this.state.business} />
                    </div>
                </div>
            </div>
        )
    }
}