import React, { Component } from 'react'
import { unsetAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

class Nav extends Component {
    
    handleLogout = (e) => {
        e.preventDefault()
        this.props.dispatch(unsetAuthedUser())
      }
    

    render () {
        const { users, authedUserId } = this.props
        return (
            <nav className='navbar'>
                <ul>
                    <li>
                        <NavLink exact to='/' activeClassName='active'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>Add Poll</NavLink>
                    </li>
                    <li>
                        Hello {users[authedUserId].name}
                    </li>
                    <li>
                        <button className='link-button' onClick={this.handleLogout}>logout</button> 
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = ({ users, authedUserId }) => {
    return ({
        users,
        authedUserId
    })
}

export default connect(mapStateToProps)(Nav)