import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './errors.css';
import { setErrors, userLoggedIn } from '../../../redux/reducer';

class Errors extends Component {
    constructor(){
        super()

        this.state = {
            content: ''
        }
    }

    async componentDidMount(){
        await axios.get('/auth/currentUser').then(response => {
            if(response.data){
                this.props.userLoggedIn(response.data)
            }
        })
        axios.get('/api/errors', this.state).then(response => {
                this.props.setErrors(response.data)
        })
    }

    handleChange = e => {
        let { value } = e.target
    
        this.setState({
          content: value
        })
    }

    render(){
        
        return this.props.isAuthenticated ? 
            <div className="errorBackground">
                {this.props.errors.map(error => {
                return (
                    <div key={error.id} className="error">
                        <p>{error.author}:</p>
                            { this.props.user && this.props.user.isadmin ? <div>
                                {/* <button className="update" onClick={() => {
                                    let { id } = error


                                }}>Update</button> */}
                                <button className="delete" onClick={() => {
                                    axios.delete(`/api/errors/${error.id}`,).then(response => {
                                        this.props.setErrors(response.data)
                                    })
                                }}>Delete</button></div> 
                                
                                : this.props.user && this.props.user.id === error.user_id && <div>
                                {/* <button className="update" onClick={() => {
                                    let { id } = error


                                }}>Update</button> */}
                                <button className="delete" onClick={() => {
                                    axios.delete(`/api/errors/${error.id}`,).then(response => {
                                        this.props.setErrors(response.data)
                                    })
                                }}>Delete</button>
                            </div> }
                            
                            <div className="content">{error.content}</div>
                    </div>)
                })}
            </div>:
            <div className="errorBackground">
            {this.props.errors.map(error => {
            return (
                <div key={error.id} className="error">
                    <p>{error.author}:</p>
                        {error.content}
                </div>)
            })}
        </div>
    }
}

function mapStateToProps(state) {
    let { user, errors, isAuthenticated } = state
    return {
      user,
      errors,
      isAuthenticated
    }
  }
  
  export default connect(mapStateToProps, { setErrors, userLoggedIn })(Errors)