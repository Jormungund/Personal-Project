import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './login.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/reducer';

class Login extends Component {
    constructor(){
        super()

        this.state = {
            email: '',
            password: '',
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
        axios.post('/auth/login', this.state).then(response => {
            let user = response.data
            this.props.userLoggedIn(user)
            this.props.onClose()
          }).catch(err => {
            console.log(err.response)
            this.setState({
              error: err.response.data
            })
          })
    }

    handleKeyUp = (e) => {
        if(e.keyCode === 13){
            this.handleClick()
        }
    }

    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <section className="login">
                <button className="closeButton" onClick={this.props.onClose}>Close</button>
                <h3 className="loginText">Email</h3>
                <input className="loginInputs" name="email" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChange}/>
                <br/>
                <h3 className="loginText">Password</h3>
                <input onKeyUp={this.handleKeyUp} className="loginInputs" name="password" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChange}/>
                <br/>
                <button className="loginButton" onClick={this.handleClick}>Submit</button>
                <div className="loginError">{this.state.error}</div>
            </section>
        );
    }
}

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

function mapStateToProps(state) {
    let { isAuthenticated } = state
    return {
      isAuthenticated
    }
  }
  
  export default connect(mapStateToProps, { userLoggedIn })(Login)