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
        const { avatarURL, name } = this.props.users[author]
        const { toQuestionDetail } = this.state
        if(toQuestionDetail){
            return <Redirect to={`/questions/${id}`} />
        }
        return (
            <div className='poll-info'>
                <div><img src={avatarURL} width="50px" alt={`${author} avatar`}/>
                        <span> {name} </span>
 asked on {formatDate(timestamp)}...</div>
                <div><button className='btn' onClick={this.handleQuestionView}>View</button></div>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserId, users}, props) => {
    return {
        authedUserId, 
        users,
        ...props  //a user could have entered /queston/:id into the address bar -- must have a way to set props.question in this case as it would be null
    }
}

export default connect(mapStateToProps)(Question)