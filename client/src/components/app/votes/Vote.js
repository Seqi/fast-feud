import React from 'react'

export default class Vote extends React.Component {
    render() {
        return (
            <div className="vote-container">
                {this.props.vote}
            </div>
        )
    }
}