import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    userId: ''
  }

  handleUserSelect = (e) => {
    this.setState({ userId: e.target.value })
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.userId))
  }

  render () {
    const { loading, users, userIds } = this.props
    return (
      <Fragment>
        { loading === true ? null : 
            <div className='center'>
              <p>Login</p>
              <form onSubmit={this.handleLogin} >
                <select value={this.state.userId} onChange={this.handleUserSelect} >
                  <option value=''></option>
                  {userIds.map((userId) => (
                    <option key={userId} value={userId}>{users[userId].name}</option>
                  ))}
                </select>  
                <input type='submit' value='LOGIN' disabled={this.state.userId === ''} />
              </form>
            </div>
        }
      </Fragment>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users).sort((a,b) => b - a),
    users,
    loading: users === null ? true : false
  }
}

export default connect(mapStateToProps)(Login)