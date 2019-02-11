import React , { Component } from 'react'
import ListAnswered from './ListAnswered'
import ListUnAnswered from './ListUnAnswered'

class Home extends Component {
    state = {
        showAnswered: false
    }

    toggleView  = (e) => {
        e.preventDefault()
        this.setState(() => ({showAnswered: !this.state.showAnswered}))
    }

    render () {
        return (
            <div>
                <ul onClick={this.toggleView}>
                    <li><button className='link-button' disabled={!this.state.showAnswered}>Un-Answered Questions</button></li>     
                    <li><button className='link-button' disabled={this.state.showAnswered}>Answered Questions</button></li>     
                </ul> 
                { this.state.showAnswered ? <ListAnswered /> : <ListUnAnswered />}
            </div>

        )
    }
}

export default Home