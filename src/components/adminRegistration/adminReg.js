import React, { Component } from 'react';
import './adminReg.css';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/reducer';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AdminReg extends Component {
    constructor(){
        super()

        this.state = {
            username: '',
            email: '',
            password: '',
            isAdmin: true,
            error: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target
    
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        axios.post('/auth/register', this.state).then(response => {
            let user = response.data
            this.props.userLoggedIn(user)
          }).catch(err => {
            console.log(err.response)
            this.setState({
              error: err.response.data
            })
          })
    }

    render(){
        return(
            <div className="rBackground">
                <div className="innerRBackground">
                    <input name="username" className="regText" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                    <input name="email" className="regText" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    <input name="password" className="regText" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <Link to="/welcome" ><button className="regText" onClick={this.handleClick}>Submit</button></Link>
                    {this.state.error}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { isAuthenticated } = state
    return {
      isAuthenticated
    }
}
  
export default connect(mapStateToProps, { userLoggedIn })(AdminReg);