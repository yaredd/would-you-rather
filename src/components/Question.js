import React, { Component } from 'react'

class Question extends Component {

    render () {
        const { author, timestamp } = this.props.question
        return (
            <div>
                <p>Asked By: {author} {timestamp}</p>
                <button>View</button>
            </div>
        )
    }
}

export default Question