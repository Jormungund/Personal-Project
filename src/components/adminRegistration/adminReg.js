import React, { Component } from 'react';
import './adminReg.css';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/reducer';
import axios from 'axios';

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
            this.props.history.push('/welcome')
            this.setState({
                error: ''
            })
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
                    <div className="aRegister">
                        <h3 className="information">Welcome to the Admin Registration Page!</h3>
                        <h3 className="aRegText">Username:</h3>
                        <input name="username" className="regText" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                        <h3 className="aRegText">Email:</h3>
                        <input name="email" className="regText" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                        <h3 className="aRegText">Password:</h3>
                        <input name="password" className="regText" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                        <button className="regText sub" onClick={this.handleClick}>Submit</button>
                    </div>
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