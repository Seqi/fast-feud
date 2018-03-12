import React from 'react'

export default class ChatMessage extends React.Component {
    render() {
        return (
            <div>
                {this.props.msg.nickname || this.props.msg.id}: {this.props.msg.message}
            </div>
        )
    }
}