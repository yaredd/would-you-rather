import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { getAllUsers } from '../actions/users';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login'
import Nav from './Nav'
import AddPoll from './AddPoll'
import Home from './Home'
import Leaderboard from './Leaderboard'
import NotFound from './NotFound'
import { LoadingBar } from 'react-redux-loading';

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
          <LoadingBar />
          <Nav />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/leaderboard' component={Leaderboard} />
              <Route path='/add' component={AddPoll} />
              <Route component={NotFound} />
          </Switch>
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
