import React, { Component } from 'react';
import axios from 'axios';
import './contact.css';
import { connect } from 'react-redux';
import { setErrors } from '../../redux/reducer';
import Errors from './problems/errors';

class Contact extends Component {
    constructor(){
        super()

        this.state = {
            content: ''
        }
    }

    handleKeyUp = (e) => {
        if(e.keyCode === 13){
            axios.post('/api/errors', this.state).then(response => {
                this.props.setErrors(response.data)
                this.setState({
                    content: ''
                })
              }).catch(err => {
                console.log(err.response)
                this.setState({
                  error: err.response.data
                })
              })
        }
    }

    handleChange = e => {
        let { value } = e.target
    
        this.setState({
          content: value
        })
    }

    render(){
        return(
            <div className="cBackground">
                <div className="innerCBackground">
                    <div className="gBlaze">To get into contact with Grandpa Blaze himself send an email to: <ul style={{'listStyleType':'disc'}}><li className="email">Grandpablaze@yahoo.com</li></ul></div>
                    <div className="gBlaze a">Send us a message below with any bugs or problems</div>
                    <section className="errorBox">
                        <Errors />
                    </section>
                    {this.props.isAuthenticated ? 
                    <input onKeyUp={this.handleKeyUp} className="errorText" placeholder="Problem here" value={this.state.content} onChange={this.handleChange} />:
                    <div></div> }
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

export default connect(mapStateToProps, { setErrors })(Contact)