import React from 'react'

import ChatMessage from './ChatMessage'

export default class Chat extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            message: '',
            messages: []
        }

        this.props.socket.on('message', message => {
            console.log('message retrieved', message)
            let messages = this.state.messages
            messages.push(message)
            this.setState({ messages: messages })
        })
    }

    sendMessage(formEvt) {
        formEvt.preventDefault()

        this.props.socket.emit('message', this.state.message)
        this.setState({message: ''})
    }

    render() {
        return (
            <div className="chat-container">
                <div className="chat-window">
                    {
                        this.state.messages.map((msg, idx) => <ChatMessage key={idx} msg={msg} />)
                    }
                </div>

                <form onSubmit={formEvt => this.sendMessage(formEvt)}>
                    <div className="input-row row">
                        <div className="col-xl-11">
                            <input className="form-control"
                                value={this.state.message}
                                onChange={evt => this.setState({ message: evt.target.value })}
                                placeholder="Type a message" />
                        </div>
                        <div className="col-xl-1">
                            <input className="form-control btn" type="submit" value="Send" />
                        </div>
                    </div >
                </form>
            </div>
        )
    }
}