import React, { Component } from 'react'
import { connect } from 'react-redux';
import { AsyncSeriesHook } from 'tapable';

class QuestionDetail extends Component {
    state = {
        choice: null
    }

    handleChoice = (e) => {
        e.preventDefault()
        this.setState({choice: e.target.value})
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

    }
    
    render () {
        const { currentQuestion } = this.props
        if(currentQuestion.answered) {
            return (
                <div>
                    <p>Results</p>
                    <p>Would you rather ....</p>
                    <p>{currentQuestion.optionOne.text}</p>
                    <p>{currentQuestion.totalOptionOneVotes} out of {currentQuestion.totalVotes}</p>
                    <br />
                    <p>{currentQuestion.optionTwo.text}</p>
                    <p>{currentQuestion.totalOptionTwoVotes} out of {currentQuestion.totalVotes}</p>
                </div>
            )
        }else {
            return (
                <div>
                    {currentQuestion.author} asked on {currentQuestion.timestamp}
                    <form onSubmit={this.handleFormSubmit} >
                        Would you rather ... 
                        <label>
                            {currentQuestion.optionOne.text}
                            <input type="radio" name="would-you-rather" 
                                checked={this.state.choice === currentQuestion.optionOne.text}
                                value="optionOne" onChange={this.handleChoice} />
                        </label>
                        <p>Or</p>
                        <label>
                            {currentQuestion.optionTwo.text}
                            <input type="radio" name="would-you-rather" 
                                checked={this.state.choice === currentQuestion.optionTwo.text}
                                value="optionTwo" onChange={this.handleChoice} />
                        </label>
                        <input type='submit' value='Submit'/>
                    </form>
                </div>
            )
        } 
    }
}

const mapStateToStore = ({ authedUserId, currentQuestion }) => {
    return {
        authedUserId,
        currentQuestion
    }
}

export default connect(mapStateToStore)(QuestionDetail)