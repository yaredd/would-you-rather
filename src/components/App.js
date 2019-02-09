import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { getAllUsers } from '../actions/users';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Nav from './Nav'
import AddPoll from './AddPoll'
import Home from './Home'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(getAllUsers())
  }


  render() {
    if (this.props.authedUserId === null) {
      return <Login />
    }
    return (
      <Router>
        <Fragment>
          <Nav />
          <Route exact path='/' component={Home} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/add' component={AddPoll} />
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({users, authedUserId}) => {
  return {
    authedUserId
  }
}

export default connect(mapStateToProps)(App);
