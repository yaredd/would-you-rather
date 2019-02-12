import React , { Component } from 'react'
import { connect } from 'react-redux';
import { getUnAnsweredQuestions } from '../actions/questions'
import Question from './Question'

class ListUnAnswered extends Component {

    componentDidMount = () => {
        this.props.dispatch(getUnAnsweredQuestions(this.props.authedUserId))
    }

    render () {
        const { loading, unAnsweredQuestions } = this.props
        return (
            <div className='center'>
                <div className='polls'>
                    { loading ? null :
                                <ul>
                                    {unAnsweredQuestions.allIds.map((id) => {
                                        return <li key={id}><Question question={unAnsweredQuestions.byId[id]}/></li>
                                    })}
                                </ul>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({unAnsweredQuestions, authedUserId}) => {
    return {
        loading: unAnsweredQuestions.allIds === undefined ? true : false,
        unAnsweredQuestions,
        authedUserId
    }
}

export default connect(mapStateToProps)(ListUnAnswered)