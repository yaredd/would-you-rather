import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { saveQuestionAnswer } from '../actions/questions';

class QuestionDetail extends Component {
    state = {
        choice: ''
    }

    handleChoice = (e) => {
        this.setState({choice: e.target.value})
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(saveQuestionAnswer({
            authedUser: this.props.authedUserId,
            qid: this.props.currentQuestion.id,
            answer: this.state.choice
        }))
        this.props.history.push(`/questions/${this.props.currentQuestion.id}`)
    }

    handleGoBack = (e) => {
        e.preventDefault()
        this.props.history.push('/')
    }

    getTotals = () => {
        const { currentQuestion } = this.props
        const totalOptionOneVotes = currentQuestion.optionOne.votes.length
        const totalOptionTwoVotes = currentQuestion.optionTwo.votes.length
        const totalVotes = totalOptionOneVotes + totalOptionTwoVotes
        return {totalVotes, totalOptionOneVotes, totalOptionTwoVotes}
    }
    
    render () {
        const { currentQuestion, users } = this.props
        const { author, timestamp, optionOne, 
            optionTwo, answered } = currentQuestion
        const {totalVotes, totalOptionOneVotes, totalOptionTwoVotes } = this.getTotals()
        const percentOptionOne = (totalOptionOneVotes/totalVotes*100).toFixed(1) + '%'
        const percentOptionTwo = (totalOptionTwoVotes/totalVotes*100).toFixed(1) + '%'
        if(answered) {
            return (
                <div>
                    <p>Results</p>
                    <p>Would you rather ....</p>
                    { optionOne.votes.includes(this.props.authedUserId) ? <p>... you answered ...</p>: null}
                    <p>{optionOne.text}</p>
                    <p>{totalOptionOneVotes} out of {totalVotes}. {percentOptionOne}</p>
                    <br />
                    { optionTwo.votes.includes(this.props.authedUserId) ? <p>... you answered ...</p>: null}
                    <p>{optionTwo.text}</p>
                    <p>{totalOptionTwoVotes} out of {totalVotes}. {percentOptionTwo}</p>
                    <button onClick={this.handleGoBack}>Go Back</button>
                </div>
            )
        }else {
            return (
                <div>
                    {author} asked on {timestamp}
                    <form onSubmit={this.handleFormSubmit} >
                        <p><img src={users[author].avatarURL} width="50px" alt={`${author} avatar`}/>
                        <span>Would you rather ....</span></p>
                        <label>
                            {optionOne.text}
                            <input type="radio"
                                checked={this.state.choice === 'optionOne'}
                                value="optionOne" onChange={this.handleChoice} />
                        </label>
                        <p>Or</p>
                        <label>
                            {optionTwo.text}
                            <input type="radio"
                                checked={this.state.choice === "optionTwo"}
                                value="optionTwo" onChange={this.handleChoice} />
                        </label>
                        <input type='submit' value='Submit'/>
                    </form>
                </div>
            )
        } 
    }
}

const mapStateToStore = ({ users, authedUserId, currentQuestion }) => {
    return {
        users,
        authedUserId,
        currentQuestion
    }
}

export default withRouter(connect(mapStateToStore)(QuestionDetail))