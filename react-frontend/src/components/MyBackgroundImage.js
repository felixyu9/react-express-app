import React, { Component } from 'react'
import BackgroundImage from '../img/front_page_background.png'
import '../App.css' 

class MYBackgroundImage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        username: '',
        password: ''
         
      }
    }

    handleUsernameChange = (event) =>{
      this.setState({username: event.target.value})
    }

    handlePasswordChange = (event) =>{
      this.setState({password: event.target.value})
    }

    handleSubmit = (event) =>{
      event.preventDefault()
      if(this.state.username.trim() === ''){
        alert("Please enter a valid username/email.")
      }else if(this.state.password.trim() === ''){
        alert("Please enter your password.")
      }else{
        alert("The username/email entered is not registered. Please click \"Sign Up\" to create an account.")
      }
    }
    
    render(){
      return (
        <div>
        <div>
            <img className="welcome-background-image-shown" src={BackgroundImage} alt="" />
        </div>
        <div className="greeting-text">
          <h2>Welcome to the MPR Weekly Lunch Voting Site. Click the menu button for more info.</h2>
        </div>
    
        </div>
      )

    }
  
}

export default MYBackgroundImage
