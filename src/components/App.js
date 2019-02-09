import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllUsers } from '../actions/users';
import { Route } from 'react-router-dom'
import Login from './Login'
import { unsetAuthedUser } from '../actions/authedUser';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(getAllUsers())
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(unsetAuthedUser())
  }

  render() {
    if (this.props.authedUser === null) {
      return <Login />
    }
    const {users, authedUser} = this.props
    return (
      <p>Hello {users[authedUser].name}
      <button onClick={this.handleLogout}>logout</button> 
      </p>
    );
  }
}

const mapStateToProps = ({users, authedUser}) => {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
