import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import MemeGen from './components/MemeGen';

import VotePage from './components/VotePage';
import MyBackgroundImage from './components/MyBackgroundImage';
import SignUpPage from './components/SignUpPage';
import SideDrawerLoginPage from './components/SideDrawerLoginPage';
import VotedPage from './components/VotedPage';
import HelpPage from './components/HelpPage';


class App extends Component {
  constructor(props) {
    super(props)  
    this.state = {
      sideDrawerOpen: false,
      userIsLoggedIn: false
    }
  }
  
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    })

  }

  backdropOrButtonsClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  loginHandler = () =>{
    this.setState({isLoggedInFromApp: true})
  }

  render() {
    let backdrop;
    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop clicked={this.backdropOrButtonsClickHandler}/>
    }


    return (
      <Router> 
        <div>
          <div className="app">
            <Header toggleButtonIsClicked = {this.drawerToggleClickHandler} loginSucceeded = {this.loginHandler} isLoggedInFromApp ={this.state.userIsLoggedIn}/>
            <SideDrawer show={this.state.sideDrawerOpen} clicked={this.backdropOrButtonsClickHandler}/>
            {backdrop}
            <Route path="/" exact component={MyBackgroundImage} />
            <Route clicked={this.otherButtonClickHandler} path="/home" exact component={HomePage}/>
            <Route path="/about" exact component={AboutPage}/>
            <Route path="/meme-gen" exact component={MemeGen}/>
            <Route path="/vote" exact component={VotePage}/>
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/login" exact component={SideDrawerLoginPage} />
            <Route path="/voted" exact component={VotedPage} />
            <Route path="/help" exact component={HelpPage} />
            <Footer />
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
