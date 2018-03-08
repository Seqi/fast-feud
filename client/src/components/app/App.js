import React from 'react'
import axios from 'axios'

import Business from './business/Business'
import Votes from './votes/Votes'
import Options from './options/Options'
import Chat from './chat/Chat'
import Error from './Error'

import config from '../../config'

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            error: false,
            errorMessage: null,

            business: null,            
            options: {
                location: this.props.location.state.location,
                term: 'food',
                open_now: false,
                radius: 0
            }
        }

        this.fetch()
    }

    fetch() {
        let query = Object.keys(this.state.options)
            .map(key => `${key}=${this.state.options[key]}`)
            .join('&')

        axios.get(`${config.apiUrl}/food/random?${query}`)
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

    setOptions(options) {
        this.setState({options}, () => this.fetch())
    }

    // Don't update children if the options have changed as it does not 
    // affect child views
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.options === nextState.options
    }

    render() {
        return (
            <div className="app-container container">
                <div className="row">
                    {this.state.error ? <Error error={this.state.errorMessage} /> : null}
                </div>

                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <Business refresh={() => this.fetch()} business={this.state.business} />
                    </div>
                    
                    <div className="col-md-4 col-sm-12">
                        <Votes />
                    </div>                    
                </div>

                <div className="row">
                    <div className="col-12">
                        <Options setOptions={opts => this.setOptions(opts)}  />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Chat />
                    </div>
                </div>
            </div>
        )
    }
}