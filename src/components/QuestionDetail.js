import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
import { saveQuestionAnswer, setCurrentQuestion, getAllQuestions } from '../actions/questions';
import formatDate from '../utils/formatDate'

class QuestionDetail extends Component {
    state = {
        choice: '',
        notFound: false
    }

    componentDidMount = () => {
        const { setCurrentQuestionFromURL, loading, id, authedUserId} = this.props
        if(loading){
            setCurrentQuestionFromURL(authedUserId, id)
            .catch((e) => this.setState({notFound: true}))
        }
    }

    handleChoice = (e) => {
        this.setState({choice: e.target.value})
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.props.saveQuestion({
            authedUser: this.props.authedUserId,
            qid: this.props.currentQuestion.id,
            answer: this.state.choice
        })
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
        if(this.state.notFound) {
            return <Redirect to={'/not_found'} />
        }
        if(this.props.loading) {
            return null
        }
        const { currentQuestion, users, authedUserId } = this.props
        const { author, timestamp, optionOne, 
            optionTwo, answered } = currentQuestion
        const {totalVotes, totalOptionOneVotes, totalOptionTwoVotes } = this.getTotals()
        const percentOptionOne = (totalOptionOneVotes/totalVotes*100).toFixed(1) + '%'
        const percentOptionTwo = (totalOptionTwoVotes/totalVotes*100).toFixed(1) + '%'

        if(answered === true) {
            return (
                <div className='center'>
                    <div className='polls'>
                        <div><img className='avatar' src={users[authedUserId].avatarURL} width="50px" alt={`${authedUserId} avatar`}/>
                        <span> {users[authedUserId].name}, your result for "Would you rather ..."</span></div>

                        <div className="poll-info">
                            { optionOne.votes.includes(this.props.authedUserId) ? <p>... you answered ...</p>: null}
                            <p><b>{optionOne.text}</b></p>
                            <p>{totalOptionOneVotes} out of {totalVotes} chose this response.</p><p> Percent of polled {percentOptionOne}</p>
                        </div>

                        <div className="poll-info">
                            { optionTwo.votes.includes(this.props.authedUserId) ? <p>... you answered ...</p>: null}
                            <p><b>{optionTwo.text}</b></p>
                            <p>{totalOptionTwoVotes} out of {totalVotes} chose this response.</p><p> Percent of polled {percentOptionTwo}</p>
                        </div>

                        <button className='btn' onClick={this.handleGoBack}>Go Back</button>
                    </div>
                </div>
            )
        }
        return (
            <div className='center'>
                <div className='polls'>
                    
                    <form onSubmit={this.handleFormSubmit} >
                        <div><img className='avatar' src={users[author].avatarURL} width="50px" alt={`${author} avatar`}/>
                        <span>{author} asked on {formatDate(timestamp)} <br /> ... Would you rather ....</span></div>
                        <div className='poll-info'>
                            <label>
                                {optionOne.text}
                                <input type="radio"
                                    checked={this.state.choice === 'optionOne'}
                                    value="optionOne" onChange={this.handleChoice} />
                            </label>
                            <div>Or</div>
                            <label>
                                {optionTwo.text}
                                <input type="radio"
                                    checked={this.state.choice === "optionTwo"}
                                    value="optionTwo" onChange={this.handleChoice} />
                            </label>
                            <div>
                                <input className='btn' type='submit' value='Submit' disabled={this.state.choice !== 'optionOne' &&
                                   this.state.choice !== 'optionTwo' }/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToStore = ({ questions, users, authedUserId, currentQuestion }, props) => {
    const { id } = props.match.params
    return {
        loading: currentQuestion.optionOne === undefined ? true : false,
        users,
        authedUserId,
        questions,
        currentQuestion,
        id
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        saveQuestion: (question) => dispatch(saveQuestionAnswer(question)),
        setCurrentQuestionFromURL: (uid, qid) => dispatch(getAllQuestions()).then((questions) => { 
            dispatch(setCurrentQuestion(uid,questions[qid]))
        })
    })
}

export default withRouter(connect(mapStateToStore, mapDispatchToProps)(QuestionDetail))