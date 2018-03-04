import React from 'react'

import HomePage from './homepage/HomePage'
import Footer from './Footer'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <HomePage />
                <Footer />
            </div>
        )
    }
}