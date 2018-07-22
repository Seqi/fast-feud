import React from 'react'

import ChatLog from './ChatLog'
import ChatEntry from './ChatEntry'

export default class Chat extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            chatLog: []
        }

        this.props.socket.on('message', message => {
            this.setState({ chatLog: this.state.chatLog.concat(message) })
        })
    }

    render() {
        return (
            <div className="chat-container">
                <ChatLog log={this.state.chatLog} />
                <ChatEntry socket={this.props.socket} />                
            </div>
        )
    }
}