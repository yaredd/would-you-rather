import React , { Component } from 'react'
import { connect } from 'react-redux';
import { getAnsweredQuestions } from '../actions/questions';
import Question from './Question'

class ListAnswered extends Component {

    componentDidMount = () => {
        this.props.dispatch(getAnsweredQuestions(this.props.authedUserId))
    }

    render () {
        const { loading, answeredQuestions } = this.props
        return (
            <div>
                <p>Answered List</p>
                { loading ? null :
                            <ul>
                                {answeredQuestions.allIds.map((id) => {
                                    return <li key={id}><Question question={answeredQuestions.byId[id]}/></li>
                                })}
                            </ul>
                }
            </div>
        )
    }
}

const mapStateToProps = ({answeredQuestions, authedUserId}) => {
    return {
        loading: answeredQuestions.allIds === undefined ? true : false,
        answeredQuestions,
        authedUserId
    }
}

export default connect(mapStateToProps)(ListAnswered)