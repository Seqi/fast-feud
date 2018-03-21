import React from 'react'

import Vote from './Vote'

export default class Votes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nickname: ''
        }
    }

    convertVoterToCol(voters, i) {
        console.log(voters[i])
        return (
            <div className="col-md-6">
                <Vote socket={this.props.socket} key={i} vote={voters[i]} />
            </div>
        )
    }

    convertVotersToRows(voters) {
        let result = [];

        for (let i = 0; i < voters.length; i += 2) {
            result.push(
                (<div key={i} className="row">
                    {this.convertVoterToCol(voters, i)}
                    {voters[i + 1] ? this.convertVoterToCol(voters, i + 1) : null}
                </div>)
            )
        }

        return result
    }

    updateNickname(evt) {
        this.setState({nickname: evt.target.value})
    }

    setNickname(evt) {
        evt.preventDefault()
        if (this.state.nickname) {
            this.props.socket.emit('set-nickname', this.state.nickname)
        }
    }

    render() {
        return (
            <div className="votes-container container">
                <div className="votes-header">
                    <h4>Votes</h4>
                    <form onSubmit={evt => this.setNickname(evt)}>
                        <input className="form-control" type="text" onChange={evt => this.updateNickname(evt)} placeholder="Set Nickname" />
                    </form>
                </div>
                {
                    this.convertVotersToRows(this.props.voters)
                }
            </div>
        )
    }
}