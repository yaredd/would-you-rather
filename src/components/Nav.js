import React, { Component } from 'react'
import { unsetAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends Component {
    
    handleLogout = (e) => {
        e.preventDefault()
        this.props.dispatch(unsetAuthedUser())
        this.props.history.push('/')
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
                    <li className='logout'>
                        <img className='nav-avatar' src={users[authedUserId].avatarURL} width="20px" alt={`${authedUserId} avatar`}/><span>Hello {users[authedUserId].name}.  
                         &nbsp; <button className='link-button' onClick={this.handleLogout}>logout</button></span>
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

export default withRouter(connect(mapStateToProps)(Nav))