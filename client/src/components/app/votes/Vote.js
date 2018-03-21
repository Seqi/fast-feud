import React from 'react'

export default class Vote extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            vote: this.props.vote? this.props.vote.vote : undefined,
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

    renderUserVote() {
        console.log(this.state.vote)
        switch(this.state.vote) {
            case true:
                return (<i className="fa fa-check"></i>)
            case false:
                return (<i className="fa fa-close"></i>)
            default: 
                return (
                    <span>
                        <i className="fa fa-check"></i>
                        <i className="fa fa-close"></i>
                    </span>
                )
        }
    }

    renderOtherVotes() {
        return (
            <div className="votes user">
                { this.renderUserVote() }
            </div>
        )
    }
    
    renderSelfVotes() {
        return (
            <div className="votes">
                <i onClick={_ => this.changeVote(true)} className="fa fa-check"></i>
                <i onClick={_ => this.changeVote(false)} className="fa fa-close"></i>
            </div>
        )
    }

    renderVoteOptions() {
        if (this.state.isSelf) {
            return this.renderSelfVotes()
        } else {
            return this.renderOtherVotes()
        }
    }

    render() {
        return (
            <div className="vote-container">
                {this.props.vote.nickname || this.props.vote.id} {this.state.isSelf ? ' (You)' : null}

                { this.renderVoteOptions() }
            </div>
        )
    }
}