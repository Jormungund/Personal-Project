import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './predictions.css';
import { connect } from 'react-redux';
import { setPredictions, userLoggedIn } from '../../redux/reducer';
import axios from 'axios';

class Predictions extends Component {
    constructor(){
        super()

        this.state = {
            team1prediction: 0,
            team2prediction: 0,
            makePredictions: false,
            editPredictions: false
        }
    }

    componentDidMount(){
        axios.get('/auth/currentUser').then(response => {
            if(response.data){
                this.props.userLoggedIn(response.data)
            }
        })
        axios.get('/api/predictions').then(response => {
            this.props.setPredictions(response.data)
    })
    }

    handleChange = e => {
        let { name, value } = e.target
    
        this.setState({
          [name]: value
        })
    }

    toggleMake = () => {
        this.setState({
            makePredictions: !this.state.makePredictions
        })
    }

    toggleEdit = () => {
        this.setState({
            editPredictions: !this.state.editPredictions
        })
    }

    handleSubmit = () => {
        axios.post('/api/predictions', this.state).then(response => {
            this.props.setPredictions(response.data)
            this.toggleMake()
        })
    }

    handleUpdate = () => {
        axios.put(`/api/predictions`, this.state).then(response => {
            this.props.setPredictions(response.data)
            this.toggleEdit()
        })
    }

    render(){
        return (
            <div className="pBackground">
                <div className="innerPBackground">
                    {this.props.isAuthenticated ? <div>
                        { this.state.makePredictions ? 
                            <div>
                                <section className="sPredictions">
                                    <h2>Team 1 Score</h2>
                                    <h2>Team 2 Score</h2>
                                </section>
                                <section className="sPredictions">
                                    <input name="team1prediction" type="number" max="999" placeholder="0" value={this.state.team1} onChange={this.handleChange}/>
                                    <input name="team2prediction" type="number" max="999" placeholder="0" value={this.state.team2} onChange={this.handleChange}/>
                                </section>
                                <button onClick={this.handleSubmit}>Submit</button>
                            </div>:
                            <div>
                                {this.state.editPredictions ? 
                                <div>
                                    {this.props.user && <div className="userWelcome"> Welcome {this.props.user.username}!</div>}
                                    <div className="relative">
                                        <section className="sPredictions">
                                            <h2>Team 1 Score</h2>
                                            <h2>Team 2 Score</h2>
                                        </section>
                                        <section className="sPredictions">
                                            <input name="team1prediction" type="number" max="999" placeholder={this.props.predictions.team1prediction} value={this.state.team1} onChange={this.handleChange}/>
                                            <input name="team2prediction" type="number" max="999" placeholder={this.props.predictions.team2prediction} value={this.state.team2} onChange={this.handleChange}/>
                                        </section>
                                        <div className="moreButtons">
                                            <button onClick={this.handleUpdate} className="preButton yes">Submit</button>
                                            <button onClick={this.toggleEdit} className="cancelButton">Cancel</button>
                                        </div>
                                    </div>
                                </div> : 
                                <div>
                                {this.props.user && <div className="userWelcome"> Welcome {this.props.user.username}!</div>}
                                {this.props.predictions.team1prediction && this.props.predictions.team2prediction ? 
                                    <div className="stuffing">
                                        <div className="squah">
                                            <h3 className="noH3">Team 1 Prediction: {this.props.predictions.team1prediction}</h3>
                                            <h3 className="noH3">Team 2 Prediction: {this.props.predictions.team2prediction}</h3>
                                        </div>
                                        <button onClick={this.toggleEdit} className="preButton no">Edit Predictions</button>
                                    </div>:
                                    <div className="noPredictions">
                                        <h3 className="noH3">You have not made any predictions yet.</h3>
                                        <button onClick={this.toggleMake} className="preButton">Make Predictions</button>
                                    </div>
                                }</div>}
                            </div>
                        }
                    </div> : <Redirect to="/" /> }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { user, predictions, isAuthenticated } = state
    return {
      user,
      predictions,
      isAuthenticated
    }
}

export default connect(mapStateToProps, { setPredictions, userLoggedIn })(Predictions);