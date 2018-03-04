import React from 'react'

export default class App extends React.Component {

    render() {
        return (
            <div>
                App works <span>{this.props.match.params.id}</span> for location <span>{this.props.location}</span>
            </div>
        )
    }
}