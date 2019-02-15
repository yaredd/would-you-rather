import React from 'react'

const ScoreCard = (props) => {
    const { avatarURL, name, totalQuestions, totalAnswers } = props
    return (
        <div className="poll-info">
            <p><img src={avatarURL} width="50px" alt={`${name} avatar`}/>
                    <span> {name}</span></p>
            <p>
                Total Questions asked: {totalQuestions}
            </p>
            <p>
                Total Questions answered: {totalAnswers}
            </p>
        </div>
    )
}

export default ScoreCard