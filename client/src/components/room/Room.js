import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import Loader from './Loader';
import Business from './business/Business'
import Votes from './votes/Votes'
import Options from './options/Options'
import Chat from './chat/Chat'
import Error from './Error'

import config from '../../config'

export default class Room extends React.Component {

    constructor(props) {
        super(props)

        let socket = io.connect(config.apiUrl, { query: `roomId=${this.props.match.params.id}` })

        this.state = {
            id: this.props.match.params.id,
            loading: true,
            error: false,
            errorMessage: null,
            admin: false,
            voters: [],
            business: null,
            socket: socket
        }

        this.initSocket()
    }

    getLocation() {
        if (this.props.location && this.props.location.state) {
            return this.props.location.state.location
        } else {
            return ''
        }
    }

    initSocket() {
        this.state.socket.on('connect', _ => {
            console.log('connected')
        })

        this.state.socket.on('admin', admin => {
            if (admin) {
                console.log('Youre the admin!')
                // Generate a set of options for the admin to configure
                this.setState({
                    admin: admin,
                    options: {
                        location: this.getLocation(),
                        price: null,
                        term: 'restaurant',
                        open_now: null,
                        radius: undefined
                    }
                })

                // Store the options on the socket
                this.state.socket.emit('options', this.state.options)

                // On first creation of the room, load the business
                this.loadBusiness()
            }
        })

        this.state.socket.on('admin-transfer', _ => {
            console.log('Youre now the admin!')
            this.setState({
                admin: true
            })
        })

        this.state.socket.on('options', options => this.setState({ options }))

        this.state.socket.on('business-updated', business => {
            this.setState({ business, loading: false })
        })

        this.state.socket.on('voters-updated', voters => {
            this.setState({ voters })
        })
    }

    loadBusiness() {
        this.fetch()
            .then(result => {
                this.setState({ business: result.data, loading: false })
                this.state.socket.emit('business', result.data)
            })
            .catch(error => {
                let errMessage
                if (error.response.data.error.description === 'Please specify a location or a latitude and longitude') {
                    errMessage = 'Could not find any restaurants within your location.'
                } else {
                    errMessage = 'An error occurred. Please refresh and try again or create a new room.'
                }

                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: errMessage
                })
            })
    }

    fetch() {
        let query = Object.keys(this.state.options)
            .filter(key => this.state.options[key] !== null && this.state.options[key] !== undefined)
            .map(key => `${key}=${this.state.options[key]}`)
            .join('&')

        return axios.get(`${config.apiUrl}/food/random?${query}`)
    }

    setOptions(options) {
        this.setState({ options }, () => {
            this.state.socket.emit('options', this.state.options)
            this.loadBusiness()
        })
    }

    render() {
        if (this.state.loading) {
            return (<Loader />)
        }

        return (
            <div className="app-container container">
                {this.state.error ? <Error error={this.state.errorMessage} /> : null}

                <div className="row">
                    <Business admin={this.state.admin} loadBusiness={this.loadBusiness} business={this.state.business} />
                </div>

                <div className="row">
                    <div className="col">
                        <Votes socket={this.state.socket} voters={this.state.voters} votes={this.state.votes} />
                    </div>
                </div>

                {this.state.admin && this.state.options ? (
                    <div className="row">
                        <div className="col-12">
                            <Options
                                options={this.state.options}
                                setOptions={opts => this.setOptions(opts)} />
                        </div>
                    </div>
                ) : null}


                <div className="row">
                    <div className="col-12">
                        <Chat socket={this.state.socket} />
                    </div>
                </div>
            </div>
        )
    }
}