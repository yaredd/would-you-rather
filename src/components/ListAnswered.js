import React , { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getAnsweredQuestions } from '../actions/questions';
import Question from './Question'

class ListAnswered extends Component {

    componentDidMount = () => {
        this.props.getAnsweredQuestions(this.props.authedUserId)
    }

    render () {
        const { loading, answeredQuestions } = this.props
        return (
            <Fragment>
                { loading ? null :
                    <div className='center'>
                        <div className='polls'>
                           <ul>
                               {answeredQuestions.allIds.map((id) => {
                                   return <li key={id}><Question question={answeredQuestions.byId[id]}/></li>
                               })}
                           </ul>
                        </div>
                    </div>
                }
            </Fragment>
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

const mapDispatchToProps = (dispatch) => {
    return {
        getAnsweredQuestions: (uid) => dispatch(getAnsweredQuestions(uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAnswered)