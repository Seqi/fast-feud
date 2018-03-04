import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import HomePage from './homepage/HomePage'
import App from './app/App'
import Footer from './Footer'

export default class Container extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/:id' component={App} />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}