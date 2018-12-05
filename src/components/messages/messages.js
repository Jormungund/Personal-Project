import React, { Component } from 'react';
import './messages.css';
import axios from 'axios';
import Posts from './posts/posts';
import { connect } from 'react-redux';
import { setPosts } from '../../redux/reducer';

class MessageBoard extends Component {
    constructor(){
        super()

        this.state = {
            content: '',
            error: ''
        }
    }

    componentDidMount(){
        axios.get('/api/messages', this.state).then(response => {
            this.props.setPosts(response.data)
        })
    }

    handleChange = e => {
        let { value } = e.target
    
        this.setState({
          content: value
        })
    }

    handleKeyUp = (e) => {
        if(e.keyCode === 13){
            axios.post('/api/messages', this.state).then(response => {
                this.props.setPosts(response.data)
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

    render(){
        
        return(
            <div className="mBackground">
                <div className="innerMBackground">
                    <section className="messagesBox">
                        <Posts />
                    </section>
                    {this.props.isAuthenticated ? 
                    <input onKeyUp={this.handleKeyUp} className="messageText" placeholder="Message here" value={this.state.content} onChange={this.handleChange} /> :
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

export default connect(mapStateToProps, { setPosts })(MessageBoard)