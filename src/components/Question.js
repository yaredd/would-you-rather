import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentQuestion } from '../actions/questions'
import formatDate from '../utils/formatDate'

class Question extends Component {
    state = {
        toQuestionDetail: false
    }

    handleQuestionView = (e) => {
        e.preventDefault()
        this.props.dispatch(setCurrentQuestion(this.props.authedUserId, this.props.question))
        this.setState({toQuestionDetail: true})
    }

    render () {
        const { author, timestamp, id } = this.props.question
        const { toQuestionDetail } = this.state
        if(toQuestionDetail){
            return <Redirect to={`/questions/${id}`} />
        }
        return (
            <div>
                <p>Asked By: {author} on {formatDate(timestamp)}</p>
                <button onClick={this.handleQuestionView}>View</button>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserId }, props) => {
    return {
        authedUserId, 
        ...props  //a user could have entered /queston/:id into the address bar -- must have a way to set props.question in this case as it would be null
    }
}

export default connect(mapStateToProps)(Question)