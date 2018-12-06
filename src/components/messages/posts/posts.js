import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './posts.css';
import { setPosts, userLoggedIn } from '../../../redux/reducer';

class Posts extends Component {
    constructor(){
        super()

        this.state = {
            messageText: ''
        }
    }

    async componentDidMount(){
        await axios.get('/auth/currentUser').then(response => {
            if(response.data){
                this.props.userLoggedIn(response.data)
            }
        })
        axios.get('/api/messages', this.state).then(response => {
                this.props.setPosts(response.data)
        })
    }

    handleChange = e => {
        let { value } = e.target
    
        this.setState({
          messageText: value
        })
    }

    render(){
        return this.props.isAuthenticated ? 
            <div className="postBackground">
                {this.props.posts.map(post => {
                return (
                    <div key={post.id} className="post">
                        <p>{post.author}:</p>
                            { this.props.user && this.props.user.isadmin ? <div>
                                {/* { <button className="update" onClick={() => {
                                    let { id } = post


                                }}>Update</button> } */}
                                <button className="delete" onClick={() => {
                                    axios.delete(`/api/messages/${post.id}`,).then(response => {
                                        this.props.setPosts(response.data)
                                    })
                                }}>Delete</button>
                            </div> 

                            : this.props.user && this.props.user.id === post.user_id && <div>
                                {/* <button className="update" onClick={() => {
                                    let { id } = post


                                }}>Update</button> */}
                                <button className="delete" onClick={() => {
                                    axios.delete(`/api/messages/${post.id}`,).then(response => {
                                        this.props.setPosts(response.data)
                                    })
                                }}>Delete</button>
                            </div>}
                            
                            <div className="content">{post.content}</div>
                    </div>)
                })}
            </div>:

            <div className="postBackground">
            {this.props.posts.map(post => {
            return (
                <div key={post.id} className="post">
                    <p>{post.author}:</p>
                        {post.content}
                </div>)
            })}
        </div>
    }
}

function mapStateToProps(state) {
    let { user, posts, isAuthenticated } = state
    return {
      user,
      posts,
      isAuthenticated
    }
  }
  
  export default connect(mapStateToProps, { setPosts, userLoggedIn })(Posts)