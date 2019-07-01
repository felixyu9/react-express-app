import React, { Component } from 'react'
import BackgroundImage from '../img/front_page_background.png'
import '../App.css' 
import axios from 'axios'

class SideDrawerLoginPage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        usernameOrEmail: '',
        password: '',
        username: '',
        loginSwitch: false   
      }
    }

    handleUsernameChange = (event) =>{
      this.setState({usernameOrEmail: event.target.value})
    }

    handlePasswordChange = (event) =>{
      this.setState({password: event.target.value})
    }

    handleSubmit = (event) =>{
      event.preventDefault()
    if(this.state.usernameOrEmail.trim() === ''){
      alert("Please enter a valid username/email.")
    }else if(this.state.password.trim() === ''){
      alert("Please enter your password.")
    }else{
      axios.post('http://mprlunchvotingbackend-env.mm65bjabnb.us-east-2.elasticbeanstalk.com/login', this.state)
        .then(response => {
          if(response.data === "message1"){
            alert("the username/email entered is not registered")
          }else if(response.data === "message3"){
            alert("Incorrect password. Try again.")
          }else{
            window.sessionStorage.setItem("isLoggedIn", true);
            window.sessionStorage.setItem("savedUsername", response.data.usernameshownUsers)
            window.sessionStorage.setItem("loginEmail", response.data.emailUsers)
            this.setState({
              loginSwitch: true
            })
            alert("Login Success")
          }
        })
        .catch(error =>{
          alert("Internet problem. If the problem persists, contact Felix.")
          console.log(error)
        }) 
    }
    }
    
    render(){
      return (
        <div>
        <div>
            <img className="welcome-background-image-shown" src={BackgroundImage} alt="" />
        </div>
        <div>
        <form className="welcome-login-form">
              <div>
                  <input className="welcome-login-input-box" type="text" placeholder="Username/Email Address" value={this.state.usernameOrEmail} onChange={this.handleUsernameChange}/>
              </div>
              <div>
                  <input className="welcome-login-input-box" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
              </div>
              <div>
                    <button className="welcome-login-button" type="submit" onClick={this.handleSubmit}>Login</button>
              </div>
          </form>
        </div>
    
        </div>
      )

    }
  
}

export default SideDrawerLoginPage
