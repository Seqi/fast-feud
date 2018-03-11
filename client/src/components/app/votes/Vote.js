import React from 'react'

export default class Vote extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            vote: false,
            isSelf: this.props.socket.id === this.props.vote.id
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isSelf: nextProps.socket.id === nextProps.vote.id,
            vote: nextProps.vote.vote
        })
    }

    changeVote(vote) {
        if (this.state.isSelf) {
            this.setState({ vote }, _ => this.props.socket.emit('vote', { id: this.props.socket.id, vote }))
        }
    }

    render() {
        return (
            <div className="vote-container">
                {this.props.vote.id} {this.state.isSelf ? ' (You)' : null}

                <label className={this.state.isSelf ? 'check-container' : 'check-container disabled'}>
                    <input onChange={evt => this.changeVote(evt.target.checked)} checked={this.state.vote} id="vote" type="checkbox" />
                    <span className="checkmark"></span>
                </label>
            </div>
        )
    }
}