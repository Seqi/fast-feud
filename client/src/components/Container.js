import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import HomePage from './homepage/HomePage'
import App from './app/App'
import Footer from './Footer'

export default class Container extends React.Component {
    constructor() {
        super()
        this.state = {
            location: null
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path='/' render={props => <HomePage {...props} locationChanged={location => this.setState({ location })} />} />
                    <Route exact path='/:id' render={props => <App {...props} location={this.state.location} />} />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}