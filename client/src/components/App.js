import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import HomePage from './homepage/HomePage'
import Footer from './Footer'

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' component={HomePage} />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}