import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard'

class Leaderboard extends Component {
    getTotalAnswers = (user) => (
        Object.keys(user.answers).length
    )

    getTotalQuestions = (user) => (
        user.questions.length
    )

    render () {
        const { userIds, users } = this.props
        return (
            <div className='center'>
                <div className='polls'>
                    <ol>
                        {userIds.map((userId) => {
                            return (
                                <li key={userId}><ScoreCard totalQuestions={this.getTotalQuestions(users[userId])} 
                                        totalAnswers={this.getTotalAnswers(users[userId])} 
                                        avatarURL={users[userId].avatarURL}
                                        name={users[userId].name} /></li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users, authedUserId }) => {
    return {
        userIds: Object.keys(users).sort((a,b) => users[b].questions.length + Object.keys(users[b].answers).length -
                                                    (users[a].questions.length + Object.keys(users[a].answers).length) ),
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)