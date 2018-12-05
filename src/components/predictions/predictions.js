import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './predictions.css';
import { connect } from 'react-redux';
import { setPredictions, userLoggedIn } from '../../redux/reducer';
import axios from 'axios';

class Predictions extends Component {
    constructor(){
        super()

        this.state = {
            team1: 0,
            team2: 0,
            editPredictions: false
        }
    }

    componentDidMount(){
        axios.get('/auth/currentUser').then(response => {
            if(response.data){
                this.props.userLoggedIn(response.data)
            }
        })
        axios.get('/api/predictions', this.state).then(response => {
            this.props.setPredictions(response.data)
    })
    }

    handleChange = e => {
        let { name, value } = e.target
    
        this.setState({
          [name]: value
        })
    }

    toggleEdit = () => {
        this.setState({
            editPredictions: !this.state.editPredictions
        })
    }

    render(){
        return (
            <div className="pBackground">
                <div className="innerPBackground">
                    {this.state.editPredictions ? 
                        <div>
                            <section className="sPredictions">
                                <h2>Team 1 Score</h2>
                                <h2>Team 2 Score</h2>
                            </section>
                            <section className="sPredictions">
                                <input name="team1" type="number" max="999" placeholder="0" value={this.state.team1} onChange={this.handleChange}/>
                                <input name="team2" type="number" max="999" placeholder="0" value={this.state.team2} onChange={this.handleChange}/>
                            </section>
                            <button onClick={this.toggleEdit}>Edit Predictions</button>
                        </div>:
                        <div>
                            {this.props.user && <div> Welcome {this.props.user.username}!</div>}
                            {this.props.predictions.team1Prediction && this.props.predictions.team2Prediction ? 
                                <div>
                                    {this.props.predictions.team1Prediction}
                                    {this.props.predictions.team2Prediction}
                                </div>:
                                <div>
                                    <h3>You do not have any or both predictions yet.</h3>
                                    <button onClick={this.toggleEdit}>Make Predictions</button>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { user, predictions } = state
    return {
      user,
      predictions
    }
}

export default connect(mapStateToProps, { setPredictions, userLoggedIn })(Predictions);