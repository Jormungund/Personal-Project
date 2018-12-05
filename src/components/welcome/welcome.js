import React, { Component } from 'react';
import './welcome.css';
import { connect } from 'react-redux';

class Welcome extends Component {
    componentDidMount() {
        setTimeout(this.banana, 3000)
    }

    banana = () => {
        this.props.history.push('/')
    }

    render(){
        return(
            <div className="wBackground">
                <div className="innerWBackground">
                    <h1 className="welcome"> Welcome {this.props.user.username}! </h1>
                    <h2 className="text">We're happy to have you join us!</h2>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { user } = state
    return {
      user
    }
  }
  
  export default connect(mapStateToProps)(Welcome)