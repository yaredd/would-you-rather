import React, { Component } from 'react'

class ScoreCard extends Component {

    render () {
        const { avatarURL, name, totalQuestions, totalAnswers } = this.props
        return (
            <div>
                <p><img src={avatarURL} width="50px" alt={`${name} avatar`}/>
                        <span>Would you rather .... Score Card for {name}</span></p>
                <p>
                    Total Questions asked: {totalQuestions}
                </p>
                <p>
                    Total Questions answered: {totalAnswers}
                </p>
            </div>
        )
    }
}

export default ScoreCard