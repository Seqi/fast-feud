import React from 'react'
import axios from 'axios'
import { PulseLoader } from 'halogenium'
import io from 'socket.io-client'

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
            loading: true,
            error: false,
            errorMessage: null,

            business: null,
            options: {
                location: this.props.location.state.location,
                price: null,
                term: 'food',
                open_now: false,
                radius: 0
            }
        }

        this.fetch()

        io.connect(config.apiUrl, {query: `roomId=${this.props.match.params.id}`})
    }

    fetch() {
        let query = Object.keys(this.state.options)
            .filter(key => this.state.options[key] != null)
            .map(key => `${key}=${this.state.options[key]}`)
            .join('&')

        axios.get(`${config.apiUrl}/food/random?${query}`)
            .then(result => {
                this.setState({ business: result.data, loading: false })
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
        this.setState({ options }, () => this.fetch())
    }

    // Don't update children if the options have changed as it does not 
    // affect child views
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.options === nextState.options
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loader">
                    <PulseLoader />
                </div>
            )
        }

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
                        <Options 
                            options={this.state.options}
                            setOptions={opts => this.setOptions(opts)} />
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