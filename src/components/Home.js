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
                <nav className='navbar'>
                    <ul onClick={this.toggleView}>
                        <li><button className={`link-button ${!this.state.showAnswered ? 'active': ''}`}>Un-Answered Questions</button></li>     
                        <li><button className={`link-button ${this.state.showAnswered ? 'active': ''}`}>Answered Questions</button></li>     
                    </ul> 
                </nav>
            
                { this.state.showAnswered ? <ListAnswered /> : <ListUnAnswered />}
            </div>

        )
    }
}

export default Home