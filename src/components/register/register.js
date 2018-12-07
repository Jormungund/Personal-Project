import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './register.css';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/reducer';

class Register extends Component {
    constructor(){
        super()

        this.state = {
            username: '',
            email: '',
            password: '',
            isAdmin: false,
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
            this.goToWelcome()
            this.props.onClose()
            let user = response.data
            this.props.userLoggedIn(user)
          }).catch(err => {
            console.log(err)
            this.setState({
              error: err.data
            })
          })
    }

    goToWelcome = () => {
        this.props.history.push('/welcome')
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
            <section className="register">
                <button className="closeButton" onClick={this.props.onClose}>Close</button>
                <h3 className="registerText">Username</h3>
                <input className="registerInputs" name="username" value={this.state.username} type="text" maxLength="20" placeholder="Username" onChange={this.handleChange}/>
                <br/>
                <h3 className="registerText">Email</h3>
                <input className="registerInputs" name="email" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChange}/>
                <br/>
                <h3 className="registerText">Password</h3>
                <input onKeyUp={this.handleKeyUp} className="registerInputs" name="password" value={this.state.password} type="text" placeholder="Password" onChange={this.handleChange}/>
                <br/>
                <button className="registerButton" onClick={this.handleClick}>Submit</button>
                <div className="registerError">{this.state.error}</div>
            </section>
        );
    }
}

Register.propTypes = {
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
  
  export default connect(mapStateToProps, { userLoggedIn })(Register)