import React, { Component } from 'react'
import { connect } from 'react-redux';

class AddPoll extends Component {

    render () {
        return (
            <p>AddPoll</p>
        )
    }
}

export default connect()(AddPoll)