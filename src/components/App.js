import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { getAllUsers } from '../actions/users';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login'
import Nav from './Nav'
import AddPoll from './AddPoll'
import Home from './Home'
import Leaderboard from './Leaderboard'
import QuestionDetail from './QuestionDetail'
import NotFound from './NotFound'
import { LoadingBar } from 'react-redux-loading-bar';

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
          <header>
              <LoadingBar style={{ backgroundColor: 'red', height: '15px' }} />
          </header>
          <div className='container'>
            <Nav />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/add' component={AddPoll} />
                <Route path='/questions/:id' component={QuestionDetail} />
                <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUserId}) => {
  return {
    authedUserId
  }
}

export default connect(mapStateToProps)(App);
