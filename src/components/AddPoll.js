import React, { Component } from 'react'
import { connect } from 'react-redux';
import { saveNewQuestion } from '../actions/questions';

class AddPoll extends Component {
    state = {
        optionOneText: '',
        optionTwoText: ''
    }

    handleOptionInput = (text) => (e) => {
        e.preventDefault()
        this.setState({[text]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const question = {}
        question.author = this.props.authedUserId
        question.optionOneText = this.state.optionOneText
        question.optionTwoText = this.state.optionTwoText
        this.props.saveNew(question)
        this.props.history.push('/')

    }

    render () {
        const { optionOneText, optionTwoText } = this.state
        return (
            <div className='center'>
                <h3>Would you rather ...</h3>
                <div className='poll-info'>
                    <form className='new-poll' onSubmit={this.handleSubmit} >
                        <p>
                            <input type='text' value={optionOneText} name='optionOneText'
                                onChange={this.handleOptionInput('optionOneText')}
                                placeholder="Type in Option One text" />      

                        </p>
                        <p>
                            <input type='text' value={optionTwoText} name='optionTwoText'
                                onChange={this.handleOptionInput('optionTwoText')}
                                placeholder="Type in Option Two text" />      

                        </p>
                        <input className='btn' type='submit' value='SUBMIT' disabled={ optionTwoText.length === 0 || optionOneText.length === 0} />
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserId }) => {
    return {
        authedUserId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveNew: (question) => dispatch(saveNewQuestion(question))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPoll)