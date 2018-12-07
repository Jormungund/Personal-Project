import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Header from './components/Header/header';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Predictions from './components/predictions/predictions';
import MessageBoard from './components/messages/messages';
import Contact from './components/contact/contact';
import Welcome from './components/welcome/welcome';
import AdminReg from './components/adminRegistration/adminReg';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/" render={(props) => {
          return (
            <div className="App">   
            <Header {...props}/>
            <Switch>
              <Route path="/" exact component={MessageBoard}/>
              <Route path="/predictions" component={Predictions} />
              <Route path="/contact" component={Contact} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/adminRegistration" component={AdminReg} />
            </Switch>
          </div>    
          )
          }}/>
      </HashRouter>
    );
  }
}

export default App;
