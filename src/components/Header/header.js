import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import Login from '../login/login';
import Register from '../register/register';
import { connect } from 'react-redux';
import { userLoggedIn, userLoggedOut } from '../../redux/reducer';
import axios from 'axios';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenLogin: false,
            isOpenRegister: false
        }
    }
    componentDidMount(){
        axios.get('/auth/currentUser').then(response => {
            if(response.data){
                this.props.userLoggedIn()
            }
        })
    }
    toggleLogin = () => {
        if (this.state.isOpenLogin === true){
            this.setState({
                isOpenLogin: false
            })
        } else if (this.state.isOpenLogin === false){
            if( this.state.isOpenRegister === true) {
                this.setState({
                    isOpenRegister: false
                })
            }
            this.setState({
                isOpenLogin: true
            })
        }
    }

    toggleRegister = () => {
        if (this.state.isOpenRegister === true){
            this.setState({
                isOpenRegister: false
            })
        } else if ( this.state.isOpenRegister === false){
            if(this.state.isOpenLogin === true){
                this.setState({
                    isOpenLogin: false
                })
            }
            this.setState({
                isOpenRegister: true
            })
        }
    }

    logout = () => {
        axios.get('/auth/logout').then(response => {
            this.props.userLoggedOut()
        })
    }
    
    render(){
        return this.props.isAuthenticated ? 
            <div className="header">
                <img src="https://bloximages.chicago2.vip.townnews.com/heraldandnews.com/content/tncms/assets/v3/editorial/a/4e/a4e8b337-b2ce-5bcf-821a-7abe1ee70868/565d4447441a1.image.gif" alt="trailblazer logo" className="logo"/>
                <div className="title">GrandpaBlaze's Prediction Game</div>
                <div className="navbar">
                    <Link to="/predictions" className="navs">Predictions</Link>
                    <Link to="/" className="navs">Message Board</Link>
                    <Link to="/contact" className="navs">Contact Us</Link>
                </div>
                <div>
                    <button className="log_reg logout" onClick={this.logout}>Logout</button>
                </div>
            </div>
        : <div className="header">
            <img src="https://bloximages.chicago2.vip.townnews.com/heraldandnews.com/content/tncms/assets/v3/editorial/a/4e/a4e8b337-b2ce-5bcf-821a-7abe1ee70868/565d4447441a1.image.gif" alt="trailblazer logo" className="logo"/>
            <div className="title">GrandpaBlaze's Prediction Game</div>
            <div className="navbar">
                <Link to="/" className="navs">Message Board</Link>
                <Link to="/contact" className="navs">Contact Us</Link>
            </div>
            <div>
                <button className="log_reg" onClick={this.toggleLogin}>Login</button>
                <button className="log_reg" onClick={this.toggleRegister}>Register</button>
            </div>

            <Login style={{zIndex: 1000}}show={this.state.isOpenLogin} onClose={this.toggleLogin}/>
            <Register show={this.state.isOpenRegister} onClose={this.toggleRegister}/>
        </div>
    }
}

function mapStateToProps(state) {
    let { isAuthenticated } = state
    return {
      isAuthenticated
    }
  }

export default connect(mapStateToProps, { userLoggedIn, userLoggedOut })(Header);