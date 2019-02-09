import React, { Component } from 'react'
import { connect } from 'react-redux';

class Leaderboard extends Component {

    render () {
        return (
            <p>Leaderboard</p>
        )
    }
}

export default connect()(Leaderboard)