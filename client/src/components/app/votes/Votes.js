import React from 'react'

import Vote from './Vote'

export default class Votes extends React.Component {

    convertVoterToCol(voters, i) {
        return (
            <div className="col-md-6">
                <Vote key={i} vote={voters[i]} />
            </div>
        )
    }

    convertVotersToRows(voters) {
        let result = [];

        for (let i = 0; i < voters.length; i += 2) {
            result.push(
                (<div className="row">
                    { this.convertVoterToCol(voters, i) }
                    { voters[i + 1] ? this.convertVoterToCol(voters, i + 1) : null}
                </div>)
            )
        }

        return result
    }

    render() {
        return (
            <div className="votes-container container">
                {
                    this.convertVotersToRows(this.props.voters)
                }
            </div>
        )
    }
}